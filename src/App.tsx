import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// @ts-ignore
import AuthContextProvider from "./context/AuthContext";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, teal } from "@mui/material/colors";
import AppRoute from "./components/AppRouter";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      // color: "#ddd",
      h6: {
        fontSize: "1.0rem",
        fontWeight: 400,
        margin: "0 0 20px 0",
      },
      h3: {
        fontFamily: ["Fredericka the Great", "cursive"].join(","),
        fontSize: "2.0rem",
        fontWeight: 400,
        margin: "0 0 20px 0",
        color: "#1dd1a1",
      },
    },
    palette: {
      primary: {
        main: teal[400],
      },
      secondary: {
        main: deepPurple[100],
      },
    },
  });

  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <AuthContextProvider>
            <BrowserRouter>
              <AppRoute />
            </BrowserRouter>
          </AuthContextProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
