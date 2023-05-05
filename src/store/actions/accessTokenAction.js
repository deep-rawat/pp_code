import * as actionTypes from '../../shared/constants/constants';

export const setAccessToken = (data) => ({
    type: actionTypes.SET_ACCESS_TOKEN,
    data
});