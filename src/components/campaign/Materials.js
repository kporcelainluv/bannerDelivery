import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Image
} from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import { CloudUpload as UploadIcon } from "@styled-icons/boxicons-solid/CloudUpload";
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
import styled, { useTheme } from "styled-components";

import { AccessPopup } from "../popups/AcessPopup";
import { Chat } from "../popups/Chat";
import { BUTTON_STATUS, BUTTON_TEXT, TABS, tabsList } from "../../utils/consts";

const StyledUploadIcon = styled(UploadIcon)`
  height: 24px;
  width: 24px;
  margin: 0 10px 0 0;
`;
const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin-right: 10px;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    margin: 0 0 0 10px;
  }
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
    bottom: -13px;
    left: -3px;
    color: ${p => p.theme.colors.orange200};
    border-bottom: ${({ selected }) =>
      (selected && `2px solid`) || (!selected && "none")};
  }
`;

const StyledNumber = styled(Box)`
  margin-left: 5px;
  padding: 0 4px;
  font-size: 10px;
  border: 1px solid ${p => p.theme.colors.grey000};
  border-radius: 50%;
`;

const StyledDownload = styled(Button)`
  width: 128px;
  height: 36px;
  border-radius: 4px;
  background-color: ${p => p.theme.colors.grey500};
  display: flex;
  align-items: center;
  &&:hover,
  &&:focus {
    background-color: ${p => p.theme.colors.grey800};
  }
`;

const StyledAddIcon = styled(AddIcon)`
  width: 30px;
  height: 30px;
  color: ${p => p.theme.colors.grey500};
  cursor: pointer;
  &&:hover,
  &&:focus {
    fill: ${p => p.theme.colors.orange200};
  }
`;
const StyledUploadIcon2 = styled(UploadOutlinedIcon)`
  height: 28px;
  width: 28px;
  fill: ${p => p.theme.colors.grey000};
  &:hover {
    fill: ${p => p.theme.colors.orange200};
  }
`;
const StyledDownloadIcon = styled(DownloadOutlinedIcon)`
  height: 28px;
  width: 28px;
  fill: ${p => p.theme.colors.grey000};
  &:hover {
    fill: ${p => p.theme.colors.orange200};
  }
`;

const StyledChatIcon = styled(ChatIcon)`
  height: 28px;
  width: 28px;
  fill: ${p => p.theme.colors.grey000};
  &:hover {
    fill: ${p => p.theme.colors.orange200};
  }
`;
const StyledDeleteIcon = styled(DeleteIcon)`
  height: 28px;
  width: 28px;
  fill: ${p => p.theme.colors.grey000};
  &:hover {
    fill: ${p => p.theme.colors.orange200};
  }
