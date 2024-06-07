import { Dispatch } from "react";
import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAIL,

    WITHDRAWAL_DETAILS_REQUEST,
    WITHDRAWAL_DETAILS_SUCCESS,
    WITHDRAWAL_DETAILS_FAIL,

    DEPOSITE_REQUEST,
    DEPOSITE_SUCCESS,
    DEPOSITE_FAIL,

    USER_DEPOSITE_DETAILS_REQUEST,
    USER_DEPOSITE_DETAILS_SUCCESS,
    USER_DEPOSITE_DETAILS_FAIL,

    GENERATE_RANDOM_UPI_FAIL,
    GENERATE_RANDOM_UPI_REQUEST,
    GENERATE_RANDOM_UPI_SUCCESS,

    TRANSACTION_HISTORY_FAIL,
    TRANSACTION_HISTORY_REQUEST,
    TRANSACTION_HISTORY_SUCCESS,
    GET_PAYMENT_UPI_REQUEST,
    GET_PAYMENT_UPI_SUCCESS,
    GET_PAYMENT_UPI_FAIL,

} from "../../Constants/PaymentConstants";
import { GETAPI, POSTAPI } from "@/API/Api";
import { ApiConfig } from "@/Config/CommonConfig";

export const WithdrawAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: WITHDRAWAL_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Withdraw, payload)
        if (data && data.status == true) {
            dispatch({
                type: WITHDRAWAL_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: WITHDRAWAL_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: WITHDRAWAL_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const WithdrawalDetailsAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: WITHDRAWAL_DETAILS_SUCCESS,
            data: payload
        })

    } catch (error: any) {
        dispatch({
            type: WITHDRAWAL_DETAILS_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const DepositeAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: DEPOSITE_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Deposite, payload)
        if (data && data.status == true) {
            dispatch({
                type: DEPOSITE_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: DEPOSITE_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: DEPOSITE_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const UserDepositeDetailsAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: USER_DEPOSITE_DETAILS_SUCCESS,
            data: payload
        })

    } catch (error: any) {
        dispatch({
            type: USER_DEPOSITE_DETAILS_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GenerateRandomUpiAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GENERATE_RANDOM_UPI_REQUEST,
            data: []
        })
        // let data = await POSTAPI(ApiConfig?.GenerateRandomUpi, payload)
        let data = await GETAPI(ApiConfig?.GenerateRandomUpi, payload)
        if (data && data.status == true) {
            dispatch({
                type: GENERATE_RANDOM_UPI_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GENERATE_RANDOM_UPI_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GENERATE_RANDOM_UPI_FAIL,
            error: error?.message,
            data: []
        })
    }
}
export const GetPaymentUpiAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_PAYMENT_UPI_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GetPaymentUpi, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_PAYMENT_UPI_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_PAYMENT_UPI_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_PAYMENT_UPI_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const TransactionHistoryAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: TRANSACTION_HISTORY_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.TransactionHistory, payload)
        if (data && data.status == true) {
            dispatch({
                type: TRANSACTION_HISTORY_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: TRANSACTION_HISTORY_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: TRANSACTION_HISTORY_FAIL,
            error: error?.message,
            data: []
        })
    }
}
