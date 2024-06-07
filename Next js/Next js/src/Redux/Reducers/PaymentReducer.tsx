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

const initialStatePayment = {
    status: false,
    data: null,
    loading: false,
    error: null,
};

export const WithdrawReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === WITHDRAWAL_REQUEST) {

            return {
                ...state,
                loading: true,
            };
        }

        if (action.type === WITHDRAWAL_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === WITHDRAWAL_FAIL) {
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

export const DepositeReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === DEPOSITE_REQUEST) {

            return {
                ...state,
                loading: true,
            };
        }

        if (action.type === DEPOSITE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === DEPOSITE_FAIL) {
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

export const WithdrawDetailsReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === WITHDRAWAL_DETAILS_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === WITHDRAWAL_DETAILS_FAIL) {
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

export const UserDepositeDetailsReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === USER_DEPOSITE_DETAILS_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === USER_DEPOSITE_DETAILS_FAIL) {
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

export const GenerateRandomUpiReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === GENERATE_RANDOM_UPI_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GENERATE_RANDOM_UPI_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GENERATE_RANDOM_UPI_FAIL) {
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

export const GetPaymentUpiReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === GET_PAYMENT_UPI_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_PAYMENT_UPI_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_PAYMENT_UPI_FAIL) {
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

export const TransactionHistoryReducer = (state = initialStatePayment, action: any) => {
    try {
        if (action.type === TRANSACTION_HISTORY_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === TRANSACTION_HISTORY_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === TRANSACTION_HISTORY_FAIL) {
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

