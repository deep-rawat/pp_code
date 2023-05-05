import axios from 'axios';
import { getAccessToken } from './accessTokenService';
import store from '../../store/store';

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
      },
});

const requestHandler = async (request) => {
     
     const accessToken = store?.getState()?.accessTokenReducer || await getAccessToken();
    // if (request.url !== '/login') {
    //         const activeUser = store.getState()?.userLogin?.data?.data;
    //     if(activeUser)
    //         request.headers = { ...request.headers, Authorization: 'Bearer ' + activeUser?.accessToken };
    //   }
      request.headers = { ...request.headers, Authorization: `Bearer ${accessToken.access_token}`};
       console.log(request)
      return request;
}
const responseHandler = (response) => {
    return response;
}
const errorHandler = (error) => {
    console.log(error);
    const { config: originalRequest, response: { status } } = error;
    return error;
}
http.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => responseHandler(error)
  );
  
  http.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default http;