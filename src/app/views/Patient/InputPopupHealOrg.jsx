import React from "react";
import {
    Button, TextField, IconButton,
    Icon,
} from "@material-ui/core";
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
            <div className="input-popup-container" style={{ position: "relative" }}>
                <TextField
                    fullWidth
                    classes={classes}
                    id={field}
                    size={size}
                    name={field}
                    label={label}
                    value={selectedItem ? selectedItem.name : ""}
                    onChange={this.handleChange}
                    variant={variant}
                    style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                    disabled={disabled ? disabled : false}
                />
                {selectedItem && <IconButton style={{ right: "110px", top: "5px", minWidth: "10px", width: "10px" }} size={size} onClick={() => this.handleSelect(null)}>
                    <Icon fontSize="small" color="primary">close</Icon>
                </IconButton>}
                <Button
                    size="small"
                    className="btn btn-primary-d"
                    style={{ float: "right" }}
                    variant="contained"
                    onClick={() => this.setState({ shouldOpenDialog: true })}
                >
                    {t("general.button.select")}
                </Button>
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
