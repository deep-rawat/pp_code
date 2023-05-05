import * as types from "../../shared/constants/constants";

export const accessTokenReducer = (state = null, action) => {
    switch(action.type){
        case types.SET_ACCESS_TOKEN:
            return {
                ...action?.data
            };
        default:
            return state;
    }
}