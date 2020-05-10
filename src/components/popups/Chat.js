import React, { useState } from "react";
import { Box, Flex, Heading, Button, Text } from "rebass/styled-components";
import { Input } from "@rebass/forms/styled-components";
import styled, { useTheme } from "styled-components";
import { CloseOutline as CloseIcon } from "@styled-icons/evaicons-outline/CloseOutline";
import { MinusOutline as UnderlineIcon } from "@styled-icons/evaicons-outline/MinusOutline";
import { Send as SendIcon } from "@styled-icons/material-sharp/Send";

const StyledContainer = styled(Box)`
  height: 648px;
  width: 848px;
  background-color: ${p => p.theme.colors.grey700};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 50px;
`;

const StyledTab = styled(Button)`
  background-color: transparent;
  border: none;

  color: ${({ selected }) =>
    (selected && "#FFFFFE") || (!selected && "rgba(63, 76, 92, 0.6)")};

  padding: 8px 5px;
  margin-right: 40px;
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
`;

const tabs = ["Client", "Production", "Media / Buyer"];

export const Chat = ({ closeChat, campaign }) => {
  const [tab, setTab] = useState("Client");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(campaign.messagesList);
  return (
    <Box>
      <StyledContainer>
        <Header tab={tab} setTab={setTab} closeChat={closeChat} />
        <Messages messages={messages} />
        <InputField
          message={message}
          messages={messages}
          setMessage={setMessage}
          setMessages={setMessages}
        />
      </StyledContainer>
    </Box>
  );
};

const Header = ({ tab, setTab, closeChat }) => {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.colors.gradient1 }} height="88px">
      <Flex alignItems="center" justifyContent="space-between" p="10px 24px">
        <Heading as="span" fontSize={2} color="grey000">
          #1 Yandex_1280x3500, PNG
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
    <Flex height="488px" flexDirection="column" justifyContent="flex-end">
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
            height="92px"
            width="540px"
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
    </Flex>
  );
};

const InputField = ({ message, messages, setMessage, setMessages }) => {
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
    >
      <Box>
        <Input
          id="message"
          name="message"
          type="text"
          placeholder="Message..."
          value={message}
          width="750px"
          color="grey300"
          sx={{ border: "1px solid transparent" }}
          onChange={e => setMessage(e.target.value)}
        />
      </Box>
      <Button
        variant="none"
        backgroundColor="transparent"
        p="0"
        ml="auto"
        onClick={() => {
          setMessages([
            ...messages,
            {
              text: message,
              time: currentTime,
              type: "outcome"
            }
          ]);
          setMessage("");
        }}
      >
        <SendIcon fill={theme.colors.grey000} height="24px" width="24px" />
      </Button>
    </Flex>
  );
};
