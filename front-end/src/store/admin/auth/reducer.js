import {
  ADMIN_AUTH_ACTION_ERROR,
  ADMIN_AUTH_ACTION_PENDING,
  ADMIN_AUTH_ACTION_SIGN_IN,
  ADMIN_AUTH_ACTION_SIGN_OUT,
  ADMIN_AUTH_REMOVE_ERROR,
} from "./types";

const initialState = {
  admin: {
    id: null,
    adminId: null,
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
    case ADMIN_AUTH_ACTION_PENDING:
      return {
        ...state,
        loading: "loading",
        error: null,
      };
    case ADMIN_AUTH_ACTION_ERROR:
      return {
        ...state,
        loading: "complete",
        error: action.error,
      };
    case ADMIN_AUTH_REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    case ADMIN_AUTH_ACTION_SIGN_OUT:
      return {
        admin: {
          id: null,
          adminId: null,
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
    case ADMIN_AUTH_ACTION_SIGN_IN:
      return {
        admin: { ...action.admin },
        loading: "complete",
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
