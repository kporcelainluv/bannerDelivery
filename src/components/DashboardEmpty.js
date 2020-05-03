import React, { useState } from "react";
import { Button, Text, Box, Flex } from "rebass/styled-components";
import { Popup } from "./Popup";
import { PageName } from "./PageName";
import { Plus } from "@styled-icons/boxicons-regular/Plus";

export const DashboardEmpty = ({ addCustomer }) => {
  const handleClose = () => {
    setPopup(false);
  };
  const [popup, setPopup] = useState(false);
  return (
    <Box sx={{ position: "relative" }}>
      <PageName name={"Dashboard"} />
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
          sx={{
            borderRadius: "24px"
          }}
        >
          <Plus height="25px" width="25px" />
          Add First Customer
        </Button>
        <Text margin="16px 0 0" color="grey300" fontSize={1}>
          List of your customers will be here
        </Text>
      </Flex>
      {popup && <Popup handleClose={handleClose} addCustomer={addCustomer} />}
    </Box>
  );
};
