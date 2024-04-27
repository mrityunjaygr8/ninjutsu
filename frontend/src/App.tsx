import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import routes from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Router>{routes}</Router>
    </QueryClientProvider>
  );
}

export default App;
