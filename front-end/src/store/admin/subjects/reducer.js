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

const initialState = {
  data: [],
  status: { fetched: "idle", delete: "idle", archive: "idle" },
  error: { fetched: null, add: null, edit: null, delete: null, archive: null },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SUBJECTS_LOADING:
      return {
        ...state,
        status: { ...state.status, [action.for]: "loading" },
      };
    case ADMIN_SUBJECTS_ERROR:
      return {
        ...state,
        status: { ...state.status, [action.for]: "complete" },
        error: { ...state.error, [action.for]: action.messages },
      };
    case ADMIN_SUBJECTS_REMOVE_ERROR:
      return {
        ...state,
        error: { ...state.error, [action.closeFor]: null },
      };
    case ADMIN_SUBJECTS_FETCHED:
      return {
        data: action.payload,
        status: { ...state.status, fetched: "complete" },
        error: { ...state.error, fetched: null },
      };
    case ADMIN_SUBJECTS_ADD:
      return {
        ...state,
        data: [action.payload, ...state.data],
        error: { ...state.error, add: null },
      };
    case ADMIN_SUBJECTS_EDIT:
      const updatedSubjectIndex = state.data.findIndex(
        (d) => d.id === action.payload.id
      );
      const updatedSubjects = [...state.data];
      if (updatedSubjectIndex >= 0) {
        const prevArchive = updatedSubjects[updatedSubjectIndex].archiveable;
        updatedSubjects[updatedSubjectIndex] = action.payload;
        updatedSubjects[updatedSubjectIndex].archiveable = prevArchive;
      }
      return {
        ...state,
        data: JSON.parse(JSON.stringify(updatedSubjects)),
        error: { ...state.error, edit: null },
      };
    case ADMIN_SUBJECTS_DELETE:
      return {
        data: state.data.filter((d) => d.id !== action.id),
        status: { ...state.status, delete: "complete" },
        error: { ...state.error, delete: null },
      };
    case ADMIN_SUBJECTS_ARCHIVE:
      const archivedIndex = state.data.findIndex((d) => d.id === action.id);
      if (archivedIndex === -1) {
        return {
          ...state,
          status: { ...state.status, archive: "complete" },
          error: { ...state.error, archive: null },
        };
      }
      const archivedSubjects = [...state.data];
      archivedSubjects[archivedIndex].status = 0;
      archivedSubjects[archivedIndex].archiveable = false;
      return {
        data: archivedSubjects,
        status: { ...state.status, archive: "complete" },
        error: { ...state.error, archive: null },
      };
    default:
      return state;
  }
}

export default reducer;
