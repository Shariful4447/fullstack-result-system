import axios from "axios";

import { errorsGenerator } from "../../../shared/utils";
import {
  TEACHER_AUTH_ACTION_ERROR,
  TEACHER_AUTH_ACTION_PENDING,
  TEACHER_AUTH_ACTION_SIGN_IN,
  TEACHER_AUTH_ACTION_SIGN_OUT,
  TEACHER_AUTH_REMOVE_ERROR,
} from "./types";
import { TEACHER_ROUTES } from "../../../routes/meta-data";

let logoutTimer;

export function teacherSignOut() {
  localStorage.removeItem("teacherData");
  clearTimeout(logoutTimer);
  return {
    type: TEACHER_AUTH_ACTION_SIGN_OUT,
  };
}

export function teacherAuthTimeout(duration) {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(teacherSignOut());
    }, duration);
  };
}

export function teacherSignIn(userId, password, push) {
  return async (dispatch) => {
    dispatch({
      type: TEACHER_AUTH_ACTION_PENDING,
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
          teacherId: res.data.user.userid,
          forename: res.data.user.fname,
          surname: res.data.user.lname,
          username: res.data.user.user_name,
          role: res.data.user.role,
          expiration: new Date(signOutTime).toISOString(),
          token: `Bearer ${res.data.access_token}`,
        };

        localStorage.setItem("teacherData", JSON.stringify(data));
        dispatch({
          type: TEACHER_AUTH_ACTION_SIGN_IN,
          teacher: data,
        });
        dispatch(teacherAuthTimeout(signOutTime - Date.now()));
        push(TEACHER_ROUTES.home.path);
      } else {
        dispatch({
          type: TEACHER_AUTH_ACTION_ERROR,
          error: ["Teacher login failed"],
        });
      }
    } catch (e) {
      dispatch({
        type: TEACHER_AUTH_ACTION_ERROR,
        error: errorsGenerator(e),
      });
    }
  };
}

export function teacherAutoSignIn() {
  return (dispatch) => {
    const localData = JSON.parse(localStorage.getItem("teacherData"));
    if (localData && localData.token && localData.expiration) {
      const expireTime = new Date(localData.expiration);
      if (expireTime <= new Date()) {
        dispatch(teacherSignOut());
      } else {
        dispatch({
          type: TEACHER_AUTH_ACTION_SIGN_IN,
          teacher: localData,
        });
        dispatch(
          teacherAuthTimeout(expireTime.getTime() - new Date().getTime())
        );
      }
    } else {
      dispatch(teacherSignOut());
    }
  };
}

export const teacherAuthErrorRemove = () => {
  return {
    type: TEACHER_AUTH_REMOVE_ERROR,
  };
};
