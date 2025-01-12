import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state.anecdotes]
      .filter((a) => a.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(changeNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
