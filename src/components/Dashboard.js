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
import { STATUS } from "../utils/utils";

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

const ActionButtons = ({ status, removeCustomer, customer }) => {
  const theme = useTheme();
  const color =
    status === STATUS.ACTIVE ? theme.colors.orange200 : theme.colors.grey300;

  return (
    <Box display="flex" flexDirection="row" marginLeft="30px">
      <ActionButton
        variant="none"
        onClick={() => removeCustomer(customer)}
        disabled={status !== STATUS.ACTIVE}
      >
        <BinIcon height="14px" width="14px" fill={color} />
        <Text display="inline-block" padding="0 10px" color={color}>
          Delete
        </Text>
      </ActionButton>
      <ActionButton variant="none">
        <EditIcon height="16px" width="16px" fill={color} />
        <Text display="inline-block" padding="0 10px" color={color}>
          Edit
        </Text>
      </ActionButton>
    </Box>
  );
};

const CustomersList = ({
  customers,
  listName,
  status,
  removeCustomer,
  markCompleted,
  markActive
}) => {
  const theme = useTheme();

  return (
    <Fragment>
      <Box padding="30px 0">
        <Heading
          as="h3"
          fontSize={1}
          color={status === STATUS.ACTIVE ? "grey000" : "grey300"}
          fontWeight="bold"
          padding="0 74px"
        >
          {listName}
        </Heading>
        <Flex flexDirection="column">
          {customers.map(customer => {
            return (
              <Flex
                key={customer.id}
                margin="10px 0 0"
                p="12px 0 12px 24px"
                alignItems="center"
                sx={
                  status === STATUS.ACTIVE
                    ? {
                        ":hover": {
                          backgroundColor: "grey500"
                        }
                      }
                    : {}
                }
              >
                {status === STATUS.ACTIVE ? (
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
                  color={status === STATUS.ACTIVE ? "grey000" : "grey300"}
                  fontWeight="normal"
                  padding="0 0 0 24px"
                >
                  {customer.name}
                </Heading>
                <ActionButtons
                  status={status}
                  removeCustomer={removeCustomer}
                  customer={customer}
                />
              </Flex>
            );
          })}
        </Flex>
      </Box>
      {status === STATUS.ACTIVE && <hr />}
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
  customers,
  setPopup,
  removeCustomer,
  markCompleted,
  markActive
}) => {
  const theme = useTheme();

  const activeCustomers = customers.filter(
    customer => customer.status === STATUS.ACTIVE
  );

  const completedCustomers = customers.filter(
    customer => customer.status === STATUS.COMPLETED
  );

  const customersTypes = [
    {
      name: "Active customers",
      status: STATUS.ACTIVE,
      customers: activeCustomers
    },
    {
      name: "Completed customers",
      status: STATUS.COMPLETED,
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