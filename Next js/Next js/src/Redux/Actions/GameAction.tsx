import { POSTAPI } from "@/API/Api";
import { ApiConfig } from "@/Config/CommonConfig";
import {
    GET_GAME_SUCCESS,
    GET_GAME_REQUEST,
    GET_GAME_FAIL,
    GET_GAME_DETAILS_SUCCESS,
    GET_GAME_DETAILS_REQUEST,
    GET_GAME_DETAILS_FAIL,
    GET_GAME_LIST_SUCCESS,
    GET_GAME_LIST_REQUEST,
    GET_GAME_LIST_FAIL,
    GET_TOP_GAME_LIST_SUCCESS,
    GET_TOP_GAME_LIST_REQUEST,
    GET_TOP_GAME_LIST_FAIL,
    GET_POPULAR_GAME_LIST_SUCCESS,
    GET_POPULAR_GAME_LIST_FAIL,
    GET_POPULAR_GAME_LIST_REQUEST,
    GET_LIVE_CASINO_GAME_LIST_SUCCESS,
    GET_LIVE_CASINO_GAME_LIST_REQUEST,
    GET_LIVE_CASINO_GAME_LIST_FAIL,
    GET_GAME_CATEGORY_SUCCESS,
    GET_GAME_CATEGORY_REQUEST,
    GET_GAME_CATEGORY_FAIL,
    GET_NEW_GAME_LIST_SUCCESS,
    GET_NEW_GAME_LIST_REQUEST,
    GET_NEW_GAME_LIST_FAIL,
    GET_TABLE_GAME_LIST_SUCCESS,
    GET_TABLE_GAME_LIST_REQUEST,
    GET_TABLE_GAME_LIST_FAIL,
    GET_INSTANT_GAME_LIST_SUCCESS,
    GET_INSTANT_GAME_LIST_REQUEST,
    GET_INSTANT_GAME_LIST_FAIL,
    GET_JACKPOT_GAME_LIST_SUCCESS,
    GET_JACKPOT_GAME_LIST_REQUEST,
    GET_JACKPOT_GAME_LIST_FAIL,
    GET_TV_GAME_LIST_SUCCESS,
    GET_TV_GAME_LIST_REQUEST,
    GET_TV_GAME_LIST_FAIL,
    GET_ALL_GAME_LIST_SUCCESS,
    GET_ALL_GAME_LIST_REQUEST,
    GET_ALL_GAME_LIST_FAIL,
    SEARCH_SUCCESS,
    SEARCH_REQUEST,
    SEARCH_FAIL,
    GET_GAMES_LIKE_THIS_LIST_SUCCESS,
    GET_GAMES_LIKE_THIS_LIST_REQUEST,
    GET_GAMES_LIKE_THIS_LIST_FAIL,
    GET_LAST_PLAYED_GAMES_SUCCESS,
    GET_LAST_PLAYED_GAMES_REQUEST,
    GET_LAST_PLAYED_GAMES_FAIL,
} from "@/Constants/GameConstants";
import { Dispatch } from "react";

export const GetGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetPopularGamesAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_POPULAR_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_POPULAR_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_POPULAR_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_POPULAR_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetTopGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_TOP_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_TOP_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_TOP_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_TOP_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetLiveCasinoGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_LIVE_CASINO_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_LIVE_CASINO_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_LIVE_CASINO_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_LIVE_CASINO_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetGameAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_GAME_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Game, payload)
        if (data) {
            dispatch({
                type: GET_GAME_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_GAME_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_GAME_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetGameDetailsAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_GAME_DETAILS_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Game, payload)
        if (data) {
            dispatch({
                type: GET_GAME_DETAILS_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_GAME_DETAILS_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_GAME_DETAILS_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetGameCategoryAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_GAME_CATEGORY_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameCategory, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_GAME_CATEGORY_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_GAME_CATEGORY_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_GAME_CATEGORY_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetNewGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_NEW_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_NEW_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_NEW_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_NEW_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetTableGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_TABLE_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_TABLE_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_TABLE_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_TABLE_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetInstantGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_INSTANT_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_INSTANT_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_INSTANT_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_INSTANT_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}


export const GetJackpotGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_JACKPOT_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_JACKPOT_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_JACKPOT_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_JACKPOT_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetTvGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_TV_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.ProviderGames, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_TV_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_TV_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_TV_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetAllGameListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_ALL_GAME_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_ALL_GAME_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_ALL_GAME_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_ALL_GAME_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const SearchAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: SEARCH_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.Search, payload)
        if (data && data.status == true) {
            dispatch({
                type: SEARCH_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: SEARCH_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: SEARCH_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetGamesLikeThisListAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_GAMES_LIKE_THIS_LIST_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GameList, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_GAMES_LIKE_THIS_LIST_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_GAMES_LIKE_THIS_LIST_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_GAMES_LIKE_THIS_LIST_FAIL,
            error: error?.message,
            data: []
        })
    }
}

export const GetLastPlayedGamesAction = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: GET_LAST_PLAYED_GAMES_REQUEST,
            data: []
        })
        let data = await POSTAPI(ApiConfig?.GamesHistory, payload)
        if (data && data.status == true) {
            dispatch({
                type: GET_LAST_PLAYED_GAMES_SUCCESS,
                data: data
            })
        } else {
            dispatch({
                type: GET_LAST_PLAYED_GAMES_FAIL,
                error: data?.message,
                data: []
            })
        }
    } catch (error: any) {
        dispatch({
            type: GET_LAST_PLAYED_GAMES_FAIL,
            error: error?.message,
            data: []
        })
    }
}
