import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationContextProvider } from './context/notificationContext';
import { UserContextProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
