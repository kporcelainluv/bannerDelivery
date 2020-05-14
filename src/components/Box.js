import React, { Fragment } from "react";
import styled from "styled-components";
import { Button, Flex, Text } from "rebass/styled-components";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";

const EmptyPaper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1136px;
  margin: 40px auto 0;

  border-radius: 16px;
  box-shadow: ${p => p.theme.shadows.large};
  justify-content: center;
  align-items: center;
  padding: 20px 0 0;
  height: 146px;

  background-color: ${({ Color }) =>
    (Color === "grey500" && "#3F4C5C") || (Color === "empty" && "red")};
`;

export const BoxContainer = ({
  buttonText,
  additionalText,
  children,
  background
}) => {
  return (
    <EmptyPaper color={background}>
      <Button
        variant="primary"
        onClick={() => {
          // setPopup(true);
        }}
        sx={{
          borderRadius: "24px"
        }}
      >
        {/*<PlusIcon height="25px" width="25px" />*/}
        {children}
        {buttonText}
      </Button>
      <Text margin="16px 0 0" color="grey300" fontSize={1}>
        {additionalText}
      </Text>
    </EmptyPaper>
  );
};
