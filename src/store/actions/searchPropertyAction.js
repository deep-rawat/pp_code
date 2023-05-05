import * as actionTypes from '../../shared/constants/constants';

export const searchProperty = (data) => ({
    type: actionTypes.SEARCH_PROPERTY,
    data
});

export const resetSearchProperty = (data) => ({
    type: actionTypes.RESET_SEARCH_PROPERTY,
    data
})