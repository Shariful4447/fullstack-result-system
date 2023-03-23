import axios from "axios";

import { errorsGenerator } from "../../../shared/utils";
import {
  PUPIL_SUBJECT_TEST_GRADE_ERROR,
  PUPIL_SUBJECT_TEST_GRADE_FETCHED,
  PUPIL_SUBJECT_TEST_GRADE_LOADING,
} from "./types";

export const fetchingSubjectTestGrade = (subjectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PUPIL_SUBJECT_TEST_GRADE_LOADING,
    });

    try {
      const {
        pupilAuth: { pupil },
      } = getState();
      // const res = await axios.get(`http://127.0.0.1:8000/api/pupil/subject-wise-test-grade/${userId}/${subjectId}`);
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/pupil/subject-wise-test-grade/${pupil.id}/${subjectId}`,
        {
          headers: {
            Authorization: pupil.token,
          },
        }
      );
      if (res.status === 200) {
        dispatch({
          type: PUPIL_SUBJECT_TEST_GRADE_FETCHED,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: PUPIL_SUBJECT_TEST_GRADE_ERROR,
          messages: ["Subject tests grade loading failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: PUPIL_SUBJECT_TEST_GRADE_ERROR,
        messages: errorsGenerator(error),
      });
    }
  };
};
