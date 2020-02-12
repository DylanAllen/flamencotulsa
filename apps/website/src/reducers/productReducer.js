export const initProdReducer = (state) => {
  console.log('Init the reducer', state)
  return state;
}

const clone = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export const productReducer = (state, action) => {
  const newstate = clone(state);
  switch (action.type) {
    case 'setProducts':
      newstate.products = action.value;
      newstate.timestamp = new Date().valueOf();
      window.localStorage.setItem('productState', JSON.stringify(newstate));
      return newstate;
    default:
      throw new Error();
  }
}
