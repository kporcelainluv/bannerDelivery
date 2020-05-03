import React, { useState } from "react";
import { Button, Text, Box } from "rebass/styled-components";
import { Popup } from "./Popup";
import { PageName } from "./PageName";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Wrapper } from "./Wrapper";

export const DashboardEmpty = ({ addCustomer }) => {
  const handleClose = () => {
    setPopup(false);
  };
  const [popup, setPopup] = useState(false);
  return (
    <Box sx={{ position: "relative" }}>
      <PageName name={"Dashboard"} />
      <Wrapper height="146px">
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
      </Wrapper>
      {popup && <Popup handleClose={handleClose} addCustomer={addCustomer} />}
    </Box>
  );
};
