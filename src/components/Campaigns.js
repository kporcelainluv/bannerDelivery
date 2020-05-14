import React, { useState, Fragment } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { Input } from "@rebass/forms/styled-components";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid/Search";
import { CheckBoxOutlineBlank as OutlineIcon } from "@styled-icons/material-outlined/CheckBoxOutlineBlank";
import { CheckBox as CheckboxIcon } from "@styled-icons/material-outlined/CheckBox";
import { ArrowBack as ArrowBackIcon } from "@styled-icons/boxicons-regular/ArrowBack";
import styled, { useTheme } from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { nanoid } from "nanoid";
import { PageName } from "./PageName";
import { Paper } from "./Paper";
import { STATUS } from "../utils/consts";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { AddCampaignPopup } from "./popups/AddCampaignPopup";

const StyledSearch = styled(SearchIcon)`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 13px;
  left: 15px;
  color: ${props => props.theme.colors.grey200};
`;
const StyledOutlineIcon = styled(OutlineIcon)`
  height: 24px;
  width: 24px;
  fill: ${p => p.theme.colors.grey300};
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

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 200px;
  &&:hover {
    span,
    svg {
      color: ${p => p.theme.colors.orange100};
      fill: ${p => p.theme.colors.orange100};
    }
  }
`;

