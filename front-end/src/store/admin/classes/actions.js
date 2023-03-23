import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../shared/utils";
import {
  ADMIN_CLASSES_ADD,
  ADMIN_CLASSES_DELETE,
  ADMIN_CLASSES_EDIT,
  ADMIN_CLASSES_ERROR,
  ADMIN_CLASSES_FETCHED,
  ADMIN_CLASSES_LOADING,
  ADMIN_CLASSES_REMOVE_ERROR,
} from "./types";

export const fetchingClasses = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADMIN_CLASSES_LOADING,
      for: "fetched",
    });

    try {
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/class/index`,
        setAuthHeader(admin.token)
      );
      if (res.status === 200) {
        dispatch({
          type: ADMIN_CLASSES_FETCHED,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: ADMIN_CLASSES_ERROR,
          for: "fetched",
          messages: ["Classes fetching failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_CLASSES_ERROR,
        for: "fetched",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const addClass = (name) => {
  return async (dispatch, getState) => {
    try {
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST_NAME}/class/create/store`,
        {
          name: name,
        },
        setAuthHeader(admin.token)
      );
      if (res.status === 201) {
        dispatch({
          type: ADMIN_CLASSES_ADD,
          payload: { ...res.data.class_data, assign_class: [] },
        });
      } else {
        dispatch({
          type: ADMIN_CLASSES_ERROR,
          for: "add",
          messages: ["Class creation failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_CLASSES_ERROR,
        for: "add",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const userErrorRemove = (closeFor) => {
  return {
    type: ADMIN_CLASSES_REMOVE_ERROR,
    closeFor: closeFor,
  };
};

export const editClass = (id, name, pupilId, onHide) => {
  return async (dispatch, getState) => {
    try {
      const obj = {
        name: name,
        pupil_id: pupilId,
      };

      const {
        adminAuth: { admin },
      } = getState();

      const res = await axios.patch(
        `${process.env.REACT_APP_API_HOST_NAME}/class/update/${id}`,
        obj,
        setAuthHeader(admin.token)
      );
      if (res.status === 200) {
        dispatch({
          type: ADMIN_CLASSES_EDIT,
          payload: res.data.data,
        });
        onHide();
      } else {
        dispatch({
          type: ADMIN_CLASSES_ERROR,
          for: "edit",
          messages: ["Class update failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_CLASSES_ERROR,
        for: "edit",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const deleteClass = (classId, onHide) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_CLASSES_LOADING,
        for: "delete",
      });
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.delete(
        `${process.env.REACT_APP_API_HOST_NAME}/class/delete/${classId}`,
        setAuthHeader(admin.token)
      );

      if (res.status === 200) {
        dispatch({
          type: ADMIN_CLASSES_DELETE,
          classId: classId,
        });
        onHide();
      } else {
        dispatch({
          type: ADMIN_CLASSES_ERROR,
          for: "delete",
          messages: ["Class delete failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_CLASSES_ERROR,
        for: "delete",
        messages: errorsGenerator(error),
      });
    }
  };
};
