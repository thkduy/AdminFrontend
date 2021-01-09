
import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import {
    Box,
    Tooltip,
    withStyles,
    Zoom 
} from "@material-ui/core";

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default function ChatBox(props) {
    console.log(props);
    const content = props.content;
    const { name, avatar } = props.owner;

    return (
        <Box display="flex" flexDirection="row" alignItems="center" m={2}>
            <LightTooltip title={name} placement="left" TransitionComponent={Zoom}>
                <Avatar src={avatar} style={{marginRight:5}}/>
            </LightTooltip>
            <Box border={1} borderColor="primary.main" borderRadius={10} p={0.8}>
                <Typography>{content}</Typography>
            </Box>
        </Box>
    )
}