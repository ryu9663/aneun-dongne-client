import React from 'react';
import ReactDOM from 'react-dom/client';
import 'junyeol-components/style.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 24 * 60 * 60 * 1000, // 24시간 (1일) 동안 캐시된 데이터를 사용하고 이후에 리패치
      cacheTime: 24 * 60 * 60 * 1000 // 24시간 동안 캐시된 데이터를 유지
    }
  }
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
