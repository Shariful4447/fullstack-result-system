import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../shared/utils";
import {
  TEACHER_AVERAGE_GRADES_ERROR,
  TEACHER_AVERAGE_GRADES_FETCHED,
  TEACHER_AVERAGE_GRADES_LOADING,
} from "./types";

export const fetchingAverageGrades = (subjectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: TEACHER_AVERAGE_GRADES_LOADING,
    });

    try {
      const {
        teacherAuth: { teacher },
      } = getState();
      // const res await axios.get(`${process.env.REACT_APP_API_HOST_NAME}/teacher/average-grade/{teacher_id}/${subjectId}`);
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/teacher/average-grade/${teacher.id}/${subjectId}`,
        setAuthHeader(teacher.token)
      );
      dispatch({
        type: TEACHER_AVERAGE_GRADES_FETCHED,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: TEACHER_AVERAGE_GRADES_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
