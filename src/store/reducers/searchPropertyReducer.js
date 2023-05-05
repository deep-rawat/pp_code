import { SEARCH_PROPERTY, RESET_SEARCH_PROPERTY } from "../../shared/constants/constants";

const initialState = {
    searchParams: null
}
export const searchProperty = (state = initialState, action) => {
    switch(action.type){
        case SEARCH_PROPERTY:
            return {
                searchParams: action?.data
            };
        case RESET_SEARCH_PROPERTY: 
            return {
                searchParams: null
            };
        default:
            return state;
    }
}