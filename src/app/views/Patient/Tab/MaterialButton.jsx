import React from 'react';
import {
  IconButton
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

export default function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  const colorIcon = props.colorIcon;
  const enableIcon = props.enableIcon;

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      marginLeft: "-1.5em",
    },
  }))(Tooltip);

  return (
    <div className="none_wrap">
      {
        <LightTooltip
          title={t("general.deleteRow")}
          placement="right-end"
          enterDelay={300}
          leaveDelay={200}
          disabled={enableIcon}
          PopperProps={{
            popperOptions: {
              modifiers: { offset: { enabled: true, offset: "10px, 0px" } },
            },
          }}
        >
          <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
            <RemoveCircleOutlineIcon fontSize="small" color={colorIcon ? "disabled" : "error"} />
          </IconButton>
        </LightTooltip>
      }
      {/* <LightTooltip
        title={t("general.addRow")}
        placement="right-end"
        enterDelay={300}
        leaveDelay={200}
        PopperProps={{
          popperOptions: {
            modifiers: { offset: { enabled: true, offset: "10px, 0px" } },
          },
        }}
      >
        <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
          <AddCircleOutlineIcon fontSize="small" color="primary" />
        </IconButton>
      </LightTooltip> */}
    </div>
  );
}