import React, { useState } from "react";
import { Flex, Button, Box } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { useTheme } from "styled-components";
import { PopupPaper } from "./PopupPaper";
import { Text } from "rebass";

export const AddClientPopup = ({ handleClose, addCustomer }) => {
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(false);
  const theme = useTheme();
  return (
    <PopupPaper heading={"Add Customer"} closePopup={handleClose}>
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
            setWarning(false);
          }}
        />
        {warning ? (
          <Text as="span" fontSize={0} color={theme.colors.red100} m="10px 0">
            Name shouldn’t be empty
          </Text>
        ) : (
          <Box height="40px" />
        )}

        <Flex flexDirection="row" margin="40px 0 0 auto">
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.grey500,
              ":hover": { backgroundColor: theme.colors.grey300 },
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
              if (name.length > 0) {
                addCustomer(name);
                handleClose();
              }
              setWarning(true);
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </PopupPaper>
  );
};
