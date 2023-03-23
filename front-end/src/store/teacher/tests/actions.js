import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../shared/utils";

import {
  TEACHER_TESTS_ADD,
  TEACHER_TESTS_DELETE,
  TEACHER_TESTS_EDIT,
  TEACHER_TESTS_ERROR,
  TEACHER_TESTS_FETCHED,
  TEACHER_TESTS_LOADING,
  TEACHER_TESTS_REMOVE_ERROR,
} from "./types";

export const fetchingTests = (subjectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: TEACHER_TESTS_LOADING,
      for: "fetched",
    });

    try {
      const {
        teacherAuth: { teacher },
      } = getState();
      // const res = await axios.get(`test/index/${teacherId}/${subjectId}`)

      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/test/index/${teacher.id}/${subjectId}`,
        setAuthHeader(teacher.token)
      );
      if (res.status === 200) {
        dispatch({
          type: TEACHER_TESTS_FETCHED,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: TEACHER_TESTS_ERROR,
          for: "fetched",
          messages: ["Associated subject's test loading failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_TESTS_ERROR,
        for: "fetched",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const addTest = (subjectId, test) => {
  return async (dispatch, getState) => {
    try {
      const {
        teacherAuth: { teacher },
      } = getState();

      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST_NAME}/test/create/store`,
        {
          name: test.name,
          teacher_id: teacher.id,
          subject_id: subjectId,
          test_date: test.date,
        },
        setAuthHeader(teacher.token)
      );
      if (res.status === 201) {
        dispatch({
          type: TEACHER_TESTS_ADD,
          newTest: res.data.data,
        });
      } else {
        dispatch({
          type: TEACHER_TESTS_ERROR,
          for: "add",
          messages: ["Test adding failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_TESTS_ERROR,
        for: "add",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const editTest = (subjectId, test, onHide) => {
  return async (dispatch, getState) => {
    try {
      const {
        teacherAuth: { teacher },
      } = getState();
      // const res = await axios.get(
      //   `${process.env.REACT_APP_API_HOST_NAME}//test/update/{id}`
      // );
      const res = await axios.put(
        `${process.env.REACT_APP_API_HOST_NAME}/test/update/${test.id}`,
        {
          name: test.name,
          teacher_id: teacher.id,
          subject_id: subjectId,
          test_date: test.date,
        },
        setAuthHeader(teacher.token)
      );
      if (res.status === 200) {
        dispatch({
          type: TEACHER_TESTS_EDIT,
          editTest: res.data.data,
        });
        onHide();
      } else {
        dispatch({
          type: TEACHER_TESTS_ERROR,
          for: "edit",
          messages: ["Test editing failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_TESTS_ERROR,
        for: "edit",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const deleteTest = (subjectId, testId, onHide) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_TESTS_LOADING,
        for: "delete",
      });
      const {
        teacherAuth: { teacher },
      } = getState();
      const res = await axios.delete(
        `${process.env.REACT_APP_API_HOST_NAME}/test/delete/${testId}`,
        setAuthHeader(teacher.token)
      );
      if (res.status === 200) {
        dispatch({
          type: TEACHER_TESTS_DELETE,
          testId: testId,
        });
        onHide();
      } else {
        dispatch({
          type: TEACHER_TESTS_ERROR,
          for: "delete",
          messages: ["Test delete failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: TEACHER_TESTS_ERROR,
        for: "delete",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const userErrorRemove = (closeFor) => {
  return {
    type: TEACHER_TESTS_REMOVE_ERROR,
    closeFor: closeFor,
  };
};
