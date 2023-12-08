import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import { Auth } from "./components/pages/Auth";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: localStorage.getItem("token") || "", 
        };
      },
    }),
  ],
});
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Auth />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};
export default App;
