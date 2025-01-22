import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from './NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({ type: 'SET', message: `Anecdote ${anecdote.content} created` });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        message: 'Too short anecdote, must have length 5 or more',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    createAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
