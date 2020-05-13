import React from "react";
import { Button, Flex, Heading } from "rebass/styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { useTheme } from "styled-components";

export const PopupPaper = ({ heading, closePopup, children }) => {
  const theme = useTheme();
  return (
    <DialogOverlay>
      <Flex
        as="form"
        onSubmit={e => e.preventDefault()}
        width="100%"
        height="100%"
        backgroundColor="grey700"
        flexDirection="column"
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          "@media screen and (min-width: 1200px)": {
            width: "584px",
            height: "500px"
          }
        }}
      >
        <Flex
          minHeight="56px"
          height="auto"
          sx={{ background: theme.colors.gradient1 }}
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          padding="0 20px 0 25px"
        >
          <Heading as="h3" fontSize={2} color="grey000">
            {heading}
          </Heading>
          <Button
            variant="none"
            sx={{ background: "none", border: "none", color: "#FFFFFE" }}
            padding="0"
            onClick={() => closePopup()}
          >
            <CloseOutline height="25px" width="25px" cursor="pointer" />
          </Button>
        </Flex>
        {children}
      </Flex>
    </DialogOverlay>
  );
};
