import { isTokenExpired } from "../component/Utils/jwtUtils";
import { Store } from "./../redux/Store";
import axios from "axios";
import { addAuth, removeAuth } from "../redux/AuthSlice";
const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    const token = Store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("reqfff=", originalRequest, error.response.status);
    if (error.response.status == 403 && !originalRequest?.retry) {
      const res = await axios.post("http://localhost:8080/auth/refreshToken", {
        refreshToken: Store.getState().auth.refreshToken,
        accessToken: Store.getState().auth.accessToken,
      });

      if (res?.status == 200) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${res?.data?.accessToken}`,
        };
        originalRequest.retry = true;
        console.log(
          "resss",
          res?.data?.accessToken,
          Store.getState().auth.username,
          Store.getState().auth.photoUrl
        );
        Store.dispatch(
          addAuth({
            username: Store.getState().auth.username,
            photoUrl: Store.getState().auth.photoUrl,
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          })
        );
        console.log("resss333", res);
        return instance(originalRequest);
      } else return Promise.reject(error);
    }
    console.log("req=", originalRequest, error.response.status);
    return Promise.reject(error);
  }
);

export default instance;
