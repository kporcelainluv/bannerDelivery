import React, { useState } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { CheckmarkCircle2Outline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkCircle2Outline";
import { CloseOutline as CLoseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";
import { Input, Label, Textarea } from "@rebass/forms/styled-components";

import styled, { useTheme } from "styled-components";
import { Paper } from "../Paper";
import { Task } from "./Task";
import { CampaignName } from "./CampaignName";

export const Campaign = ({
  customer,
  addAttachment,
  campaign,
  deleteAttachment,
  updateDescription,
  updateCampaignName
}) => {
  const [name, setName] = useState(campaign.name);

  return (
    <Box>
      <ReturnToDashboard />
      <CampaignName
        name={name}
        setName={setName}
        campaign={campaign}
        customer={customer}
        updateCampaignName={updateCampaignName}
      />
      <Paper>
        <Task
          campaign={campaign}
          addAttachment={addAttachment}
          customer={customer}
          deleteAttachment={deleteAttachment}
          updateDescription={updateDescription}
        />
      </Paper>
    </Box>
  );
};

const ReturnToDashboard = () => {
  return (
    <Box width="100%" maxWidth="1136px" margin="40px auto">
      <Button
        display="flex"
        flexDirection="row"
        alignItems="center"
        variant="none"
        backgroundColor="transparent"
        border="none"
        p={0}
      >
        <Text as="span" fontSize={1} color="grey300" paddingLeft="5px">
          Back to dashboard
        </Text>
      </Button>
    </Box>
  );
};