export const Campaigns = ({ customers, addCampaign, toggleCampaignStatus }) => {
  const { id } = useParams();
  const customer = customers.filter(c => c.id === id)[0];
  const [displayedCampaigns, setDisplayedCampaigns] = useState("active");
  const [popup, setPopup] = useState(false);
  const theme = useTheme();

  const tabButtons = [
    { id: nanoid(), name: "Active", status: STATUS.ACTIVE },
    { id: nanoid(), name: "Completed", status: STATUS.COMPLETED }
  ];

  const handleClose = () => {
    setPopup(false);
  };

  const getTabColor = status => {
    return displayedCampaigns === status ? "orange100" : "grey200";
  };

  const getBorderColor = status => {
    return displayedCampaigns === status
      ? `2px solid ${theme.colors.orange100}`
      : "2px transparent";
  };

  if (!customer.campaigns) {
    return (
      <EmptyCampaigns
        setPopup={setPopup}
        customer={customer}
        popup={popup}
        handleClose={handleClose}
        addCampaign={addCampaign}
      />
    );
  }

  const campaignNameColor =
    displayedCampaigns === STATUS.ACTIVE ? "grey000" : "grey200";

  const activeCampaigns =
    customer.campaigns.filter(c => c.status === STATUS.ACTIVE) || [];
  const completedCampaigns =
    customer.campaigns.filter(c => c.status === STATUS.COMPLETED) || [];

  const displayedCampaign =
    displayedCampaigns === STATUS.ACTIVE ? activeCampaigns : completedCampaigns;

  return (
    <Box sx={{ position: "relative" }} width="100%" height="100%" p="0 20px">
      <PageName name={customer.name} />
      <ReturnToDashboard />
      <Paper margin="0 auto" width="1136px">
        <Box
          justifyContent="center"
          display="flex"
          sx={{
            "@media screen and (min-width: 1200px)": {
              margin: "24px",
              justifyContent: "space-between"
            }
          }}
        >
          <Box
            as="form"
            display="none"
            sx={{
              position: "relative",
              "@media screen and (min-width: 1200px)": {
                display: "flex"
              }
            }}
          >
            <StyledSearch />
            <Input
              height="48px"
              width="376px"
              placeholder="Search campaign"
              p="0 0 0 50px"
              sx={{
                borderRadius: "4px",
                backgroundColor: theme.colors.grey500,
                border: "none",
                color: theme.colors.grey200
              }}
            />
          </Box>
          <AddCampaignBtn setPopup={setPopup} />
        </Box>
        <Flex
          padding="30px 0 10px 15px"
          sx={{
            "@media screen and (min-width: 1200px)": {
              padding: "30px 0 10px 60px"
            }
          }}
        >
          {tabButtons.map(button => {
            return (
              <Fragment key={button.name}>
                <Button
                  variant="none"
                  backgroundColor="transparent"
                  padding="10px 15px"
                  onClick={() => {
                    setDisplayedCampaigns(button.status);
                  }}
                >
                  <Text
                    as="span"
                    fontSize={1}
                    fontWeight="bold"
                    p="2px 0"
                    color={getTabColor(button.status)}
                    sx={{
                      borderBottom: getBorderColor(button.status),
                      ":hover": {
                        color: theme.colors.orange200
                      }
                    }}
                  >
                    {button.name}
                  </Text>
                </Button>
              </Fragment>
            );
          })}
        </Flex>
        <Box
          mb="50px"
          sx={{
            "@media screen and (min-width: 1200px)": {
              marginBottom: "0"
            }
          }}
        >
          {displayedCampaign.map(c => {
            return (
              <Flex
                key={c.id}
                padding="15px 0 15px 12px"
                alignItems="center"
                sx={{
                  ":hover": {
                    backgroundColor: "grey500"
                  }
                }}
              >
                {displayedCampaigns === STATUS.ACTIVE ? (
                  <StyledOutlineIcon
                    onClick={() =>
                      toggleCampaignStatus(customer, c.id, STATUS.COMPLETED)
                    }
                  />
                ) : (
                  <StyledCheckboxIcon
                    onClick={() =>
                      toggleCampaignStatus(customer, c.id, STATUS.ACTIVE)
                    }
                  />
                )}
                <Box>
                  <Link
                    to={`/${id}/campaigns/${c.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Heading
                      as="h3"
                      fontSize={1}
                      color={campaignNameColor}
                      paddingLeft="20px"
                      fontWeight="normal"
                      sx={{
                        lineHeight: "24px"
                      }}
                    >
                      {c.name}
                    </Heading>
                    <Text
                      color="grey200"
                      paddingLeft="20px"
                      fontSize={0}
                      sx={{
                        lineHeight: "16px"
                      }}
                    >
                      {c.date}
                    </Text>
                  </Link>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Paper>
      {popup && (
        <AddCampaignPopup
          handleClose={handleClose}
          addCampaign={addCampaign}
          customer={customer}
        />
      )}
    </Box>
  );
};

const ReturnToDashboard = () => {
  const theme = useTheme();
  return (
    <Box width="100%" maxWidth="1136px" margin="40px auto">
      <StyledLink to={`/`}>
        <ArrowBackIcon height="24px" width="24px" fill={theme.colors.grey300} />
        <Text as="span" fontSize={1} color="grey300" paddingLeft="5px">
          Back to dashboard
        </Text>
      </StyledLink>
    </Box>
  );
};

const AddCampaignBtn = ({ setPopup }) => {
  return (
    <Button
      variant="primary"
      onClick={() => {
        setPopup(true);
      }}
      sx={{
        position: "absolute",
        bottom: "0",
        borderRadius: "24px",
        "@media screen and (min-width: 1200px)": {
          position: "relative"
        }
      }}
    >
      <PlusIcon height="25px" width="25px" />

      <Text as="span">Add Campaign</Text>
    </Button>
  );
};

const EmptyCampaigns = ({
  customer,
  setPopup,
  popup,
  handleClose,
  addCampaign
}) => {
  return (
    <Box sx={{ position: "relative" }} width="100%" height="100%" p="0 20px">
      <PageName name={customer.name} />
      <ReturnToDashboard />
      <Flex
        flexDirection="column"
        maxWidth="1136px"
        margin="40px auto"
        width="100%"
      >
        <Heading as="h2" fontSize={2} color="grey000" mb="50px">
          There are no campaigns here
        </Heading>
        <Button
          variant="primary"
          onClick={() => {
            setPopup(true);
          }}
          m={"0 auto"}
          sx={{
            borderRadius: "24px",
            "@media screen and (min-width: 1200px)": {
              position: "relative"
            }
          }}
        >
          <PlusIcon height="25px" width="25px" />

          <Text as="span">Add Campaign</Text>
        </Button>
      </Flex>
      {popup && (
        <AddCampaignPopup
          handleClose={handleClose}
          addCampaign={addCampaign}
          customer={customer}
        />
      )}
    </Box>
  );
};
