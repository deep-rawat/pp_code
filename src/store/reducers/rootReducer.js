import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { propertyData, caseReducer, leadReducer, aggrementReducer, uploadPropertyReducer, postPropertyRequirementReducer } from "./propertyReducer";
import { loginUser, editProfileReducer } from "./loginUserReducer";
import { searchProperty } from "./searchPropertyReducer";
import { accessTokenReducer } from "./accessTokenReducer";

const persistConfig = {
    key: 'root',
    storage: storage,
  };
export default combineReducers({
  searchProperty,
  propertyData,
  loginUser: persistReducer(persistConfig, loginUser),
  caseReducer,
  leadReducer,
  aggrementReducer,
  uploadPropertyReducer,
  postPropertyRequirementReducer,
  editProfileReducer,
  accessTokenReducer
})