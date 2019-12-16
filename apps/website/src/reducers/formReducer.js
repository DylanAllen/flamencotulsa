export const initFormReducer = (state) => {
  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export const formReducer = (state, action) => {
  const newstate = clone(state);
  switch (action.type) {
    case 'setValue':
      newstate[action.key].value = action.value;
      return newstate;
    case 'setOptions':
      console.log(action);
      newstate[action.key].options = action.value;
      console.log(newstate)
      return newstate;
    case 'setClassValue':
      console.log(action);
      const classes = newstate.Classes.value;
      if (classes.includes(action.className) && action.value) {
        return newstate;
      } else if (classes.includes(action.className) && !action.value) {
        let newclasses = [];
        classes.map(className => {
          if (className !== action.className) {
            return newclasses.push(className)
          }
          return null;
        })
        newstate.Classes.value = newclasses;
      } else if (!classes.includes(action.className) && action.value) {
        newstate.Classes.value.push(action.className)
      }
      return newstate;
    default:
      console.error('Bad dispatch');

  }
}
