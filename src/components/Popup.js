import React, { useState } from "react";
import { Flex, Heading, Button } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { useTheme } from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

export const Popup = ({ handleClose, addCustomer }) => {
  const [name, setName] = useState("");
  const theme = useTheme();
  return (
    <Flex
      as="form"
      onSubmit={e => e.preventDefault()}
      height="300px"
      width="584px"
      backgroundColor="grey700"
      flexDirection="column"
      sx={{
        position: "absolute",
        top: "25%",
        left: "30%"
      }}
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
          onClick={handleClose}
          padding="0"
        >
          <CloseOutline height="25px" width="25px" cursor="pointer" />
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
          value={name}
          sx={{
            border: "1px solid #43414D",
            backgroundColor: "transparent",
            color: theme.colors.grey000,
            fontSize: theme.fontSizes[2],
            ":hover": { backgroundColor: "#3F4C5C", transition: "1s" }
          }}
          onChange={e => {
            setName(e.target.value);
          }}
        />

        <Flex flexDirection="row" margin="40px 0 0 auto">
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.grey500,
              ":hover": { backgroundColor: "#97999E" },
              marginRight: "16px"
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.orange200,
              ":hover": { backgroundColor: "#DB7124" }
            }}
            onClick={() => {
              addCustomer(name);
              handleClose();
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
