import React, { useState, Fragment } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid/Search";
import { CheckBoxOutlineBlank as OutlineIcon } from "@styled-icons/material-outlined/CheckBoxOutlineBlank";
import { CheckBox as CheckboxIcon } from "@styled-icons/material-outlined/CheckBox";
import { Bin as BinIcon } from "@styled-icons/icomoon/Bin";
import { Edit as EditIcon } from "@styled-icons/material/Edit";
import { Input } from "@rebass/forms";
import styled, { useTheme } from "styled-components";

import { Popup } from "./Popup";
import { PageName } from "./PageName";

const StyledSearch = styled(SearchIcon)`
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

const ActionButtons = ({ theme, status, removeCustomer, customer }) => {
  const getColor = () => {
    return status === "active" ? theme.colors.orange200 : theme.colors.grey300;
  };
  return (
    <Box display="flex" flexDirection="row" marginLeft="30px">
      <ActionButton
        variant="none"
        onClick={() => removeCustomer(customer)}
        disabled={status !== "active"}
      >
        <BinIcon height="14px" width="14px" fill={getColor()} />
        <Text display="inline-block" padding="0 10px" color={getColor()}>
          Delete
        </Text>
      </ActionButton>
      <ActionButton variant="none">
        <EditIcon height="16px" width="16px" fill={getColor()} />
        <Text display="inline-block" padding="0 10px" color={getColor()}>
          Edit
        </Text>
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
  markCompleted,
  markActive
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
                p="12px 0 12px 24px"
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
                {status === "active" ? (
                  <OutlineIcon
                    height="24px"
                    width="24px"
                    fill={theme.colors.orange200}
                    onClick={() => {
                      markCompleted(customer);
                    }}
                  />
                ) : (
                  <CheckboxIcon
                    height="24px"
                    width="24px"
                    fill={theme.colors.grey300}
                    onClick={() => {
                      markActive(customer);
                    }}
                  />
                )}

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
        <PlusIcon height="25px" width="25px" />
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
  markCompleted,
  markActive
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
          <PlusIcon height="24px" width="24px" />
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
            markActive={markActive}
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
  markActive,
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
            markActive={markActive}
          />
        )}
      </Flex>
      {popup && <Popup handleClose={handleClose} addCustomer={addCustomer} />}
    </Box>
  );
};
