import React, { useState } from "react";
import { Box, Button, Flex } from "rebass/styled-components";
import { PopupPaper } from "./PopupPaper";
import { useTheme } from "styled-components";
import { Input, Label } from "@rebass/forms";
import { Text } from "rebass";

export const AddListPopup = ({ closeAddListPopup, addList }) => {
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(false);
  const theme = useTheme();
  return (
    <PopupPaper
      heading={"Add List"}
      height="300px"
      closePopup={closeAddListPopup}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="center"
        flexDirection="column"
        margin="35px 0"
        p={"0 20px"}
        sx={{
          "@media screen and (min-width: 1200px)": {
            margin: "35px auto"
          }
        }}
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
          List name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          width="100%"
          height="48px"
          value={name}
          sx={{
            border: "1px solid #43414D",
            backgroundColor: "transparent",
            color: theme.colors.grey000,
            fontSize: theme.fontSizes[2],
            "@media screen and (min-width: 1200px)": {
              width: "536px"
            }
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
        <Button
          variant="secondary"
          backgroundColor="orange200"
          width="100%"
          height="48px"
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "none"
            }
          }}
          onClick={() => {
            if (name.length > 0) {
              addList(name);
              closeAddListPopup();
            }
            setWarning(true);
          }}
        >
          Add List
        </Button>

        <Box
          margin="40px 0 0 auto"
          display="none"
          sx={{
            "@media screen and (min-width: 1200px)": {
              display: "flex",
              flexDirection: "row"
            }
          }}
        >
          <Button
            variant="secondary"
            sx={{
              backgroundColor: theme.colors.grey500,
              ":hover": { backgroundColor: theme.colors.grey300 },
              marginRight: "16px"
            }}
            onClick={closeAddListPopup}
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
                addList(name);
                closeAddListPopup();
              }
              setWarning(true);
            }}
          >
            Save
          </Button>
        </Box>
      </Flex>
    </PopupPaper>
  );
};
