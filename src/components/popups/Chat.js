import React, { useState, useRef } from "react";
import { Box, Flex, Heading, Button, Text } from "rebass/styled-components";
import { Input } from "@rebass/forms/styled-components";
import styled, { useTheme } from "styled-components";
import { CloseOutline as CloseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { MinusOutline as UnderlineIcon } from "@styled-icons/evaicons-outline/MinusOutline";
import { Send as SendIcon } from "@styled-icons/material-sharp/Send";
import { nanoid } from "nanoid";
import { DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

const StyledContainer = styled(Box)`
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.colors.grey700};
  margin: 0 auto;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    height: 648px;
    width: 848px;
  }
`;
const StyledMessage = styled(Flex)`
  max-height: calc(100% - 170px);
  flex-direction: column;
  //justify-content: flex-end;
  height: 100%;
  overflow: auto;
  div:nth-child(1) {
    margin-top: auto;
  }
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    height: 488px;
  }
`;

const StyledTab = styled(Button)`
  background-color: transparent;
  border: none;

  color: ${({ selected }) =>
    (selected && "#FFFFFE") || (!selected && "rgba(63, 76, 92, 0.6)")};

  margin-right: 10px;
  padding: 8px 0;
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: center;
  &&:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: ${p => p.theme.colors.orange200};
    border-bottom: ${({ selected }) =>
      (selected && `2px solid`) || (!selected && "none")};
  }
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    margin-right: 40px;
    padding: 8px 5px;
  }
`;

const tabs = ["Client", "Production", "Media / Buyer"];

export const Chat = ({ closeChat, addMessage, customer, id, campaignId }) => {
  const refId = useRef(id);
  const campaign = customer.campaigns.filter(c => c.id === campaignId)[0];
  const material = campaign.materials.filter(c => c.id === refId.current)[0];

  const [tab, setTab] = useState("Client");
  const [message, setMessage] = useState("");
  return (
    <DialogOverlay aria-label="Chat dialog">
      <StyledContainer>
        <Header
          tab={tab}
          setTab={setTab}
          closeChat={closeChat}
          name={material.name}
        />
        <Messages messages={material.messagesList} />
        <InputField
          message={message}
          setMessage={setMessage}
          addMessage={addMessage}
          customer={customer}
          campaign={campaign}
          material={material}
        />
      </StyledContainer>
    </DialogOverlay>
  );
};

const Header = ({ tab, setTab, closeChat, name }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.colors.gradient1,
        "@media screen and (min-width: 1200px)": {
          height: "88px"
        }
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p="10px 16px"
        sx={{
          "@media screen and (min-width: 1200px)": {
            padding: "10px 24px"
          }
        }}
      >
        <Heading
          as="span"
          fontSize={2}
          color="grey000"
          sx={{
            wordBreak: "break-word",
            maxWidth: "70%"
          }}
        >
          {name}
        </Heading>
        <Box>
          <UnderlineIcon
            fill={theme.colors.grey000}
            height="34px"
            width="34px"
            style={{ paddingTop: "10px" }}
          />
          <Button
            variant="none"
            backgroundColor="transparent"
            border="none"
            p={"0"}
            onClick={() => closeChat()}
          >
            <Text as="span" className="visually-hidden">
              Close
            </Text>
            <CloseIcon fill={theme.colors.grey000} height="24px" width="24px" />
          </Button>
        </Box>
      </Flex>

      <Flex p="0 19px">
        {tabs.map(t => {
          return (
            <StyledTab
              key={t}
              variant="none"
              selected={tab === t}
              onClick={() => {
                setTab(t);
              }}
            >
              {t}
            </StyledTab>
          );
        })}
      </Flex>
    </Box>
  );
};

const Messages = ({ messages }) => {
  return (
    <StyledMessage>
      {messages.map(message => {
        const margin =
          message.type === "income"
            ? "16px auto 16px 16px"
            : "16px 16px 16px auto";
        const background = message.type === "income" ? "#3F4C5C" : "#43414D";
        return (
          <Box
            key={message.id}
            backgroundColor={background}
            width="240px"
            sx={{
              "@media screen and (min-width: 1200px)": {
                width: "540px"
              }
            }}
            margin={margin}
          >
            <Text
              as="p"
              p="16px"
              fontSize={1}
              color="grey000"
              sx={{ lineHeight: "20px" }}
            >
              {message.text}
            </Text>
            <Text
              as="span"
              fontSize={0}
              color="grey300"
              p="0 9px 6px 0"
              display="flex"
              justifyContent="flex-end"
            >
              {message.time}
            </Text>
          </Box>
        );
      })}
    </StyledMessage>
  );
};

const InputField = ({
  message,
  setMessage,
  addMessage,
  customer,
  campaign,
  material
}) => {
  const theme = useTheme();
  const currentTime = new Date()
    .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    .slice(12, 17);
  return (
    <Flex
      p="18px 24px"
      backgroundColor="grey500"
      height="72px"
      alignItems="center"
      width="100%"
    >
      <Box width="90%">
        <Input
          id="message"
          name="message"
          type="text"
          placeholder="Message..."
          value={message}
          color="grey300"
          sx={{
            border: "1px solid transparent",
            "@media screen and (min-width: 1200px)": {
              width: "750px"
            }
          }}
          onChange={e => setMessage(e.target.value)}
        />
      </Box>
      <Button
        variant="none"
        backgroundColor="transparent"
        p="0"
        ml="auto"
        onClick={() => {
          addMessage(customer, campaign, material, {
            id: nanoid(),
            text: message,
            time: currentTime,
            type: "outcome"
          });
          setMessage("");
        }}
      >
        <SendIcon fill={theme.colors.grey000} height="24px" width="24px" />
      </Button>
    </Flex>
  );
};
