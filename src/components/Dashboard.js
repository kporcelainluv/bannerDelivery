import React, { useState, Fragment } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { CheckmarkOutline } from "@styled-icons/evaicons-outline/CheckmarkOutline";
import { Bin } from "@styled-icons/icomoon/Bin";
import { Edit } from "@styled-icons/material/Edit";
import { Input } from "@rebass/forms";
import styled, { useTheme } from "styled-components";

import { Popup } from "./Popup";
import { PageName } from "./PageName";

const StyledSearch = styled(Search)`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 13px;
  left: 15px;
  color: ${props => props.theme.colors.grey200};
`;

const ActionButton = styled(Button)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
`;

const ActionText = styled(Text)`
  display: inline-block;
  padding: 0 10px;
  color: ${p => p.theme.colors.orange200};
`;

const ActionButtons = ({ theme, status, removeCustomer, customer }) => {
  return (
    <Box display="flex" flexDirection="row" marginLeft="30px">
      <ActionButton
        variant="none"
        onClick={() => removeCustomer(customer)}
        disabled={status !== "active"}
      >
        <Bin height="14px" width="14px" fill={theme.colors.orange200} />
        <ActionText>Delete</ActionText>
      </ActionButton>
      <ActionButton variant="none">
        <Edit height="16px" width="16px" fill={theme.colors.orange200} />
        <ActionText>Edit</ActionText>
      </ActionButton>
    </Box>
  );
};

const CustomersList = ({
  theme,
  customers,
  listName,
  status,
  removeCustomer,
  markCompleted
}) => {
  return (
    <Fragment>
      <Box padding="30px 0">
        <Heading
          as="h3"
          fontSize={1}
          color={status === "active" ? "grey000" : "grey300"}
          fontWeight="bold"
          padding="0 74px"
        >
          {listName}
        </Heading>
        <Flex flexDirection="column">
          {customers.map(customer => {
            return (
              <Flex
                key={customer.name}
                margin="10px 0 0"
                p="12px 0 12px 52px"
                alignItems="center"
                sx={
                  status === "active"
                    ? {
                        ":hover": {
                          backgroundColor: "grey500"
                        }
                      }
                    : {}
                }
              >
                <CheckmarkOutline
                  height="24px"
                  width="24px"
                  fill={
                    status === "active"
                      ? theme.colors.orange200
                      : theme.colors.grey300
                  }
                  onClick={() => {
                    console.log("clicked");
                    markCompleted(customer);
                  }}
                />
                <Heading
                  as="h4"
                  fontSize={1}
                  color={status === "active" ? "grey000" : "grey300"}
                  fontWeight="normal"
                  padding="0 0 0 24px"
                >
                  {customer.name}
                </Heading>
                <ActionButtons
                  status={status}
                  theme={theme}
                  removeCustomer={removeCustomer}
                  customer={customer}
                />
              </Flex>
            );
          })}
        </Flex>
      </Box>
      {status === "active" && <hr />}
    </Fragment>
  );
};
const DashboardEmpty = ({ setPopup }) => {
  return (
    <Fragment>
      <Button
        variant="primary"
        onClick={() => {
          setPopup(true);
        }}
        sx={{
          borderRadius: "24px"
        }}
      >
        <Plus height="25px" width="25px" />
        Add First Customer
      </Button>
      <Text margin="16px 0 0" color="grey300" fontSize={1}>
        List of your customers will be here
      </Text>
    </Fragment>
  );
};

const DashboardActive = ({
  theme,
  customers,
  setPopup,
  removeCustomer,
  markCompleted
}) => {
  const activeCustomers = customers.filter(
    customer => customer.status === "active"
  );

  const completedCustomers = customers.filter(
    customer => customer.status === "completed"
  );

  const customersTypes = [
    { name: "Active customers", status: "active", customers: activeCustomers },
    {
      name: "Completed customers",
      status: "completed",
      customers: completedCustomers
    }
  ];

  return (
    <Box>
      <Flex justifyContent="space-between" margin="24px">
        <Flex as="form" sx={{ position: "relative" }}>
          <StyledSearch />
          <Input
            height="48px"
            width="376px"
            placeholder="Search customer"
            p="0 0 0 50px"
            sx={{
              borderRadius: "4px",
              backgroundColor: theme.colors.grey500,
              border: "none",
              color: theme.colors.grey200
            }}
          />
        </Flex>
        <Button
          width="186px"
          height="48px"
          variant="primary"
          borderRadius="4px"
          onClick={() => {
            setPopup(true);
          }}
        >
          <Plus height="24px" width="24px" />
          <Text p="0 0 0 10px">Add customer</Text>
        </Button>
      </Flex>
      {customersTypes.map(type => {
        return (
          <CustomersList
            key={type.name}
            customers={type.customers}
            listName={type.name}
            status={type.status}
            theme={theme}
            removeCustomer={removeCustomer}
            markCompleted={markCompleted}
          />
        );
      })}
    </Box>
  );
};

export const Dashboard = ({
  addCustomer,
  removeCustomer,
  markCompleted,
  customers
}) => {
  const theme = useTheme();
  const handleClose = () => {
    setPopup(false);
  };
  const [popup, setPopup] = useState(false);
  return (
    <Box sx={{ position: "relative" }}>
      <PageName name="Dashboard" />
      <Flex
        justifyContent={customers.length >= 1 ? "flex-start" : "center"}
        flexDirection="column"
        alignItems={customers.length >= 1 ? "" : "center"}
        width="100%"
        maxWidth="1136px"
        height={customers.length >= 1 ? "660px" : "146px"}
        m="40px auto 0"
        p={customers.length > 1 ? "0" : "20 0 0"}
        backgroundColor="grey700"
        sx={{
          borderRadius: "16px",
          boxShadow: "large"
        }}
      >
        {customers.length < 1 && <DashboardEmpty setPopup={setPopup} />}
        {customers.length > 0 && (
          <DashboardActive
            theme={theme}
            customers={customers}
            setPopup={setPopup}
            removeCustomer={removeCustomer}
            markCompleted={markCompleted}
          />
        )}
      </Flex>
      {popup && <Popup handleClose={handleClose} addCustomer={addCustomer} />}
    </Box>
  );
};
