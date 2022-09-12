import { Grid } from "@material-ui/core";
import React from "react";
import { Breadcrumb } from "egret";
import axios from "axios";
import ConstantList from "../../appConfig";
import "react-image-crop/dist/ReactCrop.css";
import JwtAuthService from "../../services/jwtAuthService";
import { toast } from "react-toastify";
import ChangePasswordForm from "./ChangePasswordForm";
import { getCurrentUser } from "./UserService";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    //etc you get the idea
});

class ChangePassword extends React.Component {
    state = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
    };

    componentDidMount = () => {
        getCurrentUser().then(({ data }) => {
            this.setState({ user: data });
        });
    }

    handleFormSubmit = async (values) => {
        const { t } = this.props;
        const { user } = this.state;
        user.changePass = true;
        user.password = values.password;
        user.oldPassword = values.oldPassword;
        user.confirmPassword = values.confirmPassword;
        const url = ConstantList.API_ENPOINT + "/api/users/password/self";
        let isChangedOK = false;

        await axios
            .put(url, user)
            .then((response) => {
                toast.success(t("toast.change_password_success"));
                isChangedOK = true;
            })
            .catch((err) => {
                toast.error(t("toast.change_password_failure"));
            });
        if (isChangedOK) {
            await JwtAuthService.logout();
        }
    };

    render() {
        const { t } = this.props;
        const { oldPassword, password, confirmPassword, user } = this.state;
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: t("navigation.manage.user") },
                            { name: t("user.change_pass") },
                        ]}
                    />
                </div>
                <Grid container>
                    <Grid item md={12}>
                        <ChangePasswordForm
                            initialValues={{
                                oldPassword: oldPassword ? oldPassword : "",
                                password: password ? password : "",
                                confirmPassword: confirmPassword ? confirmPassword : "",
                                user: user ? user : {}
                            }}
                            handleSubmit={this.handleFormSubmit}
                        //   handleClose={handleClose}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default ChangePassword;
