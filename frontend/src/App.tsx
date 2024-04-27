import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import routes from "./routes";
import { css } from "../styled-system/css";
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
      <div id="main">
        <div class={css({ fontSize: "2xl", fontWeight: "bold" })}>
          <p>Woo WOo</p>
        </div>
        <Router>{routes}</Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
