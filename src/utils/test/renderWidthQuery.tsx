import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
export const renderAppWithRouterMatch = (ui: JSX.Element) => (
  <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
);
