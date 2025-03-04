import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationContextProvider } from './context/notificationContext';
import { UserContextProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
          <Toaster />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
