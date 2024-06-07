import React, { useEffect, useState } from 'react';
import { Images } from '../../constants/ImageConstants';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordAction } from '../../redux/Action/AuthAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromStorage } from '../../utils/Helper';
import { Routes } from '../../constants/RouteConstants';
import Button from '../../components/UI/Button';
import ResetPasswordValidation from '../../yup/Auth/ResetPasswordValidation';
import { Config } from '../../config/Config';

interface FormInputs {
    password: string,
    confirm_password: string,
    role_id:number
};
const ResetPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);  
    const resetPasswordState = useSelector((state: any) => state?.ResetPasswordState);
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: yupResolver(ResetPasswordValidation),
        defaultValues: {
          role_id: Config?.ACTIVE_ROLE
        }
      });

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            email: location?.state?.email,
        }
        dispatch(ResetPasswordAction(payload));
    }

    useEffect(() => {
        if (resetPasswordState?.status) {
            navigate(Routes?.Login);
            dispatch(ResetPasswordAction("RESET"));
        }
    }, [resetPasswordState])

    return (
        <main>
            <div className="auth-area">
                <div className="login-form-card row">
                    <div className="col-md-4 col-lg-6 lft d-none d-md-flex">
                        <img className="center-logo" src={Images?.LOGO_LARGE} alt="logo" />
                    </div>
                    <div className="col-md-8 col-lg-6 rght">
                        <div className="rght-inner mt-auto">
                            <div className="head">
                                <h1>Reset Password</h1>
                                <p>Enter a new password</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-input-height">
                                    <div className="com-floating">
                                        <i className="f-icon icon-lock"></i>
                                        <label className="f-label">Password</label>
                                        <input
                                            className="f-input f-pass-input"
                                            type={eye1 ? "text" : "password"}
                                            placeholder="Password"
                                            {...register('password')}
                                        />
                                         <i onClick={() => setEye1(!eye1)} className={`f-pass icon-eye${eye1 ? "" : "-disabled"}`}></i>
                                    </div>

                                    <div className="com-floating">
                                        <i className="f-icon icon-lock"></i>
                                        <label className="f-label">Confirm Password</label>
                                        <input
                                            className="f-input f-pass-input"
                                            type={eye2 ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            {...register('confirm_password')}
                                        />
                                         <i onClick={() => setEye2(!eye2)} className={`f-pass icon-eye${eye2 ? "" : "-disabled"}`}></i>
                                    </div>
                                </div>

                                {/* <button className="com-btn w-100 form-submit-btn mb-5">Send OTP</button> */}
                                <Button text='Send OTP' type='submit' className='com-btn w-100 form-submit-btn' isLoading={resetPasswordState?.loading} />
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </main>
    )
}

export default ResetPassword