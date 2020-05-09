import React, { useState } from "react";
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
import { AccessPopup } from "../popups/AcessPopup";
import { Chat } from "../popups/Chat";
const StyledUploadIcon = styled(UploadIcon)`
  height: 24px;
  width: 24px;
  margin: 0 10px 0 0;
`;
const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin-left: 10px;
`;

const StyledTab = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin-right: 15px;
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: center;
  &&:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: -8px;
    left: -3px;
    border-bottom: ${({ selected }) =>
      (selected && `2px solid #D67935`) || (!selected && "none")};
  }
`;

const BUTTON_STATUS_TEXT = {
  PENDING: "Accept",
  ACCEPTED: "Release",
  RELEASED: "Cancel"
};

const TABS = {
  HTML: "HTML",
  JPEG: "JPEG"
};

const materialsList = [
  {
    id: nanoid(),
    name: "Yandex_1280x350",
    date: "01.10.2019 21:43",
    size: "135 KB",
    img: "https://via.placeholder.com/110",
    status: "pending"
  },
  {
    id: nanoid(),
    name: "Yandex_1280x350",
    date: "01.10.2019 21:43",
    size: "135 KB",
    img: "https://via.placeholder.com/110",
    status: "accepted"
  },
  {
    id: nanoid(),
    name: "Yandex_1280x350",
    date: "01.10.2019 21:43",
    size: "135 KB",
    img: "https://via.placeholder.com/110",
    status: "released"
  }
];

export const Materials = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("JPEG");
  const [accessPopup, setAccessPopup] = useState(false);
  const [chatPopup, setChatPopup] = useState(false);
  const [materials, setMaterials] = useState(materialsList);

  const closePopup = () => {
    setAccessPopup(false);
  };

  const closeChat = () => {
    setChatPopup(false);
  };

  const deleteMaterial = material => {
    const updatedMaterials = materials.filter(m => m.id !== material.id);
    setMaterials(updatedMaterials);
  };
  return (
    <Box>
      <Header />
      <Tabs tab={tab} setTab={setTab} />
      <Box as="hr" m={"0"} color={theme.colors.grey400} />
      <UploadBanner />
      <MaterialsContainer
        accessPopup={accessPopup}
        setAccessPopup={setAccessPopup}
        setChatPopup={setChatPopup}
        materials={materials}
        deleteMaterial={deleteMaterial}
      />
      {accessPopup && <AccessPopup closePopup={closePopup} />}
      {chatPopup && <Chat closeChat={closeChat} />}
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();
  return (
    <Flex padding="30px 24px 0px" justifyContent="space-between">
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
        sx={{
          ":hover": {
            backgroundColor: "grey500"
          },
          ":focus": {
            backgroundColor: "grey500"
          }
        }}
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

const Tabs = ({ tab, setTab }) => {
  const theme = useTheme();
  return (
    <Flex p={"0 24px"} alignItems="center">
      <StyledTab
        variant="none"
        selected={tab === TABS.JPEG}
        onClick={() => {
          setTab(TABS.JPEG);
        }}
      >
        <Text as="span">{TABS.JPEG}</Text>

        <MoreIcon height="15px" width="15px" />
      </StyledTab>
      <StyledTab
        variant="none"
        selected={tab === TABS.HTML}
        onClick={() => {
          setTab(TABS.HTML);
        }}
      >
        <Text as="span">{TABS.HTML}</Text>
        <Box
          ml={"5px"}
          p={"0 4px"}
          fontSize={"10px"}
          sx={{ border: "1px solid white", borderRadius: "50%" }}
        >
          1
        </Box>
      </StyledTab>
      <Button
        variant="none"
        backgroundColor="transparent"
        border="none"
        p={"0"}
        mr={"15px"}
      >
        <AddIcon height="30px" width="30px" fill={theme.colors.grey500} />
        <Text as="span" className="visually-hidden">
          Add type
        </Text>
      </Button>
    </Flex>
  );
};

const UploadBanner = () => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      margin="40px auto"
      boxShadow="large"
      justifyContent="center"
      alignItems="center"
      p="20px 0 "
      height="146px"
      backgroundColor="grey500"
      sx={{
        borderRadius: "4px",
        maxWidth: "800px"
      }}
    >
      <Button
        variant="primary"
        onClick={() => {}}
        sx={{
          borderRadius: "24px"
        }}
      >
        <StyledUploadIcon />
        Upload Banner
      </Button>
      <Text margin="16px 0 0" color="grey300" fontSize={1}>
        or drop file here
      </Text>
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

const ActionButtons = ({
  accessPopup,
  setAccessPopup,
  setChatPopup,
  deleteMaterial,
  material
}) => {
  const theme = useTheme();
  return (
    <Flex>
      <StyledButton variant="none">
        <Text as="span" className="visually-hidden">
          Delete
        </Text>
        <DownloadOutlinedIcon
          height="28px"
          width="28px"
          fill={theme.colors.grey000}
        />
      </StyledButton>
      <StyledButton
        variant="none"
        onClick={() => {
          setAccessPopup(!accessPopup);
        }}
      >
        <Text as="span" className="visually-hidden">
          Upload
        </Text>
        <UploadOutlinedIcon
          height="28px"
          width="28px"
          fill={theme.colors.grey000}
        />
      </StyledButton>

      <StyledButton
        variant="none"
        onClick={() => {
          setChatPopup(true);
        }}
      >
        <Text as="span" className="visually-hidden">
          Chat
        </Text>
        <ChatIcon height="28px" width="28px" fill={theme.colors.grey000} />
      </StyledButton>
      <StyledButton
        variant="none"
        onClick={() => {
          deleteMaterial(material);
        }}
      >
        <Text as="span" className="visually-hidden">
          Delete
        </Text>
        <DeleteIcon height="28px" width="28px" fill={theme.colors.grey000} />
      </StyledButton>
    </Flex>
  );
};

const MaterialsContainer = ({
  accessPopup,
  setAccessPopup,
  setChatPopup,
  materials,
  deleteMaterial
}) => {
  return (
    <Box>
      {materials.map(element => {
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
              <ActionButtons
                accessPopup={accessPopup}
                setAccessPopup={setAccessPopup}
                setChatPopup={setChatPopup}
                deleteMaterial={deleteMaterial}
                material={element}
              />
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
