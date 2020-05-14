import React from "react";
import { Box, Flex } from "rebass/styled-components";
import styled from "styled-components";
import { CheckmarkCircle2Outline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkCircle2Outline";
import { Input } from "@rebass/forms/styled-components";

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

export const CampaignName = ({
  setName,
  name,
  campaign,
  customer,
  updateCampaignName
}) => {
  return (
    <Box maxWidth="1136px" width="100%" margin="40px auto 0">
      <Flex as="form" sx={{ position: "relative" }} alignItems="center">
        <StyledInput
          value={name}
          onChange={e => {
            setName(e.target.value);
            updateCampaignName(campaign, customer, e.target.value);
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
