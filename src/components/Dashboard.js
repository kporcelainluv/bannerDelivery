import React, { useState, Fragment } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid/Search";
import { CheckBoxOutlineBlank as OutlineIcon } from "@styled-icons/material-outlined/CheckBoxOutlineBlank";
import { CheckBox as CheckboxIcon } from "@styled-icons/material-outlined/CheckBox";
import { DotsVerticalRounded as DotsIcon } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
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
  display: none;
  color: ${props => props.theme.colors.grey200};
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    display: block;
  }
`;

const ActionButton = styled(Button)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  &&:hover {
    svg,
    span {
      color: ${p => p.theme.colors.orange100};
      fill: ${p => p.theme.colors.orange100};
    }
  }
`;

const EmptyPaper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1136px;
  margin: 40px auto 0;
  background-color: transparent;
  border-radius: 16px;
  box-shadow: ${p => p.theme.shadows.large};
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  height: 146px;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    padding: 20px 0 0;
    background-color: ${p => p.theme.colors.grey700};
  }
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
    <Flex
      flexDirection="column-reverse"
      sx={{
        "@media screen and (min-width: 1200px)": {
          flexDirection: "column"
        }
      }}
    >
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
        <Text
          as="span"
          display="inline-block"
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "none"
            }
          }}
        >
          Add Customer
        </Text>
        <Text
          as="span"
          display="none"
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "inline-block"
            }
          }}
        >
          Add First Customer
        </Text>
      </Button>
      <Text as="p" margin="16px 0" color="grey300" fontSize={1}>
        List of your customers will be here
      </Text>
    </Flex>
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
      <Flex
        justifyContent="center"
        m="0"
        sx={{
          "@media screen and (min-width: 1200px)": {
            justifyContent: "space-between",
            margin: "24px"
          }
        }}
      >
        <Flex
          as="form"
          display="none"
          sx={{
            position: "relative"
          }}
        >
          <StyledSearch />
          <Input
            height="48px"
            width="376px"
            placeholder="Search customer"
            p="0 0 0 50px"
            display="none"
            sx={{
              borderRadius: "4px",
              backgroundColor: theme.colors.grey500,
              border: "none",
              color: theme.colors.grey200,
              "@media screen and (min-width: 1200px)": {
                display: "block"
              }
            }}
          />
        </Flex>
        <Button
          width="188px"
          height="48px"
          variant="primary"
          borderRadius="4px"
          onClick={() => {
            setPopup(true);
          }}
          sx={{
            position: "absolute",
            bottom: 0,
            "@media screen and (min-width: 1200px)": {
              position: "relative"
            }
          }}
        >
          <PlusIcon height="24px" width="24px" />
          <Text as="span" p="0 0 0 10px">
            Add customer
          </Text>
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

const StyledCustomerContainer = styled(Flex)`
  margin: 10px 0 0;
  padding: 12px 0 12px 0;
  align-items: center;
  &&:hover {
    background-color: ${({ status }) =>
      (status === "active" && "#3F4C5C") || (status === "completed" && "none")};
  }
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    padding: 12px 0 12px 24px;
    background-color: ${p => p.theme.colors.grey700};
  }
`;

const CustomersList = ({
  customers,
  listName,
  status,
  removeCustomer,
  toggleCustomerStatus
}) => {
  return (
    <Fragment>
      {customers.length > 0 && (
        <Box padding="30px 0">
          <Heading
            as="h3"
            fontSize={1}
            color={status === STATUS.ACTIVE ? "grey000" : "grey300"}
            fontWeight="bold"
            padding="0 30px"
            sx={{
              "@media screen and (min-width: 1200px)": {
                padding: "0 74px"
              }
            }}
          >
            {listName}
          </Heading>
          <Flex
            flexDirection="column"
            maxHeight="190px"
            overflowY="scroll"
            sx={{
              "@media screen and (min-width: 1200px)": {
                maxHeight: "100%"
              }
            }}
          >
            {customers.map(customer => {
              const id = customer.id;
              return (
                <StyledCustomerContainer key={customer.id} status={status}>
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
                  <Link
                    to={`${id}/campaigns`}
                    style={{ textDecoration: "none" }}
                  >
                    <Heading
                      as="h4"
                      fontSize={1}
                      color={status === STATUS.ACTIVE ? "grey000" : "grey300"}
                      fontWeight="normal"
                      padding="0 0 0 24px"
                      maxWidth="300px"
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
                </StyledCustomerContainer>
              );
            })}
          </Flex>
        </Box>
      )}

      {customers.length > 0 && status === STATUS.ACTIVE && <hr />}
    </Fragment>
  );
};
const ActionButtons = ({ status, removeCustomer, customer }) => {
  const theme = useTheme();
  const color =
    status === STATUS.ACTIVE ? theme.colors.orange200 : theme.colors.grey300;

  return (
    <Flex
      flexDirection="row"
      marginLeft="auto"
      sx={{
        "@media screen and (min-width: 1200px)": {
          marginLeft: "30px"
        }
      }}
    >
      <ActionButton
        variant="none"
        onClick={() => removeCustomer(customer)}
        disabled={status !== STATUS.ACTIVE}
      >
        <BinIcon height="14px" width="14px" fill={color} />
        <Text
          as="span"
          padding="0 10px"
          color={color}
          display="none"
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "inline-block"
            }
          }}
        >
          Delete
        </Text>
      </ActionButton>
      <ActionButton variant="none">
        <EditIcon height="16px" width="16px" fill={color} />
        <Text
          as="span"
          display="none"
          padding="0 10px"
          color={color}
          maxWidth="300px"
          sx={{
            wordBreak: "break-all",
            "@media screen and (min-width: 1200px)": {
              display: "inline-block"
            }
          }}
        >
          Edit
        </Text>
      </ActionButton>
    </Flex>
  );
};
