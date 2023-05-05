import * as types from "../../shared/constants/constants";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const propertyData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PP_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PP_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data || {},
      };
    case types.GET_PP_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    default:
      return state;
  }
};

export const caseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CASE:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.CREATE_CASE_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    case types.RESET_CASE_RESPONSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_LEAD:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_LEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.CREATE_LEAD_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    case types.RESET_LEAD_RESPONSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const aggrementReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_AGGREMENT:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_AGGREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.CREATE_AGGREMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    case types.RESET_AGGREMENT_RESPONSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const uploadPropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_PROPERTY:
      return {
        ...state,
        loading: true,
      };
    case types.UPLOAD_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.UPLOAD_PROPERTY_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    case types.RESET_UPLOAD_PROPERTY_RESPONSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const postPropertyRequirementReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_PROPERTY_REQUIREMENT:
      return {
        ...state,
        loading: true,
      };
    case types.POST_PROPERTY_REQUIREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case types.POST_PROPERTY_REQUIREMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action?.data,
      };
    case types.RESET_PROPERTY_REQUIREMENT_RESPONSE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
