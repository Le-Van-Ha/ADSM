import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "styles/globitsStyles.css";
import * as Yup from "yup";
import SelectAdminUnit from "../AdministrativeUnit/InputPopup/InputPopup";
import ChangePassWordAccordion from "./ChangePassWordAccordion";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '10px 0'
  },
  gridItem: {
    margin: "10px 0 !important",
  },
  gridContainerForm: {
    marginBottom: 10,
    borderBottom: `1px solid ${theme.palette.myTextColor?.textIcon}`,
  },
  textField: {
    width: "100%",
    backgroundColor: "#fff",
  },
  select: {
    width: "100%",
    backgroundColor: "#fff",
  },
}));

export default function UserProfileForm(props) {
  const classes = useStyles();

  const {
    initialValues,
    handleSubmit,
    listGender,
    listRole,
    listRegion,
    listOrg,
    listUnit,
    handleChangePassWord,
    isAddNew,
    handleClose,
  } = props;

  const { t } = useTranslation();

  const [isRegion, setIsRegion] = useState(
    initialValues?.roles?.name === "ROLE_DOMAIN"
  );
  const [isProvince, setIsProvince] = useState(
    initialValues?.roles?.name === "ROLE_PROVINCE"
  );
  const [isDistrict, setIsDistrict] = useState(
    initialValues?.roles?.name === "ROLE_DISTRICT"
  );
  const [isSubDistrict, setIsSubDistrict] = useState(
    initialValues?.roles?.name === "ROLE_SUB_DISTRICT"
  );

  const validationSchema = Yup.object({
    displayName: Yup.string()
      .required("Tên hiện thị không được để trống")
      .max(90, "Tên hiển thị quá dài"),
    gender: Yup.string()
      .required("Giới tính không được để trống")
      .typeError("Chưa chọn giới tính"),
    username: Yup.string()
      .required("Tên đăng nhập không được để trống")
      .min(6, "Tên đăng nhập phải lớn hơn 6 ký tự")
      .max(30, "Tên đăng nhập quá dài"),
    email: Yup.string()
      .email("Email chưa đúng định dạng")
      .required("Email không được để trống"),
    roles: Yup.object()
      .required("Vai trò không được để trống")
      .typeError("Chưa chọn quyền"),
    // org: Yup.object().required('Chưa chọn đơn vị y tế').typeError('Chưa chọn đơn vị y tế'),
    // adminUnit: Yup.object()
    //   .required("Chưa chọn đơn vị hành chính")
    //   .typeError("Chưa chọn đơn vị hành chính"),
    // password: Yup.string().required("Chưa nhập mật khẩu").min(6, 'Too short'),
    // password: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
    // confirmPassword: Yup.string().required('Nhập lại mật khẩu')
    //     .oneOf([Yup.ref('password'), null], 'Mật khẩu chưa trùng khớp')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [showProvince, setShowProvince] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showSubDistrict, setshowSubDistrict] = useState(false);

  const handleSelectChange = (type) => {
    if (type === "role") {
      formik.values.adminUnit = null;
      formik.values.province = null;
      formik.values.district = null;
      formik.values.region = "";
      setShowProvince(false);
      setTimeout(() => {
        setShowProvince(true);
      }, 100);
    } else if (type === "province" && !isProvince) {
      setShowDistrict(false);
      setshowSubDistrict(false);
      formik.values.adminUnit = null;
      formik.values.region = "";
      setTimeout(() => {
        setShowDistrict(true);
      }, 100);
    } else if (type === "district") {
      setshowSubDistrict(false);
      formik.values.adminUnit = null;
      formik.values.region = "";
      setTimeout(() => {
        setshowSubDistrict(true);
      }, 100);
    } else {
      setShowDistrict(false);
      setshowSubDistrict(false);
    }
  };

  useEffect(() => {
    if (initialValues?.roles?.name === "ROLE_PROVINCE") {
      setShowProvince(true);
    }
    if (initialValues?.roles?.name === "ROLE_DISTRICT") {
      formik.setFieldValue("province", initialValues.adminUnit.parent);
      setShowProvince(true);
      setShowDistrict(true);
    }
    if (initialValues?.roles?.name === "ROLE_SUB_DISTRICT") {
      formik.setFieldValue("province", initialValues.adminUnit.parent.parent);
      formik.setFieldValue("district", initialValues.adminUnit?.parent);
      setShowProvince(true);
      setShowDistrict(true);
      setshowSubDistrict(true);
    }
  }, []);

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <div className="dialog-body">
          <DialogContent className="o-hidden">
            <Grid container className={classes.gridContainerForm} spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  name="displayName"
                  type="text"
                  label={t("user.display_name")}
                  variant="outlined"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.displayName &&
                    Boolean(formik.errors.displayName)
                  }
                  helperText={
                    formik.touched.displayName && formik.errors.displayName
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel htmlFor="gender-simple">
                    {<span className="font">{t("user.gender")}</span>}
                  </InputLabel>
                  <Select
                    label={<span className="font">{t("user.gender")}</span>}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    inputProps={{
                      name: "gender",
                      id: "gender-simple",
                    }}
                  >
                    {listGender.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  name="username"
                  type="text"
                  label={t("user.username")}
                  variant="outlined"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  label={t("user.email")}
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              {!isAddNew && (
                <Grid item xs={12}>
                  {" "}
                  <ChangePassWordAccordion t={t} formik={formik} />{" "}
                </Grid>
              )}
              {isAddNew && (
                <>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label={t("user.password")}
                      variant="outlined"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="confirmPassword"
                      label={t("user.re_password")}
                      variant="outlined"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item>
                <FormControlLabel
                  value={formik.values.active}
                  name="active"
                  onChange={formik.handleChange}
                  control={<Checkbox checked={formik.values.active} />}
                  label={t("user.active")}
                />
              </Grid>
              <Grid item md={6} sm={6}></Grid>

              <Grid item sm={6} xs={12} className="mb-16">
                <Autocomplete
                  classes={{ root: classes.select }}
                  id="roles"
                  label={t("user.role.title")}
                  value={formik.values.roles ? formik.values.roles : null}
                  name="roles"
                  options={listRole ? listRole : []}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(even, value) => {
                    handleSelectChange("role");
                    setShowDistrict(false);
                    setshowSubDistrict(false);
                    formik.setFieldValue("roles", value);

                    if (
                      value !== null &&
                      value.name !== null &&
                      value.name === "ROLE_DOMAIN"
                    ) {
                      setIsRegion(true);
                    } else {
                      setIsRegion(false);
                    }
                    if (
                      value !== null &&
                      value.name !== null &&
                      value.name === "ROLE_PROVINCE"
                    ) {
                      setIsProvince(true);
                    } else {
                      setIsProvince(false);
                    }
                    if (
                      value !== null &&
                      value.name !== null &&
                      value.name === "ROLE_DISTRICT"
                    ) {
                      setIsDistrict(true);
                    } else {
                      setIsDistrict(false);
                    }
                    if (
                      value !== null &&
                      value.name !== null &&
                      value.name === "ROLE_SUB_DISTRICT"
                    ) {
                      setIsSubDistrict(true);
                    } else {
                      setIsSubDistrict(false);
                    }
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label={t("user.role.title")}
                      variant="outlined"
                      id="roles"
                      name="roles"
                      error={
                        formik.touched.roles && Boolean(formik.errors.roles)
                      }
                      helperText={formik.touched.roles && formik.errors.roles}
                    />
                  )}
                />
              </Grid>

              {isRegion && (
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth={true} variant="outlined" size="small">
                    <InputLabel htmlFor="region">
                      {<span className="font">{t("Vùng, Miền")}</span>}
                    </InputLabel>
                    <Select
                      label={<span className="font">{t("Vùng, Miền")}</span>}
                      value={formik.values.region ? formik.values.region : ""}
                      onChange={formik.handleChange}
                      inputProps={{
                        name: "region",
                        id: "region",
                      }}
                    >
                      {Object.values(listRegion).map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {showProvince && (isProvince || isDistrict || isSubDistrict) ? (
                <Grid item sm={6} xs={12}>
                  <SelectAdminUnit
                    label="Tỉnh"
                    formik={formik}
                    field={isProvince ? "adminUnit" : "province"}
                    variant="outlined"
                    size="small"
                    tree="true"
                    level={3}
                    required
                    onSelectChange={() => handleSelectChange("province")}
                  />
                </Grid>
              ) : null}

              {(showDistrict && isDistrict) ||
              (isSubDistrict && showDistrict) ? (
                <Grid item md={6} xs={12}>
                  <SelectAdminUnit
                    label="Quận/Huyện"
                    formik={formik}
                    field={isDistrict ? "adminUnit" : "district"}
                    variant="outlined"
                    size="small"
                    required
                    tree="true"
                    level={4}
                    parentId={formik.values.province?.id}
                    onSelectChange={() => handleSelectChange("district")}
                  />
                </Grid>
              ) : null}

              {showSubDistrict && isSubDistrict ? (
                <Grid item md={6}>
                  <SelectAdminUnit
                    label="Phường/Xã"
                    formik={formik}
                    field={isSubDistrict ? "adminUnit" : "subDistrict"}
                    variant="outlined"
                    size="small"
                    tree="true"
                    level={5}
                    required
                    parentId={formik.values.district?.id}
                  />
                </Grid>
              ) : null}
            </Grid>
          </DialogContent>
        </div>
        <div className="dialog-footer">
          <DialogActions className="p-0">
            <div className="flex flex-space-between flex-middle">
              <Button
                startIcon={<BlockIcon />}
                variant="contained"
                className="mr-12 btn btn-secondary d-inline-flex"
                // color="secondary"
                onClick={() => handleClose()}
              >
                {t("general.button.cancel")}
              </Button>
              <Button
                startIcon={<SaveIcon />}
                className="mr-0 btn btn-success d-inline-flex"
                variant="contained"
                // color="primary"
                type="submit"
              >
                {t("general.button.save")}
              </Button>
            </div>
          </DialogActions>
        </div>
      </form>
    </div>
  );
}
