import React, { useState } from "react";
import { Flex, Heading, Button } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { useTheme } from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { PopupPaper } from "./PopupPaper";

export const AddClientPopup = ({ handleClose, addCustomer }) => {
  const [name, setName] = useState("");
  const theme = useTheme();
  return (
    <PopupPaper heading={"Add Customer"}>
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
            fontSize: theme.fontSizes[2]
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
    </PopupPaper>
  );
};
