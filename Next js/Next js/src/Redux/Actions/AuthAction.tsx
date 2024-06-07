import { Dispatch } from "react"
import { GETAPI, POSTAPI, POSTAPIFORMDATA, POSTASFORMDATA } from "../../API/Api"

import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,

    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,

    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,

    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,

    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    CMS_PAGE_REQUEST,
    CMS_PAGE_SUCCESS,
    CMS_PAGE_FAIL,

    ADD_KYC_REQUEST,
    ADD_KYC_SUCCESS,
    ADD_KYC_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    VERIFY_EMAIL_PHONE_REQUEST,
    VERIFY_EMAIL_PHONE_SUCCESS,
    VERIFY_EMAIL_PHONE_FAIL,
} from "../../Constants/AuthConstants"
import { ApiConfig, RegisterType } from "@/Config/CommonConfig"
import { getFromSessionStorage, renderFormData } from "@/utils/Helper"

export const UserLoginAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: SIGNIN_REQUEST })

        let data = await POSTAPI(ApiConfig?.Login, payload)

        if (data && data.status === true) {
            localStorage.setItem('isUserLoginToken', data?.access_token);
            localStorage.setItem("UserDetails", JSON.stringify(data?.data));
            dispatch({
                type: SIGNIN_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: SIGNIN_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: SIGNUP_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const ForgotPasswordAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        let data = await POSTAPI(ApiConfig?.ForgotPassword, payload)

        if (data && data.status === true) {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const ResetPasswordAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        let data = await POSTAPI(ApiConfig?.ResetPassword, payload)

        if (data && data.status === true) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const UserRegisterAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        let toastStatus = true;
        // console.log(getFromSessionStorage('registerType'));
        if (getFromSessionStorage('registerType') === RegisterType?.OneClick) {
            toastStatus = false
        }
        dispatch({
            type: SIGNUP_REQUEST,
            data: []
        })

        let data = await POSTAPI(ApiConfig?.Register, payload, toastStatus)
        if (data && data.status == true) {
            dispatch({
                type: SIGNUP_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: SIGNUP_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: SIGNUP_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const UserLogout = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST })
        let data = await GETAPI(ApiConfig?.Logout, false)
        if (data && data.status === true) {
            dispatch({
                type: USER_LOGOUT_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: USER_LOGOUT_FAIL,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            data: []
        })
    }
}

export const UserGetProfile = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST })

        let data = await GETAPI(ApiConfig?.Profile, false)
        if (data && data.status === true) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_PROFILE_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_PROFILE_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const UserChangePassword = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: USER_CHANGE_PASSWORD_REQUEST })

        let data = await POSTAPI(ApiConfig?.ChangePassword, payload)
        if (data && data.status === true) {
            dispatch({
                type: USER_CHANGE_PASSWORD_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: USER_CHANGE_PASSWORD_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: USER_CHANGE_PASSWORD_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const UserSendMailAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        let data = await POSTAPI(ApiConfig?.SendUserMail, payload)
        if (data && data.status === true) {
            return data
        }
    } catch (error: any) {
        // console.log("Error----------------------->", error?.message)
    }
}

export const UserUpdateProfileAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        let data = await POSTAPI(ApiConfig?.UpdateProfile, payload)
        if (data && data.status === true) {
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetCmsPageAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: CMS_PAGE_REQUEST })

        let data = await GETAPI(ApiConfig?.GetCms + payload)
        if (data && data.status === true) {
            dispatch({
                type: CMS_PAGE_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: CMS_PAGE_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: CMS_PAGE_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const AddKycAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: ADD_KYC_REQUEST })

        let payloadData = await renderFormData(payload)
        let data = await POSTAPIFORMDATA(ApiConfig?.AddKyc, payloadData)
        if (data && data.status === true) {
            dispatch({
                type: ADD_KYC_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: ADD_KYC_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: ADD_KYC_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const VerifyEmailPhoneAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: VERIFY_EMAIL_PHONE_REQUEST })

        let data = await POSTAPI(ApiConfig?.VerifyEmailPhone, payload)
        if (data && data.status === true) {
            dispatch({
                type: VERIFY_EMAIL_PHONE_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: VERIFY_EMAIL_PHONE_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: VERIFY_EMAIL_PHONE_FAIL,
            error: error?.message,
            data: []
        })
    }
}