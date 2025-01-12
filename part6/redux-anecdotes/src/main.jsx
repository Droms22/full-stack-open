import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
