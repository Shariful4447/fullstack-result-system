import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../shared/utils";
import {
  TEACHER_ASSIGNED_SUBJECTS_ERROR,
  TEACHER_ASSIGNED_SUBJECTS_FETCHED,
  TEACHER_ASSIGNED_SUBJECTS_LOADING,
} from "./types";

export const fetchingAssignedSubject = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: TEACHER_ASSIGNED_SUBJECTS_LOADING,
    });

    try {
      const {
        teacherAuth: { teacher },
      } = getState();
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/teacher/assign/subject/${teacher.id}`,
        setAuthHeader(teacher.token)
      );
      if (res.status === 200) {
        dispatch({
          type: TEACHER_ASSIGNED_SUBJECTS_FETCHED,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: TEACHER_ASSIGNED_SUBJECTS_ERROR,
          messages: ["Subjects fetching failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_ASSIGNED_SUBJECTS_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
