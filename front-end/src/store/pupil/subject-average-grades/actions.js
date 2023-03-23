import axios from "axios";

import { errorsGenerator } from "../../../shared/utils";
import {
  PUPIL_SUBJECT_AVERAGE_GRADE_ERROR,
  PUPIL_SUBJECT_AVERAGE_GRADE_FETCHED,
  PUPIL_SUBJECT_AVERAGE_GRADE_LOADING,
} from "./types";

export const fetchingSubjectAverageGrade = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: PUPIL_SUBJECT_AVERAGE_GRADE_LOADING,
    });

    try {
      const {
        pupilAuth: { pupil },
      } = getState();
      // const res = await axios.get(`http://127.0.0.1:8000/api/pupil/average-grade/${userId}`);
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/pupil/average-grade/${pupil.id}`,
        {
          headers: {
            Authorization: pupil.token,
          },
        }
      );

      if (res.status === 200) {
        dispatch({
          type: PUPIL_SUBJECT_AVERAGE_GRADE_FETCHED,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: PUPIL_SUBJECT_AVERAGE_GRADE_ERROR,
          messages: ["Average grades loading failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: PUPIL_SUBJECT_AVERAGE_GRADE_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
