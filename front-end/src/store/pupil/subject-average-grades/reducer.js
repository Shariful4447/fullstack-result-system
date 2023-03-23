import {
  PUPIL_SUBJECT_AVERAGE_GRADE_ERROR,
  PUPIL_SUBJECT_AVERAGE_GRADE_FETCHED,
  PUPIL_SUBJECT_AVERAGE_GRADE_LOADING,
} from "./types";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PUPIL_SUBJECT_AVERAGE_GRADE_LOADING:
      return {
        ...state,
        status: "loading",
        error: null,
      };
    case PUPIL_SUBJECT_AVERAGE_GRADE_ERROR:
      return {
        data: state.data,
        status: "complete",
        error: action.messages,
      };
    case PUPIL_SUBJECT_AVERAGE_GRADE_FETCHED:
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
