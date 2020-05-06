import React from "react";
import { Heading } from "rebass/styled-components";

export const PageName = ({ name }) => {
  return (
    <Heading
      as="h2"
      fontSize={3}
      color="grey000"
      width="100%"
      maxWidth="1136px"
      margin="40px auto"
    >
      {name}
    </Heading>
  );
};
