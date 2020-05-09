import React from "react";
import { Flex } from "rebass/styled-components";
import { useTheme } from "styled-components";

export const Paper = ({ width, children, margin }) => {
  const theme = useTheme();
  return (
    <Flex
      maxWidth={width}
      width="100%"
      backgroundColor="grey700"
      margin={margin}
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
