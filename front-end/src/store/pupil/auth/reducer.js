import {
  PUPIL_AUTH_ACTION_ERROR,
  PUPIL_AUTH_ACTION_PENDING,
  PUPIL_AUTH_ACTION_SIGN_IN,
  PUPIL_AUTH_ACTION_SIGN_OUT,
  PUPIL_AUTH_REMOVE_ERROR,
} from "./types";

const initialState = {
  pupil: {
    id: null,
    pupilId: null,
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
    case PUPIL_AUTH_ACTION_PENDING:
      return {
        ...state,
        loading: "loading",
        error: null,
      };
    case PUPIL_AUTH_ACTION_ERROR:
      return {
        ...state,
        loading: "complete",
        error: action.error,
      };
    case PUPIL_AUTH_REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    case PUPIL_AUTH_ACTION_SIGN_OUT:
      return {
        pupil: {
          id: null,
          pupilId: null,
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
    case PUPIL_AUTH_ACTION_SIGN_IN:
      return {
        pupil: { ...action.pupil },
        loading: "complete",
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
