import React from "react";
import { Flex, Heading, Button, Text } from "rebass/styled-components";
import { useTheme } from "styled-components";
import { Popup } from "./Popup";

export const Dashboard = () => {
  const theme = useTheme();
  return (
    <Flex
      justifyContent="flex-start"
      margin="40px auto"
      width="100%"
      maxWidth="1136px"
      flexDirection="column"
    >
      <Heading as="h2" fontSize={3} color={"grey000"}>
        Dashboard
      </Heading>
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
        maxWidth="1136px"
        height="146px"
        m="40px auto 0"
        backgroundColor="grey700"
        sx={{
          borderRadius: "16px",
          boxShadow: " 0px 0px 25px rgba(13, 13, 13, 0.05)"
        }}
      >
        <Button
          variant="primary"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Add First Customer
        </Button>
        <Text margin="16px 0 0" color="grey300" fontSize={1}>
          List of your customers will be here
        </Text>
      </Flex>
      <Popup />
    </Flex>
  );
};
