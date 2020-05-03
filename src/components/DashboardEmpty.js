import React, { useState } from "react";
import { Flex, Heading, Button, Text } from "rebass/styled-components";
import { Popup } from "./Popup";

export const DashboardEmpty = ({ addCustomer }) => {
  const handleClose = () => {
    setPopup(false);
  };
  const [popup, setPopup] = useState(false);
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
        p="20px 0 0"
        backgroundColor="grey700"
        sx={{
          borderRadius: "16px",
          boxShadow: "large"
        }}
      >
        <Button
          variant="primary"
          onClick={() => {
            setPopup(true);
          }}
        >
          Add First Customer
        </Button>
        <Text margin="16px 0 0" color="grey300" fontSize={1}>
          List of your customers will be here
        </Text>
      </Flex>
      {popup && <Popup handleClose={handleClose} addCustomer={addCustomer} />}
    </Flex>
  );
};