`;

export const Materials = ({ campaign, customer, addMessage }) => {
  const theme = useTheme();
  const [tab, setTab] = useState(TABS.JPEG);
  const [accessPopup, setAccessPopup] = useState(false);
  const [chatPopup, setChatPopup] = useState({
    opened: false,
    id: "rSKkujpC9UKWffy_z57sd"
  });
  const [materials, setMaterials] = useState(campaign.materials);

  const closePopup = () => {
    setAccessPopup(false);
  };

  const closeChat = () => {
    setChatPopup({ opened: false, id: undefined });
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
      {chatPopup.opened && (
        <Chat
          closeChat={closeChat}
          campaignId={campaign.id}
          addMessage={addMessage}
          customer={customer}
          id={chatPopup.id}
        />
      )}
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();
  return (
    <Flex
      padding="0"
      justifyContent="space-between"
      alignItems="baseline"
      sx={{
        "@media screen and (min-width: 1200px)": {
          padding: "30px 24px 0px"
        }
      }}
    >
      <Heading
        as="h2"
        fontSize={1}
        color="grey000"
        mb="24px"
        sx={{
          "@media screen and (min-width: 1200px)": {
            fontSize: theme.fontSizes[2]
          }
        }}
      >
        Materials
      </Heading>
      <StyledDownload variant="primary" onClick={() => {}}>
        <DownloadIcon
          height="15px"
          width="15px"
          fill={theme.colors.orange200}
        />
        <Text
          as="span"
          p="0 0 0 5px"
          fontSize={1}
          color="orange200"
          sx={{ lineHeight: "20px" }}
        >
          Download
        </Text>
      </StyledDownload>
    </Flex>
  );
};

const Tabs = ({ tab, setTab }) => {
  const theme = useTheme();
  return (
    <Flex
      p="0"
      alignItems="center"
      sx={{
        "@media screen and (min-width: 1200px)": {
          padding: "0 24px"
        }
      }}
    >
      {tabsList.map((t, index) => {
        return (
          <StyledTab
            key={t}
            variant="none"
            selected={tab === t}
            onClick={() => {
              setTab(t);
            }}
            mb="5px"
          >
            <Text
              as="span"
              sx={{
                cursor: "pointer",
                ":hover": { color: theme.colors.orange200 }
              }}
            >
              {t}
            </Text>
            {t === TABS.JPEG ? (
              <MoreIcon height="15px" width="15px" />
            ) : (
              <StyledNumber>{index}</StyledNumber>
            )}
          </StyledTab>
        );
      })}

      <Button
        variant="none"
        backgroundColor="transparent"
        border="none"
        p={"0"}
        mr={"15px"}
        mb="5px"
      >
        <StyledAddIcon />
        <Text as="span" className="visually-hidden">
          Add type
        </Text>
      </Button>
    </Flex>
  );
};

const UploadBanner = () => {
  const theme = useTheme();
  return (
    <Flex
      flexDirection="column"
      width="100%"
      boxShadow="large"
      justifyContent="center"
      alignItems="center"
      p="20px 0"
      sx={{
        borderRadius: "4px",
        ":hover": { backgroundColor: theme.colors.grey800 },
        maxWidth: "800px",
        "@media screen and (min-width: 1200px)": {
          backgroundColor: theme.colors.grey500,
          height: "146px",
          margin: "40px auto"
        }
      }}
    >
      <Flex
        height="48px"
        width="100%"
        backgroundColor="orange200"
        sx={{
          borderRadius: "4px",
          ":hover": { backgroundColor: theme.colors.orange100 },
          cursor: "pointer",
          "@media screen and (min-width: 1200px)": {
            width: "186px"
          }
        }}
        alignItems="center"
      >
        <Label
          htmlFor="upload"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledUploadIcon fill={theme.colors.grey000} />
          <Text
            as="span"
            color="grey000"
            fontSize={2}
            sx={{
              cursor: "pointer"
            }}
          >
            Upload Banner
          </Text>
        </Label>
        <Input id="upload" name="upload" type="file" display="none" />
      </Flex>
      <Text
        as="span"
        margin="16px 0 0"
        color="grey300"
        fontSize={1}
        display="none"
        sx={{
          "@media screen and (min-width: 1200px)": {
            display: "inline-block"
          }
        }}
      >
        or drop file here
      </Text>
    </Flex>
  );
};

const MaterialDescription = ({ element }) => {
  const { name, date, size } = element;
  const theme = useTheme();
  return (
    <Flex flexDirection="column" ml="10px">
      <Heading
        as="h2"
        fontSize={0}
        color="grey000"
        mb={"5px"}
        sx={{
          wordBreak: "break-all",
          lineHeight: "20px",
          "@media screen and (min-width: 1200px)": {
            fontSize: theme.fontSizes[1],
            maxWidth: "100%"
          }
        }}
      >
        {name}
      </Heading>
      {date &&
        size &&
        [date, size].map(element => {
          return (
            <Text
              key={element}
              as="span"
              fontSize={0}
              color="grey300"
              mb={"5px"}
              sx={{
                "@media screen and (min-width: 1200px)": {
                  fontSize: theme.fontSizes[1]
                }
              }}
            >
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
  return (
    <Flex>
      <StyledButton variant="none">
        <Text as="span" className="visually-hidden">
          Delete
        </Text>
        <StyledDownloadIcon />
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
        <StyledUploadIcon2 />
      </StyledButton>

      <StyledButton
        variant="none"
        onClick={() => {
          setChatPopup({ opened: true, id: material.id });
        }}
      >
        <Text as="span" className="visually-hidden">
          Chat
        </Text>
        <StyledChatIcon />
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
        <StyledDeleteIcon />
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
  const theme = useTheme();
  return (
    <Box>
      {materials &&
        materials.map(element => {
          return (
            <Box
              sx={{ ":hover": { backgroundColor: theme.colors.grey500 } }}
              key={element.id}
            >
              <Flex
                key={element.id}
                p="16px 0"
                flexDirection="column"
                sx={{
                  "@media screen and (min-width: 1200px)": {
                    padding: "24px",
                    flexDirection: "row"
                  }
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box mt="5px" minHeight="80px" minWidth="80px">
                    <Image
                      src={element.img}
                      height="100%"
                      width="100%"
                      sx={{
                        "@media screen and (min-width: 1200px)": {
                          height: "110px",
                          minWidth: "110px"
                        }
                      }}
                    />
                  </Box>

                  <Flex
                    flexDirection="row-reverse"
                    justifyContent="space-between"
                    width="100%"
                    sx={{
                      "@media screen and (min-width: 1200px)": {
                        marginLeft: "24px",
                        flexDirection: "row"
                      }
                    }}
                  >
                    <MaterialStatusIcon status={element.status} />
                    <MaterialDescription element={element} />
                  </Flex>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    "@media screen and (min-width: 1200px)": {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      marginLeft: "auto"
                    }
                  }}
                >
                  <CTAButton element={element} />
                  <ActionButtons
                    accessPopup={accessPopup}
                    setAccessPopup={setAccessPopup}
                    setChatPopup={setChatPopup}
                    deleteMaterial={deleteMaterial}
                    material={element}
                  />
                </Box>
              </Flex>
              {/*{index < materials.length - 1 && <Box as="hr" m="0 24px" />}*/}
            </Box>
          );
        })}
    </Box>
  );
};

const MaterialStatusIcon = ({ status }) => {
  const theme = useTheme();
  if (status === BUTTON_STATUS.PENDING) {
    return <Box height="20px" width="20px" />;
  }
  if (status === BUTTON_STATUS.ACCEPTED) {
    return (
      <CheckmarkIcon height="20px" width="20px" fill={theme.colors.orange200} />
    );
  }
  if (status === BUTTON_STATUS.RELEASED) {
    return (
      <DoneIcon height="20px" width="20px" fill={theme.colors.orange200} />
    );
  }
};

const CTAButton = ({ element }) => {
  const theme = useTheme();

  const getText = status => {
    return BUTTON_TEXT[status.toUpperCase()];
  };
  return (
    <Button
      height="36px"
      width="113px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {element.status === BUTTON_STATUS.PENDING && (
        <CheckmarkIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}
      {element.status === BUTTON_STATUS.ACCEPTED && (
        <DoneIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}
      {element.status === BUTTON_STATUS.RELEASED && (
        <CancelIcon height="20px" width="20px" fill={theme.colors.grey000} />
      )}

      <Text as="span">{getText(element.status)}</Text>
    </Button>
  );
};
