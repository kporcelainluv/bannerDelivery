import React from "react";
import { Flex } from "rebass/styled-components";

export const Wrapper = ({ height, children }) => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="1136px"
      height={height}
      m="40px auto 0"
      p="20px 0 0"
      backgroundColor="grey700"
      sx={{
        borderRadius: "16px",
        boxShadow: "large"
      }}
    >
      {children}
    </Flex>
  );
};
