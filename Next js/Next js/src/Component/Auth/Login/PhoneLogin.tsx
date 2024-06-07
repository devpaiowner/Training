import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { UserLoginAction } from '@/Redux/Actions/AuthAction';
import { decodeID, encodeID, getFromLocalStorage, getFromSessionStorage, isJson, isNotEmpty, removeFromLocalStorage, removeFromSessionStorage, saveToLocalStorage, saveToSessionStorage } from '@/utils/Helper';
import PhoneInput from 'react-phone-input-2';
import { LoginType } from '@/Config/CommonConfig';
import Spinner from '@/Component/Layouts/Spinner';


interface FormInputs {
  login_type: string
  phone_number: string
  country_code: string
  password: string
  username: string
  remember_me: boolean
}

const formSchema: any = Yup.object().shape({

  password: Yup.string()
    .required(VALIDATION_MESSAGE?.PASSWORD_REQUIRED)
    .min(6, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
    .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE)
});

const PhoneLogin = () => {

  const dispatch = useDispatch<any>();
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const userLogin = useSelector((state: any) => state.UserLoginState)

  const { register, setValue, formState: { errors }, watch, handleSubmit } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
  });


  const togglePassword = () => {
    if (passwordType == "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const onSubmit = (payload: FormInputs) => {
    if (isNotEmpty(phoneNumber)) {
      setPhoneError("")
      payload.login_type = 'phone';
      payload.username = 'user';
      payload.country_code = phoneCode
      payload.phone_number = phoneNumber
      saveToSessionStorage('loginType', LoginType?.Phone)
      dispatch(UserLoginAction(payload))
    } else {
      setPhoneError("Phone number required")
    }
  }

  const handlePhoneChange = (value: any, code: any) => {
    setPhoneCode('+' + code?.dialCode);
    const phoneNum = value.substring(code?.dialCode.length);
    setPhoneNumber(String(phoneNum))
  }


  useEffect(() => {
    if (userLogin?.data?.status && userLogin?.login_type === LoginType?.Phone) {
      if (watch('remember_me') === true) {
        const payload = {
          'country_code': watch('country_code'),
          'phone_number': watch('phone_number'),
          'password': watch('password'),
        }
        const userDetails = JSON.stringify(payload)
        saveToLocalStorage('userPhoneSessionDetails', encodeID(userDetails))
      } else {
        removeFromSessionStorage('userPhoneSessionDetails')
      }


      setTimeout(() => {
        const redirectUrl = getFromSessionStorage('redirectUrl');
        if (redirectUrl) {
          window.location.href = redirectUrl
          removeFromSessionStorage('redirectUrl')
        } else {
          window.location.reload()
        }
      }, 2500);
    }
  }, [userLogin])

  useEffect(() => {
    const userSession = decodeID(getFromLocalStorage('userPhoneSessionDetails'));
    if (userSession && isJson(userSession)) {
      const userLoginDetails = JSON.parse(userSession);
      $('.numberInput').val(userLoginDetails?.country_code + userLoginDetails?.phone_number);
      setPhoneCode(userLoginDetails?.country_code);
      // setPhoneCode('+' + userLoginDetails?.country_code);
      setPhoneNumber(userLoginDetails?.phone_number)  
      setValue('password', userLoginDetails?.password)
      setValue('remember_me', true)
    }
  }, [])

  const handlePhoneNumberCheck = () => {
    if (!phoneNumber) {
      setPhoneError("Phone number required")
    } else {
      setPhoneError("")
    }
  }
  return (
    <>
      {userLogin?.loading && <Spinner />}
      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formBox">
            <div className="mb-3 countrySelect">
              {/* <input type="number" className="form-control" placeholder="Enter Mobile Number" {...register('phone_number')} /> */}
              <PhoneInput
                inputClass="form-control numberInput"
                placeholder=""
                disableInitialCountryGuess={false}
                enableLongNumbers={false}
                country={"in"}
                countryCodeEditable={false}
                onChange={handlePhoneChange}
              // value={phoneNumber}
              />
              {/* <p className='error' style={{ color: 'red' }}>{phoneError}</p> */}
              <p className='text-danger'>{phoneError && phoneError}</p>
            </div>
            <div className="mb-3 passwords">
              <input type={passwordType} className="form-control" placeholder="Password" {...register('password')} />
              <span className={`toggle-password icon-eye-${passwordType === 'password' ? 'hidden' : 'view'} `} onClick={togglePassword}></span>
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
              />
            </div>
            <div className="d-sm-flex justify-content-between text-light">
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input"  {...register('remember_me')} />
                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
              </div>
              <a href="#ForgotModel" data-bs-toggle="modal" className="forgotpass">Forgot your password?</a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-100" onClick={() => handlePhoneNumberCheck()}>Login</button>
        </form>
      </div>

    </>
  )
}

export default PhoneLogin