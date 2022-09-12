import React, { Component } from "react";
import {
    Dialog,
    Button,
    Grid,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Checkbox,
    TextField,
    FormControlLabel,
    DialogTitle,
    IconButton,
    Icon,
    DialogActions,
    DialogContent,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
    getUserByUsername,
    getAllInfoByUserLogin,
    getRoleUser,
    getAllRoles,
    saveUserOrg,
} from "./UserService";
import UserRoles from "app/services/UserRoles";
import { findAllChildHealthOrganizationByUserLogin as getOrg } from "../HealthOrg/HealthOrgService";
import {
    searchByPage,
    searchRegions,
} from "../AdministrativeUnit/AdministrativeUnitService";
import { toast } from "react-toastify";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import ChangePassWordAccordion from "./ChangePassWordAccordion";
import InputPopupHealthOrg from "../HealthOrg/InputPopup/InputPopup";
import UserEditorForm from "./UserEditorForm";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    //etc you get the idea
});
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
class UserEditorDialog extends Component {
    state = {
        isAddNew: false,
        listRole: [],
        roles: [],
        active: true,
        email: "",
        person: {},
        username: "",
        org: {},
        adminUnit: {},
        changePass: true,
        password: "",
        region: "",
        confirmPassword: "",
        listRegion: {},
        level: null,
    };

    listGender = [
        { id: "M", name: "Nam" },
        { id: "F", name: "Nữ" },
        { id: "U", name: "Không rõ" },
    ];

