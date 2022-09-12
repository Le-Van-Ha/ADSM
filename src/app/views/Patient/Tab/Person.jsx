import React from "react";
import { Grid, TextField } from "@material-ui/core";
import NiceTextField from "../../Component/Form/NiceTextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Const from "../Const";
import ClassifyPatient from "app/views/Component/Form/ClassifyPatient";
import NiceDatePicker from "app/views/Component/Form/NiceDatePicker";
import InputPopupHealthOrg from "../../HealthOrg/InputPopup/InputPopup";
import InjuredPlace from "../../Component/Form/InjuredPlace";
export default function Person(props) {
    const { t, formik, classes, disabled } = props;

    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <fieldset>
                        <legend>{t("hiv_case.person_infomation")}</legend>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={12} xs={12}>
                                <NiceTextField
                                    formik={formik}
                                    classes={classes}
                                    field="displayName"
                                    size="small"
                                    // required={true}
                                    disabled={disabled ? disabled : false}
                                    label={
                                        <span className="font">
                                            {/* <span style={{ color: "red" }}>*</span> */}
                                            {t("Họ và tên")}
                                        </span>
                                    }
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item md={3} sm={12} xs={12}>
                                <NiceTextField
                                    formik={formik}
                                    classes={classes}
                                    field="patientCode"
                                    size="small"
                                    label={"Mã số bệnh nhân"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <NiceTextField
                                    formik={formik}
                                    classes={classes}
                                    field="eTBCode"
                                    size="small"
                                    label={"Số eTB"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <InputPopupHealthOrg
                                    label={t("Cơ sở điều trị")}
                                    formik={formik}
                                    field="healthOrg"
                                    variant="outlined"
                                    size="small"
                                    tree="true"
                                    // required={true}
                                    disabled={disabled ? disabled : false}
                                // manager="true"
                                // treatment="true"
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <Autocomplete
                                    value={formik.values.gender}
                                    id="gender"
                                    name="gender"
                                    onChange={(even, value) => {
                                        formik.setFieldValue("gender", value);
                                    }}
                                    options={(Const.listGender ? Const.listGender : []).map(
                                        (option) => option.code
                                    )}
                                    getOptionLabel={(optionId) =>
                                        (Const.listGender ? Const.listGender : []).filter(
                                            (option) => option.code === optionId
                                        )[0]?.display
                                    }
                                    disabled={disabled ? disabled : false}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            disabled={disabled ? disabled : false}
                                            size="small"
                                            variant="outlined"
                                            label="Giới tính"
                                            error={
                                                formik.touched.gender && Boolean(formik.errors.gender)
                                            }
                                            helperText={formik.touched.gender && formik.errors.gender}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={6}>
                                <NiceDatePicker
                                    formik={formik}
                                    label={t("hiv_case.birth_date")}
                                    format={"dd/MM/yyyy"}
                                    field="birthDate"
                                    inputVariant="outlined"
                                    size="small"
                                    disableFuture={true}
                                    maxDateMessage={t("general.maxDateMessage")}
                                    invalidDateMessage={t("general.invalidDateMessage")}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <NiceTextField
                                    formik={formik}
                                    classes={classes}
                                    field="height"
                                    size="small"
                                    label={"Chiều cao (cm)"}
                                    variant="outlined"
                                    type="number"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} xs={12}>
                                <NiceTextField
                                    formik={formik}
                                    classes={classes}
                                    field="weight"
                                    size="small"
                                    label={"Cân nặng (kg)"}
                                    variant="outlined"
                                    type="number"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <InjuredPlace
                                    formik={formik}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <ClassifyPatient
                                    formik={formik}
                                    field="classify"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </Grid>
            </Grid>
        </Grid>
    );
}
