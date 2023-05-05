import { put } from "redux-saga/effects";
import * as types from "../../shared/constants/constants";
import http from "../../shared/services/http";

export function* userLoginSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    const data = JSON.parse(response?.data);
    console.log(data);
    yield put({
      type: types.LOGIN_USER_SUCCESS,
      data: data?.loginUserContactObjData,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.LOGIN_USER_FAILED,
      data: error,
    });
  }
}

export function* editProfileSaga(action) {
  try {
    const response = yield http.post(types.API_URLS.propertyDataAPI, action?.data);
    const data = JSON.parse(response?.data);
    console.log(response);
    yield put({
      type: types.EDIT_USER_PROFILE_SUCCESS,
      data: data?.loginUserContactObjData,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.EDIT_USER_PROFILE_FAILED,
      data: error,
    });
  }
}
