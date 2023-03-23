import axios from "axios";

import { errorsGenerator, setAuthHeader } from "../../../shared/utils";
import {
  ADMIN_SUBJECTS_ADD,
  ADMIN_SUBJECTS_ARCHIVE,
  ADMIN_SUBJECTS_DELETE,
  ADMIN_SUBJECTS_EDIT,
  ADMIN_SUBJECTS_ERROR,
  ADMIN_SUBJECTS_FETCHED,
  ADMIN_SUBJECTS_LOADING,
  ADMIN_SUBJECTS_REMOVE_ERROR,
} from "./types";

const convertObjToArray = (obj) => {
  let temp = [];
  if (Array.isArray(obj)) {
    return obj;
  }
  if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
    for (const key in obj) {
      temp = [...temp, obj[key]];
    }
    return temp;
  }
  return temp;
};

const convertToSubjectObj = (data, archiveable) => {
  return {
    id: data.id,
    name: data.name,
    subject_class: data.subject_class,
    class_name: data.class_name,
    status: data.status,
    archiveable: archiveable,
    teacher: {
      id: data.user.id,
      userId: data.user.userid,
      fname: data.user.fname,
      lname: data.user.lname,
    },
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

export const fetchingSubjects = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADMIN_SUBJECTS_LOADING,
      for: "fetched",
    });

    try {
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST_NAME}/subject/index`,
        setAuthHeader(admin.token)
      );
      const aSubjects = convertObjToArray(res.data.archiveableSubjects);
      const modifiedData = res.data.data.map((el) =>
        convertToSubjectObj(el, aSubjects.includes(el.id))
      );

      if (res.status === 200) {
        dispatch({
          type: ADMIN_SUBJECTS_FETCHED,
          payload: modifiedData,
        });
      } else {
        dispatch({
          type: ADMIN_SUBJECTS_ERROR,
          for: "fetched",
          messages: ["Subjects fetching failed"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_SUBJECTS_ERROR,
        for: "fetched",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const addSubject = (name, teacherId, className) => {
  return async (dispatch, getState) => {
    try {
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST_NAME}/subject/create/store`,
        {
          name: name,
          teacher_id: teacherId,
          class_name: className,
        },
        setAuthHeader(admin.token)
      );
      if (res.status === 201) {
        dispatch({
          type: ADMIN_SUBJECTS_ADD,
          payload: convertToSubjectObj(res.data.data, false),
        });
      } else {
        dispatch({
          type: ADMIN_SUBJECTS_ERROR,
          for: "add",
          messages: ["Subject creation failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_SUBJECTS_ERROR,
        for: "add",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const userErrorRemove = (closeFor) => {
  return {
    type: ADMIN_SUBJECTS_REMOVE_ERROR,
    closeFor: closeFor,
  };
};

export const editSubject = (id, name, className, teacher, onHide) => {
  return async (dispatch, getState) => {
    try {
      const obj = {
        name: name,
        class_name: className,
        teacher_id: teacher,
      };
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.post(
        `${process.env.REACT_APP_API_HOST_NAME}/subject/update/${id}`,
        obj,
        setAuthHeader(admin.token)
      );
      if (res.status === 200 && res.data.data) {
        dispatch({
          type: ADMIN_SUBJECTS_EDIT,
          payload: convertToSubjectObj(res.data.data, false),
        });
        onHide();
      } else {
        dispatch({
          type: ADMIN_SUBJECTS_ERROR,
          for: "edit",
          messages: ["Subject update failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_SUBJECTS_ERROR,
        for: "edit",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const deleteSubject = (subjectId, onHide) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_SUBJECTS_LOADING,
        for: "delete",
      });
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.delete(
        `${process.env.REACT_APP_API_HOST_NAME}/subject/delete/${subjectId}`,
        setAuthHeader(admin.token)
      );

      if (res.status === 200) {
        dispatch({
          type: ADMIN_SUBJECTS_DELETE,
          id: subjectId,
        });
        onHide();
      } else {
        dispatch({
          type: ADMIN_SUBJECTS_ERROR,
          for: "delete",
          messages: ["Subject delete failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_SUBJECTS_ERROR,
        for: "delete",
        messages: errorsGenerator(error),
      });
    }
  };
};

export const archiveSubject = (subjectId, onHide) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_SUBJECTS_LOADING,
        for: "archive",
      });
      const {
        adminAuth: { admin },
      } = getState();
      const res = await axios.patch(
        `${process.env.REACT_APP_API_HOST_NAME}/subject/archive/${subjectId}`,
        {},
        setAuthHeader(admin.token)
      );
      if (res.status === 200) {
        dispatch({
          type: ADMIN_SUBJECTS_ARCHIVE,
          id: subjectId,
        });
        onHide();
      } else {
        dispatch({
          type: ADMIN_SUBJECTS_ERROR,
          for: "archive",
          messages: ["Subject archives failed!"],
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_SUBJECTS_ERROR,
        for: "archive",
        messages: errorsGenerator(error),
      });
    }
  };
};
