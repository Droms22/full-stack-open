const initialState = '';

export const changeFilter = (newFilter) => {
  return {
    type: 'CHANGE',
    payload: newFilter,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
