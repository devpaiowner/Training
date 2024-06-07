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


const initialStateHome = {
    status: false,
    data: null,
    loading: false,
    error: null,
};

export const GetGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_GAME_LIST_FAIL) {
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

export const GetTopGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_TOP_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_TOP_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_TOP_GAME_LIST_FAIL) {
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
export const GetPopularGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_POPULAR_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type ===GET_POPULAR_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type ===GET_POPULAR_GAME_LIST_FAIL) {
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


export const GetLiveCasinoGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_LIVE_CASINO_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_LIVE_CASINO_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_LIVE_CASINO_GAME_LIST_FAIL) {
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



export const GetGameReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_GAME_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_GAME_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_GAME_FAIL) {
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

export const GetGameDetailsReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_GAME_DETAILS_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_GAME_DETAILS_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_GAME_DETAILS_FAIL) {
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

export const GetGameCategoryReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_GAME_CATEGORY_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_GAME_CATEGORY_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_GAME_CATEGORY_FAIL) {
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

export const GetNewGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_NEW_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_NEW_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_NEW_GAME_LIST_FAIL) {
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

export const GetTableGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_TABLE_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_TABLE_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_TABLE_GAME_LIST_FAIL) {
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

export const GetInstantGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_INSTANT_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_INSTANT_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_INSTANT_GAME_LIST_FAIL) {
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

export const GetJackpotGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_JACKPOT_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_JACKPOT_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_JACKPOT_GAME_LIST_FAIL) {
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

export const GetTvGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_TV_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_TV_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_TV_GAME_LIST_FAIL) {
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

export const GetAllGameListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_ALL_GAME_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_ALL_GAME_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_ALL_GAME_LIST_FAIL) {
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

export const SearchReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === SEARCH_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === SEARCH_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === SEARCH_FAIL) {
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

export const GetGamesLikeThisListReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_GAMES_LIKE_THIS_LIST_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_GAMES_LIKE_THIS_LIST_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_GAMES_LIKE_THIS_LIST_FAIL) {
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

export const GetLastPlayedGamesReducer = (state = initialStateHome, action: any) => {
    try {
        if (action.type === GET_LAST_PLAYED_GAMES_REQUEST) {
            return {
                ...state,
                loading: true,
            };
        }
        if (action.type === GET_LAST_PLAYED_GAMES_SUCCESS) {
            return {
                ...state,
                status: true,
                loading: false,
                data: action.data
            };
        }
        if (action.type === GET_LAST_PLAYED_GAMES_FAIL) {
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
