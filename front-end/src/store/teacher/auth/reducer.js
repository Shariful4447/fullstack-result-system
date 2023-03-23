import {
  TEACHER_AUTH_ACTION_ERROR,
  TEACHER_AUTH_ACTION_PENDING,
  TEACHER_AUTH_ACTION_SIGN_IN,
  TEACHER_AUTH_ACTION_SIGN_OUT,
  TEACHER_AUTH_REMOVE_ERROR,
} from "./types";

const initialState = {
  teacher: {
    id: null,
    adminId: null,
    forename: null,
    surname: null,
    username: null,
    role: null,
    expiration: null,
    token: null,
  },
  loading: "idle",
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_AUTH_ACTION_PENDING:
      return {
        ...state,
        loading: "loading",
        error: null,
      };
    case TEACHER_AUTH_ACTION_ERROR:
      return {
        ...state,
        loading: "complete",
        error: action.error,
      };
    case TEACHER_AUTH_REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    case TEACHER_AUTH_ACTION_SIGN_OUT:
      return {
        teacher: {
          id: null,
          teacherId: null,
          forename: null,
          surname: null,
          username: null,
          role: null,
          expiration: null,
          token: null,
        },
        loading: "complete",
        error: null,
      };
    case TEACHER_AUTH_ACTION_SIGN_IN:
      return {
        teacher: { ...action.teacher },
        loading: "complete",
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
