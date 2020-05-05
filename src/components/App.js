import React, { useState } from "react";
import GlobalTheme from "../theme/GlobalTheme";
import { ThemeProvider } from "styled-components";
import { nanoid } from "nanoid";

import { darkTheme } from "../theme/dark";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";

export const App = () => {
  const [customers, setCustomers] = useState([
    { id: nanoid(), name: "Burger King", status: "active" },
    { id: nanoid(), name: "Mama Pizza", status: "completed" },
    { id: nanoid(), name: "Domofond", status: "active" },
    { id: nanoid(), name: "Sberbank", status: "completed" }
  ]);

  const addCustomer = name => {
    setCustomers(c => [...c, { name: name, id: nanoid(), status: "active" }]);
  };

  const removeCustomer = customer => {
    const updatedCustomers = customers.filter(c => c.id !== customer.id);
    setCustomers(updatedCustomers);
  };

  const markCompleted = customer => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, status: "completed" };
        }
        return c;
      })
    );
  };
  return (
    <div className="App">
      <GlobalTheme />
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Dashboard
          addCustomer={addCustomer}
          removeCustomer={removeCustomer}
          markCompleted={markCompleted}
          customers={customers}
        />
      </ThemeProvider>
    </div>
  );
};
