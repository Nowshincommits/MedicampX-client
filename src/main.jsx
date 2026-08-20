import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./components/pages/router/router";
import AuthProvider from "./Contexts/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
