import React, { useEffect, useRef, useState } from 'react'
import { Images } from '../../constants/ImageConstants'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getFromStorage } from '../../utils/Helper';
import PhoneValidation from '../../yup/Auth/PhoneValidation';
import { MobileVerificationAction } from '../../redux/Action/AuthAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Routes } from '../../constants/RouteConstants';
import { Config } from '../../config/Config';
import Button from '../../components/UI/Button';
import VerifyOtp from './VerifyOtp';
import { VerifyOtpTypes } from '../../constants/Constants';

interface FormInputs {
    mobile_number: string,
    country_code: string,
    role_id: number
};

const PhoneVerify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const verifyOtpButton: any = useRef(null);
    const [userDetails, setUserDetails] = useState();
    const MobileVerificationState = useSelector((state: any) => state?.MobileVerificationState);

    const { setValue, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: yupResolver(PhoneValidation),
        defaultValues: {
            role_id: Config?.ACTIVE_ROLE
        }
    });

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            request_type: VerifyOtpTypes?.ContactVerify,
            is_profile_complete: 1
        };
        setUserDetails(payload);
        dispatch(MobileVerificationAction(data));
    }

    useEffect(() => {
        if (MobileVerificationState?.status) {
            verifyOtpButton.current.click()
            // dispatch(MobileVerificationAction("RESET"));
        }
    }, [MobileVerificationState?.status])

    const homeMobileNumberHandler = (value: any, code: any) => {
        const regex = new RegExp(code?.dialCode);
        const phone = value.replace(regex, "");
        setValue("country_code", code?.dialCode);
        setValue("mobile_number", phone);
    }
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
                                <h1>Phone Verification</h1>
                                <p>Enter your registered phone number <br />to receive OTP</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-input-height">


                                    <div className="com-floating">
                                        <label className="f-label">Phone</label>
                                        <PhoneInput
                                            inputClass="f-input w-100"
                                            placeholder=""
                                            disableInitialCountryGuess={false}
                                            enableLongNumbers={false}
                                            country={"us"}
                                            countryCodeEditable={false}
                                            onChange={homeMobileNumberHandler}
                                        />
                                    </div>


                                    {/* <div className="com-floating">
                                        <i className="f-icon icon-phone"></i>
                                        <label className="f-label">Phone</label>
                                        <input
                                            className="f-input"
                                            type="text"
                                            placeholder="000 000 0000"
                                            {...register('phone')}
                                        />
                                    </div> */}
                                </div>
                                {/* <button className="com-btn w-100 form-submit-btn mb-5">Send OTP</button> */}
                                <Button text='Send OTP' type='submit' className='com-btn w-100 form-submit-btn' isLoading={MobileVerificationState?.loading} />
                            </form>
                            <button type="button" id='otpbtn' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#otpModal" ref={verifyOtpButton}></button>

                            <VerifyOtp payload={userDetails} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PhoneVerify