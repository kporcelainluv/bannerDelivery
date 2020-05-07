import React from "react";
import {
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Image
} from "rebass/styled-components";
import { BoxContainer } from "../Box";
import { CloudUpload as UploadIcon } from "@styled-icons/boxicons-solid/CloudUpload";
import styled, { useTheme } from "styled-components";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Download as DownloadIcon } from "@styled-icons/boxicons-solid/Download";
import { MoreVerticalOutline as MoreIcon } from "@styled-icons/evaicons-outline/MoreVerticalOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";
import { Label } from "@rebass/forms/styled-components";
import { CheckmarkOutline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkOutline";

import { DownArrowCircle as DownloadOutlinedIcon } from "@styled-icons/boxicons-regular/DownArrowCircle";
import { UpArrowCircle as UploadOutlinedIcon } from "@styled-icons/boxicons-regular/UpArrowCircle";
import { Chat3 as ChatIcon } from "@styled-icons/remix-line/Chat3";
import { DeleteOutline as CancelIcon } from "@styled-icons/typicons/DeleteOutline";
import { DeleteOutline as DeleteIcon } from "@styled-icons/material-twotone/DeleteOutline";

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
            height="15px"
            width="15px"
            fill={theme.colors.orange200}
          />
          <Text as="span" p="0 0 0 5px" fontSize={1} color="orange200">
            Download
          </Text>
        </Button>
      </Flex>

      <Flex>
        <Button variant="none" backgroundColor="transparent" border="none">
          <Text as="span">JPEG</Text>

          <MoreIcon height="24px" width="24px" />
        </Button>
        <Button variant="none" backgroundColor="transparent" border="none">
          <Text as="span">HTML</Text>
          <Text
            ml={"5px"}
            p={"0 5px"}
            as="span"
            fontSize={"12px"}
            sx={{ border: "1px solid white", borderRadius: "50%" }}
          >
            1
          </Text>
        </Button>
        <Button variant="none" backgroundColor="transparent" border="none">
          <AddIcon height="30px" width="30px" fill={theme.colors.grey500} />
          <Text as="span" className="visually-hidden">
            Add type
          </Text>
        </Button>
      </Flex>
      <Box as="hr" m={"0"} />

      <BoxContainer
        buttonText={"Upload Banner"}
        additionalText={"or drop file here"}
        background={"grey500"}
        radius={"4px"}
      >
        {<StyledUploadIcon />}
      </BoxContainer>

      <Flex p="24px">
        <Image src="https://via.placeholder.com/110" />
        <Flex ml="24px">
          <CheckmarkIcon
            height="20px"
            width="20px"
            fill={theme.colors.orange200}
          />
          <Flex flexDirection="column" ml="10px">
            <Heading as="h2" fontSize={1} color="grey000" mb={"5px"}>
              Yandex_1280x350
            </Heading>
            <Text as="span" fontSize={1} color="grey300" mb={"5px"}>
              01.10.2019 21:43
            </Text>
            <Text as="span" fontSize={1} color="grey300" mb={"5px"}>
              135 KB
            </Text>
          </Flex>
        </Flex>
        <Flex
          ml="auto"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Button height="36px" width="113px">
            Release
          </Button>
          <Flex>
            <DownloadOutlinedIcon
              height="28px"
              width="28px"
              fill={theme.colors.grey000}
              style={{ margin: "0 8px" }}
            />
            <UploadOutlinedIcon
              height="28px"
              width="28px"
              fill={theme.colors.grey000}
              style={{ margin: "0 8px" }}
            />
            <ChatIcon
              height="28px"
              width="28px"
              fill={theme.colors.grey000}
              style={{ margin: "0 8px" }}
            />
            <DeleteIcon
              height="28px"
              width="28px"
              fill={theme.colors.grey000}
              style={{ margin: "0 8px" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
