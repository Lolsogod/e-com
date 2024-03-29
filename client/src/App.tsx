import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router/router"
import { useAuth } from "./store/useAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "https://a29d-142-93-68-17.ngrok-free.app" + "/trpc",
      async headers() {
        return {
          authorization: "Bearer " + await useAuth.getState().token,
          "ngrok-skip-browser-warning": "69420",
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
          <ToastContainer />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};
export default App;
