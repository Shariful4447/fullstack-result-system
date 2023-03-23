import axios from "axios";

import { errorsGenerator } from "../../../shared/utils";
import {
  PUPIL_AUTH_ACTION_ERROR,
  PUPIL_AUTH_ACTION_PENDING,
  PUPIL_AUTH_ACTION_SIGN_IN,
  PUPIL_AUTH_ACTION_SIGN_OUT,
  PUPIL_AUTH_REMOVE_ERROR,
} from "./types";
import { USER_ROUTES } from "../../../routes/meta-data";

let logoutTimer;

export function pupilSignOut() {
  localStorage.removeItem("pupilData");
  clearTimeout(logoutTimer);
  return {
    type: PUPIL_AUTH_ACTION_SIGN_OUT,
  };
}

export function pupilAuthTimeout(duration) {
  return (dispatch) => {
    // clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      dispatch(pupilSignOut());
    }, duration);
  };
}

export function pupilSignIn(userId, password, push) {
  return async (dispatch) => {
    dispatch({
      type: PUPIL_AUTH_ACTION_PENDING,
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
          pupilId: res.data.user.userid,
          forename: res.data.user.fname,
          surname: res.data.user.lname,
          username: res.data.user.user_name,
          role: res.data.user.role,
          expiration: new Date(signOutTime).toISOString(),
          token: `Bearer ${res.data.access_token}`,
        };

        localStorage.setItem("pupilData", JSON.stringify(data));
        dispatch({
          type: PUPIL_AUTH_ACTION_SIGN_IN,
          pupil: data,
        });
        dispatch(pupilAuthTimeout(signOutTime - Date.now()));
        push(USER_ROUTES.home.path);
      } else {
        dispatch({
          type: PUPIL_AUTH_ACTION_ERROR,
          error: ["Pupil login failed"],
        });
      }
    } catch (e) {
      // console.log("Sign In Error", e);
      dispatch({
        type: PUPIL_AUTH_ACTION_ERROR,
        error: errorsGenerator(e),
      });
    }
  };
}

export function pupilAutoSignIn() {
  return (dispatch) => {
    const localData = JSON.parse(localStorage.getItem("pupilData"));
    if (localData && localData.token && localData.expiration) {
      const expireTime = new Date(localData.expiration);
      if (expireTime <= new Date()) {
        dispatch(pupilSignOut());
      } else {
        dispatch({
          type: PUPIL_AUTH_ACTION_SIGN_IN,
          pupil: localData,
        });
        dispatch(pupilAuthTimeout(expireTime.getTime() - new Date().getTime()));
      }
    } else {
      dispatch(pupilSignOut());
    }
  };
}

export const pupilAuthErrorRemove = () => {
  return {
    type: PUPIL_AUTH_REMOVE_ERROR,
  };
};
