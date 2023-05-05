import { setAccessToken } from "../../store/actions/accessTokenAction";
import store from "../../store/store";
import { API_URLS } from "../constants/constants";

export async function getAccessToken() {
  let res = {};
  await fetch(API_URLS.accessTokenAPI, { method: "POST" })
    .then((response) => response.json())
    .then((result) => {
      store.dispatch(setAccessToken(result));
      res = { ...result };
    })
    .catch((error) => {
      res = { ...error };
    });
    return res;
}
