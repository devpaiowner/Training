import { GETAPI, POSTAPI } from "@/API/Api";
import { ApiConfig } from "@/Config/CommonConfig";
import {
    GET_HOME_LIST_SUCCESS,
    GET_HOME_LIST_REQUEST,
    GET_HOME_LIST_FAIL,

    GET_HOME_BANNER_LIST_SUCCESS,
    GET_HOME_BANNER_LIST_REQUEST,
    GET_HOME_BANNER_LIST_FAIL,

    GET_PROVIDER_LIST_SUCCESS,
    GET_PROVIDER_LIST_REQUEST,
    GET_PROVIDER_LIST_FAIL,

    GET_PROVIDER_GAMES_LIST_SUCCESS,
    GET_PROVIDER_GAMES_LIST_REQUEST,
    GET_PROVIDER_GAMES_LIST_FAIL,

    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_FAIL,

    GET_PROMOTIONS_LIST_SUCCESS,
    GET_PROMOTIONS_LIST_REQUEST,
    GET_PROMOTIONS_LIST_FAIL,
} from "@/Constants/HomeConstants";
import { Dispatch } from "react";

export const GetHomeListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_HOME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.HomeList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_HOME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_HOME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_HOME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetHomeBannerListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_HOME_BANNER_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Banner, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_HOME_BANNER_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_HOME_BANNER_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_HOME_BANNER_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetProviderListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_PROVIDER_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Provider, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_PROVIDER_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_PROVIDER_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_PROVIDER_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetProviderGamesListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_PROVIDER_GAMES_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.ProviderGames, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_PROVIDER_GAMES_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_PROVIDER_GAMES_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_PROVIDER_GAMES_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetNotificationsAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_NOTIFICATIONS_REQUEST,
            data: []
        })
        let data = await GETAPI(ApiConfig?.NotificationList, false)
        if (data && data.status == true) {
            dispatch({
                type: GET_NOTIFICATIONS_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_NOTIFICATIONS_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetPromotionsAction = (payload: any) => async (dispatch: Dispatch<any>) => {    
    try {
        dispatch({
            type: GET_PROMOTIONS_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.PromotionsList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_PROMOTIONS_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_PROMOTIONS_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_PROMOTIONS_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}
