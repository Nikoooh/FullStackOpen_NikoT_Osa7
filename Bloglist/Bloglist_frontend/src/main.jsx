import ReactDOM from 'react-dom/client';
import App from './App';
import { BloglistContextProvider } from './context/BlogContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BloglistContextProvider>
      <Router>
        <App />
      </Router>
    </BloglistContextProvider>
  </QueryClientProvider>,
);
