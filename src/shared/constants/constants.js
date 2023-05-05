export const API_URLS = {
    //accessTokenAPI: 'http://localhost:4000/getAccessToken', //comment this when project is on production
    //accessTokenAPI: '/getAccessToken', //comment this when project is on local
    accessTokenAPI: 'https://property-portal.herokuapp.com/getAccessToken', //comment this when project is on local
    propertyDataAPI: 'https://cloudie--pp.sandbox.my.salesforce.com/services/apexrest/PP_Property_Portal_API'
};

export const GET_PP_DATA = 'GET_PP_DATA';
export const GET_PP_DATA_SUCCESS = 'GET_PP_DATA_SUCCESS';
export const GET_PP_DATA_FAILED = 'GET_PP_DATA_FAILED';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const SET_PROPERTIES = 'SET_PROPERTIES';
export const SET_CASES = 'SET_CASES';
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const RESET_LOGIN_USER = 'RESET_LOGIN_USER';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export const EDIT_USER_PROFILE_START = 'EDIT_USER_PROFILE_START';
export const EDIT_USER_PROFILE_SUCCESS = 'EDIT_USER_PROFILE_SUCCESS';
export const EDIT_USER_PROFILE_FAILED = 'EDIT_USER_PROFILE_FAILED';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const RESET_EDIT_PROFILE_RESPONSE = 'RESET_EDIT_PROFILE_RESPONSE';

export const CREATE_CASE = 'CREATE_CASE';
export const CREATE_CASE_SUCCESS = 'CREATE_CASE_SUCCESS';
export const CREATE_CASE_FAILED = 'CREATE_CASE_FAILED';
export const RESET_CASE_RESPONSE = 'RESET_CASE_RESPONSE';

export const CREATE_LEAD = 'CREATE_LEAD';
export const CREATE_LEAD_SUCCESS = 'CREATE_LEAD_SUCCESS';
export const CREATE_LEAD_FAILED = 'CREATE_LEAD_FAILED';
export const RESET_LEAD_RESPONSE = 'RESET_LEAD_RESPONSE';

export const CREATE_AGGREMENT = 'CREATE_LEAD';
export const CREATE_AGGREMENT_SUCCESS = 'CREATE_AGGREMENT_SUCCESS';
export const CREATE_AGGREMENT_FAILED = 'CREATE_AGGREMENT_FAILED';
export const RESET_AGGREMENT_RESPONSE = 'RESET_AGGREMENT_RESPONSE';

export const UPLOAD_PROPERTY = 'UPLOAD_PROPERTY';
export const UPLOAD_PROPERTY_SUCCESS = 'UPLOAD_PROPERTY_SUCCESS';
export const UPLOAD_PROPERTY_FAILED = 'UPLOAD_PROPERTY_FAILED';
export const RESET_UPLOAD_PROPERTY_RESPONSE = 'RESET_UPLOAD_PROPERTY_RESPONSE';

export const POST_PROPERTY_REQUIREMENT = 'POST_PROPERTY_REQUIREMENT';
export const POST_PROPERTY_REQUIREMENT_SUCCESS = 'POST_PROPERTY_REQUIREMENT_SUCCESS';
export const POST_PROPERTY_REQUIREMENT_FAILED = 'POST_PROPERTY_REQUIREMENT_FAILED';
export const RESET_PROPERTY_REQUIREMENT_RESPONSE = 'RESET_PROPERTY_REQUIREMENT_RESPONSE';

export const SEARCH_PROPERTY = 'SEARCH_PROPERTY';
export const RESET_SEARCH_PROPERTY = 'RESET_SEARCH_PROPERTY';