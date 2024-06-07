import axios from "axios";
import { toast } from "react-toastify";
import { PLAYXCHIP_APP_API_BASE_URL, url } from "../Config/Config";
import { CODE, VALIDATION_MESSAGE, isUserLoginToken as userToken } from "../Constants/Constants";
import { RouteConfig } from "@/Config/CommonConfig";

let isUserLoginToken;
if (typeof window !== 'undefined') {
    isUserLoginToken = window.localStorage.getItem(userToken)
}
const apiinstance = axios.create({
    baseURL: PLAYXCHIP_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "Authorization": isUserLoginToken ? "Bearer " + isUserLoginToken : "",
    }
})



const apiinstanceFormData = axios.create({
    baseURL: PLAYXCHIP_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "Authorization": isUserLoginToken ? "Bearer " + isUserLoginToken : "",
    }
})

export const POSTAPI = (URL: string, params: any, toastStatus: any = true) => {
    const promise = apiinstance.post(URL, params, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {
        if (response?.status === CODE?.OK_CODE || response?.status === CODE?.CREATED) {

            if (response?.data?.status) {
                if (toastStatus) { toast.success(response.data?.message) }

                //toast.success(response.data?.message);
                return response.data;
            }
            else {

                // toast.error(response.data?.message);
                if (toastStatus) { toast.error(response.data?.message) }
                return response.data;
            }
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {
            toast.error(response.data?.message ? response.data?.message : response.data?.custom_message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            toast.error(response.data?.message);

            setTimeout(() => {
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    window.location.href = url + RouteConfig?.Home
                }
            }, 2000);
        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {

            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    }).catch((error) => {

        // return error;   
        toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    });
    return dataPromise;
};

export const PUTAPI = (URL: string, params: any, toastStatus: any = true) => {
    const promise = apiinstanceFormData.put(URL, params, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {

        if (response?.status === CODE?.OK_CODE || response?.status === CODE?.CREATED) {

            if (response?.data?.statuspost) {
                if (toastStatus) { toast.success(response.data?.message) }

                //toast.success(response.data?.message);
                return response.data;
            }
            else {

                // toast.error(response.data?.message);
                if (toastStatus) { toast.success(response.data?.message) }
                return response.data;
            }
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {

            toast.error(response.data?.message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            toast.error(response.data?.message);

            setTimeout(() => {
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    window.location.href = url + RouteConfig?.Home
                }
            }, 2000);
        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {

            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    }).catch((error) => {

        // return error;   
        toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    });
    return dataPromise;
};

export const POSTAPIFORMDATA = (URL: string, params: any, toastStatus: any = true) => {
    const promise = apiinstanceFormData.post(URL, params, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {

        if (response?.status === CODE?.OK_CODE || response?.status === CODE?.CREATED) {

            if (toastStatus) { toast.success(response.data?.message) }
            if (response?.data?.status) {

                // toast.success(response.data?.message);
                return response.data;
            }
            else {

                toast.error(response.data?.message);
                return response.data;
            }
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {

            toast.error(response.data?.message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {

            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    }).catch((error) => {

        // return error;   
        toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    });
    return dataPromise;
};

export const POSTASFORMDATA = (URL: string, params: any, toastStatus: any = true) => {
    const promise = apiinstanceFormData.post(URL, params, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {

        if (response?.status === CODE?.OK_CODE || response?.status === CODE?.CREATED) {

            // if (toastStatus) { toast.success(response.data?.message) }
            if (response?.data?.status) {

                toast.success(response.data?.message);
                return response.data;
            }
            else {

                toast.error(response.data?.message);
                return response.data;
            }
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {

            toast.error(response.data?.message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {

            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    }).catch((error) => {

        // return error;   
        toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    });
    return dataPromise;
};


export const GETAPI = (URL: string, toastStatus: any = true) => {
    // const promise = apiinstance.get(URL, params)
    const promise = apiinstance.get(URL, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {

        if (response?.status === 200 || response?.status === 201) {
            if (toastStatus) { toast.success(response.data?.message) }
            return response.data;
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {
            toast.error(response.data?.message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            toast.error(response.data?.message);
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    window.location.href = url + RouteConfig?.Home
                }
            }, 2000);

        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {
            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    })
    return dataPromise;
}

export const DELETEAPI = (URL: string, params: any = {}) => {
    // const promise = apiinstance.get(URL, params)
    const promise = apiinstance.delete(URL, {
        validateStatus: status => status >= 200 && status < 600
    });
    const dataPromise = promise.then((response) => response).then((response) => {

        if (response?.status === 200 || response?.status === 201) {
            //  toast.success(response.data?.message)
            return response.data;
        }
        else if (response?.status === CODE?.BAD_REQUEST_CODE) {
            toast.error(response.data?.message);
            return response?.data;
        }
        else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
            toast.error(response.data?.message);
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    window.location.href = url + RouteConfig?.Home
                }
            }, 2000);

        }
        else if (response?.status === CODE?.EXPIRE_ACCESSTOKEN_CODE) {
            // toast.error(response.data?.message);
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = url + RouteConfig?.Home
            }
        }
        else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else if (response?.status === CODE?.VALIDATION_CODE) {

            toast.error(response.data?.message);
            return response?.data;

        }
        else {
            toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
        }
    })
    return dataPromise;
}
