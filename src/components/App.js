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
import { customersList1, customersList2 } from "../utils/mock";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
  const [customers, setCustomers] = useState(customersList2);

  const addCustomer = name => {
    setCustomers(c => [
      ...c,
      { name: name, id: nanoid(), status: STATUS.ACTIVE }
    ]);
  };

  const removeCustomer = customer => {
    setCustomers(customers.filter(c => c.id !== customer.id));
  };

  const toggleCustomerStatus = (customer, status) => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return { ...c, status: status };
        }
        return c;
      })
    );
  };

  const toggleCampaignStatus = (customer, id, newStatus) => {
    const updatedCampaign = customer.campaigns.map(c => {
      if (id === c.id) {
        return { ...c, status: newStatus };
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
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: customer.campaigns.map(c => {
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
            })
          };
        }
        return c;
      })
    );
  };

  const addCampaign = (customer, campaignName) => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          if (c.campaigns) {
            return {
              ...c,
              campaigns: [
                ...c.campaigns,
                {
                  id: nanoid(),
                  name: campaignName,
                  status: "active",
                  date: new Date()
                    .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
                    .slice(0, 10)
                }
              ]
            };
          }
          return {
            ...c,
            campaigns: [
              {
                id: nanoid(),
                name: campaignName,
                status: "active",
                date: new Date()
                  .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
                  .slice(0, 10)
              }
            ]
          };
        }
        return c;
      })
    );
  };

  const deleteAttachment = (attachmentId, customer, campaign) => {
    const updatedCampaigns = customer.campaigns.map(c => {
      if (c.id === campaign.id) {
        return {
          ...c,
          attachments: campaign.attachments.filter(c => c.id !== attachmentId)
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

  const updateCampaign = (campaign, customer, type, newValue) => {
    setCustomers(
      customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            campaigns: customer.campaigns.map(c => {
              if (c.id === campaign.id) {
                return { ...c, [type]: newValue };
              }
              return c;
            })
          };
        }
        return c;
      })
    );
  };

  const addMessage = (customer, campaign, material, message) => {
    setCustomers(
      customers.map(cmr => {
        if (cmr.id === customer.id) {
          return {
            ...cmr,
            campaigns: cmr.campaigns.map(c => {
              if (c.id === campaign.id) {
                return {
                  ...c,
                  materials: c.materials.map(m => {
                    if (m.id === material.id) {
                      return {
                        ...m,
                        messagesList: [...m.messagesList, message]
                      };
                    }
                    return m;
                  })
                };
              }
              return c;
            })
          };
        }
        return cmr;
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
                updateCampaign={updateCampaign}
                addMessage={addMessage}
              />
            </Route>
            <Route path="/:id/campaigns">
              <Campaigns
                customers={customers}
                toggleCampaignStatus={toggleCampaignStatus}
                addCampaign={addCampaign}
              />
            </Route>
            <Route path="/">
              <Dashboard
                addCustomer={addCustomer}
                removeCustomer={removeCustomer}
                toggleCustomerStatus={toggleCustomerStatus}
                customers={customers}
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};
