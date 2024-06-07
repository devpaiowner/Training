import { Dispatch } from "react"
import { GETAPI, POSTAPI, POSTAPIFORMDATA } from "../../api/Api";
import { CODE } from "../../constants/Constants";
import { renderFormData } from "../../utils/Helper";
// Common For Get Api Action
export const createGetDataAction = (typePrefix: string, apiEndpoint: string, payload: any, toastStatus: any = false) => async (dispatch: Dispatch<any>) => {
    if (payload === 'RESET') {
        dispatch({ type: `${typePrefix}_RESET` });
    } else {
        try {
            dispatch({ type: `${typePrefix}_REQUEST` });
            let data = await GETAPI(apiEndpoint, payload, toastStatus);
            if (data && data?.status == true) {
                dispatch({
                    type: `${typePrefix}_SUCCESS`,
                    payload: data
                });
            } else {
                dispatch({
                    type: `${typePrefix}_FAIL`,
                    payload: data
                });
            }
        } catch (error: any) {
            dispatch({
                type: `${typePrefix}_FAIL`,
                payload: error.message
            });
        }
    }
};
// // Common For Post Api Action
export const createPostDataAction = (typePrefix: string, apiEndpoint: string, payload: any, toastStatus: any = false) => async (dispatch: Dispatch<any>) => {
    if (payload === 'RESET') {
        dispatch({ type: `${typePrefix}_RESET` });
    } else {
        try {
            dispatch({ type: `${typePrefix}_REQUEST` });
            let data = await POSTAPI(apiEndpoint, payload, toastStatus);
            if (data && data?.status == true) {
                dispatch({
                    type: `${typePrefix}_SUCCESS`,
                    payload: data
                });
            } else {
                dispatch({
                    type: `${typePrefix}_FAIL`,
                    payload: data
                });
            }
        } catch (error: any) {
            dispatch({
                type: `${typePrefix}_FAIL`,
                payload: error.message
            });
        }
    }
};
// Common Form Action
export const createFormDataAction = (typePrefix: string, apiEndpoint: string, payload: any, toastStatus: boolean = false) => async (dispatch: Dispatch<any>) => {
    if (payload === 'RESET') {
        dispatch({ type: `${typePrefix}_RESET` });
    } else {
        try {
            dispatch({ type: `${typePrefix}_REQUEST` });
            let payloadData = await renderFormData(payload);
            let data = await POSTAPIFORMDATA(apiEndpoint, payloadData, toastStatus);

            if (data && (data?.status === true || data?.status === 'true')) {
                dispatch({
                    type: `${typePrefix}_SUCCESS`,
                    payload: data
                });
            } else {
                dispatch({
                    type: `${typePrefix}_FAIL`,
                    payload: data
                });
            }
        } catch (error: any) {
            dispatch({
                type: `${typePrefix}_FAIL`,
                payload: error.message
            });
        }
    }
};

export const dataAction = (typePrefix: string, payload: any,) => async (dispatch: Dispatch<any>) => {
    if (payload === 'RESET') {
        dispatch({ type: `${typePrefix}_RESET` });
    } else {
        try {
            dispatch({
                type: `${typePrefix}_SUCCESS`,
                payload: payload
            });
        } catch (error: any) {
            dispatch({
                type: `${typePrefix}_FAIL`,
                payload: error.message
            });
        }
    }
}