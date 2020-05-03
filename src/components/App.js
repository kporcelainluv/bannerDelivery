import React, { useState } from "react";
import GlobalTheme from "../theme/GlobalTheme";
import { ThemeProvider } from "styled-components";
import { nanoid } from "nanoid";

import { darkTheme } from "../theme/dark";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";

export const App = () => {
  const [customers, setCustomers] = useState([]);

  const addCustomer = name => {
    setCustomers([...customers, { name: name, id: nanoid() }]);
  };
  console.log({ customers });
  return (
    <div className="App">
      <GlobalTheme />
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Dashboard addCustomer={addCustomer} />
      </ThemeProvider>
    </div>
  );
};
