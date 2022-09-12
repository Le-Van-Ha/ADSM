import { Grid, DialogActions, Button, Radio, Dialog } from "@material-ui/core";
import React from "react";
import { getAllByRoot, saveItem, getAllRoles } from "./MenuService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import SelectParentPopup from "./SelectParentPopup";
import Autocomplete from "@material-ui/lab/Autocomplete";
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
class SupplierDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        path: "",
        rowsPerPage: 5,
        page: 1,
        data: [],
        totalElements: 0,
        itemList: [],
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        selectedItem: {},
        keyword: "",
        shouldOpenNotificationPopup: false,
        shouldOpenSelectParentPopup: false,
        roles: [],
        listRole: [],
    };
    setPage = (page) => {
        this.setState({ page }, function () {
            this.updatePageData();
        });
    };
    handleChangeCommonObjectType = (event) => {
        let { commonObjectTypes } = this.state;
        this.setState({
            type: commonObjectTypes.find((item) => item.id === event.target.value),
            typeId: event.target.value,
        });
    };

    setRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 1 });
        this.updatePageData();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };
    updatePageData = () => {
        var searchObject = {};
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        getAllByRoot().then(({ data }) => {
            this.setState({
                itemList: [...data.content],
                totalElements: data.totalElements,
            });
        });
    };

    componentDidMount() {
        let { item } = this.props;
        this.setState({ item: item });
        this.setState({ ...item }, () => {
            let { type } = this.state;
            if (type && type.id) {
                this.setState({ typeId: type.id });
            }
        });
        getAllRoles().then(({ data }) => {
            this.setState({
                listRole: data,
            });
        });
    }

    handleClick = (event, item) => {
        //alert(item);
        if (item.id != null) {
            this.setState({ selectedValue: item.id, selectedItem: item });
        } else {
            this.setState({ selectedValue: item.id, selectedItem: null });
        }
    };

    search = (keyword) => {
        var searchObject = {};
        searchObject.text = keyword;
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        getAllByRoot().then(({ data }) => {
            this.setState({
                itemList: [...data.content],
                totalElements: data.totalElements,
            });
        });
    };

    handleChange(event) {
        this.setState({ keyword: event.target.value });
    }
    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    };
    handleChangeCode = (event) => {
        this.setState({ code: event.target.value });
    };
    handleChangePath = (event) => {
        this.setState({ path: event.target.value });
    };

    handleChangeValue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    openParentPopup = () => {
        this.setState({ shouldOpenSelectParentPopup: true });
    };
    handleSelectParent = (parent) => {
        this.setState({ parent: parent });
        this.setState({ shouldOpenSelectParentPopup: false });
    };

    handleFormSubmit = () => {
        let item = {};
        item.id = this.state.id;
        item.name = this.state.name;
        item.code = this.state.code;
        item.viewIndex = this.state.viewIndex;
        item.icon = this.state.icon;
        item.path = this.state.path;
        item.parent = this.state.parent;
        item.roles = this.state.roles;
        item.description = this.state.description;
        saveItem(item).then(() => {
            this.props.handleOKEditClose();
        });
    };
    handleDialogClose = () => {
        this.setState({
            shouldOpenNotificationPopup: false,
            shouldOpenSelectParentPopup: false,
        });
    };

    selectRoles = (rolesSelected) => {
        this.setState({ roles: rolesSelected }, function () { });
    };

    render() {
        const { t, i18n, open } =
            this.props;
        let {
            name,
            code,
            icon,
            path,
            shouldOpenNotificationPopup,
            listRole,
            roles,
            description,
        } = this.state;
        return (
            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                maxWidth="md"
                fullWidth={true}
            >
                {shouldOpenNotificationPopup && (
                    <NotificationPopup
                        title={t("Thông báo")}
                        open={shouldOpenNotificationPopup}
                        // onConfirmDialogClose={this.handleDialogClose}
                        onYesClick={this.handleDialogClose}
                        text={t(this.state.Notification)}
                        agree={t("general.confirm_dialog.delete.agree")}
                    />
                )}
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    {t("general.menu.saveUpdate")}
                </DialogTitle>
                <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <DialogContent>
                        <Grid className="" container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <Button
                                    size="small"
                                    style={{ float: "right" }}
                                    className=" mt-10"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.openParentPopup}
                                >
                                    {t("general.button.select")}
                                </Button>
                                <TextValidator
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}></span>
                                            {t("general.menu.parent")}
                                        </span>
                                    }
                                    className="w-80"
                                    value={
                                        this.state.parent != null ? this.state.parent.name : ""
                                    }
                                />

                                {this.state.shouldOpenSelectParentPopup && (
                                    <SelectParentPopup
                                        open={this.state.shouldOpenSelectParentPopup}
                                        handleSelect={this.handleSelectParent}
                                        selectedItem={
                                            this.state.item != null && this.state.item.parent != null
                                                ? this.state.item.parent
                                                : {}
                                        }
                                        handleClose={this.handleDialogClose}
                                        t={t}
                                        i18n={i18n}
                                    />
                                )}
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}> *</span>
                                            {t("general.menu.key")}
                                        </span>
                                    }
                                    onChange={this.handleChangeValue}
                                    type="text"
                                    name="name"
                                    value={name}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}> *</span>

                                            {t("general.menu.code")}
                                        </span>
                                    }
                                    onChange={this.handleChangeValue}
                                    type="text"
                                    name="code"
                                    value={code}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}> *</span>

                                            {t("general.menu.icon")}
                                        </span>
                                    }
                                    onChange={this.handleChangeValue}
                                    type="text"
                                    name="icon"
                                    value={icon}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}> *</span>

                                            {t("general.menu.path")}
                                        </span>
                                    }
                                    onChange={this.handleChangeValue}
                                    type="text"
                                    name="path"
                                    value={path}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}> *</span>

                                            {t("general.menu.description")}
                                        </span>
                                    }
                                    onChange={this.handleChangeValue}
                                    type="text"
                                    name="description"
                                    value={description}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                {listRole && (
                                    <Autocomplete
                                        style={{ width: "100%" }}
                                        multiple
                                        id="combo-box-demo"
                                        defaultValue={roles}
                                        options={listRole}
                                        getOptionSelected={(option, value) =>
                                            option.id === value.id
                                        }
                                        getOptionLabel={(option) => option.authority}
                                        onChange={(event, value) => {
                                            this.selectRoles(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextValidator
                                                {...params}
                                                value={roles}
                                                // label={t('user.role')}
                                                label={
                                                    <span>
                                                        <span style={{ color: "red" }}>*</span>
                                                        {t("user.role.title")}
                                                    </span>
                                                }
                                                fullWidth
                                                validators={["required"]}
                                                errorMessages={[t("general.required")]}
                                            />
                                        )}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex flex-space-between flex-middle mt-10">
                            <Button
                                variant="contained"
                                className="mr-12"
                                color="secondary"
                                onClick={() => this.props.handleClose()}
                            >
                                {t("general.button.cancel")}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "15px" }}
                                type="submit"
                            >
                                {t("general.button.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}
export default SupplierDialog;
