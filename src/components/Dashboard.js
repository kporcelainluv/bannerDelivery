import React from "react";
import { Text, Flex, Heading, Button, Box } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { useTheme } from "styled-components";

export const Dashboard = () => {
  const theme = useTheme();
  return (
    <Flex
      justifyContent="flex-start"
      margin="40px auto"
      width="100%"
      maxWidth="1136px"
      flexDirection="column"
      height="660px"
      backgroundColor="grey700"
      sx={{
        borderRadius: "16px",
        boxShadow: "large"
      }}
    >
      <Flex justifyContent="space-between" margin="24px">
        <Flex as="form">
          <Input
            height="48px"
            width="376px"
            sx={{
              borderRadius: "4px",
              backgroundColor: theme.colors.grey500,
              border: "none",
              color: theme.colors.grey200
            }}
            placeholder="Search customer"
            p="0 0 0 50px"
          />
        </Flex>
        <Button
          variant="primary"
          sx={{ borderRadius: "4px" }}
          width="186px"
          height="48px"
        >
          Add customer
        </Button>
      </Flex>

      <Flex m="30px 0 20px 70px">
        <Heading as="h2" fontSize={1} color="grey000">
          Active Customers
        </Heading>
      </Flex>
      <Box as="hr" backgroundColor="grey400" height="1px" border="none" />
      <Flex m="30px 0 0 70px">
        <Heading as="h2" fontSize={1} color="grey300">
          Completed Customers
        </Heading>
      </Flex>
    </Flex>
  );
};
