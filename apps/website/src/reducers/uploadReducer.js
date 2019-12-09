export const initUploadReducer = (state) => {
  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export const uploadReducer = (state, action) => {
  const newstate = clone(state);
  switch (action.type) {
    case 'addFile':
      newstate.files.push(action.value);
      return newstate;
    case 'markUploaded':
      for (let i = 0; i < newstate.files.length; i++) {
        let file = newstate.files[i];
        if (file.name === action.value) {
          newstate.files[i].state = 'uploaded';
        }
      }
      return newstate;
    case 'markFailed':
      for (let i = 0; i < newstate.files.length; i++) {
        let file = newstate.files[i];
        if (file.name === action.value) {
          newstate.files[i].state = 'failed';
        }
      }
      return newstate;
    case 'clearUploads':
      return { files: [] };
    default:
      throw new Error();
  }
}
