import React from 'react'
import {Box, Link} from "rebass/styled-components";
import {PopupPaper} from "./PopupPaper";
import styled from "styled-components";

const ALL = 'All Materials';

const StyledDownload = styled(Link)`
    font-size: ${p => p.theme.fontSizes[2]}px;
    color: ${p => p.theme.colors.grey000};
    padding: 15px 0 10px;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${p => p.theme.colors.grey400};
    
    &:hover {
    background-color: ${p => p.theme.colors.grey500};
    }
    

`

export const DownloadPopup = ({closeDownloadPopup, tabsList}) => {
    return <PopupPaper
        heading={'Download Materials'}
        height='300px'
        closePopup={closeDownloadPopup}
    >
        <Box p='20px 0 40px'
             sx={{overflowX: 'auto'}}>
            <StyledDownload>{ALL}</StyledDownload>
            {tabsList.map((tab, index) => {
                return <StyledDownload key={index}>{tab} List</StyledDownload>
            })}
        </Box>
    </PopupPaper>
}