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
  DialogContent
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
import { searchByPage, searchRegions } from "../AdministrativeUnit/AdministrativeUnitService";
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import ChangePassWordAccordion from './ChangePassWordAccordion';
import { Breadcrumb, ConfirmationDialog } from "egret";
import { getCurrentUser, getAllOrgByUserId } from "./UserService";
import UserProfileForm from './UserProfileForm';
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3
  //etc you get the idea
});
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class UserProfile extends Component {
  state = {
    isAddNew: false,
    listRole: [],
    roles: [],
    region:"",
    active: true,
    email: "",
    person: {},
    username: "",
    org: {},
    adminUnit: {},
    changePass: true,
    password: "",
    confirmPassword: "",
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
      changePass: true
    })
  }

  handleFormSubmit = (values) => {
    let { t } = this.props
    let { id, user } = this.state;
    let userOrg = {};
    if (user == null) {
      user = {};
    }
    user.username = values.username;
    user.email = values.email;
    user.person = values.person;
    user.person.displayName = values.displayName;
    user.person.gender = values.gender;
    user.roles = values.roles;
    // user.isActive = values.isActive;
    // user.password = values.password;
    userOrg.user = user;
    userOrg.org = values.org;
    userOrg.id = id;
    userOrg.adminUnit = values.adminUnit;
    getUserByUsername(this.state.username).then((data) => {
      if (data.data && data.data.id) {
        if (!user.id || (id && data.data.id !== user.id)) {
          toast.warning(t('toast.user_exist'));
          return;
        }
      }
      saveUserOrg(userOrg).then(() => {
        toast.success(t('toast.update_success'));
      });
    });
  };

  selectRoles = (rolesSelected) => {
    this.setState({ roles: rolesSelected }, function () { });
  };
  componentDidMount() {
    getCurrentUser().then(({ data }) => {
        this.setState({ ...data, user: data }, () => {
            getAllOrgByUserId(this.state.id).then(({data}) => {
                this.setState({org: {
                  id: data.org ? data.org.id : null ,
                  name: data.org ? data.org.name : null,
                  code: data.org ? data.org.code : null,
                  orgType: data.org ? data.org.orgType : null,
                  level: data.org ? data.org.level : null
                }, id: data.id, adminUnit: data.adminUnit, region: data.region})
            })
        });
    });

    
  }
  componentWillMount() {

    this.getAminUnit();
    if (!UserRoles.isAdmin()) {
        // getAllInfoByUserLogin().then(({ data }) => {
        //     let idHealthOrg = data?.userOrganization?.org?.id
        //     this.setState({ idHealthOrg: idHealthOrg }, () => {
        //         this.getHealthOrg();
        //     })
        // })
        getRoleUser().then(({ data }) => {
            this.setState({
                listRole: data,
            });
        })
    } else {
        
        getAllRoles().then(({ data }) => {
            this.setState({
                listRole: data,
            });
        });
    }
  }

  getAminUnit = () => {
    var searchObject = {};
    searchObject.pageIndex = 0;
    searchObject.pageSize = 10000000;
    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        listUnit: [...data.content],
        totalElements: data.totalElements,
      });
    });
  }

  selectHealthOrganization = (event, labTest) => {
    this.setState({ org: labTest }, function () { });
  };
  render() {
    let { t } = this.props;
    let {
      id,
      listRole,
      roles,
      region,
      email,
      person,
      username,
    } = this.state;
    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[
            { name: t('navigation.manage.user') },
            { name: t('navigation.manage.personal_info') }
            ]} />
        </div>

        <Grid container>
            <Grid item md={12}>
                <UserProfileForm 
                    initialValues={{
                        person: person ? person : {},
                        email: email ? email : "",
                        username: username ? username : "",
                        roles: roles ? roles : [],
                        displayName: person?.displayName ? person?.displayName : "",
                        gender: person?.gender ? person?.gender : {},
                        org: this.state.org ? this.state.org : null,
                        adminUnit: this.state.adminUnit ? this.state.adminUnit : null,
                        region: region ? region : "",
                        }}
                        handleSubmit={this.handleFormSubmit}
                        listRole={listRole}
                        listGender={this.listGender}
                        listUnit={this.state.listUnit}
                />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
