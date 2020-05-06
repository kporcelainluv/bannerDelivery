import React, { useState } from "react";
import GlobalTheme from "../theme/GlobalTheme";
import { ThemeProvider } from "styled-components";
import { nanoid } from "nanoid";

import { darkTheme } from "../theme/dark";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { STATUS } from "../utils/utils";
import { Campaigns } from "./Campaigns";

const customersList = [
  {
    id: nanoid(),
    name: "Burger King",
    status: "active",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Mama Pizza",
    status: "completed",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Domofond",
    status: "active",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Sberbank",
    status: "completed",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019",
        status: "completed"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019",
        status: "active"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019",
        status: "active"
      }
    ]
  }
];

export const App = () => {
  const [customers, setCustomers] = useState(customersList);

  const addCustomer = name => {
    setCustomers(c => [
      ...c,
      { name: name, id: nanoid(), status: STATUS.ACTIVE }
    ]);
  };

  const removeCustomer = customer => {
    const updatedCustomers = customers.filter(c => c.id !== customer.id);
    setCustomers(updatedCustomers);
  };

  const markCompleted = customer => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, status: STATUS.COMPLETED };
        }
        return c;
      })
    );
  };

  const markActive = customer => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, status: STATUS.ACTIVE };
        }
        return c;
      })
    );
  };

  const markCampaignActive = (customer, id) => {
    const updatedCampaign = customer.campaigns.map(c => {
      if (id === c.id) {
        return { ...c, status: STATUS.ACTIVE };
      }
      return c;
    });
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, campaigns: updatedCampaign };
        }
        return c;
      })
    );
  };

  const markCampaignCompleted = (customer, id) => {
    const updatedCampaign = customer.campaigns.map(c => {
      if (id === c.id) {
        return { ...c, status: STATUS.COMPLETED };
      }
      return c;
    });
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, campaigns: updatedCampaign };
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
        {/*<Dashboard*/}
        {/*  addCustomer={addCustomer}*/}
        {/*  removeCustomer={removeCustomer}*/}
        {/*  markCompleted={markCompleted}*/}
        {/*  markActive={markActive}*/}
        {/*  customers={customers}*/}
        {/*/>*/}
        <Campaigns
          customer={customers[3]}
          markCampaignActive={markCampaignActive}
          markCampaignCompleted={markCampaignCompleted}
        />
      </ThemeProvider>
    </div>
  );
};
