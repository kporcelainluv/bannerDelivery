import React, { useState } from "react";
import { Button, Flex, Heading, Box, Text } from "rebass/styled-components";
import { RefreshOutline as RefreshIcon } from "@styled-icons/evaicons-outline/RefreshOutline";
import { Copy as CopyIcon } from "@styled-icons/feather/Copy";
import styled, { useTheme } from "styled-components";
import { Switch } from "@rebass/forms/styled-components";
import { nanoid } from "nanoid";

import { PopupPaper } from "./PopupPaper";

const SwitchButton = styled(Switch)`
  border: none;
  background-color: ${({ status }) =>
    (status && `rgba(214, 121, 53, 0.5)`) ||
    (!status && `rgba(63, 76, 92, 0.5)`)};
  && div {
    background-color: ${({ status }) =>
      (status && "#D67935") || (!status && "#3F4C5C")};
  }
`;

const buttons = [
  { id: nanoid(), name: "Copy", size: "15px" },
  { id: nanoid(), name: "Refresh", size: "18px" }
];

export const AccessPopup = ({ closePopup }) => {
  const theme = useTheme();
  const [accessList, setAccessList] = useState([
    { id: nanoid(), name: "Production Access Link", checked: true },
    { id: nanoid(), name: "Client Access Link", checked: true },
    { id: nanoid(), name: "Media / Buyer", checked: false }
  ]);

  const setSwitch = field => {
    const updatedFields = accessList.map(f => {
      if (f.id === field.id) {
        return { ...f, checked: !f.checked };
      }
      return f;
    });
    setAccessList(updatedFields);
  };

  return (
    <PopupPaper heading={"Manage Access"} closePopup={closePopup}>
      {accessList.map(field => {
        const color = field.checked
          ? theme.colors.orange200
          : theme.colors.orange300;

        return (
          <Box key={field.id} m="35px 25px">
            <Flex justifyContent="space-between">
              <Heading
                as="h3"
                fontSize={2}
                color="grey000"
                fontWeight="bold"
                mb="30px"
              >
                {field.name}
              </Heading>
              <SwitchButton
                status={field.checked}
                checked={field.checked}
                onClick={() => setSwitch(field)}
              />
            </Flex>
            <Flex>
              {buttons.map(button => {
                return (
                  <Button
                    key={button.id}
                    variant="none"
                    backgroundColor="transparent"
                    border="none"
                    p="0"
                    display="flex"
                    alignItems="center"
                    mr="25px"
                  >
                    {button.name === "Copy" ? (
                      <CopyIcon
                        height={button.size}
                        width={button.size}
                        color={color}
                      />
                    ) : (
                      <RefreshIcon
                        height={button.size}
                        width={button.size}
                        fill={color}
                      />
                    )}

                    <Text as="span" pl="5px" color={color}>
                      {button.name}
                    </Text>
                  </Button>
                );
              })}
            </Flex>
          </Box>
        );
      })}
    </PopupPaper>
  );
};
