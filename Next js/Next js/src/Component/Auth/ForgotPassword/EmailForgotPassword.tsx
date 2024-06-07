import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPasswordAction, ResetPasswordAction } from '@/Redux/Actions/AuthAction';
import Spinner from '@/Component/Layouts/Spinner';
import $ from 'jquery';

interface FormInputs {
    email: string
    is_type: string,
    otp: string,
    password: string,
    confirm_password: string,
}

const EmailForgotPassword = () => {

    const dispatch = useDispatch<any>();
    const [isOtpSent, setIsOtpSent] = useState(false)
    const forgotPassword = useSelector((state: any) => state.ForgotPasswordState);
    const resetPassword = useSelector((state: any) => state.ResetPasswordState);
    // console.log('forgotPassword', forgotPassword);
    // console.log('resetPassword', resetPassword);

    const formSchema: any = Yup.object().shape({
        email: Yup.string()
            // .email(VALIDATION_MESSAGE?.VALID_EMAIL)
            .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
            .trim(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
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

    const { register, formState: { errors }, watch, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = async (payload: FormInputs) => {
        payload.is_type = "email"
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
            {forgotPassword?.loading && <Spinner />}
            <div className="tab-pane fade show" id="pills-forgot-email" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formBox">
                        {
                            isOtpSent === true ?
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
                                <div>
                                    <input type="text" className="form-control email-otp" placeholder="Enter Email Address" {...register('email')} />
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                    />
                                </div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary f-24 mt-4 w-100">{isOtpSent ? 'Verify' : 'Submit'}</button>
                </form>
            </div>
        </>
    )
}

export default EmailForgotPassword