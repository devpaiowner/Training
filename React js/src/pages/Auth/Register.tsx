import React, { useEffect, useRef, useState } from 'react'
import VerifyOtp from './VerifyOtp'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromStorage, getSearchQueryParams } from '../../utils/Helper';
import RegisterValidation from '../../yup/Auth/RegisterValidation';
import { UserRoleTypes, UserRoles, VerifyOtpTypes } from '../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { CheckUserAction } from '../../redux/Action/AuthAction';
import { Images } from '../../constants/ImageConstants'
import Button from '../../components/UI/Button';
import { Config } from '../../config/Config';
import { ApiConstants } from '../../constants/ApiConstants';

interface FormInputs {
  email: string;
  password: string;
  confirm_password: string;
  agree: number;
  role_id: string | number;
};

const Register = () => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const verifyOtpButton: any = useRef(null);
  const role = getSearchQueryParams('role');
  const [userDetails, setUserDetails] = useState();
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const checkUser = useSelector((state: any) => state.CheckUserState);

  const { register, reset, setValue, watch, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(RegisterValidation),
    defaultValues: {
      role_id: Config?.ACTIVE_ROLE
    }
  });

  const onSubmit = (payload: any) => {
    setUserDetails({ ...payload, request_type: VerifyOtpTypes?.SignUp })
    // payload.agree = payload?.agree ? 1 : 0
    dispatch(CheckUserAction(payload))
  }

  useEffect(() => {
    if (checkUser?.status) {
      if (verifyOtpButton.current) {
        verifyOtpButton.current.click()
      }
    }
  }, [checkUser?.status])


  useEffect(() => {
    reset()
  }, [role])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="com-floating">
          <div className='position-relative'>
            <i className="f-icon icon-envelope"></i>
            <label className="f-label">Email</label>
            <input className="f-input" type="email" placeholder="Email" {...register('email')} />
          </div>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className='error valid-error input-error'>{message}</p>}
          />
        </div>
        <div className="com-floating">
          <div className='position-relative'>
            <i className="f-icon icon-lock"></i>
            <label className="f-label">Password</label>
            <input
              className="f-input f-pass-input"
              type={eye1 ? "text" : "password"}
              placeholder="Password" {...register('password')}
            />
            <i onClick={() => setEye1(!eye1)} className={`f-pass icon-eye${eye1 ? "" : "-disabled"}`}></i>
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className='error valid-error input-error'>{message}</p>}
          />
        </div>

        <div className="com-floating">
          <div className='position-relative'>
            <i className="f-icon icon-lock"></i>
            <label className="f-label">Confirm Password</label>
            <input
              className="f-input f-pass-input"
              type={eye2 ? "text" : "password"}
              placeholder="Password" {...register('confirm_password')}
            />
            <i onClick={() => setEye2(!eye2)} className={`f-pass icon-eye${eye2 ? "" : "-disabled"}`}></i>
          </div>
          <ErrorMessage
            errors={errors}
            name="confirm_password"
            render={({ message }) => <p className='error valid-error input-error'>{message}</p>}
          />
        </div>

        <div className="form-label-area">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register('agree')} />
            <label className="form-check-label golden-text" htmlFor="flexCheckDefault">
              I agree with <a className="golden-text" href={Config?.REACT_APP_API_BASE_URL + 'privacy-policy'} target='_blank'>Privacy Policy</a> & <a className="golden-text" href={Config?.REACT_APP_API_BASE_URL + 'terms-and-condition'} target='_blank'>Terms & Conditions</a>
            </label>
          </div>
        </div>
        <ErrorMessage
          errors={errors}
          name="agree"
          render={({ message }) => <p className='error valid-error input-error'>{message}</p>}
        />

        <Button text='Sign Up' type='submit' className='com-btn w-100 form-submit-btn' isLoading={checkUser?.loading} />

        <div className="or-login-area">
          <div className="or-line"><span className="txt">Or login with</span></div>
          <ul className="social-footer">
            <li><a href="#"><img src={Images?.FB_ICON} alt="facebook icon" /></a></li>
            <li><a href="#"><img src={Images?.GOOGLE_ICON} alt="google icon" /></a></li>
            <li><a href="#"><img src={Images?.APPLE_ICON} alt="apple icon" /></a></li>
          </ul>
        </div>
      </form >

      <button type="button" id='otpbtn' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#otpModal" ref={verifyOtpButton}></button>

      <VerifyOtp payload={userDetails} />
    </>
  )
}

export default Register