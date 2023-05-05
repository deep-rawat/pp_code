import { put } from "redux-saga/effects";
import * as types from "../../shared/constants/constants";
import http from "../../shared/services/http";
export function* getPropertiesSaga(action) {
  try {
    var raw = JSON.stringify({
      username: "saurabh@gmail.com",
      password: "mM0)0987",
    });
    const response = yield http.post(types.API_URLS.propertyDataAPI, raw);
    const data = JSON.parse(response?.data);
    console.log(data)
    yield put({
      type: types.GET_PP_DATA_SUCCESS,
      data: data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_PP_DATA_FAILED,
      data: error,
    });
  }
}

export function* createCaseSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    yield put({
      type: types.CREATE_CASE_SUCCESS,
      data: response?.data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_CASE_FAILED,
      data: error,
    });
  }
}

export function* createLeadSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    yield put({
      type: types.CREATE_LEAD_SUCCESS,
      data: response?.data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_LEAD_FAILED,
      data: error,
    });
  }
}

export function* createAggrementSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    yield put({
      type: types.CREATE_AGGREMENT_SUCCESS,
      data: response?.data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_AGGREMENT_FAILED,
      data: error,
    });
  }
}

export function* uploadPropertySaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    yield put({
      type: types.UPLOAD_PROPERTY_SUCCESS,
      data: response?.data,
    });
  } catch (error) {
    yield put({
      type: types.UPLOAD_PROPERTY_FAILED,
      data: error,
    });
  }
}

export function* postPropertyRequirementSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    yield put({
      type: types.POST_PROPERTY_REQUIREMENT_SUCCESS,
      data: response?.data,
    });
  } catch (error) {
    yield put({
      type: types.POST_PROPERTY_REQUIREMENT_FAILED,
      data: error,
    });
  }
}

