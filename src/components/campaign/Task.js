import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, Flex, Heading, Text } from "rebass/styled-components";
import { Input, Label, Textarea } from "@rebass/forms/styled-components";
import { CloseOutline as CLoseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";

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

export const Task = ({
  campaign,
  addAttachment,
  customer,
  updateDescription,
  deleteAttachment
}) => {
  const theme = useTheme();
  return (
    <Box padding="24px">
      <Heading as="h2" fontSize={2} color="grey000" mb="24px">
        Task
      </Heading>
      <Flex as="form" sx={{ position: "relative" }} flexDirection="column">
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
        <AddAttachment
          customer={customer}
          addAttachment={addAttachment}
          campaign={campaign}
        />
      </Flex>
    </Box>
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
        <AddIcon height="30px" width="30px" fill={theme.colors.grey500} />
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
  );
};