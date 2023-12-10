import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router/router"
import { useAuth } from "./store/useAuth";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      async headers() {
        return {
          authorization: "Bearer " + await useAuth.getState().token
        };
      },
    }),
  ],
});
const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};
export default App;
