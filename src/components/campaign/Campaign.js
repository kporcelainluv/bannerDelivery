import React, { useState } from "react";
import { Text, Box, Flex } from "rebass/styled-components";
import { Home as HomeIcon } from "@styled-icons/boxicons-solid/Home";
import { ArrowIosForwardOutline as ArrowIcon } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { ArrowBack as ArrowBackIcon } from "@styled-icons/boxicons-regular/ArrowBack";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Paper } from "../Paper";
import { Task } from "./Task";
import { CampaignName } from "./CampaignName";
import { Materials } from "./Materials";
import { useTheme } from "styled-components";

const Arrow = styled(ArrowIcon)`
  height: 20px;
  width: 20px;
  fill: ${p => p.theme.colors.grey300};
  margin-top: 3px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  &&:hover {
    span,
    svg {
      color: ${p => p.theme.colors.orange100};
      fill: ${p => p.theme.colors.orange100};
    }
  }
`;

export const Campaign = ({
  customers,
  addAttachment,
  deleteAttachment,
  addMessage,
  updateCampaign
}) => {
  const { id, campaignId } = useParams();
  const customer = customers.filter(c => c.id === id)[0];
  const campaign = customer.campaigns.filter(c => c.id === campaignId)[0];
  const [name, setName] = useState(campaign.name);

  return (
    <Box p="0 20px">
      <ReturnToDashboard
        customerName={customer.name}
        campaignName={campaign.name}
        id={id}
      />
      <CampaignName
        name={name}
        setName={setName}
        campaign={campaign}
        customer={customer}
        updateCampaign={updateCampaign}
      />
      <Box
        width="100%"
        m={"0 auto"}
        sx={{
          "@media screen and (min-width: 1200px)": {
            width: "1136px"
          }
        }}
      >
        <Paper
          width="848px"
          margin={"20px 0"}
          sx={{
            "@media screen and (min-width: 1200px)": {
              width: "848px"
            }
          }}
        >
          <Task
            campaign={campaign}
            addAttachment={addAttachment}
            customer={customer}
            deleteAttachment={deleteAttachment}
            updateCampaign={updateCampaign}
          />
        </Paper>
        <Paper width="848px" margin={"20px 0"}>
          <Materials
            campaign={campaign}
            customer={customer}
            addMessage={addMessage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

const ReturnToDashboard = ({ customerName, campaignName, id }) => {
  const theme = useTheme();
  return (
    <Flex width="100%" maxWidth="1136px" margin="40px auto">
      <Box
        display="none"
        sx={{
          "@media screen and (min-width: 1200px)": {
            display: "flex"
          }
        }}
      >
        <StyledLink to={`/`}>
          <HomeIcon height="15px" width="20px" fill={theme.colors.grey300} />
          <Text as="span" fontSize={1} color="grey300" paddingLeft="5px">
            Dashboard
          </Text>
        </StyledLink>
        <Arrow />
        <StyledLink to={`/${id}/campaigns`}>
          <Text as="span" fontSize={1} color="grey300" paddingLeft="5px">
            {customerName}
          </Text>
        </StyledLink>
        <Arrow />
        <Text
          as="span"
          fontSize={1}
          color="grey300"
          paddingLeft="5px"
          display="flex"
          alignItems="center"
        >
          {campaignName}
        </Text>
      </Box>
      <Box
        display="block"
        sx={{
          "@media screen and (min-width: 1200px)": {
            display: "none"
          }
        }}
      >
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
            Back to {customerName}
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};
