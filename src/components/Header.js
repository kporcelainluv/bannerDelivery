import { Flex, Heading } from "rebass/styled-components";
import React from "react";

import styled from "styled-components";
const Wrapper = styled(Flex)`
  background: ${p => p.theme.colors.gradient1};
  align-items: center;
  justify-content: center;
`;

export const Header = () => {
  return (
    <Wrapper>
      <Flex
        alignItems="center"
        width={"100%"}
        maxWidth={"1136px"}
        height={"56px"}
        m={"0 auto"}
      >
        <Heading as="h3" fontSize={2} color={"grey000"}>
          Banner Delivery
        </Heading>
      </Flex>
    </Wrapper>
  );
};
