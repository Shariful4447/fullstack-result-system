import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../../shared/utils";
import {
  TEACHER_UTILITY_PUPIL_OPTIONS_ERROR,
  TEACHER_UTILITY_PUPIL_OPTIONS_FETCHED,
  TEACHER_UTILITY_PUPIL_OPTIONS_LOADING,
} from "./types";

export const fetchingPupilOptions = (subjectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: TEACHER_UTILITY_PUPIL_OPTIONS_LOADING,
    });

    try {
      const {
        teacherAuth: { teacher },
      } = getState();
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/teacher/test-pupil-option/${teacher.id}/${subjectId}`,
        setAuthHeader(teacher.token)
      );
      if (res.status === 200) {
        dispatch({
          type: TEACHER_UTILITY_PUPIL_OPTIONS_FETCHED,
          payload: Array.isArray(res.data.data)
            ? res.data.data.map((el) => ({
                name: `${el.pupil.fname} (${el.pupil.userid})`,
                value: el.pupil.id,
              }))
            : [],
        });
      } else {
        dispatch({
          type: TEACHER_UTILITY_PUPIL_OPTIONS_ERROR,
          messages: ["Pupil's loading failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_UTILITY_PUPIL_OPTIONS_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
