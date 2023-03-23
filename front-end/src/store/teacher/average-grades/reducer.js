import {
  TEACHER_AVERAGE_GRADES_ERROR,
  TEACHER_AVERAGE_GRADES_FETCHED,
  TEACHER_AVERAGE_GRADES_LOADING,
} from "./types";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_AVERAGE_GRADES_LOADING:
      return {
        data: [],
        status: "loading",
        error: null,
      };
    case TEACHER_AVERAGE_GRADES_ERROR:
      return {
        ...state,
        status: "complete",
        error: action.messages,
      };
    case TEACHER_AVERAGE_GRADES_FETCHED:
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
