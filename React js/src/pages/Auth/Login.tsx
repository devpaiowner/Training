import React, { useEffect, useState } from 'react'
import Button from '../../components/UI/Button'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Images } from '../../constants/ImageConstants'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromStorage, getFromStorage, saveToStorage } from '../../utils/Helper';
import { StorageConstants } from '../../constants/Constants';
import { LoginAction } from '../../redux/Action/AuthAction';
import LoginValidation from '../../yup/Auth/LoginValidation';
import { Routes } from '../../constants/RouteConstants';
import GoogleSocialLogin from './SocialLogin/GoogleLogin';
import { Config } from '../../config/Config';
import FacebookSocialLogin from './SocialLogin/FacebookLogin';

interface FormInputs {
  email: string;
  password: string;
  device_type: string;
  role_id: string | number;
  device_token: string;
  device_unique_id: string;
  remember_me: boolean;
};

const Login = () => {
  const dispatch = useDispatch<any>();
  const [eye, setEye] = useState(false);
  const login = useSelector((state: any) => state.LoginState);
  const socialLogin = useSelector((state: any) => state.SocialLoginState);

  const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(LoginValidation),
    defaultValues: {
      role_id: Config?.ACTIVE_ROLE,
      device_type: 'Web',
    }
  });

  const onSubmit = (payload: any) => {
    dispatch(LoginAction(payload))
  }

  useEffect(() => {
    if (login?.status) {
      if (watch('remember_me') === true) {
        const payload = { email: watch('email'), password: watch('password') }
        saveToStorage({ key: 'user_session', value: payload })
      } else {
        deleteFromStorage({ key: 'user_session' })
      }

      saveToStorage({ key: StorageConstants?.IS_USER_LOGIN_TOKEN, value: login?.data?.token })
      saveToStorage({ key: StorageConstants?.USER_DETAIL, value: login?.data?.data })

      if (!login?.data?.data?.social_type) {
        if (login?.data?.data?.is_profile_complete === 0) {
          window.location.href = Routes?.PhoneVerify;
        } else if (login?.data?.data?.is_profile_complete === 1) {
          window.location.href = Routes?.ProfileSetup;
        } else {
          window.location.href = Routes?.BookRide;
        }
      }
      // window.location.href = Routes?.BookRide;
    }

    if (socialLogin?.status) {
      saveToStorage({ key: StorageConstants?.IS_USER_LOGIN_TOKEN, value: socialLogin?.data?.token })
      saveToStorage({ key: StorageConstants?.USER_DETAIL, value: socialLogin?.data?.data })
      // window.location.href = Routes?.BookRide;
      if (socialLogin?.data?.data?.is_profile_complete === 0) {
        window.location.href = Routes?.PhoneVerify;
      } else if (socialLogin?.data?.data?.is_profile_complete === 1) {
        window.location.href = Routes?.ProfileSetup;
      } else {
        window.location.href = Routes?.BookRide;
      }
    }
  }, [login?.status, socialLogin?.status])

  useEffect(() => {
    const userSession = getFromStorage({ key: 'user_session' })
    if (userSession) {
      setValue('email', userSession?.email)
      setValue('password', userSession?.password)
      setValue('remember_me', true)
    }
  }, [])
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
              type={eye ? "text" : "password"}
              placeholder="Password"
              {...register('password')}
            />
            <i onClick={() => setEye(!eye)} className={`f-pass icon-eye${eye ? "" : "-disabled"}`}></i>
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className='error valid-error input-error'>{message}</p>}
          />
        </div>

        <div className="form-label-area">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" {...register('remember_me')} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <Link to={Routes?.ForgotPassword} >Forgot Password?</Link>
        </div>
        <Button text='Login' type='submit' className='com-btn w-100 form-submit-btn' isLoading={login?.loading || socialLogin?.loading} />

        <div className="or-login-area">
          <div className="or-line"><span className="txt">Or login with</span></div>
          <ul className="social-footer">
            <li><a href="#"><img src={Images?.FB_ICON} alt="facebook icon" /></a></li>
            {/* <li><a href="#"><img src={Images?.GOOGLE_ICON} alt="google icon" /></a></li> */}
            {/* <FacebookSocialLogin/> */}
            <GoogleSocialLogin />
            <li><a href="#"><img src={Images?.APPLE_ICON} alt="apple icon" /></a></li>
          </ul>
        </div>
      </form>

    </>
  )
}

export default Login