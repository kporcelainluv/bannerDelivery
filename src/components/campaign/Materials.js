import React from "react";
import {
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Image
} from "rebass/styled-components";

import { CloudUpload as UploadIcon } from "@styled-icons/boxicons-solid/CloudUpload";
import styled, { useTheme } from "styled-components";
import { nanoid } from "nanoid";
import { Download as DownloadIcon } from "@styled-icons/boxicons-solid/Download";
import { MoreVerticalOutline as MoreIcon } from "@styled-icons/evaicons-outline/MoreVerticalOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";
import { CheckmarkOutline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkOutline";
import { DownArrowCircle as DownloadOutlinedIcon } from "@styled-icons/boxicons-regular/DownArrowCircle";
import { UpArrowCircle as UploadOutlinedIcon } from "@styled-icons/boxicons-regular/UpArrowCircle";
import { Chat3 as ChatIcon } from "@styled-icons/remix-line/Chat3";
import { DeleteOutline as CancelIcon } from "@styled-icons/typicons/DeleteOutline";
import { DeleteOutline as DeleteIcon } from "@styled-icons/material-twotone/DeleteOutline";
import { DoneAll as DoneIcon } from "@styled-icons/evaicons-solid/DoneAll";

import { BoxContainer } from "../Box";
const StyledUploadIcon = styled(UploadIcon)`
  height: 24px;
  width: 24px;
  margin: 0 10px 0 0;
`;

const BUTTON_STATUS_TEXT = {
  PENDING: "Accept",
  ACCEPTED: "Release",
  RELEASED: "Cancel"
};

const materialsList = [
  {
    id: nanoid(),
    name: "Yandex_1280x350",
    date: "01.10.2019 21:43",
    size: "135 KB",
    img: "https://via.placeholder.com/110",
    status: "pending"
  }
];

export const Materials = () => {
  return (
    <Box>
      <Header />
      <Tabs />
      <Box as="hr" m={"0"} />
      <BoxContainer
        buttonText={"Upload Banner"}
        additionalText={"or drop file here"}
        background={"grey500"}
        radius={"4px"}
      >
        {<StyledUploadIcon />}
      </BoxContainer>
      <MaterialsContainer />
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();
  return (
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
  );
};

const Tabs = () => {
  const theme = useTheme();
  return (
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
  );
};

const MaterialDescription = ({ element }) => {
  const { name, date, size } = element;
  return (
    <Flex flexDirection="column" ml="10px">
      <Heading as="h2" fontSize={1} color="grey000" mb={"5px"}>
        {name}
      </Heading>
      {[date, size].map(element => {
        return (
          <Text key={element} as="span" fontSize={1} color="grey300" mb={"5px"}>
            {element}
          </Text>
        );
      })}
    </Flex>
  );
};

const ActionButtons = () => {
  const theme = useTheme();
  return (
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
  );
};

const MaterialsContainer = () => {
  return (
    <Box>
      {materialsList.map(element => {
        return (
          <Flex p="24px" key={element.id}>
            <Image src={element.img} />
            <Flex ml="24px">
              <MaterialStatusIcon status={element.status} />
              <MaterialDescription element={element} />
            </Flex>
            <Flex
              ml="auto"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <CTAButton element={element} />
              <ActionButtons />
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};

const MaterialStatusIcon = ({ status }) => {
  const theme = useTheme();
  if (status === "pending") {
    return <Box height="20px" width="20px" />;
  }
  if (status === "accepted") {
    return (
      <CheckmarkIcon height="20px" width="20px" fill={theme.colors.orange200} />
    );
  }
  if (status === "released") {
    return (
      <DoneIcon height="20px" width="20px" fill={theme.colors.orange200} />
    );
  }
};

const CTAButton = ({ element }) => {
  const theme = useTheme();
  return (
    <Button
      height="36px"
      width="113px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {element.status === "pending" && (
        <CheckmarkIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}
      {element.status === "accepted" && (
        <DoneIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}
      {element.status === "released" && (
        <CancelIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}

      <Text as="span">{BUTTON_STATUS_TEXT[element.status.toUpperCase()]}</Text>
    </Button>
  );
};
