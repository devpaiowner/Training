import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { UserLoginAction } from '@/Redux/Actions/AuthAction';
import ToastDefault from '@/Component/DefaultComponent/Toast';
import { decodeID, encodeID, getFromLocalStorage, getFromSessionStorage, isJson, removeFromLocalStorage, removeFromSessionStorage, saveToLocalStorage, saveToSessionStorage } from '@/utils/Helper';
import { LoginType } from '@/Config/CommonConfig';
import Spinner from '@/Component/Layouts/Spinner';


interface FormInputs {
    login_type: string
    email: string
    password: string
    username: string
    remember_me: boolean
}

const formSchema: any = Yup.object().shape({

    email: Yup.string()
        // .email(VALIDATION_MESSAGE?.VALID_EMAIL)
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
        .trim(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
        .max(150, VALIDATION_MESSAGE?.EMAIL_MAX),

    password: Yup.string()
        .required(VALIDATION_MESSAGE?.PASSWORD_REQUIRED)
        .min(6, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
        .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE)
});


const EmailLogin = () => {

    const dispatch = useDispatch<any>();
    const router = useRouter();
    const userLogin = useSelector((state: any) => state.UserLoginState)
    const [passwordType, setPasswordType] = useState("password");

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

    const onSubmit = async (payload: FormInputs) => {
        saveToSessionStorage('loginType', LoginType?.Email)
        payload.username = "user"
        payload.login_type = "email"
        await dispatch(UserLoginAction(payload))
    }

    useEffect(() => {
        if (userLogin?.data?.status && userLogin?.login_type === LoginType?.Email) {
            if (watch('remember_me') === true) {
                const payload = {
                    'email': watch('email'),
                    'password': watch('password'),
                }
                const userDetails = JSON.stringify(payload)
                saveToLocalStorage('userEmailSessionDetails', encodeID(userDetails))
            } else {
                removeFromLocalStorage('userEmailSessionDetails')
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
    }, [userLogin?.data])

    useEffect(() => {
        const userSession = decodeID(getFromLocalStorage('userEmailSessionDetails'));
        if (userSession && isJson(userSession)) {
            const userLoginDetails = JSON.parse(userSession);
            setValue('email', userLoginDetails?.email)
            setValue('password', userLoginDetails?.password)
            setValue('remember_me', true)
        }
    }, [])

    return (
        <>
            {userLogin?.loading && <Spinner />}
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formBox">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Enter Email Address" {...register('email')} />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                            />
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
                    <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>
                </form>
            </div>
        </>
    )
}

export default EmailLogin