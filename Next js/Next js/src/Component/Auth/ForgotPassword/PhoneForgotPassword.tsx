import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { ForgotPasswordAction, ResetPasswordAction } from '@/Redux/Actions/AuthAction';
import React, { Fragment, useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import Spinner from '@/Component/Layouts/Spinner';
import $ from 'jquery';

interface FormInputs {
    phone: string
    country_code: string
    is_type: string,
    otp: string,
    password: string,
    confirm_password: string,
}

const PhoneForgotPassword = () => {
    const dispatch = useDispatch<any>();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const forgotPassword = useSelector((state: any) => state.ForgotPasswordState);
    const resetPassword = useSelector((state: any) => state.ResetPasswordState);

    const formSchema: any = Yup.object().shape({
        phone: Yup.string()
            // .email(VALIDATION_MESSAGE?.VALID_EMAIL)
            .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "phone number")
            .trim(VALIDATION_MESSAGE?.ANY_REQUIRED + "phone number")
            .max(150, VALIDATION_MESSAGE?.EMAIL_MAX),

        otp: Yup.string().when('story_type', (value, schema) => {
            if (isOtpSent === false) {
                return schema.notRequired()
            } else {
                return schema
                    .required(VALIDATION_MESSAGE?.ANY_REQUIRED + 'otp')
                    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
                    .min(4, VALIDATION_MESSAGE?.OTP_MIN_CHAR)
                    .max(4, VALIDATION_MESSAGE?.OTP_MAX_CHAR)
            }
        }),

        password: Yup.string().when('story_type', (value, schema) => {
            if (isOtpSent === false) {
                return schema.notRequired()
            } else {
                return schema
                    .required(VALIDATION_MESSAGE?.PASSWORD_REQUIRED)
                    .min(8, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
                    .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
                    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
                    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
            }
        }),

        confirm_password: Yup.string().when('story_type', (value, schema) => {
            if (isOtpSent === false) {
                return schema.notRequired()
            } else {
                return schema
                    .required(VALIDATION_MESSAGE?.CONFIRM_PASSWORD_REQUIRED)
                    .min(6, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
                    .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
                    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
                    .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
                    .oneOf([Yup.ref('password')], VALIDATION_MESSAGE?.PASSWORD_CPWD_NOT_MATCHED)
            }
        }),

    });

    const { register, setValue, formState: { errors }, watch, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = async (payload: FormInputs) => {
        payload.is_type = "phone"
        if (isOtpSent) {
            await dispatch(ResetPasswordAction(payload))
        } else {
            await dispatch(ForgotPasswordAction(payload))
        }
    }

    useEffect(() => {
        if (forgotPassword?.status) {
            $('.email-otp').val('')
            setIsOtpSent(true)
        }
    }, [forgotPassword])
    useEffect(() => {
        if (resetPassword?.data?.status) {
            $('.email-otp').val('')
            setIsOtpSent(false)

        }
    }, [resetPassword])

    return (
        <>
            <div className="tab-pane fade show active" id="pills-forgot-phone" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formBox">
                        <div>
                            {
                                isOtpSent ?
                                    <Fragment>
                                        <div>
                                            <input type="text" className="form-control email-otp" placeholder="Enter Otp" {...register('otp')} maxLength={4}/>
                                            <ErrorMessage
                                                errors={errors}
                                                name="otp"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>

                                        <div>
                                            <input type="text" className="form-control email-otp" placeholder="Enter new password" {...register('password')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="password"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>

                                        <div>
                                            <input type="text" className="form-control email-otp" placeholder="Enter confirm password" {...register('confirm_password')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="confirm_password"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>

                                    </Fragment>
                                    :
                                    <Fragment>
                                        <div className="mb-3 countrySelect">
                                            <PhoneInput
                                                inputClass="form-control"
                                                placeholder=""
                                                disableInitialCountryGuess={false}
                                                enableLongNumbers={false}
                                                country={"in"}
                                                countryCodeEditable={false}
                                                onChange={(value, code: any) => {
                                                    setValue('phone', value.substring(code?.dialCode.length))
                                                    setValue('country_code', code?.dialCode)
                                                }}
                                            />
                                            <p className='text-danger'>{errorMessage && errorMessage}</p>
                                            <ErrorMessage
                                                errors={errors}
                                                name="phone"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <span className="icon_L icon-email"></span>
                                    </Fragment>
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary f-24 mt-4 w-100">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PhoneForgotPassword