import React from "react";
import { Flex } from "rebass/styled-components";
import { useTheme } from "styled-components";

export const Paper = ({ width, children }) => {
  const theme = useTheme();
  return (
    <Flex
      maxWidth={width}
      width="100%"
      backgroundColor="grey700"
      // margin="40px auto 0"
      margin={0}
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
