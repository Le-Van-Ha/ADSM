import React from "react";
import { Button, TextField } from "@material-ui/core";
import "../HealthOrg/InputPopup/InputPopup.scss";
import SelectParentPopup from "./SelectParentPopup";

class InputPopupOrganization extends React.Component {
    state = {
        shouldOpenDialog: false,
        selectedItem: null,
    }

    componentDidMount = () => {
        if (this.props.value) {
            this.setState({ selectedItem: this.props.value })
        }
    }

    handleSelect = (item) => {
        this.setState({ shouldOpenDialog: false, selectedItem: item })
        this.props.handleSelect(item);
    };

    render() {
        const { shouldOpenDialog, selectedItem } = this.state;
        const {
            field,
            size,
            variant,
            label,
            disabled,
            classes,
            t } = this.props;
        return (
            <div className="input-popup-container">
                <TextField
                    fullWidth
                    classes={classes}
                    id={field}
                    size={size}
                    name={field}
                    label={label}
                    value={selectedItem ? (selectedItem.user ? selectedItem.user.displayName : "") : ""}
                    onChange={this.handleChange}
                    variant={variant}
                    style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                    disabled={disabled ? disabled : false}
                />
                {!disabled && (
                    <Button
                        size="small"
                        className="btn btn-primary-d"
                        style={{ float: "right" }}
                        variant="contained"
                        onClick={() => this.setState({ shouldOpenDialog: true })}
                    >
                        {t("general.button.select")}
                    </Button>
                )}
                {shouldOpenDialog && (
                    <SelectParentPopup
                        open={shouldOpenDialog}
                        handleSelect={this.handleSelect}
                        selectedItem={selectedItem ? selectedItem : {}}
                        handleClose={() => this.setState({ shouldOpenDialog: false })}
                        t={t}
                    />
                )}
            </div>
        );
    }
}

export default InputPopupOrganization;
