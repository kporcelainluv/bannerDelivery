import React from "react";
import { Flex } from "rebass/styled-components";
import { useTheme } from "styled-components";

export const Paper = ({ width, children, margin }) => {
  const theme = useTheme();
  return (
    <Flex
      maxWidth={width}
      width="100%"
      backgroundColor="transparent"
      margin={margin}
      flexDirection="column"
      paddingBottom="50px"
      sx={{
        borderRadius: "16px",
        boxShadow: theme.shadows.large,
        "@media screen and (min-width: 1200px)": {
          backgroundColor: theme.colors.grey700
        }
      }}
    >
      {children}
    </Flex>
  );
};
