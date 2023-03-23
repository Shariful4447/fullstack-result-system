import {
  UTILITY_SUBJECT_OPTIONS_ERROR,
  UTILITY_SUBJECT_OPTIONS_FETCHED,
  UTILITY_SUBJECT_OPTIONS_LOADING,
} from "./types";

const initialState = {
  classes: [],
  teachers: [],
  status: "idle",
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UTILITY_SUBJECT_OPTIONS_LOADING:
      return {
        classes: [],
        teachers: [],
        status: "loading",
        error: null,
      };
    case UTILITY_SUBJECT_OPTIONS_ERROR:
      return {
        ...state,
        status: "complete",
        error: action.messages,
      };
    case UTILITY_SUBJECT_OPTIONS_FETCHED:
      return {
        classes: action.classes,
        teachers: action.teachers,
        status: "complete",
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
