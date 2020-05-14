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

import { Link } from "react-router-dom";

import { Paper } from "./Paper";
import { AddClientPopup } from "./popups/AddClientPopup";
import { PageName } from "./PageName";
import { STATUS } from "../utils/consts";

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

const EmptyPaper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1136px;
  margin: 40px auto 0;
  background-color: ${p => p.theme.colors.grey700};
  border-radius: 16px;
  box-shadow: ${p => p.theme.shadows.large};
  justify-content: center;
  align-items: center;
  padding: 20px 0 0;
  height: 146px;
`;

const StyledOutlineIcon = styled(OutlineIcon)`
  height: 24px;
  width: 24px;
  fill: ${p => p.theme.colors.orange200};
  cursor: pointer;
  &&:hover {
    fill: ${p => p.theme.colors.orange100};
  }
`;

const StyledCheckboxIcon = styled(CheckboxIcon)`
  height: 24px;
  width: 24px;
  fill: ${p => p.theme.colors.grey300};
  cursor: pointer;
  &&:hover {
    fill: ${p => p.theme.colors.grey100};
  }
`;

export const Dashboard = ({
  addCustomer,
  removeCustomer,
  toggleCustomerStatus,
  customers
}) => {
  const handleClose = () => {
    setPopup(false);
  };

  const [popup, setPopup] = useState(false);
  return (
    <Box sx={{ position: "relative" }} width="100%" height="100%" p="0 20px">
      <PageName name="Dashboard" />

      {customers.length > 0 ? (
        <Paper width="1136px" margin="40px auto">
          <DashboardActive
            customers={customers}
            setPopup={setPopup}
            removeCustomer={removeCustomer}
            toggleCustomerStatus={toggleCustomerStatus}
          />
        </Paper>
      ) : (
        <EmptyPaper>
          <DashboardEmpty setPopup={setPopup} />
        </EmptyPaper>
      )}

      {popup && (
        <AddClientPopup handleClose={handleClose} addCustomer={addCustomer} />
      )}
    </Box>
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
  toggleCustomerStatus
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
            toggleCustomerStatus={toggleCustomerStatus}
          />
        );
      })}
    </Box>
  );
};

const CustomersList = ({
  customers,
  listName,
  status,
  removeCustomer,
  toggleCustomerStatus
}) => {
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
            const id = customer.id;
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
                  <StyledOutlineIcon
                    onClick={() => {
                      toggleCustomerStatus(customer, STATUS.COMPLETED);
                    }}
                  />
                ) : (
                  <StyledCheckboxIcon
                    onClick={() => {
                      toggleCustomerStatus(customer, STATUS.ACTIVE);
                    }}
                  />
                )}
                <Link to={`${id}/campaigns`} style={{ textDecoration: "none" }}>
                  <Heading
                    as="h4"
                    fontSize={1}
                    color={status === STATUS.ACTIVE ? "grey000" : "grey300"}
                    fontWeight="normal"
                    padding="0 0 0 24px"
                  >
                    {customer.name}
                  </Heading>
                </Link>
                {status === STATUS.ACTIVE && (
                  <ActionButtons
                    status={status}
                    removeCustomer={removeCustomer}
                    customer={customer}
                  />
                )}
              </Flex>
            );
          })}
        </Flex>
      </Box>

      {status === STATUS.ACTIVE && <hr />}
    </Fragment>
  );
};
const ActionButtons = ({ status, removeCustomer, customer }) => {
  const theme = useTheme();
  const color =
    status === STATUS.ACTIVE ? theme.colors.orange200 : theme.colors.grey300;

  return (
    <Flex flexDirection="row" marginLeft="30px">
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
    </Flex>
  );
};
