const INITIAL_STATE = {
  userData: null, // set null
};

export const user = (state = INITIAL_STATE, action) => {
  if (action.type === "LOGIN") {
    return { ...state, userData: action.payload };
  } else if (action.type === "LOGOUT") {
    return INITIAL_STATE;
  }
  return state;
};
