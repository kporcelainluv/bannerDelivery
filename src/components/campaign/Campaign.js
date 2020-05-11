import React, { useState } from "react";
import { Text, Box, Flex } from "rebass/styled-components";
import { Home as HomeIcon } from "@styled-icons/boxicons-solid/Home";
import { ArrowIosForwardOutline as ArrowIcon } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
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
`;

export const Campaign = ({
  customers,
  addAttachment,
  deleteAttachment,
  // updateDescription,
  // updateCampaignName,
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
      <Box width="1136px" m={"0 auto"}>
        <Paper width="848px" margin={"20px 0"}>
          <Task
            campaign={campaign}
            addAttachment={addAttachment}
            customer={customer}
            deleteAttachment={deleteAttachment}
            updateCampaign={updateCampaign}
          />
        </Paper>
        <Paper width="848px" margin={"20px 0"}>
          <Materials campaign={campaign} customer={customer} />
        </Paper>
      </Box>
    </Box>
  );
};

const ReturnToDashboard = ({ customerName, campaignName, id }) => {
  const theme = useTheme();
  return (
    <Flex width="100%" maxWidth="1136px" margin="40px auto">
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
    </Flex>
  );
};
