import React, { useEffect, useRef, useState } from 'react'
import { Images } from '../../../constants/ImageConstants';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import ForgotPasswordValidation from '../../../yup/Auth/ForgotPasswordValidation';
import { VerifyOtpTypes } from '../../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPasswordAction } from '../../../redux/Action/AuthAction';
import VerifyOtp from '../../Auth/VerifyOtp';
import Button from '../../../components/UI/Button';
import { Config } from '../../../config/Config';
import { useLocation, useNavigate } from 'react-router-dom';

interface FormInputs {
    email: string;
    role_id: string | number;
};
const EmailVerification = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const role = Config?.ACTIVE_ROLE;
    const verifyOtpButton: any = useRef(null);
    const dispatch = useDispatch<any>();
    const forgot_password_data = useSelector((state: any) => state.ForgotPasswordState);

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: yupResolver(ForgotPasswordValidation),
        defaultValues: {
            role_id: 2
        }
    });

    const forgotPasswordPayload = {
        email: watch("email"),
        request_type: VerifyOtpTypes?.ForgotPassword,
        role_id: role
    }

    const onSubmit = (payload: any) => {
        dispatch(ForgotPasswordAction(payload))
    }

    useEffect(() => {
        if (forgot_password_data?.status) {
            if (verifyOtpButton.current) {
                verifyOtpButton.current.click()
            }
            dispatch(ForgotPasswordAction("RESET"))
        }
    }, [forgot_password_data?.status]);

    useEffect(() => {
        if (!location?.state?.email) {
            navigate(-1)
        }
    }, [location?.state])
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
                                <h1>Email Verification</h1>
                                <p>Enter your registered email address  <br />to receive OTP</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-input-height">
                                    <div className="com-floating">
                                        <i className="f-icon icon-envelope"></i>
                                        <label className="f-label">Email</label>
                                        <input
                                            className="f-input"
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")} />
                                    </div>
                                </div>
                                <Button text='Send OTP' type={"submit"} className='com-btn w-100 form-submit-btn' isLoading={forgot_password_data?.loading} />
                            </form>
                        </div>
                    </div>
                    <button type="button" id='f-otpbtn' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#otpModal" ref={verifyOtpButton}></button>
                    <VerifyOtp payload={forgotPasswordPayload} />
                </div>
            </div>
        </main>
    )
}

export default EmailVerification