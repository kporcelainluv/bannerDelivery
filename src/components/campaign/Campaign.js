import React, { useState } from "react";
import { Button, Text, Box } from "rebass/styled-components";

import { Paper } from "../Paper";
import { Task } from "./Task";
import { CampaignName } from "./CampaignName";
import { Materials } from "./Materials";

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
      <Box width="1136px" m={"0 auto"}>
        <Paper width="848px" margin={"20px 0"}>
          <Task
            campaign={campaign}
            addAttachment={addAttachment}
            customer={customer}
            deleteAttachment={deleteAttachment}
            updateDescription={updateDescription}
          />
        </Paper>
        <Paper width="848px" margin={"20px 0"}>
          <Materials campaign={campaign} customer={customer} />
        </Paper>
      </Box>
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
