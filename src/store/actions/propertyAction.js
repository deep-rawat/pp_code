import * as actionTypes from '../../shared/constants/constants';

export const getPropertyData = (data) => ({
    type: actionTypes.GET_PP_DATA,
    data
});

export const createCase = (data) => ({
    type: actionTypes.CREATE_CASE,
    data
});

export const resetCaseResponse = (data) => ({
    type: actionTypes.RESET_CASE_RESPONSE,
    data
});

export const createLead = (data) => ({
    type: actionTypes.CREATE_LEAD,
    data
});

export const resetLeadResponse = (data) => ({
    type: actionTypes.RESET_LEAD_RESPONSE,
    data
});

export const createAggrement = (data) => ({
    type: actionTypes.CREATE_AGGREMENT,
    data
});

export const resetAggrementResponse = (data) => ({
    type: actionTypes.RESET_AGGREMENT_RESPONSE,
    data
});

export const uploadPropertyAction = (data) => ({
    type: actionTypes.UPLOAD_PROPERTY,
    data
});

export const resetUploadPropertyResponse = (data) => ({
    type: actionTypes.RESET_UPLOAD_PROPERTY_RESPONSE,
    data
});

export const postPropertyRequirement = (data) => ({
    type: actionTypes.POST_PROPERTY_REQUIREMENT,
    data
});

export const resetPropertyRequirementResponse = (data) => ({
    type: actionTypes.RESET_PROPERTY_REQUIREMENT_RESPONSE,
    data
});