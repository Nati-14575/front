const initialState = {
  loading: false,
  error: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_UI":
      return {
        ...state,
        loading: !state.loading,
      };
    case "SET_ERRORS":
      return {
        ...state,
        error: action.error,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    case "NOT_CORRECT":
      return {
        ...state,
        loginError: true,
      };
    default:
      return state;
  }
};

export default uiReducer;
