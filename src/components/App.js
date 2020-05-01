import React from "react";
import { Box, Card, Image, Heading, Text } from "rebass";

import GlobalTheme from "../theme/GlobalTheme";

export const App = () => {
  return (
    <div className="App">
      <GlobalTheme />
      <Box width={"100%"}>
        <Heading as="h1">{"Banner delivery"}</Heading>
      </Box>
    </div>
  );
};
