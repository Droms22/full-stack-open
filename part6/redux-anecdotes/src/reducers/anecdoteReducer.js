import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
    addVote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload.id);
      const updated = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id === action.payload.id ? updated : a));
    },
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(addAnecdote(anecdote.content));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.vote(anecdote);
    dispatch(addVote(updated));
  };
};

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
