export const initBlogReducer = (state) => {
  const localData = window.localStorage.getItem('blogState');
  if (localData && !state.blogData.length) {
    const localStore = JSON.parse(localData);
    const timeLimit = new Date().valueOf() - 300000;
    if (localStore.timestamp > timeLimit) {
      return localStore
    }
  }

  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

const localStorageHandler = (state) => {
  console.log(state.timestamp)
  if (state.timestamp) {
    console.log('found a timestamp', state)
    return state
  } else {
    console.log('No timestamp?', JSON.stringify(state), state.timestamp)
    state.timestamp = new Date().valueOf();
    window.localStorage.setItem('blogState', JSON.stringify(state));
    return state;
  }
}

export const blogReducer = (state, action) => {
  const newstate = clone(state);
  switch (action.type) {
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
