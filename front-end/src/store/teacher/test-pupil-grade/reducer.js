import {
  TEACHER_TEST_PUPIL_GRADE_ADD,
  TEACHER_TEST_PUPIL_GRADE_DELETE,
  TEACHER_TEST_PUPIL_GRADE_EDIT,
  TEACHER_TEST_PUPIL_GRADE_ERROR,
  TEACHER_TEST_PUPIL_GRADE_FETCHED,
  TEACHER_TEST_PUPIL_GRADE_FILE_UPLOAD,
  TEACHER_TEST_PUPIL_GRADE_LOADING,
  TEACHER_TEST_PUPIL_GRADE_REMOVE_ERROR,
} from "./types";

const initialState = {
  data: [],
  status: { fetched: "idle", delete: "idle" },
  error: {
    fetched: null,
    add: null,
    edit: null,
    delete: null,
    fileUpload: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_TEST_PUPIL_GRADE_LOADING:
      return {
        ...state,
        status: { ...state.status, [action.for]: "loading" },
      };
    case TEACHER_TEST_PUPIL_GRADE_ERROR:
      return {
        ...state,
        status: { ...state.status, [action.for]: "complete" },
        error: { ...state.error, [action.for]: action.messages },
      };
    case TEACHER_TEST_PUPIL_GRADE_REMOVE_ERROR:
      return {
        ...state,
        error: { ...state.error, [action.closeFor]: null },
      };
    case TEACHER_TEST_PUPIL_GRADE_FILE_UPLOAD:
      return {
        ...state,
        data: action.payload || state.data,
        error: { ...state.error, fileUpload: null },
      };
    case TEACHER_TEST_PUPIL_GRADE_FETCHED:
      return {
        data: action.payload,
        status: { ...state.status, fetched: "complete" },
        error: { ...state.error, fetched: null },
      };
    case TEACHER_TEST_PUPIL_GRADE_ADD:
      return {
        ...state,
        data: [action.newPupilGrade, ...state.data],
        error: { ...state.error, add: null },
      };
    case TEACHER_TEST_PUPIL_GRADE_EDIT:
      const updatedGradeIndex = state.data.findIndex(
        (d) => d.id === action.resultId
      );
      if (updatedGradeIndex === -1) {
        return {
          ...state,
          status: { ...state.status, edit: "complete" },
          error: { ...state.error, edit: null },
        };
      }
      const updatedGrades = [...state.data];
      updatedGrades[updatedGradeIndex].grade = action.grade;
      return {
        ...state,
        data: updatedGrades,
        error: { ...state.error, edit: null },
      };
    case TEACHER_TEST_PUPIL_GRADE_DELETE:
      return {
        data: state.data.filter((d) => d.id !== action.resultId),
        status: { ...state.status, delete: "complete" },
        error: { ...state.error, delete: null },
      };
    default:
      return state;
  }
}

export default reducer;
