import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { UserLoginAction, UserRegisterAction } from '@/Redux/Actions/AuthAction';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { countriesAndCurrencies } from '@/utils/Json';
import { saveToSessionStorage } from '@/utils/Helper';
import { LoginType, RegisterType, RouteConfig } from '@/Config/CommonConfig';
import Spinner from '@/Component/Layouts/Spinner';
import Link from 'next/link';


interface FormInputs {
    reg_type: string
    country: string
    currency: string
    promo_code: string
    terms_and_privacy: boolean
}

const formSchema: any = Yup.object().shape({
    country: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "country"),

    currency: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "currency"),

    terms_and_privacy: Yup.boolean()
        .oneOf([true], "Please accept Terms & Conditions and Privacy Policy."),
});

const OneClickRegistration = () => {

    const dispatch = useDispatch<any>();
    const userRegister = useSelector((state: any) => state.UserRegisteredState);
    const userLogin = useSelector((state: any) => state.UserLoginState)

    const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (payload: FormInputs) => {
        payload.reg_type = 'one-click'
        saveToSessionStorage('registerType', RegisterType?.OneClick)
        dispatch(UserRegisterAction(payload))
    }

    useEffect(() => {
        if (userRegister?.status && (userRegister?.register_type === RegisterType?.OneClick)) {
            const payload = {
                "email": userRegister?.data?.data?.username,
                "password": userRegister?.data?.data?.password,
                "login_type": "email",
                "username": "user"
            }

            saveToSessionStorage('loginType', LoginType?.OneClick)
            dispatch(UserLoginAction(payload))
        }
    }, [userRegister])

    useEffect(() => {
        if (userLogin?.status && userLogin?.login_type === LoginType?.OneClick) {
            const payload = {
                "username": userRegister?.data?.data?.username,
                "password": userRegister?.data?.data?.password
            }
            saveToSessionStorage('userOneClickRegistration', JSON.stringify(payload))
            window.location.reload()
        }
    }, [userLogin])


    return (
        <>
            {userRegister?.loading && <Spinner />}
            <div className="tab-pane fade" id="pills-profile2" role="tabpanel" aria-labelledby="pills-profile-tab2" tabIndex={0}>
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
                                    {countriesAndCurrencies?.map((currencyList: any, currencyKey: any) => {

                                        return (
                                            currencyList?.currency_name !== null &&
                                            < option style={{ color: "black" }} value={currencyList?.currency_code} key={currencyKey}>{currencyList?.currency_name}</option>
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
                                <input type="text" className="form-control" placeholder="Promo Code (if you have one)" {...register('promo_code')} />
                                <ErrorMessage
                                    errors={errors}
                                    name="promo_code"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            <div className="col-md-12">
                            <div className='form-check'>
                                <input type="checkbox" className=" form-check-input" id='checkBoxTnC3' {...register('terms_and_privacy')} />
                                <label htmlFor="checkBoxTnC3">
                                    I acknowledge that I have read and agree to the <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=privacypolicy`}>Terms and Conditions</Link> & <Link onClick={() => $('.btn-close').click()} className='cursor-pointer' href={`${RouteConfig?.Pages}?slug=terms_of_service`}>Privacy Policy</Link>.
                                </label>
                                <ErrorMessage
                                    errors={errors}
                                    name="terms_and_privacy"
                                    render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                />
                            </div>
                            </div>
                            <div className="text-center"><button type="submit" className="btn btn-primary w-100 h-100">Submit</button></div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default OneClickRegistration
