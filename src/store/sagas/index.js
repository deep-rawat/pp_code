import { all, takeLatest, fork } from "redux-saga/effects";
import * as types from "../../shared/constants/constants";
import { userLoginSaga, editProfileSaga } from "./loginSaga";
import { getPropertiesSaga, createCaseSaga, createLeadSaga, createAggrementSaga, uploadPropertySaga, postPropertyRequirementSaga } from "./propertySaga";

export function* onLoadRecipe() {
  yield takeLatest(types.LOGIN_USER_START, userLoginSaga);
  yield takeLatest(types.GET_PP_DATA, getPropertiesSaga);
  yield takeLatest(types.CREATE_CASE, createCaseSaga);
  yield takeLatest(types.CREATE_LEAD, createLeadSaga);
  yield takeLatest(types.CREATE_AGGREMENT, createAggrementSaga);
  yield takeLatest(types.UPLOAD_PROPERTY, uploadPropertySaga);
  yield takeLatest(types.POST_PROPERTY_REQUIREMENT, postPropertyRequirementSaga);
  yield takeLatest(types.EDIT_USER_PROFILE_START, editProfileSaga);
}
const itemsListSaga = [fork(onLoadRecipe)];
export default function* rootSaga() {
  yield all([...itemsListSaga]);
}
