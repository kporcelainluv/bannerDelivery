import React from "react";
import { Flex } from "rebass/styled-components";
import { useTheme } from "styled-components";

export const Wrapper = ({ children }) => {
  const theme = useTheme();
  return (
    <Flex
      maxWidth="1136px"
      width="100%"
      backgroundColor="grey700"
      margin="40px auto 0"
      flexDirection="column"
      sx={{
        borderRadius: "16px",
        boxShadow: theme.shadows.large
      }}
    >
      {children}
    </Flex>
  );
};
