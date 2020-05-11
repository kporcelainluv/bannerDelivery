import React, { Fragment } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Flex, Heading, Text } from "rebass/styled-components";
import { Input, Label, Textarea } from "@rebass/forms/styled-components";
import { CloseOutline as CLoseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";

const AttachedFile = styled(Flex)`
  width: auto;
  height: 32px;
  background-color: ${p => p.theme.colors.grey500};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 8px;
  padding: 0 10px 0 16px;
  cursor: pointer;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 30px;
  height: 30px;
  color: ${p => p.theme.colors.grey500};
  cursor: pointer;
  &&:hover,
  &&:focus {
    fill: ${p => p.theme.colors.orange200};
  }
`;

export const Task = ({
  campaign,
  addAttachment,
  customer,
  deleteAttachment,
  updateCampaign
}) => {
  return (
    <Box padding="24px">
      <Heading as="h2" fontSize={2} color="grey000" mb="24px">
        Task
      </Heading>
      <Flex as="form" sx={{ position: "relative" }} flexDirection="column">
        <Description
          campaign={campaign}
          customer={customer}
          updateCampaign={updateCampaign}
        />
        <Attachment
          customer={customer}
          campaign={campaign}
          deleteAttachment={deleteAttachment}
        />
        <AddAttachment
          customer={customer}
          addAttachment={addAttachment}
          campaign={campaign}
        />
      </Flex>
    </Box>
  );
};

const Description = ({
  campaign,
  updateDescription,
  customer,
  updateCampaign
}) => {
  const theme = useTheme();
  return (
    <Fragment>
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
          updateCampaign(campaign, customer, "description", e.target.value);
        }}
      />
    </Fragment>
  );
};

const Attachment = ({ campaign, deleteAttachment, customer }) => {
  const theme = useTheme();
  return (
    <Fragment>
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
    </Fragment>
  );
};

const AddAttachment = ({ addAttachment, customer, campaign }) => {
  const theme = useTheme();
  return (
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
        <StyledAddIcon />
        <Text
          as="span"
          fontSize={1}
          color="orange200"
          pl="10px"
          sx={{
            letterSpacing: "0.3px",
            cursor: "pointer",
            ":hover": { color: theme.colors.orange100 }
          }}
        >
          Add Attachment
        </Text>
      </Label>
    </Box>
  );
};
