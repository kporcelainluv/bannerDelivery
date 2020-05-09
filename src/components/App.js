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
import { customersList } from "../utils/mock";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        <Router>
          <Header />
          <Switch>
            <Route path="/:id/campaigns/:campaignId">
              <Campaign
                customers={customers}
                addAttachment={addAttachment}
                deleteAttachment={deleteAttachment}
                updateDescription={updateDescription}
                updateCampaignName={updateCampaignName}
              />
            </Route>
            <Route path="/:id/campaigns">
              <Campaigns
                customers={customers}
                markCampaignActive={markCampaignActive}
                markCampaignCompleted={markCampaignCompleted}
              />
            </Route>
            <Route path="/">
              <Dashboard
                addCustomer={addCustomer}
                removeCustomer={removeCustomer}
                markCompleted={markCompleted}
                markActive={markActive}
                customers={customers}
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};
