export const initReducer = (state) => {
  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export const authReducer = (state, action) => {
  const newstate = clone(state);
  switch (action.type) {
    case 'setIsAuthenticating':
      newstate.isAuthenticating = action.value;
      return newstate;
    case 'userHasAuthenticated':
      newstate.isAuthenticated = action.value;
      return newstate;
    case 'setUser':
      newstate.user = action.value;
      return newstate;
    case 'setSessionId':
      newstate.sessionId = action.value;
      return newstate;
    case 'setCredentials':
      newstate.credentials = action.value;
      return newstate;
    default:
      throw new Error();
  }
}