    handleChange = (event, source) => {
        event.persist();
        if (source === "switch") {
            this.setState({ isActive: event.target.checked });
            return;
        }
        if (source === "changePass") {
            this.setState({ changePass: event.target.checked });
            return;
        }
        if (source === "active") {
            this.setState({ active: event.target.checked });
            return;
        }
        if (source === "displayName") {
            let { person } = this.state;
            person = person ? person : {};
            person.displayName = event.target.value;
            this.setState({ person: person });
            return;
        }
        if (source === "gender") {
            let { person } = this.state;
            person = person ? person : {};
            person.gender = event.target.value;
            this.setState({ person: person });
            return;
        }
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleChangePassWord = (password) => {
        this.setState({
            password: password,
            changePass: true,
        });
    };

    handleFormSubmit = (values) => {
        let { t } = this.props;
        let { id, user } = this.state;
        let userOrg = {};
        let roleSuperAdmin = {
            id: 3,
            name: "ROLE_SUPER_ADMIN",
            description: null,
            authority: "ROLE_SUPER_ADMIN",
        };
        if (user == null) {
            user = {};
        }
        user.username = values.username;
        user.email = values.email;
        user.person = values.person;
        if (values?.roles.name === "ROLE_ADMIN") {
            user.roles[0] = values.roles;
            user.roles[1] = roleSuperAdmin;
        } else {
            user.roles = [values.roles];
        }

        user.active = values.active;
        if (values.password === values.confirmPassword) {
            user.changePass = true;
        }

        user.isActive = values.isActive;
        user.password = values.password;
        user.person.displayName = values.displayName;
        user.person.gender = values.gender;
        userOrg.user = user;
        userOrg.org = values.org;
        userOrg.id = id;
        userOrg.adminUnit = values.adminUnit;
        userOrg.region = values.region;

        if (
            (values.roles.name === "ROLE_PROVINCE" ||
                values.roles.name === "ROLE_DISTRICT" ||
                values.roles.name === "ROLE_SUB_DISTRICT") &&
            values.adminUnit === null
        ) {
            toast.warning("Đơn vị hành chính chưa được chọn");
            return;
        }

        if (values.roles.name === "ROLE_DOMAIN" && values.region.length === 0) {
            toast.warning("Vùng miền chưa được chọn");
            return;
        }

        if (values.roles.name !== "ROLE_DOMAIN") {
            userOrg.region = "";
        }
        getUserByUsername(values.username).then((data) => {
            if (data.data && data.data.id) {
                if (!user.id || (id && data.data.id !== user.id)) {
                    toast.warning(t("toast.user_exist"));
                    return;
                }
            }
            saveUserOrg(userOrg).then(() => {
                this.props.handleOKEditClose();
                toast.success(t("toast.update_success"));
            });
        });
    };

    selectRoles = (rolesSelected) => {
        this.setState({ roles: rolesSelected }, function () { });
    };

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
    componentWillMount() {
        let { item } = this.props;
        if (!item.id) {
            this.setState({ isAddNew: true, user: item.user });
        }
        this.setState(item);
        this.setState(
            {
                ...item.user,
                org: item.org,
                adminUnit: item.adminUnit,
                region: item.region,
            },
            () => {
                this.setState({
                    id: item.id,
                    user: item.user,
                    org: item.org,
                    adminUnit: item.adminUnit,
                    password: "",
                });
            }
        );
        if (item?.user?.roles) {
            let roles = item?.user?.roles[0];
            if (roles) {
                this.setState({ roles: roles });
            }
        }
        if (!UserRoles.isAdmin()) {
            // getAllInfoByUserLogin().then(({ data }) => {
            //   let idHealthOrg = data?.userOrganization?.org?.id
            //   this.setState({ idHealthOrg: idHealthOrg }, () => {
            //     this.getHealthOrg();
            //   })
            // })
            getRoleUser().then(({ data }) => {
                this.setState({
                    listRole: data,
                });
            });
        } else {
            //this.getAdminUnit();
            searchRegions().then(({ data }) => {
                this.setState({ listRegion: [...data] });
            });
            getAllRoles().then(({ data }) => {
                this.setState({
                    listRole: data,
                });
            });
        }
    }

    getAdminUnit = () => {
        var searchObject = {};
        searchObject.pageIndex = 0;
        searchObject.pageSize = 10000000;
        searchByPage(searchObject).then(({ data }) => {
            this.setState({
                listUnit: [...data.content],
                totalElements: data.totalElements,
            });
        });
    };

    selectHealthOrganization = (event, labTest) => {
        this.setState({ org: labTest }, function () { });
    };
    render() {
        let { open, handleClose, t } = this.props;
        let {
            id,
            isAddNew,
            listRole,
            roles,
            active,
            email,
            person,
            username,
            confirmPassword,
            password,
            listRegion,
            region,
            level,
        } = this.state;
        return (
            <Dialog
                className="dialog-container"
                open={open}
                PaperComponent={PaperComponent}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    className="dialog-header bgc-primary-d1"
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    <span className="mb-20 text-white">
                        {" "}
                        {(id ? t("general.button.edit") : t("general.button.add")) +
                            " " +
                            t("user.title")}{" "}
                    </span>

                    <IconButton
                        style={{ position: "absolute", right: "10px", top: "10px" }}
                        onClick={() => handleClose()}
                    >
                        <Icon color="disabled" title={t("close")}>
                            close
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <UserEditorForm
                    initialValues={{
                        displayName: person ? person.displayName : "",
                        person: person ? person : {},
                        email: email ? email : "",
                        username: username ? username : "",
                        roles: roles ? roles : [],
                        gender: person ? person.gender : {},
                        org: this.state.org ? this.state.org : null,
                        adminUnit: this.state.adminUnit ? this.state.adminUnit : null,
                        confirmPassword: confirmPassword ? confirmPassword : "",
                        password: password ? password : "",
                        active: active,
                        region: region ? region : "",
                        level: level ? level : null,
                    }}
                    isAddNew={isAddNew}
                    handleChangePassWord={this.handleChangePassWord}
                    handleClose={handleClose}
                    handleSubmit={this.handleFormSubmit}
                    listRole={listRole}
                    listGender={this.listGender}
                    //listUnit={this.state.listUnit}
                    listRegion={listRegion}
                />
            </Dialog>
        );
    }
}

export default UserEditorDialog;
