const initialState = {
    allProducts: null,
    loading: false,
    error: null

}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQ_GET_ALL_PRODUCTS":
            return {
                ...state,
                loading: true
            };
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                allProducts: action.payload,
                    loading: false,
            };
        case "GET_ALL_PRODUCTS_FAIL":
            return {
                ...state,
                error: action.error,
                    loading: false,
            };
        case "FIRE_EVENT_EDIT_PRODUCTS":
            return {
                ...state,
                allProducts: [],
                    loading: false,
            };
        default:
            return state;
    }
}

export default productsReducer;