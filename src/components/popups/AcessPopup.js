import React, { useState } from "react";
import { Button, Flex, Heading, Box, Text } from "rebass/styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { RefreshOutline as RefreshIcon } from "@styled-icons/evaicons-outline/RefreshOutline";
import { Input, Label } from "@rebass/forms/styled-components";
import { Copy as CopyIcon } from "@styled-icons/feather/Copy";
import styled, { useTheme } from "styled-components";
import { Switch } from "@rebass/forms/styled-components";
import { PopupPaper } from "./PopupPaper";

const SwitchButton = styled(Switch)`
  border: none;
  background-color: ${({ status }) =>
    (status && `${p => p.theme.colors.orange300}`) ||
    (!status && `${p => p.theme.colors.grey800}`)};
  && div {
    background-color: ${({ status }) =>
      (status && "#D67935") || (!status && "#3F4C5C")};
  }
`;

export const AccessPopup = () => {
  const [checked, setChecked] = useState(false);

  const theme = useTheme();
  return (
    <PopupPaper heading={"Manage Access"}>
      <Box m="35px 25px">
        <Flex justifyContent="space-between">
          <Heading
            as="h3"
            fontSize={2}
            color="grey000"
            fontWeight="bold"
            mb="30px"
          >
            Production Access Link
          </Heading>
          <SwitchButton
            status={checked}
            checked={checked}
            onClick={() => {
              setChecked(!checked);
            }}
          />
        </Flex>
        <Flex>
          <Button
            variant={"none"}
            backgroundColor={"transparent"}
            border={"none"}
            p={"0"}
            display="flex"
            alignItems="center"
            mr={"25px"}
          >
            <CopyIcon
              height={"18px"}
              width={"18px"}
              color={checked ? theme.colors.orange200 : theme.colors.orange300}
            />
            <Text
              as="span"
              pl={"5px"}
              color={checked ? theme.colors.orange200 : theme.colors.orange300}
            >
              Copy
            </Text>
          </Button>
          <Button
            variant={"none"}
            backgroundColor={"transparent"}
            border={"none"}
            p={"0"}
            display="flex"
            alignItems="center"
            mr={"25px"}
          >
            <RefreshIcon
              height={"15px"}
              width={"15px"}
              fill={checked ? theme.colors.orange200 : theme.colors.orange300}
            />
            <Text
              as="span"
              pl={"5px"}
              color={checked ? theme.colors.orange200 : theme.colors.orange300}
            >
              Refresh
            </Text>
          </Button>
        </Flex>
      </Box>
    </PopupPaper>
  );
};
