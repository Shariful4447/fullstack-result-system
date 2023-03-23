import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../../shared/utils";
import {
  UTILITY_SUBJECT_OPTIONS_ERROR,
  UTILITY_SUBJECT_OPTIONS_FETCHED,
  UTILITY_SUBJECT_OPTIONS_LOADING,
} from "./types";

export const fetchingClassTeacherOptions = () => {
  return async (dispatch, getState) => {
    const { adminClasses, adminUsers } = getState();
    const {
      adminAuth: { admin },
    } = getState();
    if (adminUsers.data.length && adminClasses.data.length) {
      dispatch({
        type: UTILITY_SUBJECT_OPTIONS_FETCHED,
        classes: adminClasses.data,
        teachers: adminUsers.data.filter((el) => el.role === "teacher"),
      });
      return;
    }
    dispatch({
      type: UTILITY_SUBJECT_OPTIONS_LOADING,
    });
    try {
      const res = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_API_HOST_NAME}/class/index`,
          setAuthHeader(admin.token)
        ),
        axios.get(
          `${process.env.REACT_APP_API_HOST_NAME}/users/teacher`,
          setAuthHeader(admin.token)
        ),
      ]);
      if (res[0].status === 200 && res[1].status === 200) {
        const classOptions = res[0].data.data.map((el) => ({
          name: el.name.toUpperCase(),
          value: el.name,
        }));
        const teacherOptions = res[1].data.data.map((el) => ({
          name: `${el.lname.toUpperCase()} - ${el.userid}`,
          value: el.id,
        }));
        dispatch({
          type: UTILITY_SUBJECT_OPTIONS_FETCHED,
          classes: classOptions,
          teachers: teacherOptions,
        });
      } else {
        dispatch({
          type: UTILITY_SUBJECT_OPTIONS_ERROR,
          messages: "Failed to load classes and teachers data",
        });
      }
    } catch (error) {
      dispatch({
        type: UTILITY_SUBJECT_OPTIONS_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
