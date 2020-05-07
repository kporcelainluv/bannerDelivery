import React from "react";
import { Button, Flex, Heading, Box } from "rebass/styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Switch as SwitchIcon } from "@styled-icons/entypo/Switch";
import { RefreshOutline as RefreshIcon } from "@styled-icons/evaicons-outline/RefreshOutline";
import { Input, Label } from "@rebass/forms";
import { Copy as CopyIcon } from "@styled-icons/feather/Copy";
import { useTheme } from "styled-components";

import { PopupPaper } from "./PopupPaper";

export const AccessPopup = () => {
  const theme = useTheme();
  return (
    <PopupPaper heading={'Manage Access'}>
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
    </PopupPaper>
  );
};
