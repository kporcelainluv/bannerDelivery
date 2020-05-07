import React, { useState } from "react";
import GlobalTheme from "../theme/GlobalTheme";
import { ThemeProvider } from "styled-components";
import { nanoid } from "nanoid";
import u from "updeep";

import { darkTheme } from "../theme/dark";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { STATUS } from "../utils/consts";
import { Campaigns } from "./Campaigns";
import { Campaign } from "./campaign/Campaign";
import { AccessPopup } from "./popups/AcessPopup";

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
        status: "completed",
        attachments: [
          { name: "Specifications.js", id: nanoid() },
          { name: "Prototype.png", id: nanoid() }
        ],
        description: "Implement HTML and PNG banners"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019",
        status: "active",
        attachments: []
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019",
        status: "active",
        attachments: []
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

  const addAttachment = (name, customer, campaign) => {
    const updatedCampaigns = customer.campaigns.map(c => {
      if (c.id === campaign.id) {
        return {
          ...c,
          attachments: [
            ...c.attachments,
            {
              name: name,
              id: nanoid()
            }
          ]
        };
      }
      return c;
    });

    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: updatedCampaigns
          };
        }
        return c;
      })
    );
  };

  const deleteAttachment = (attachmentId, customer, campaign) => {
    const updatedAttachments = campaign.attachments.filter(
      c => c.id !== attachmentId
    );
    const updatedCampaigns = customer.campaigns.map(c => {
      if (c.id === campaign.id) {
        return { ...c, attachments: updatedAttachments };
      }
      return c;
    });

    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: updatedCampaigns
          };
        }
        return c;
      })
    );
  };

  const updateDescription = (campaign, customer, newDescription) => {
    const updatedCampaigns = customer.campaigns.map(c => {
      if (c.id === campaign.id) {
        return { ...c, description: newDescription };
      }
      return c;
    });

    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: updatedCampaigns
          };
        }
        return c;
      })
    );
  };

  const updateCampaignName = (campaign, customer, newName) => {
    const updatedCampaigns = customer.campaigns.map(c => {
      if (c.id === campaign.id) {
        return { ...c, name: newName };
      }
      return c;
    });

    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: updatedCampaigns
          };
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
        {/*<Campaigns*/}
        {/*  customer={customers[3]}*/}
        {/*  markCampaignActive={markCampaignActive}*/}
        {/*  markCampaignCompleted={markCampaignCompleted}*/}
        {/*/>*/}
        <Campaign
          customer={customers[3]}
          addAttachment={addAttachment}
          campaign={customers[3]["campaigns"][0]}
          deleteAttachment={deleteAttachment}
          updateDescription={updateDescription}
          updateCampaignName={updateCampaignName}
        />
        {/*<AccessPopup />*/}
      </ThemeProvider>
    </div>
  );
};
