import React, {useState} from "react";
import {Box, Button, Flex, Heading, Text} from "rebass/styled-components";
import styled, { useTheme } from "styled-components";
import { Input } from "@rebass/forms/styled-components";
import {Bin as BinIcon} from "@styled-icons/icomoon/Bin";

import { AccessPopup } from "../popups/AcessPopup";
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";

const StyledInput = styled(Input)`
  height: 56px;
  width: 378px;
  padding: 0;
  font-size: ${p => p.theme.fontSizes[3]}px;
  font-weight: bold;
  color: ${p => p.theme.colors.grey000};
  border-radius: 4px;
  border: none;
  &&:focus {
    background-color: ${p => p.theme.colors.grey500};
  }
`;

const ActionButton = styled(Button)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  &&:hover {
    svg,
    span {
      color: ${p => p.theme.colors.orange100};
      fill: ${p => p.theme.colors.orange100};
    }
  }
`;

export const CampaignName = ({
  setName,
  name,
  campaign,
  customer,
  updateCampaign, 
                                 removeCampaign, 
                                 customerId
}) => {
  const theme = useTheme();
  const [accessPopup, setAccessPopup] = useState(false);

    const closePopup = () => {
        setAccessPopup(false);
    };
    
  return (
    <Box maxWidth="1136px" width="100%" margin="40px auto 0">
        <Box
            as="form"
            display='flex'
        >
        <Heading as="h2" fontSize={2} color={theme.colors.grey000} sx={{
            "@media screen and (min-width: 1200px)": {
                display: "none"
            }
        }}>
          {name}
        </Heading>
     
        <StyledInput 
            display={"none"} 
            value={name} 
            onChange={e => {
                setName(e.target.value);
                updateCampaign(campaign, customer, "name", e.target.value);
          }}
            sx={{
                "@media screen and (min-width: 1200px)": {
                    display: "flex"
                }
            }}
        />
        <ActionButtons setAccessPopup={setAccessPopup} deleteCampaign={removeCampaign} customerId={customerId}/>
        {accessPopup && <AccessPopup closePopup={closePopup} />}
      </Box>
    </Box>
  );
};

const ActionButtons = ({setAccessPopup, deleteCampaign, customerId}) => {
    let history = useHistory();
    return (
        <Flex pl={'10px'}>
            <ActionButton
                variant="none"
                onClick={(e)=> {
                    e.preventDefault();
                    deleteCampaign();
                    history.push(`/${customerId}/campaigns/`);
                }}
            >
                <BinIcon height="14px" width="14px" fill={"white"} />
                <Text
                    display='none'
                    as="span"
                    padding="0 10px"
                    color={"white"}
                    sx={{
                        "@media screen and (min-width: 768px)": {
                            display: "inline-block"
                        }
                    }}
                >
                    Delete
                </Text>
            </ActionButton>
            <ActionButton
                variant="none"
                // onClick={}
            >
                <BinIcon height="14px" width="14px" fill={"white"} />
                <Text
                    display='none'
                    as="span"
                    padding="0 10px"
                    color={"white"}
                    sx={{
                        "@media screen and (min-width: 768px)": {
                            display: "inline-block"
                        }
                    }}
                >
                    Edit
                </Text>
            </ActionButton>
            <ActionButton
                variant="none"
                onClick={(e)=> {
                    e.preventDefault();
                    setAccessPopup(true)
                }}
            >
                <BinIcon height="14px" width="14px" fill={"white"} />
                <Text
                    display='none'
                    as="span"
                    padding="0 10px"
                    color={"white"}
                    sx={{
                        "@media screen and (min-width: 768px)": {
                            display: "inline-block"
                        }
                    }}
                >
                    Manage Access
                </Text>
            </ActionButton>
        </Flex>
    )
}
