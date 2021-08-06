const initialState = {
  isAuthenticated: false,
  adminrole: false,
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGEDOUT":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      };
    case "USER_LOGGEDIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.user },
      };
    case "REMOVE_USER":
      return {
        ...state,
        currentUser: {},
      };
    case "ADMIN_ROLE":
      return {
        ...state,
        adminrole: true,
      };
    case "USER_ROLE":
      return {
        ...state,
        adminrole: false,
      };
  }
  return state;
};

export default reducer;
