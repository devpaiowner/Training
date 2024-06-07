import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { countriesAndCurrencies } from '@/utils/Json';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserRegisterAction } from '@/Redux/Actions/AuthAction';
import { saveToSessionStorage } from '@/utils/Helper';
import { RegisterType, RouteConfig } from '@/Config/CommonConfig';
import Spinner from '@/Component/Layouts/Spinner';
import Link from 'next/link';


interface FormInputs {
    reg_type: string
    api_type: string
    country_code: string
    country: string
    phone_number: string
    currency: string
    otp: string
    password: string
    confirm_password: string
    promo_code: string
    terms_and_privacy: boolean
    confirm_otp_status: number
}

const formSchema: any = Yup.object().shape({
    currency: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "currency"),

    otp: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "otp")
        .min(4),

    password: Yup.string()
        .required(VALIDATION_MESSAGE?.PASSWORD_REQUIRED)
        .min(6, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
        .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE),

    confirm_password: Yup.string()
        .required(VALIDATION_MESSAGE?.CONFIRM_PASSWORD_REQUIRED)
        .min(6, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
        .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .oneOf([Yup.ref('password')], VALIDATION_MESSAGE?.PASSWORD_CPWD_NOT_MATCHED),

    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE),

    terms_and_privacy: Yup.boolean()
        .oneOf([true], "Please accept Terms & Conditions and Privacy Policy."),
});

const PhoneRegistration = () => {

    const dispatch = useDispatch<any>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
    const userRegister = useSelector((state: any) => state.UserRegisteredState);

    const { register, getValues, reset, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const handlePhoneChange = (value: any, code: any) => {
        setPhoneCode('+' + code?.dialCode);
        const phoneNum = value.substring(code?.dialCode.length);
        setPhoneNumber(String(phoneNum))
    }

    const onSubmit = (payload: FormInputs) => {
        payload.reg_type = 'phone'
        payload.country_code = phoneCode
        payload.phone_number = phoneNumber
        payload.confirm_otp_status = 1
        saveToSessionStorage('registerType', RegisterType?.Phone)
        dispatch(UserRegisterAction(payload))
    }

    const handleSendOtp = async () => {
        if (phoneNumber) {
            setPhoneError('')
            const params = {
                reg_type: 'phone',
                api_type: 'phone_otp',
                country_code: phoneCode,
                phone_number: phoneNumber
            }
            saveToSessionStorage('registerType', RegisterType?.PhoneOtp)
            await dispatch(UserRegisterAction(params))
        } else {
            setPhoneError('Phone number required')
        }
    }

    const handleConfirmOtp = () => {
        if (isOtpSent) {
            const payload = {
                reg_type: 'phone',
                api_type: 'confirm_phone_otp',
                country_code: phoneCode,
                phone_number: phoneNumber,
                otp: getValues('otp')
            }
            saveToSessionStorage('registerType', RegisterType?.PhoneConfirmOtp)
            dispatch(UserRegisterAction(payload))
        }
    }


    useEffect(() => {
        if (userRegister?.status && userRegister?.register_type === RegisterType?.PhoneOtp) {
            setIsOtpSent(true)
        }
        if (userRegister?.status && userRegister?.register_type === RegisterType?.PhoneConfirmOtp) {
            setIsOtpConfirmed(true)
        }
        if (userRegister?.status && (userRegister?.register_type === RegisterType?.Phone)) {
            dispatch({ type: "SIGNUP_FAIL", payload: null })
            $('.btn-close').click()
            $('#loginModalButton').click()
            reset()
            setPhoneNumber('')
            setPhoneCode('')
            // setTimeout(() => {
            //     window.location.reload()
            // }, 2500);
        }

    }, [userRegister])



    return (
        <>
            {userRegister?.loading && <Spinner />}
            <div className="tab-pane fade show active" id="pills-home1" role="tabpanel" aria-labelledby="pills-home-tab1" tabIndex={0}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formBox">
                        <div className="row gy-3 my-3 my-lg-5">
                            <div className="col-md-6">
                                <div className="input-group reactSlectGroup mb-3">
                                    <PhoneInput
                                        inputClass="form-control"
                                        placeholder=""
                                        disableInitialCountryGuess={false}
                                        enableLongNumbers={false}
                                        country={"in"}
                                        countryCodeEditable={false}
                                        onChange={handlePhoneChange}
                                    />
                                    <button className="btn btn-primary" type="button" onClick={handleSendOtp} >Send Sms</button>
                                    <p className='text-danger'>{phoneError && phoneError}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <select className="form-select" {...register('currency')}>
                                    <option style={{ color: "black" }} value='INR'>Indian Rupee (INR)</option>
                                    {countriesAndCurrencies?.map((currencyList: any, currencyKey: any) => {
                                        return (
                                            currencyList?.currency_name !== null &&
                                            < option
                                                style={{ color: "black" }}
                                                key={currencyKey}
                                                value={currencyList?.currency_code}>
                                                {currencyList?.currency_name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <ErrorMessage
                                    errors={errors}
                                    name="currency"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Confirmation Code" aria-label="Recipient's username" aria-describedby="button-addon2" maxLength={4} {...register('otp')} />
                                    <button className="btn btn-primary" type="button" disabled={isOtpSent === false ? true : false} onClick={handleConfirmOtp}>Confirm</button>
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="otp"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Promo Code (if you have one)" {...register('promo_code')} /></div>
                            <div className="col-md-6">
                                <input type={'password'} className="form-control" placeholder="Password" {...register('password')} />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6">
                                <input type={'password'} className="form-control" placeholder="Confirm Password" {...register('confirm_password')} />
                                <ErrorMessage
                                    errors={errors}
                                    name="confirm_password"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-12">
                            <div className='form-check'>
                                <input type="checkbox" className=" form-check-input" id='checkBoxTnC' {...register('terms_and_privacy')} />
                                <label htmlFor="checkBoxTnC" className='ms-2'>
                                    I acknowledge that I have read and agree to the <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=privacypolicy`}>Terms and Conditions</Link> & <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=terms_of_service`}>Privacy Policy</Link>.
                                </label>
                                <ErrorMessage
                                    errors={errors}
                                    name="terms_and_privacy"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center"><button type="submit" className="btn btn-primary w-100 h-100" disabled={isOtpConfirmed ? false : true}>Submit</button></div>
                </form >
            </div >

        </>
    )
}

export default PhoneRegistration