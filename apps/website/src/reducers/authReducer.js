const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  user: null,
  sessionId: null,
  credentials: null,
  isChatStarted: false,
  isStartingChat: false,
  contactId: null,
  transcript: [],
  blogData: [],
  activeBlog: {
    ContentType: 'blog',
    title: '',
    slug: '',
    content: '',
    excerpt: ''
  }
};

export const initReducer = (state=initialState) => {
  const localData = window.localStorage.getItem('blogState');
  if (localData && !state.blogData.length) {
    const localStore = JSON.parse(localData);
    console.log(localStore);
    const timeLimit = new Date().valueOf() - 300000;
    console.log(timeLimit, localStore.timestamp, localStore.timestamp - timeLimit);
    if (localStore.timestamp > timeLimit) {
      initialState.timestamp = localStore.timestamp;
      initialState.blogData = localStore.blogData;
      console.log('Returning initisalState', initialState);
      return initialState
    }
  }
  console.log('Returning state', state);
  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

const localStorageHandler = (state) => {
  console.log(state.timestamp)
  if (state.timestamp) {
    console.log('found a timestamp', state)
  } else {
    state.timestamp = new Date().valueOf();
  }
  const localData = JSON.parse(JSON.stringify(state))
  delete localData.user;
  console.log('Data posting to localstore',localData)
  window.localStorage.setItem('blogState', JSON.stringify(localData));
  return state;
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
    case 'setBlogData':
      newstate.blogData = action.value;
      if (action.slug) {
        action.value.map((post) => {
          if (post.slug === action.slug) {
            return newstate.activeBlog = post;
          }
          return null;
        })
      }
      return localStorageHandler(newstate);
    case 'setActiveBlog':
      newstate.activeBlog = action.value;
      return localStorageHandler(newstate);
    default:
      throw new Error();
  }
}
