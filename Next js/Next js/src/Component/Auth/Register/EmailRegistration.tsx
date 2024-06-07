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
import { RegisterType, RouteConfig } from '@/Config/CommonConfig';
import { saveToSessionStorage } from '@/utils/Helper';
import Spinner from '@/Component/Layouts/Spinner';
import Link from 'next/link';


interface FormInputs {
    reg_type: string
    country: string
    currency: string
    email: string
    // country_code: string
    // phone_number: string
    password: string
    confirm_password: string
    promo_code: string
    api_type: string
    otp: string
    confirm_otp_status: number
    terms_and_privacy: boolean
}

const formSchema: any = Yup.object().shape({
    country: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "country"),

    currency: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "currency"),

    email: Yup.string()
        .email(VALIDATION_MESSAGE?.VALID_EMAIL)
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
        .trim(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
        .max(150, VALIDATION_MESSAGE?.EMAIL_MAX),

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
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE)
        .oneOf([Yup.ref('password')], VALIDATION_MESSAGE?.PASSWORD_CPWD_NOT_MATCHED),

    terms_and_privacy: Yup.boolean()
        .oneOf([true], "Please accept Terms & Conditions and Privacy Policy."),

});

const EmailRegistration = () => {

    const dispatch = useDispatch<any>();
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [phoneCode, setPhoneCode] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [otpError, setOtpError] = useState("");
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState("password");
    const userRegister = useSelector((state: any) => state.UserRegisteredState);

    const { register, getValues,reset, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const togglePasswordConfirm = () => {
        if (passwordTypeConfirm === "password") {
            setPasswordTypeConfirm("text")
            return;
        }
        setPasswordTypeConfirm("password")
    }

    const onSubmit = (payload: FormInputs) => {
        payload.reg_type = 'email'
        // payload.country_code = phoneCode
        // payload.phone_number = phoneNumber
        payload.confirm_otp_status = 1
        saveToSessionStorage('registerType', RegisterType?.Email)
        dispatch(UserRegisterAction(payload))
    }

    // const handlePhoneChange = (value: any, code: any) => {
    //     setPhoneCode('+' + code?.dialCode);
    //     const phoneNum = value.substring(code?.dialCode.length);
    //     setPhoneNumber(String(phoneNum))
    // }

    const handleSendOtp = async () => {
        if (getValues('email')) {
            const params = {
                reg_type: 'email',
                api_type: 'email_otp',
                email: getValues('email'),
            }
            saveToSessionStorage('registerType', RegisterType?.EmailOtp)
            await dispatch(UserRegisterAction(params))
        }
    }

    const handleConfirmOtp = () => {
        if (isOtpSent) {
            if (!getValues('otp')) {
                setOtpError('Please enter otp.')
            } else if (getValues('otp')?.length < 4) {
                setOtpError('Otp must be 4 digit long.')
            } else {
                setOtpError('')
                const payload = {
                    reg_type: 'phone',
                    api_type: RegisterType?.PhoneConfirmOtp,
                    email: getValues('email'),
                    otp: getValues('otp')
                }
                saveToSessionStorage('registerType', RegisterType?.PhoneConfirmOtp)
                dispatch(UserRegisterAction(payload))
            }
        }
    }

    useEffect(() => {
        if (userRegister?.status && userRegister?.register_type === RegisterType?.EmailOtp) {
            setIsOtpSent(true)
        }
        if (userRegister?.status && userRegister?.register_type === RegisterType?.PhoneConfirmOtp) {
            setIsOtpConfirmed(true)
        }
        if (userRegister?.status && (userRegister?.register_type === RegisterType?.Email)) {
            dispatch({ type: "SIGNUP_FAIL", payload: null })
            $('.btn-close').click()
            $('#loginModalButton').click()
            reset()
            // setTimeout(() => {
            //     window.location.reload()
            // }, 2500);
        }
    }, [userRegister])

    return (
        <>
            {userRegister?.loading && <Spinner />}
            <div className="tab-pane fade" id="pills-profile1" role="tabpanel" aria-labelledby="pills-profile-tab1" tabIndex={0}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formBox">
                        <div className="row gy-3 my-3 my-lg-5">
                            <div className="col-md-6">
                                <select className="form-select" {...register('country')}>
                                    <option style={{ color: "black" }} value='India'>India</option>
                                    {countriesAndCurrencies?.map((countriesList: any, countriesKey: any) => {
                                        return (
                                            <option style={{ color: "black" }} key={countriesKey}>{countriesList?.name}</option>
                                        )
                                    })}
                                </select>
                                <ErrorMessage
                                    errors={errors}
                                    name="country"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6">
                                <select className="form-select" {...register('currency')}>
                                    <option style={{ color: "black" }} value='INR'>Indian Rupee (INR)</option>
                                    {/* <option style={{ color: "black" }} defaultValue="">Select Currency</option> */}
                                    {countriesAndCurrencies?.map((currencyList: any, currencyKey: any) => {
                                        return (
                                            currencyList?.currency_name !== null &&
                                            < option style={{ color: "black" }} key={currencyKey}>{currencyList?.currency_name}</option>
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
                                <div className='input-group'>
                                    <input type="text" className="form-control" placeholder="Email Address" {...register('email')} />
                                    <button className="btn btn-primary" type="button" onClick={handleSendOtp} >Send Otp</button>
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="input-group reactSlectGroup mb-3">
                                    <input type="text" className="form-control" placeholder="Confirmation Code" aria-label="Recipient's username" aria-describedby="button-addon2" {...register('otp')} maxLength={4}/>
                                    <button className="btn btn-primary" type="button" disabled={isOtpSent === false ? true : false} onClick={handleConfirmOtp}>Confirm</button>
                                </div>
                                <p className='text-danger'>{otpError}</p>
                                <ErrorMessage
                                    errors={errors}
                                    name="otp"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>

                            {/* <div className="col-md-6 recatSelect">
                                <PhoneInput
                                    inputClass="form-control"
                                    placeholder=""
                                    disableInitialCountryGuess={false}
                                    enableLongNumbers={false}
                                    country={"in"}
                                    countryCodeEditable={false}
                                    onChange={handlePhoneChange}
                                // value={phoneNumber}
                                />

                                <ErrorMessage
                                    errors={errors}
                                    name="phone_number"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div> */}
                            <div className="col-md-6 passwords">
                                <input type={passwordType} className="form-control" placeholder="Password" {...register('password')} />
                                <span className={`toggle-password icon-eye-${passwordType === 'password' ? 'hidden' : 'view'} `} onClick={togglePassword}></span>
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6 passwords">
                                <input type={passwordTypeConfirm} className="form-control" placeholder="Confirm password" {...register('confirm_password')} />
                                <span className={`toggle-password icon-eye-${passwordTypeConfirm === 'password' ? 'hidden' : 'view'} `} onClick={togglePasswordConfirm}></span>
                                <ErrorMessage
                                    errors={errors}
                                    name="confirm_password"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Promo code (if you have one)" {...register('promo_code')} />
                                <ErrorMessage
                                    errors={errors}
                                    name="promo_code"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-12">
                            <div className='form-check'>
                                <input type="checkbox" className=" form-check-input" id='checkBoxTnC2' {...register('terms_and_privacy')} />
                                <label htmlFor="checkBoxTnC2">
                                    I acknowledge that I have read and agree to the <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=privacypolicy`}>Terms and Conditions</Link> & <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=terms_of_service`}>Privacy Policy</Link>.
                                </label>
                                <ErrorMessage
                                    errors={errors}
                                    name="terms_and_privacy"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            </div>
                            {/* <div className="col-md-6"><button type="submit" className="btn btn-primary w-100 h-100 px-5" disabled={!isOtpConfirmed}>Continue</button></div> */}
                            <div className="text-center"><button type="submit" className="btn btn-primary w-100 h-100" disabled={!isOtpConfirmed}>Submit</button></div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default EmailRegistration
