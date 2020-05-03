import React from "react";
import { Text, Flex, Heading, Button } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { useTheme } from "styled-components";

export const Popup = () => {
  const theme = useTheme();
  return (
    <Flex
      as="form"
      onSubmit={e => e.preventDefault()}
      height="300px"
      width="584px"
      backgroundColor="grey700"
      flexDirection="column"
      margin="40px auto 0"
    >
      <Flex
        height="56px"
        sx={{ background: theme.colors.gradient1 }}
        flexDirection="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px 0 25px"
      >
        <Heading as="h3" fontSize={2} color="grey000">
          Add customer
        </Heading>
        <Button
          variant="none"
          sx={{ background: "none", border: "none", color: "#FFFFFE" }}
        >
          X
        </Button>
      </Flex>
      <Flex
        alignItems="flex-start"
        justifyContent="center"
        flexDirection="column"
        margin="35px auto"
      >
        <Label
          htmlFor="name"
          sx={{
            fontSize: theme.fontSizes[0],
            color: theme.colors.grey000,
            lineHeight: "16px",
            margin: "0 0 8px"
          }}
        >
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          width="536px"
          height="48px"
          sx={{
            border: "1px solid #43414D",
            backgroundColor: "transparent",
            color: theme.colors.grey000,
            fontSize: theme.fontSizes[2]
          }}
        />
        <Text color="red100" margin="4px 20px 0 0" fontSize={0}>
          Name shouldn’t be empty
        </Text>
        <Flex flexDirection="row" margin="40px 0 0 auto">
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.grey500,
              marginRight: "16px"
            }}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.orange200
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
