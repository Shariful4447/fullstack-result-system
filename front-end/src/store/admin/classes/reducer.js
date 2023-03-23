import {
  ADMIN_CLASSES_ADD,
  ADMIN_CLASSES_DELETE,
  ADMIN_CLASSES_EDIT,
  ADMIN_CLASSES_ERROR,
  ADMIN_CLASSES_FETCHED,
  ADMIN_CLASSES_LOADING,
  ADMIN_CLASSES_REMOVE_ERROR,
} from "./types";

const initialState = {
  data: [],
  status: { fetched: "idle", delete: "idle" },
  error: { fetched: null, add: null, edit: null, delete: null },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_CLASSES_LOADING:
      return {
        ...state,
        status: { ...state.status, [action.for]: "loading" },
      };
    case ADMIN_CLASSES_ERROR:
      return {
        ...state,
        status: { ...state.status, [action.for]: "complete" },
        error: { ...state.error, [action.for]: action.messages },
      };
    case ADMIN_CLASSES_REMOVE_ERROR:
      return {
        ...state,
        error: { ...state.error, [action.closeFor]: null },
      };
    case ADMIN_CLASSES_FETCHED:
      return {
        data: action.payload,
        status: { ...state.status, fetched: "complete" },
        error: { ...state.error, fetched: null },
      };
    case ADMIN_CLASSES_ADD:
      return {
        ...state,
        data: [action.payload, ...state.data],
        error: { ...state.error, add: null },
      };
    case ADMIN_CLASSES_EDIT:
      return {
        ...state,
        data: action.payload,
        error: { ...state.error, edit: null },
      };
    case ADMIN_CLASSES_DELETE:
      return {
        data: state.data.filter((d) => d.id !== action.classId),
        status: { ...state.status, delete: "complete" },
        error: { ...state.error, delete: null },
      };
    default:
      return state;
  }
}

export default reducer;
