import React from 'react';
import {
    IconButton,
    Icon,
    Tooltip,
} from "@material-ui/core";


export default function NiceActionButton(props) {

    const {
        item,
        size,
        onSelect,
        fontSize,
        color,
        icon,
        title,
        disabled,

    } = props;
    return (
        <Tooltip title={title} placement="left" enterDelay={300} leaveDelay={100}>
            <IconButton size={size} disabled={disabled ? disabled: false} onClick={() => onSelect(item, 0)}>
                <Icon fontSize={fontSize} color={color}>{icon}</Icon>
            </IconButton>
        </Tooltip>
  
    )
}