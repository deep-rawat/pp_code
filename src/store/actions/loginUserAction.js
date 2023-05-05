import * as actionTypes from '../../shared/constants/constants';

export const loginUser = (data) => ({
    type: actionTypes.LOGIN_USER_START,
    data
});

export const resetLoginUser = (data) => ({
    type: actionTypes.RESET_LOGIN_USER,
    data
});

export const editProfileAction = (data) => ({
    type: actionTypes.EDIT_USER_PROFILE_START,
    data
});

export const updateUserDataAction = (data) => ({
    type: actionTypes.UPDATE_USER_DATA,
    data
});

export const resetEditProfileResponse = (data) => ({
    type: actionTypes.RESET_EDIT_PROFILE_RESPONSE,
    data
});