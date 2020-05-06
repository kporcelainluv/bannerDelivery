import React, { useState } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { CheckmarkCircle2Outline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkCircle2Outline";
import { Input } from "@rebass/forms/styled-components";

import styled, { useTheme } from "styled-components";
import { Paper } from "./Paper";

const StyledCheckmark = styled(CheckmarkIcon)`
  display: none;
  height: 32px;
  width: 32px;
  margin: 0 8px;
  fill: ${p => p.theme.colors.grey000};
  input:focus && {
    display: block;
  }
`;

const StyledInput = styled(Input)`
  height: 56px;
  width: 378px;
  padding: 0 0 0 24px;
  font-size: ${p => p.theme.fontSizes[3]}px;
  font-weight: bold;
  color: ${p => p.theme.colors.grey000};
  border-radius: 4px;
  border: none;
  &&:focus {
    background-color: ${p => p.theme.colors.grey500};
  }
  &&:focus + svg {
    display: block;
  }
`;

export const Campaign = ({ campaign }) => {
  const theme = useTheme();

  const [name, setName] = useState(campaign.name);

  return (
    <Box>
      <ReturnToDashboard />
      <HandleChangeCampaignName name={name} setName={setName} />
      <Paper></Paper>
    </Box>
  );
};

const HandleChangeCampaignName = ({ setName, name }) => {
  const theme = useTheme();
  return (
    <Box maxWidth="1136px" width="100%" margin="40px auto 0">
      <Flex as="form" sx={{ position: "relative" }} alignItems="center">
        <StyledInput
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <StyledCheckmark
          onClick={() => {
            setName(name);
          }}
        />
      </Flex>
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
