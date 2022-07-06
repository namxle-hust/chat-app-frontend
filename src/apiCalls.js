import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from './context/AuthActions';
import { apiRoutes, axiosHeadersObject } from "./utils-contants";


export const loginCall = async (userCredential, dispatch) => {
  // to start fetching ... or loading... state (see in AuthReducer.js)
  dispatch(LoginStart());
  try {
    let res = await axios.post(apiRoutes.login, userCredential);
    const { token, user_id } = res.data.data;
    
    res = await axios.get(apiRoutes.getUser(user_id), axiosHeadersObject(token));
    const user = res.data;
    localStorage.setItem("token", token);

    dispatch(LoginSuccess(user));
    
  } catch (err) {
    console.log(err);
    dispatch(LoginFailure());
  }
};

