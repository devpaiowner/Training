import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { UserChangePassword } from '@/Redux/Actions/AuthAction';
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface FormInputs {
    old_password: string
    password: string
    confirm_password: string
}

const formSchema: any = Yup.object().shape({

    old_password: Yup.string()
        .required(VALIDATION_MESSAGE?.OLD_PASSWORD_REQUIRED)
        // .min(8, VALIDATION_MESSAGE?.OLD_PASSWORD_MIN_CHAR)
        // .max(16, VALIDATION_MESSAGE?.OLD_PASSWORD_MAX_CHAR)
        // .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        // .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE),
        ,

    password: Yup.string()
        .required(VALIDATION_MESSAGE?.PASSWORD_REQUIRED)
        .min(8, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
        .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE)
        .notOneOf([Yup.ref('old_password')], VALIDATION_MESSAGE?.PASSWORD_OLD_NOT_SAME),

    confirm_password: Yup.string()
        .required(VALIDATION_MESSAGE?.CONFIRM_PASSWORD_REQUIRED)
        .min(8, VALIDATION_MESSAGE?.NEW_PASSWORD_MIN_CHAR)
        .max(16, VALIDATION_MESSAGE?.NEW_PASSWORD_MAX_CHAR)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^\S*$/, VALIDATION_MESSAGE?.NO_SPACE_ALLOWED)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~`!@#$%^&.,<>?/*:";'{}()=+_-])[A-Za-z\d~`!@#$%^&.,<>?/*:";'{}()=+_-]{8,16}$/, VALIDATION_MESSAGE?.PASSWORD_UPPER_CASE)
        .oneOf([Yup.ref('password')], VALIDATION_MESSAGE?.PASSWORD_CPWD_NOT_MATCHED),

});

const ChangePassword = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [oldPasswordType, setOldPasswordType] = useState(false);
    const [passwordType, setPasswordType] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState(false);
    const userPasswordChange = useSelector((state: any) => state.UserChangePasswordState);

    const { register, formState: { errors }, watch, handleSubmit, reset } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (payload: FormInputs) => {
        dispatch(UserChangePassword(payload))

    }
    useEffect(()=>{
            if(userPasswordChange.status){
                reset()
            }
    },[userPasswordChange])
    return (
        <>
            <div className="col-md-12 col-lg-9">
                <div className="accountRight h-100">
                    
                    <div className="d-flex">
                    <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
                        <h1>Change password</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-xl-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formBox">
                                    <div className="row gy-4 my-4">
                                        <div className="col-md-12">
                                            <label>Old Password</label>
                                            <div className="input-group input-group-md inputGroup-sizing-lg">
                                            <input type="text" className="form-control" placeholder="" {...register('old_password')} />
                                            <span className="btn btn-light inputGroup-sizing-lg"  onClick={() => { setOldPasswordType(!oldPasswordType); }} ><i className={`${oldPasswordType ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} pt-2`}  ></i></span>
                                            </div>
                                           
                                            <ErrorMessage
                                                errors={errors}
                                                name="old_password"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label>New Password</label>
                                            <div className="input-group">
                                            <input type="text" className="form-control" placeholder="" {...register('password')} />
                                            <span className="btn btn-light"  onClick={() => { setPasswordType(!passwordType); }} ><i className={`${passwordType ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} pt-2`}  ></i></span>
                                            </div>
                                            
                                            <ErrorMessage
                                                errors={errors}
                                                name="password"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Confirm Password</label>
                                            <div className="input-group input-group-md">
                                            <input type="text" className="form-control" placeholder="" {...register('confirm_password')} />
                                            <span className="btn btn-light"  onClick={() => { setConfirmPasswordType(!confirmPasswordType); }} ><i className={`${confirmPasswordType ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} pt-2`}  ></i></span>
                                            </div>
                                           
                                            <ErrorMessage
                                                errors={errors}
                                                name="confirm_password"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center"><button type="submit" className="btn btn-primary w-100">Change Password</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword