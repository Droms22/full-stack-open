import { createSlice } from '@reduxjs/toolkit';

export const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload);
      const updated = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id === action.payload ? updated : a));
    },
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
