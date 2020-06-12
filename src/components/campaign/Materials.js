import React, { useState, Fragment } from "react";
import {
  Button,
  Flex,
  Text,
  Box,
  Heading,
  Image, 
    Link
} from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import { CloudUpload as UploadIcon } from "@styled-icons/boxicons-solid/CloudUpload";
import { Download as DownloadIcon } from "@styled-icons/boxicons-solid/Download";
import { MoreVerticalOutline as MoreIcon } from "@styled-icons/evaicons-outline/MoreVerticalOutline";
import { AddSolid as AddIcon } from "@styled-icons/zondicons/AddSolid";
import { CheckmarkOutline as CheckmarkIcon } from "@styled-icons/evaicons-outline/CheckmarkOutline";
import { DeleteOutline as CancelIcon } from "@styled-icons/typicons/DeleteOutline";
import { DoneAll as DoneIcon } from "@styled-icons/evaicons-solid/DoneAll";
import styled, { useTheme } from "styled-components";

import { Chat } from "../popups/Chat";
import { BUTTON_STATUS, BUTTON_TEXT } from "../../utils/consts";
import {Icon} from "../Icon";
import {DownloadPopup} from "../popups/DownloadPopup";
import {AddListPopup} from "../popups/AddListPopup";

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
  cursor: pointer;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    margin: 0 0 0 10px;
  }
  position: relative;
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
  padding: 1px 4px;
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
const UnreadMessagesIndicator = styled.div`
  &:before {
    content: '';
    height: 10px;
    width: 10px;
    background-color: ${p => p.theme.colors.red100};
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
  }
`;

const ReplaceText = styled(Text)`
    display: none;
`
const StyledMaterialWrap = styled(Box)`
&:hover {
    background-color: ${p => p.theme.colors.grey500};
    ${ReplaceText} {
     display: inline-block;
     color: ${p => p.theme.colors.orange200};
     margin: 5px 0;
    }
}
`

export const Materials = ({ campaign, customer, addMessage }) => {
  const theme = useTheme();
  const [tabsList, setTabsList] = useState(["JPEG", "HTML"]);
  const [activeTab, setActiveTab] = useState('JPEG');
  const [chatPopup, setChatPopup] = useState({
    opened: false,
    id: undefined
  });
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [addListPopup, setAddListPopup] = useState(false);
  const [materials, setMaterials] = useState(campaign.materials || []);
  
  const closeChat = () => {
    setChatPopup({ opened: false, id: undefined });
  };

  const closeDownloadPopup = () => {
      setDownloadPopup(false);
  };

    const closeAddListPopup = () => {
        setAddListPopup(false);
    };
  const deleteMaterial = material => {
    const updatedMaterials = materials.filter(m => m.id !== material.id);
    setMaterials(updatedMaterials);
  };
  
  const addList = (list) => {
      setTabsList([...tabsList, list]);
  }

  return (
    <Box>
      <Header setDownloadPopup={setDownloadPopup} />
      {materials && materials.length > 0 && (
        <Fragment>
          <Tabs tab={activeTab} setTab={setActiveTab} tabsList={tabsList} setAddListPopup={setAddListPopup}/>
          <Box as="hr" m={"0"} color={theme.colors.grey400} />
        </Fragment>
      )}

      {materials && materials.length > 0 ? (
        <Fragment>
          <UploadBanner />
          <MaterialsContainer
            setChatPopup={setChatPopup}
            materials={materials}
            deleteMaterial={deleteMaterial}
          />
        </Fragment>
      ) : (
        <EmptyMaterials />
      )}

      {chatPopup.opened && (
        <Chat
          closeChat={closeChat}
          campaignId={campaign.id}
          addMessage={addMessage}
          customer={customer}
          id={chatPopup.id}
        />
      )}
        {downloadPopup &&  <DownloadPopup closeDownloadPopup={closeDownloadPopup} tabsList={tabsList} />}
        {addListPopup && <AddListPopup closeAddListPopup={closeAddListPopup} addList={addList}/>}
    </Box>
  );
};

const Header = ({setDownloadPopup}) => {
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
        maxWidth="300px"
        sx={{
          wordBreak: "break-all",
          "@media screen and (min-width: 1200px)": {
            fontSize: theme.fontSizes[2]
          }
        }}
      >
        Materials
      </Heading>
      <StyledDownload variant="primary" onClick={ () => setDownloadPopup(true)}>
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

const Tabs = ({ tab, setTab, tabsList, setAddListPopup }) => {
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
        <Flex flexWrap='wrap'>
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
            {index === 0  ? (
              <MoreIcon height="15px" width="15px" />
            ) : (
              <StyledNumber>{index}</StyledNumber>
            )}
          </StyledTab>
        );
      })}
        </Flex>
      <Button
        variant="none"
        backgroundColor="transparent"
        border="none"
        p={"0"}
        mr={"15px"}
        mb="5px"
        onClick ={() => {
            setAddListPopup(true);
        }}
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
        <ReplaceText
            as="span"
            fontSize={0}
        >
            Drop file here to replace
        </ReplaceText>
    </Flex>
  );
};

