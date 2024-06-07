import { getFromSessionStorage, removeFromSessionStorage } from "@/utils/Helper";
import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,

    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,

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

const initialStateAuth = {
    status: false,
    data: null,
    loading: false,
    error: null,
};

export const UserLoginReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === SIGNIN_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === SIGNIN_SUCCESS) {
            const loginType = getFromSessionStorage('loginType')
            removeFromSessionStorage('loginType')
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data,
                login_type: loginType
            };
        }
        if (action.type === SIGNIN_FAIL) {
            removeFromSessionStorage('loginType')
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {

    }
    return state;
}

export const ForgotPasswordReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === FORGOT_PASSWORD_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === FORGOT_PASSWORD_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data,
            };
        }
        if (action.type === FORGOT_PASSWORD_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {

    }
    return state;
}

export const ResetPasswordReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === RESET_PASSWORD_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === RESET_PASSWORD_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data,
            };
        }
        if (action.type === RESET_PASSWORD_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {

    }
    return state;
}

export const UserRegisteredReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === SIGNUP_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === SIGNUP_SUCCESS) {
            const registerType = getFromSessionStorage('registerType')
            removeFromSessionStorage('registerType')
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data,
                register_type: registerType
            };
        }
        if (action.type === SIGNUP_FAIL) {
            removeFromSessionStorage('registerType')
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;
}

export const UserLogoutReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === USER_LOGOUT_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === USER_LOGOUT_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === USER_LOGOUT_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;
}

export const UserGetProfileReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === GET_PROFILE_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_PROFILE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_PROFILE_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;
}

export const UserChangePasswordReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === USER_CHANGE_PASSWORD_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === USER_CHANGE_PASSWORD_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === USER_CHANGE_PASSWORD_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;
}

export const UserUpdateProfileReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === USER_UPDATE_PROFILE_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === USER_UPDATE_PROFILE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === USER_UPDATE_PROFILE_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;

}

export const GetCmsPageReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === CMS_PAGE_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === CMS_PAGE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === CMS_PAGE_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;

}

export const AddKycReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === ADD_KYC_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === ADD_KYC_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === ADD_KYC_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;

}

export const VerifyEmailPhoneReducer = (state = initialStateAuth, action: any) => {
    try {
        if (action.type === VERIFY_EMAIL_PHONE_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === VERIFY_EMAIL_PHONE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === VERIFY_EMAIL_PHONE_FAIL) {
            return {
                ...state,
                status: false,
                loading: false,
                data: action.data
            };
        }
    } catch (error) {
    }
    return state;

}