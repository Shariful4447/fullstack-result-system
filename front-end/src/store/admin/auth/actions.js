import axios from "axios";

import {
  ADMIN_AUTH_ACTION_ERROR,
  ADMIN_AUTH_ACTION_PENDING,
  ADMIN_AUTH_ACTION_SIGN_IN,
  ADMIN_AUTH_ACTION_SIGN_OUT,
  ADMIN_AUTH_REMOVE_ERROR,
} from "./types";
import { ADMIN_ROUTES } from "../../../routes/meta-data";
import { errorsGenerator } from "../../../shared/utils";

let logoutTimer;

export function adminSignOut() {
  localStorage.removeItem("adminData");
  clearTimeout(logoutTimer);
  return {
    type: ADMIN_AUTH_ACTION_SIGN_OUT,
  };
}

export function adminAuthTimeout(duration) {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(adminSignOut());
    }, duration);
  };
}

export function adminSignIn(userId, password, push) {
  return async (dispatch) => {
    dispatch({
      type: ADMIN_AUTH_ACTION_PENDING,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST_NAME}/login`,
        { userid: userId, password: password }
      );
      if (res.status === 200) {
        const signOutTime =
          new Date().getTime() + parseInt(res.data.expires_in) * 1000;
        const data = {
          id: res.data.user.id,
          adminId: res.data.user.userid,
          forename: res.data.user.fname,
          surname: res.data.user.lname,
          username: res.data.user.user_name,
          role: res.data.user.role,
          expiration: new Date(signOutTime).toISOString(),
          token: `Bearer ${res.data.access_token}`,
        };
        localStorage.setItem("adminData", JSON.stringify(data));
        dispatch({
          type: ADMIN_AUTH_ACTION_SIGN_IN,
          admin: data,
        });
        dispatch(adminAuthTimeout(signOutTime - Date.now()));
        push(ADMIN_ROUTES.dashboard.path);
      } else {
        dispatch({
          type: ADMIN_AUTH_ACTION_ERROR,
          error: ["Admin login failed"],
        });
      }
    } catch (e) {
      // console.log("Sign In Error", e);
      dispatch({
        type: ADMIN_AUTH_ACTION_ERROR,
        error: errorsGenerator(e),
      });
    }
  };
}

export function adminAutoSignIn() {
  return (dispatch) => {
    const localData = JSON.parse(localStorage.getItem("adminData"));
    if (localData && localData.token && localData.expiration) {
      const expireTime = new Date(localData.expiration);
      if (expireTime <= new Date()) {
        dispatch(adminSignOut());
      } else {
        dispatch({
          type: ADMIN_AUTH_ACTION_SIGN_IN,
          admin: localData,
        });
        dispatch(adminAuthTimeout(expireTime.getTime() - new Date().getTime()));
      }
    } else {
      dispatch(adminSignOut());
    }
  };
}

export const adminAuthErrorRemove = () => {
  return {
    type: ADMIN_AUTH_REMOVE_ERROR,
  };
};
