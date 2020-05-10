import { Box, Flex, Heading } from "rebass/styled-components";
import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "styled-components";

export const Header = () => {
  const theme = useTheme();
  return (
    <Flex
      alignItems="center"
      justifyContent={"center"}
      sx={{
        background: theme.colors.gradient1
      }}
    >
      <Flex
        alignItems="center"
        width={"100%"}
        maxWidth={"1136px"}
        height={"56px"}
        m={"0 auto"}
        p="0 20px"
      >
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Heading as="h3" fontSize={2} color={"grey000"}>
            Banner Delivery
          </Heading>
        </Link>
      </Flex>
    </Flex>
  );
};
