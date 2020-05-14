import React from "react";
import { Button, Flex, Text, Box, Heading } from "rebass/styled-components";
import { BoxContainer } from "../Box";
import { CloudUpload as UploadIcon } from "@styled-icons/boxicons-solid/CloudUpload";
import styled, { useTheme } from "styled-components";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Download as DownloadIcon } from "@styled-icons/boxicons-solid/Download";
const StyledUploadIcon = styled(UploadIcon)`
  height: 24px;
  width: 24px;
  margin: 0 10px 0 0;
`;

export const Materials = () => {
  const theme = useTheme();
  return (
    <Box>
      <Flex padding="24px" justifyContent="space-between">
        <Heading as="h2" fontSize={2} color="grey000" mb="24px">
          Materials
        </Heading>
        <Button
          width="128px"
          height="36px"
          variant="primary"
          borderRadius="4px"
          backgroundColor="grey500"
          onClick={() => {}}
          display="flex"
          alignItems="center"
        >
          <DownloadIcon
            height="20px"
            width="20px"
            fill={theme.colors.orange200}
          />
          <Text as="span" p="0 0 0 10px" fontSize={1} color="orange200">
            Download
          </Text>
        </Button>
      </Flex>

      <BoxContainer
        buttonText={"Upload Banner"}
        additionalText={"or drop file here"}
        background={"grey500"}
      >
        {<StyledUploadIcon />}
      </BoxContainer>
    </Box>
  );
};
