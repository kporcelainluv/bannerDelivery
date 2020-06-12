import React, { useState } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass/styled-components";
import styled, { useTheme } from "styled-components";
import { Input } from "@rebass/forms/styled-components";

import { AccessPopup } from "../popups/AcessPopup";
import { useHistory } from "react-router-dom";
import { Icon } from "../Icon";

const StyledInput = styled(Input)`
  height: 56px;
  width: 378px;
  padding: 0;
  font-size: ${p => p.theme.fontSizes[3]}px;
  font-weight: bold;
  color: ${p => p.theme.colors.grey000};
  border-radius: 4px;
  border: none;
  &&:focus {
    background-color: ${p => p.theme.colors.grey500};
  }
`;

const ActionButton = styled(Button)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  &&:hover {
    svg,
    span {
      color: ${p => p.theme.colors.orange100};
      fill: ${p => p.theme.colors.orange100};
    }
  }
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    padding: 0 5px;
  }
`;

export const CampaignName = ({
  setName,
  name,
  campaign,
  customer,
  updateCampaign,
  removeCampaign,
  customerId
}) => {
  const theme = useTheme();
  const [accessPopup, setAccessPopup] = useState(false);

  const closePopup = () => {
    setAccessPopup(false);
  };

  return (
    <Box maxWidth="1136px" width="100%" margin="40px auto 0">
      <Box
        as="form"
        display="flex"
        justifyContent="space-between"
        maxWidth="848px"
        sx={{
          "@media screen and (min-width: 1200px)": {
            maxWidth: "100%",
            justifyContent: "flex-start"
          }
        }}
      >
        <Heading
          as="h2"
          fontSize={2}
          color={theme.colors.grey000}
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "none"
            }
          }}
        >
          {name}
        </Heading>

        <StyledInput
          display={"none"}
          value={name}
          onChange={e => {
            setName(e.target.value);
            updateCampaign(campaign, customer, "name", e.target.value);
          }}
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "flex"
            }
          }}
        />
        <ActionButtons
          setAccessPopup={setAccessPopup}
          deleteCampaign={removeCampaign}
          customerId={customerId}
        />
        {accessPopup && <AccessPopup closePopup={closePopup} />}
      </Box>
    </Box>
  );
};

const ActionButtons = ({ setAccessPopup, deleteCampaign, customerId }) => {
  let history = useHistory();
  return (
    <Flex pl={"10px"}>
      <ActionButton
        variant="none"
        onClick={e => {
          e.preventDefault();
          deleteCampaign();
          history.push(`/${customerId}/campaigns/`);
        }}
      >
        <Icon
          name={"delete2"}
          width="12"
          height="15"
          fill={"white"}
          viewbox={"0 0 12 14"}
        />
        <Text
          display="none"
          as="span"
          padding="0 10px"
          color={"white"}
          sx={{
            "@media screen and (min-width: 768px)": {
              display: "inline-block"
            }
          }}
        >
          Delete
        </Text>
      </ActionButton>
      <ActionButton
        variant="none"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <Icon
          name={"edit"}
          width="12"
          height="15"
          fill={"white"}
          viewbox={"0 0 14 14"}
        />
        <Text
          display="none"
          as="span"
          padding="0 10px"
          color={"white"}
          sx={{
            "@media screen and (min-width: 768px)": {
              display: "inline-block"
            }
          }}
        >
          Edit
        </Text>
      </ActionButton>
      <ActionButton
        variant="none"
        onClick={e => {
          e.preventDefault();
          setAccessPopup(true);
        }}
      >
        <Icon
          name={"access"}
          width="20"
          height="30"
          fill={"white"}
          viewbox={"0 0 16 8"}
        />
        <Text
          display="none"
          as="span"
          padding="0 10px"
          color={"white"}
          sx={{
            "@media screen and (min-width: 768px)": {
              display: "inline-block"
            }
          }}
        >
          Manage Access
        </Text>
      </ActionButton>
    </Flex>
  );
};
