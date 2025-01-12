import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const dispatchAction = (type) => store.dispatch({ type: type });

  return (
    <div>
      <button onClick={() => dispatchAction('GOOD')}>good</button>
      <button onClick={() => dispatchAction('OK')}>ok</button>
      <button onClick={() => dispatchAction('BAD')}>bad</button>
      <button onClick={() => dispatchAction('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
