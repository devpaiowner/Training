const initialState = {
    loading: false,
    status: false,
    data: null,
    error: null,
};

// Common Reducer
export const createGetDataReducer = (prefix: any) => (state = initialState, action: any) => {

    switch (action.type) {
        case `${prefix}_RESET`:
            return {
                ...initialState,
            };
            case `${prefix}_REQUEST`:
            return {
                ...state,
                loading: true,
            };
        case `${prefix}_SUCCESS`:
            return {
                ...state,
                loading: false,
                status: true,
                data: action.payload,
            };
        case `${prefix}_FAIL`:
            return {
                ...state,
                loading: false,
                status: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
