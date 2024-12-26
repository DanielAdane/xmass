import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const manifestUrl =
  "https://coral-changing-junglefowl-242.mypinata.cloud/ipfs/bafkreid5bvmersgmmdy6t3qewvmu3oc5p42m3hcwl35jqeppbkbd7ptuny";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>,
);
