import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import routes from "./routes";
import Nav from "./components/items/nav";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <SolidQueryDevtools />
        <div class="md:container md:mx-auto">
          <Nav />
          <Router>{routes}</Router>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
