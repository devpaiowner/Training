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

   USER_WALLET_BALANCE_UPDATE_SUCCESS,
   USER_WALLET_BALANCE_UPDATE_REQUEST,
   USER_WALLET_BALANCE_UPDATE_FAIL,

   NOTIFICATION_UPDATE_SOCKET_SUCCESS,
   NOTIFICATION_UPDATE_SOCKET_REQUEST,
   NOTIFICATION_UPDATE_SOCKET_FAIL,

} from "@/Constants/HomeConstants";


const initialStateHome = {
    status: false,
    data: null,
    loading: false,
    error: null,
};

export const GetHomeListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_HOME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_HOME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_HOME_LIST_FAIL) {
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

export const GetHomeBannerListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_HOME_BANNER_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_HOME_BANNER_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_HOME_BANNER_LIST_FAIL) {
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

export const GetProviderListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_PROVIDER_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_PROVIDER_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_PROVIDER_LIST_FAIL) {
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

export const GetProviderGamesListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_PROVIDER_GAMES_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_PROVIDER_GAMES_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_PROVIDER_GAMES_LIST_FAIL) {
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

export const GetNotificationReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_NOTIFICATIONS_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_NOTIFICATIONS_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_NOTIFICATIONS_FAIL) {
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

export const GetPromotionsReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_PROMOTIONS_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_PROMOTIONS_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_PROMOTIONS_LIST_FAIL) {
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

export const UserWalletBalanceUpdateSocketReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === USER_WALLET_BALANCE_UPDATE_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === USER_WALLET_BALANCE_UPDATE_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === USER_WALLET_BALANCE_UPDATE_FAIL) {
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

export const NotificationGetSocketReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === NOTIFICATION_UPDATE_SOCKET_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === NOTIFICATION_UPDATE_SOCKET_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === NOTIFICATION_UPDATE_SOCKET_FAIL) {
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