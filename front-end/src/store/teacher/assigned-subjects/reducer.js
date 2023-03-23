import {
  TEACHER_ASSIGNED_SUBJECTS_ERROR,
  TEACHER_ASSIGNED_SUBJECTS_FETCHED,
  TEACHER_ASSIGNED_SUBJECTS_LOADING,
} from "./types";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_ASSIGNED_SUBJECTS_LOADING:
      return {
        data: [],
        status: "loading",
        error: null,
      };
    case TEACHER_ASSIGNED_SUBJECTS_ERROR:
      return {
        ...state,
        status: "complete",
        error: action.messages,
      };
    case TEACHER_ASSIGNED_SUBJECTS_FETCHED:
      return {
        data: action.payload,
        status: "complete",
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
