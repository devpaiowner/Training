import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { countriesAndCurrencies } from '@/utils/Json';
import { useDispatch, useSelector } from 'react-redux';
import { UserGetProfile, UserUpdateProfileAction, VerifyEmailPhoneAction } from '@/Redux/Actions/AuthAction';
import Spinner from '../Layouts/Spinner';
import PhoneInput from 'react-phone-input-2';
import { useRouter } from 'next/navigation';
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import PhoneEmailVerifyModal from '@/utils/CustomModals';
import { isNotEmpty } from '@/utils/Helper';
interface FormInputs {
    name: string
    email: string
    phone_number: string
    password: string
    country: string
    phone_country_code: string
    zip_code: string
    city: string
    address: string
}

const formSchema: any = Yup.object().shape({
    name: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "name"),

    country: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "country"),

    // email: Yup.string()
    //     .email(VALIDATION_MESSAGE?.VALID_EMAIL)
    //     .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
    //     .trim(VALIDATION_MESSAGE?.ANY_REQUIRED + "email")
    //     .max(150, VALIDATION_MESSAGE?.EMAIL_MAX),


});


const MyProfile = (props: any) => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const user = props?.userData?.data?.data;
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData]: any = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [verifyType, setVerifyType] = useState('');
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const updateProfile = useSelector((state: any) => state.UserUpdateProfileState);
    const VerifyEmailPhone = useSelector((state: any) => state.VerifyEmailPhoneState);

    const kycParams = {
        className: `btn ms-auto btn-${!user?.kyc ? 'danger' : user?.kyc?.verified === 'pending' ? 'warning' : user?.kyc?.verified === 'rejected' ? 'danger' : user?.kyc?.verified == 'complete' ? 'success' : ''}`,
        text: !user?.kyc ? 'Kyc Pending ' : user?.kyc?.verified === 'pending' ? 'Documents Submited ' : user?.kyc?.verified === 'rejected' ? 'Kyc Rejected ' : user?.kyc?.verified == 'complete' ? 'Kyc Verified ' : '',
        reason: user?.kyc?.reason
    }

    const { register, setValue, getValues, formState: { errors }, watch, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });


    const handleUpdatePage = () => {
        if (isEdit) {
            setUserData(null)
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }

    const handlePhoneChange = (value: any, code: any) => {
        setPhoneCode('+' + code?.dialCode);
        const phoneNum = value.substring(code?.dialCode.length);
        setPhoneNumber(String(phoneNum))
        setValue('phone_number', phoneNum)
        setValue('phone_country_code', phoneCode)
    }


    useEffect(() => {
        if (user) {
            setUserData(user)
        }

        if (userData) {
            setValue("name", userData?.name)
            setValue("email", userData?.email)
            setValue("phone_number", userData?.phone_number)
            setValue("country", userData?.country)
            setValue("city", userData?.city)
            setValue("zip_code", userData?.zip_code)
            setValue("address", userData?.address)

            setPhoneNumber(userData?.phone_number)
            setPhoneCode('+91')
        }
    }, [user, userData])

    useEffect(() => {
        if (updateProfile?.data?.status) {
            setIsEdit(false)
            setPhoneNumber(updateProfile?.data?.data?.phone_number)
            setPhoneCode('+91')
        }
    }, [updateProfile])

    const onSubmit = (payload: FormInputs) => {
        dispatch(UserUpdateProfileAction(payload))
    }

    const handleVerifyModelBox = (type: any) => {
        if (type === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailRegex.test(watch('email'))) {
                setEmailError('')
                dispatch(VerifyEmailPhoneAction({
                    "api_type": "email_otp",
                    "req_type": "email",
                    "user_id": user?._id,
                    "email": watch('email')
                }))
                setVerifyType('email')
            } else {
                setEmailError('Please enter a valid email address.')
            }
        } else {
            if (isNotEmpty(phoneNumber)) {
                dispatch(VerifyEmailPhoneAction({
                    "api_type": "phone_otp",
                    "req_type": "phone",
                    "user_id": user?._id,
                    "phone_number": phoneNumber,
                    "country_code": phoneCode,
                }))
                setVerifyType('phone')
                setPhoneError("")
            } else {
                setPhoneError("Phone number required")
            }
        }
    }

    const handleVerify = (otp: any) => {
        if (verifyType === 'email') {
            dispatch(VerifyEmailPhoneAction({
                "api_type": "confirm_email_otp",//confirm_phone_otp, phone_otp ,confirm_email_otp,email_otp
                "req_type": "email",// phone email
                "user_id": user?._id,
                "otp": otp,
                "email": watch('email')
            }))
        } else {
            dispatch(VerifyEmailPhoneAction({
                "api_type": "confirm_phone_otp",//confirm_phone_otp, phone_otp ,confirm_email_otp,email_otp
                "req_type": "phone",// phone email
                "user_id": user?._id,
                "otp": otp,
                "phone_number": phoneNumber,
                "country_code": phoneCode,
            }))
        }
    }


    useEffect(() => {
        if (VerifyEmailPhone?.data?.status) {
            if (isVerifyModalOpen) {
                setIsVerifyModalOpen(false)
                dispatch(UserGetProfile({}));
            } else {
                setIsVerifyModalOpen(true)
            }
        }
    }, [VerifyEmailPhone?.data])

    useEffect(() => {
        return () => {
            dispatch({
                type: "VERIFY_EMAIL_PHONE_FAIL",
                payload: null
            })
        }
    }, [])
    return (
        <>
            {(updateProfile?.loading || VerifyEmailPhone?.loading) && <Spinner />}
            <div className="col-md-12 col-lg-9">
                <div className="accountRight h-100">
                    <div className="d-sm-flex justify-content-between align-items-center">
                        <div className="d-flex mb-3 mb-lg-0">
                            <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
                            <h1>{isEdit ? 'Update Info' : 'Personal Info'}</h1>
                        </div>

                        {/* <button onClick={() => { !user?.kyc && router.push(`${RouteConfig?.Profile}?=add-kyc`) }} className={`btn ms-auto btn-${!user?.kyc ? 'danger' : user?.kyc?.verified === false ? 'warning' : 'success'}`}><span className={``}></span>{
                            !user?.kyc ? 'Kyc Pending' : user?.kyc?.verified === false ? 'Documents Submited' : 'Verified'
                        }</button> */}
                        <button onClick={() => { !user?.kyc && router.push(`${RouteConfig?.Profile}?=add-kyc`) }}
                            className={kycParams?.className}
                        >
                            <span className={``}></span>
                            {kycParams?.text}
                            {kycParams?.reason && <p>{kycParams?.reason}</p>}
                        </button>

                        <button onClick={() => handleUpdatePage()} className="btn btn-outline-light customIcon_BTN ms-3"><span className={`${isEdit ? '' : 'icon-edit'}`}></span>{isEdit ? 'Cancel' : 'Edit Profile'}</button>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-xxl-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formBox">
                                    <div className="row gy-2 my-4">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Your Email Address" aria-label="Recipient's username" aria-describedby="button-addon2" {...register('email')} readOnly={user?.Email_varified_at || !isEdit} style={{ cursor: user?.Email_varified_at && 'not-allowed' }} />
                                                {
                                                    isEdit &&
                                                    (user?.Email_varified_at ?
                                                        <button className="btn btn-primary" type="button" >Verified</button>
                                                        :
                                                        <button className="btn btn-primary" type="button" onClick={() => handleVerifyModelBox('email')}>Verify Now</button>)
                                                }
                                            </div>
                                            <p className="text-danger">{emailError}</p>
                                            <ErrorMessage
                                                errors={errors}
                                                name="email"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="countrySelect">
                                                <label>Phone Number</label>
                                                <div className="input-group">
                                                    <div className="input-group reactSlectGroup ">
                                                        <PhoneInput
                                                            inputClass="form-control w-100"
                                                            placeholder=""
                                                            disableInitialCountryGuess={false}
                                                            enableLongNumbers={false}
                                                            country={"in"}
                                                            countryCodeEditable={false}
                                                            onChange={handlePhoneChange}
                                                            value={phoneCode + phoneNumber}
                                                            disabled={user?.phone_varified_at || !isEdit}
                                                        />
                                                        {
                                                            isEdit &&
                                                            (user?.phone_varified_at ?
                                                                <button className="btn btn-primary" type="button" >Verified</button>
                                                                :
                                                                <button className="btn btn-primary" type="button" onClick={() => {
                                                                    // setIsVerifyModalOpen(true)
                                                                    handleVerifyModelBox('phone')
                                                                }}>Verify Now</button>
                                                            )}
                                                        <p className="text-danger">{phoneError}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label >Full Name</label>
                                            <input type="text" className="form-control" placeholder={isEdit ? "Enter Full Name" : ""} {...register('name')} disabled={!isEdit} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="name"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Country</label>
                                            {
                                                isEdit ?
                                                    <select className="form-select"  {...register('country')} disabled={!isEdit}>
                                                        <option style={{ color: "black" }} defaultValue=''>Country</option>
                                                        {countriesAndCurrencies?.map((countryList: any, currencyKey: any) => {
                                                            return (
                                                                < option style={{ color: "black" }} key={currencyKey}>{countryList?.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    :
                                                    <p className="profile-info form-control">{getValues("country")}</p>
                                            }
                                            <ErrorMessage
                                                errors={errors}
                                                name="country"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>City</label>
                                            <input type="text" className="form-control" placeholder={isEdit ? "Enter City" : ""} disabled={!isEdit} {...register('city')} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Zip Code</label>
                                            <input type="text" className="form-control" placeholder={isEdit ? "Enter Zip Code" : ""} disabled={!isEdit} {...register('zip_code')} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Address</label>
                                            <input type="text" className="form-control" placeholder={isEdit ? "enter address" : ""} disabled={!isEdit} {...register('address')} />
                                        </div>
                                    </div>
                                </div>
                                {isEdit && <button className="btn btn-primary" type="submit" >Update Profile</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PhoneEmailVerifyModal isOpen={isVerifyModalOpen} setIsOpen={setIsVerifyModalOpen} onVerify={handleVerify} />
        </>
    )
}

export default MyProfile