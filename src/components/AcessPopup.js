import React from "react";
import { Button, Flex, Heading, Box } from "rebass/styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Switch as SwitchIcon } from "@styled-icons/entypo/Switch";
import { RefreshOutline as RefreshIcon } from "@styled-icons/evaicons-outline/RefreshOutline";
import { Input, Label } from "@rebass/forms";
import { Copy as CopyIcon } from "@styled-icons/feather/Copy";
import { useTheme } from "styled-components";

export const AccessPopup = () => {
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
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
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
          Manage Access
        </Heading>
        <Button
          variant="none"
          sx={{ background: "none", border: "none", color: "#FFFFFE" }}
          padding="0"
        >
          <CloseOutline height="25px" width="25px" cursor="pointer" />
        </Button>
      </Flex>
      <Box m="35px 25px">
        <Flex justifyContent="space-between">
          <Heading as="h3" fontSize={2} color="grey000" fontWeight="bold">
            Production Access Link
          </Heading>
          <SwitchIcon height={"25px"} width={"25px"} />
        </Flex>
        <Flex>
          <Button
            variant={"none"}
            backgroundColor={"transparent"}
            border={"none"}
          >
            <CopyIcon height={"24px"} width={"24px"} />
            Copy
          </Button>
          <Button
            variant={"none"}
            backgroundColor={"transparent"}
            border={"none"}
          >
            <RefreshIcon height={"24px"} width={"24px"} />
            Refresh
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