const ActionButtons = ({
  setChatPopup,
  deleteMaterial,
  material
}) => {
  return (
    <Flex>
      <StyledButton variant="none" onClick={()=> {}}>
        <Text as="span" className="visually-hidden">
          Download
        </Text>
          <Icon name={"download"} width="32" height="32" />
      </StyledButton>
      <StyledButton
        variant="none"
        onClick={() => {}}
      >
        <Text as="span" className="visually-hidden">
          Upload
        </Text>
          <Icon name={"upload"} width="32" height="32" />
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
          <Icon name={"discuss"} width="32" height="32" />
          {material.messagesList.length > 0 &&  <UnreadMessagesIndicator/>}
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
          <Icon name={"delete"} width="32" height="32" />
      </StyledButton>
    </Flex>
  );
};

const MaterialsContainer = ({
  setChatPopup,
  materials,
  deleteMaterial
}) => {
  const theme = useTheme();
  return (
    <Box>
      {materials.map(element => {
        return (
          <StyledMaterialWrap
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
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  "@media screen and (min-width: 1200px)": {
                    alignItems: "flex-start"
                  }
                }}
              >
                <Box
                  mt="5px"
                  minHeight="80px"
                  minWidth="80px"
                  sx={{
                    "@media screen and (min-width: 1200px)": {
                      minHeight: "110px",
                      minWidth: "110px"
                    }
                  }}
                >
                    <Link href={element.img} target="_blank" alt='Material image'>
                        <Image
                            src={element.img}
                            height="100%"
                            width="100%"
                            sx={{
                                "@media screen and (min-width: 1200px)": {
                                    height: "110px",
                                    width: "110px"
                                }
                            }}
                        />
                    </Link>
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
                mt="10px"
                sx={{
                  "@media screen and (min-width: 1200px)": {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginLeft: "auto",
                    marginTop: "0"
                  }
                }}
              >
                <Flex flexDirection="column">
                  <CTAButton element={element} />
                </Flex>
                <Flex flexDirection="column">
                  <ActionButtons
                    setChatPopup={setChatPopup}
                    deleteMaterial={deleteMaterial}
                    material={element}
                  />
                </Flex>
              </Box>
            </Flex>
          </StyledMaterialWrap>
        );
      })}
    </Box>
  );
};

const MaterialStatusIcon = ({ status }) => {
  const theme = useTheme();
  if (status === BUTTON_STATUS.PENDING || status === BUTTON_STATUS.ADDED) {
    return <Box height="20px" width="20px" />;
  }
  if (status === BUTTON_STATUS.ACCEPTED) {
    return <CheckmarkIcon height="20px" width="20px" fill={theme.colors.orange200} />
  }
  if (status === BUTTON_STATUS.RELEASED) {
    return <DoneIcon height="20px" width="20px" fill={theme.colors.orange200} />
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
      maxWidth="148px"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      lineHeight="20px"
    >
      {element.status === BUTTON_STATUS.PENDING && (
        <CheckmarkIcon
          height="20px"
          width="20px"
          fill={theme.colors.grey000}
          style={{ marginRight: "5px" }}
        />
      )}
      {element.status === BUTTON_STATUS.ACCEPTED && (
        <DoneIcon
          height="20px"
          width="20px"
          fill={theme.colors.grey000}
          style={{ marginRight: "5px" }}
        />
      )}
      {element.status === BUTTON_STATUS.RELEASED && (
        <CancelIcon
          height="20px"
          width="20px"
          fill={theme.colors.grey000}
          style={{ marginRight: "5px" }}
        />
      )}

      <Text as="span">{getText(element.status)}</Text>
    </Button>
  );
};

const EmptyMaterials = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        "@media screen and (min-width: 1200px)": {
          padding: "0 24px"
        }
      }}
    >
      <Box mt="10px">
        <Input
          id="addFile"
          name="addFile"
          type="file"
          color="transparent"
          border="none"
          backgroundColor="transparent"
          display="none"
        />
        <Label htmlFor="addFile" display="flex" alignItems="center">
          <StyledAddIcon />
          <Text
            as="span"
            fontSize={1}
            color="orange200"
            pl="10px"
            sx={{
              letterSpacing: "0.3px",
              cursor: "pointer",
              ":hover": { color: theme.colors.orange100 }
            }}
          >
            Add List
          </Text>
        </Label>
      </Box>
      <Text
        as="p"
        fontSize={1}
        color="grey300"
        m={"20px auto"}
        textAlign="center"
      >
        List of your materials will be here
      </Text>
        <UploadBanner/>
    </Box>
  );
};
