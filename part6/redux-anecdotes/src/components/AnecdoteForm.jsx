import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
    dispatch(changeNotification(`created ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
