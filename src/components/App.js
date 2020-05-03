import React from "react";
import GlobalTheme from "../theme/GlobalTheme";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "../theme/dark";
import { Header } from "./Header";

export const App = () => {
  return (
    <div className="App">
      <GlobalTheme />
      <ThemeProvider theme={darkTheme}>
        <Header />
      </ThemeProvider>
    </div>
  );
};
