import {
  ADMIN_CLASS_PUPIL_OPTIONS_ERROR,
  ADMIN_CLASS_PUPIL_OPTIONS_FETCHED,
  ADMIN_CLASS_PUPIL_OPTIONS_LOADING,
} from "./types";

const initialState = {
  options: [],
  status: "idle",
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CLASS_PUPIL_OPTIONS_LOADING:
      return {
        options: [],
        status: "loading",
        error: null,
      };
    case ADMIN_CLASS_PUPIL_OPTIONS_ERROR:
      return {
        ...state,
        status: "complete",
        error: action.messages,
      };
    case ADMIN_CLASS_PUPIL_OPTIONS_FETCHED:
      return {
        options: action.payload,
        status: "complete",
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
