import { Button, Flex, Heading } from "rebass/styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@styled-icons/material-sharp/Menu";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid/Search";

import styled, { useTheme } from "styled-components";

const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    display: none;
  }
`;

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
        sx={{
          "@media screen and (min-width: 1200px)": {
            padding: "0"
          }
        }}
      >
        <StyledButton variant="none" mr={"5px"}>
          <MenuIcon height="21px" width="21px" fill={theme.colors.grey000} />
        </StyledButton>

        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Heading as="h3" fontSize={2} color={"grey000"}>
            Banner Delivery
          </Heading>
        </Link>
        <StyledButton variant="none" ml={"auto"}>
          <SearchIcon height="21px" width="21px" fill={theme.colors.grey000} />
        </StyledButton>
      </Flex>
    </Flex>
  );
};
