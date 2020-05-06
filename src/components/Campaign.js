import React, { useState } from "react";
import { Button, Text, Box, Flex, Heading } from "rebass/styled-components";
import { CheckmarkCircle2Outline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkCircle2Outline";
import { CloseOutline as CLoseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";
import { Input, Label, Textarea } from "@rebass/forms/styled-components";

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

const AttachedFile = styled(Flex)`
  width: 162px;
  height: 32px;
  background-color: ${p => p.theme.colors.grey500};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 8px;
  padding: 0 6px;
`;

export const Campaign = ({
  customer,
  addAttachment,
  campaign,
  deleteAttachment,
  updateDescription,
  updateCampaignName
}) => {
  const theme = useTheme();
  const [name, setName] = useState(campaign.name);

  return (
    <Box>
      <ReturnToDashboard />
      <HandleChangeCampaignName
        name={name}
        setName={setName}
        campaign={campaign}
        customer={customer}
        updateCampaignName={updateCampaignName}
      />
      <Paper>
        <Box padding="24px">
          <Heading as="h2" fontSize={2} color="grey000" mb="24px">
            Task
          </Heading>
          <Flex as="form" sx={{ position: "relative" }} flexDirection="column">
            <Box>
              <Label
                htmlFor="description"
                fontSize={0}
                color="grey000"
                pl="12px"
                mb="8px"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                height="200px"
                width="535px"
                placeholder={campaign.description}
                fontSize={1}
                color="grey000"
                mb="32px"
                p="12px"
                sx={{
                  resize: "none",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: "grey400",
                  "::placeholder": {
                    color: theme.colors.grey000
                  }
                }}
                onChange={e => {
                  updateDescription(campaign, customer, e.target.value);
                }}
              />
            </Box>
            <Text as="span" fontSize={0} color="grey000" mb="8px">
              Attachments:
            </Text>
            <Flex mb="16px">
              {campaign.attachments.map(a => {
                return (
                  <AttachedFile key={a.id}>
                    <Text as="span" fontSize={0} color="grey000">
                      {a.name}
                    </Text>
                    <CLoseIcon
                      height="20px"
                      width="20px"
                      fill={theme.colors.grey000}
                      onClick={() => {
                        deleteAttachment(a.id, customer, campaign);
                      }}
                    />
                  </AttachedFile>
                );
              })}
            </Flex>
            <Box>
              <Input
                id="addFile"
                name="addFile"
                type="file"
                color="transparent"
                border="none"
                backgroundColor="transparent"
                sx={{ display: "none" }}
                onChange={e => {
                  const name = e.target.files[0].name;
                  addAttachment(name, customer, campaign);
                }}
              />

              <Label htmlFor="addFile" display="flex" alignItems="center">
                <AddIcon
                  height="30px"
                  width="30px"
                  fill={theme.colors.grey500}
                />
                <Text
                  as="span"
                  fontSize={1}
                  color="orange200"
                  pl="10px"
                  sx={{ letterSpacing: "0.3px" }}
                >
                  Add Attachment
                </Text>
              </Label>
            </Box>
          </Flex>
        </Box>
      </Paper>
    </Box>
  );
};

const HandleChangeCampaignName = ({
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
