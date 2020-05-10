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

const StyledSearch = styled(SearchIcon)`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 13px;
  left: 15px;
  color: ${props => props.theme.colors.grey200};
`;

export const Campaigns = ({
  customers,
  markCampaignActive,
  markCampaignCompleted
}) => {
  const { id } = useParams();
  const customer = customers.filter(c => c.id === id)[0];
  const [displayedCampaigns, setDisplayedCampaigns] = useState("active");
  const theme = useTheme();

  const tabButtons = [
    { id: nanoid(), name: "Active", status: STATUS.ACTIVE },
    { id: nanoid(), name: "Completed", status: STATUS.COMPLETED }
  ];

  const activeCampaigns = customer.campaigns.filter(
    c => c.status === STATUS.ACTIVE
  );
  const completedCampaigns = customer.campaigns.filter(
    c => c.status === STATUS.COMPLETED
  );

  const displayedCampaign =
    displayedCampaigns === STATUS.ACTIVE ? activeCampaigns : completedCampaigns;

  const getTabColor = status => {
    return displayedCampaigns === status ? "orange100" : "grey200";
  };

  const getBorderColor = status => {
    return displayedCampaigns === status
      ? `2px solid ${theme.colors.orange100}`
      : "2px transparent";
  };

  const campaignNameColor =
    displayedCampaigns === STATUS.ACTIVE ? "grey000" : "grey200";

  return (
    <Box sx={{ position: "relative" }} width="100%" height="100%">
      <PageName name={customer.name} />
      <ReturnToDashboard />
      <Paper>
        <Flex justifyContent="space-between" margin="24px">
          <Flex as="form" sx={{ position: "relative" }}>
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
          </Flex>
        </Flex>
        <Flex padding="30px 0 10px 60px">
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
                      borderBottom: getBorderColor(button.status)
                    }}
                  >
                    {button.name}
                  </Text>
                </Button>
              </Fragment>
            );
          })}
        </Flex>
        <Box>
          {displayedCampaign.map(c => {
            return (
              <Flex
                key={c.id}
                padding="15px 0 15px 30px"
                alignItems="center"
                sx={{
                  ":hover": {
                    backgroundColor: "grey500"
                  }
                }}
              >
                {displayedCampaigns === STATUS.ACTIVE ? (
                  <OutlineIcon
                    height="24px"
                    width="24px"
                    fill={theme.colors.grey000}
                    onClick={() => {
                      markCampaignCompleted(customer, c.id);
                    }}
                  />
                ) : (
                  <CheckboxIcon
                    height="24px"
                    width="24px"
                    fill={theme.colors.grey200}
                    onClick={() => {
                      markCampaignActive(customer, c.id);
                    }}
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
    </Box>
  );
};

const ReturnToDashboard = () => {
  const theme = useTheme();
  return (
    <Box width="100%" maxWidth="1136px" margin="40px auto">
      <Link
        to={`/`}
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center"
        }}
      >
        <ArrowBackIcon
          height={"24px"}
          width="24px"
          fill={theme.colors.grey300}
        />
        <Text as="span" fontSize={1} color="grey300" paddingLeft="5px">
          Back to dashboard
        </Text>
      </Link>
    </Box>
  );
};
