import {
  TEACHER_TESTS_ADD,
  TEACHER_TESTS_DELETE,
  TEACHER_TESTS_EDIT,
  TEACHER_TESTS_ERROR,
  TEACHER_TESTS_FETCHED,
  TEACHER_TESTS_LOADING,
  TEACHER_TESTS_REMOVE_ERROR,
} from "./types";

const initialState = {
  data: [],
  status: { fetched: "idle", delete: "idle" },
  error: { fetched: null, add: null, edit: null, delete: null },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_TESTS_LOADING:
      return {
        ...state,
        status: { ...state.status, [action.for]: "loading" },
      };
    case TEACHER_TESTS_ERROR:
      return {
        ...state,
        status: { ...state.status, [action.for]: "complete" },
        error: { ...state.error, [action.for]: action.messages },
      };
    case TEACHER_TESTS_REMOVE_ERROR:
      return {
        ...state,
        error: { ...state.error, [action.closeFor]: null },
      };
    case TEACHER_TESTS_FETCHED:
      return {
        data: action.payload,
        status: { ...state.status, fetched: "complete" },
        error: { ...state.error, fetched: null },
      };
    case TEACHER_TESTS_ADD:
      return {
        ...state,
        data: [action.newTest, ...state.data],
        error: { ...state.error, add: null },
      };
    case TEACHER_TESTS_EDIT:
      const updatedTestIndex = state.data.findIndex(
        (d) => d.id === action.editTest.id
      );
      if (updatedTestIndex === -1) {
        return {
          ...state,
          status: { ...state.status, edit: "complete" },
          error: { ...state.error, edit: null },
        };
      }
      const updatedTest = [...state.data];
      updatedTest[updatedTestIndex] = action.editTest;
      return {
        ...state,
        data: updatedTest,
        error: { ...state.error, edit: null },
      };
    case TEACHER_TESTS_DELETE:
      return {
        data: state.data.filter((d) => d.id !== action.testId),
        status: { ...state.status, delete: "complete" },
        error: { ...state.error, delete: null },
      };
    default:
      return state;
  }
}

export default reducer;
