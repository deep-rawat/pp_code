import * as types from "../../shared/constants/constants";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

export const loginUser = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
      case types.UPDATE_USER_DATA:
      return {
        ...state,
        data: action?.data,
      };
    case types.RESET_LOGIN_USER:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_USER_PROFILE_START:
      return {
        ...state,
        data: null,
        loading: true,
      };
    case types.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.EDIT_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.RESET_EDIT_PROFILE_RESPONSE:
      return {
        ...state,
        data: null
      };
    default:
      return {
        ...state,
      data: null}
        ;
  }
};