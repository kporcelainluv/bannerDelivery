import React from "react";
import { Box, Flex, Heading } from "rebass/styled-components";
import styled, { useTheme } from "styled-components";
import { Input } from "@rebass/forms/styled-components";


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
`;

export const CampaignName = ({
  setName,
  name,
  campaign,
  customer,
  updateCampaign
}) => {
  const theme = useTheme();
  return (
    <Box maxWidth="1136px" width="100%" margin="40px auto 0">
      <Flex
        sx={{
          "@media screen and (min-width: 1200px)": {
            display: "none"
          }
        }}
      >
        <Heading as="h2" fontSize={2} color={theme.colors.grey000}>
          {name}
        </Heading>
      </Flex>
      <Box
        display="none"
        as="form"
        sx={{
          position: "relative",
          "@media screen and (min-width: 1200px)": {
            display: "flex",
            alignItems: "center"
          }
        }}
      >
        <StyledInput
          value={name}
          onChange={e => {
            setName(e.target.value);
            updateCampaign(campaign, customer, "name", e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};
