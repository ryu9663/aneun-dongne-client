import React from 'react';
import ReactDOM from 'react-dom/client';
import 'junyeol-components/style.css';
import App from './App';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta && query.meta.errorMessage) {
        alert(query.meta.errorMessage);
      }
      alert(error.message);
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 24 * 60 * 60 * 1000, // 24시간 (1일) 동안 캐시된 데이터를 사용하고 이후에 리패치
      gcTime: 24 * 60 * 60 * 1000 // 24시간 동안 캐시된 데이터를 유지
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
