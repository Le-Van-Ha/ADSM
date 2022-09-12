import React, { useEffect } from 'react';
import {
    Grid,
    TextField,
    FormLabel,
    alpha,
    // Button,
    // FormControlLabel,
    // Checkbox,

} from '@material-ui/core';
import NiceTextField from '../../Component/Form/NiceTextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import NiceCheckbox from '../../Component/Form/NiceCheckbox';
import Const from '../Const';
import ClassifyPatient from 'app/views/Component/Form/ClassifyPatient';
import NiceDatePicker from 'app/views/Component/Form/NiceDatePicker';

export default function ReporterInformation(props) {
    const {
        t,
        disabled,
        formik,
        classes,
    } = props;

    useEffect(() => {
        setCheck(formik.values[field])
    }, [field, formik.values]);
    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                            <NiceTextField
                                formik={formik}
                                classes={classes}
                                field="displayName"
                                size="small"
                                label={<span className="font">
                                    {/* <span style={{ color: "red" }}>*</span> */}
                                    {t("Họ và tên")}
                                </span>}
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <NiceTextField
                                formik={formik}
                                classes={classes}
                                field="s"
                                size="small"
                                label={t("Nghề nghiệp/Chức vụ")}
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <NiceTextField
                                formik={formik}
                                classes={classes}
                                field="s"
                                size="small"
                                label={t("Điện thoại liên lạc")}
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <NiceTextField
                                formik={formik}
                                classes={classes}
                                field="s"
                                size="small"
                                label={t("Email")}
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} xs={12}>

                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <NiceDatePicker
                                formik={formik}
                                label={t("Ngày báo cáo")}
                                format={"dd/MM/yyyy"}
                                field={"birthDate"}
                                inputVariant="outlined"
                                size="small"
                                disableFuture={true}
                                maxDateMessage={t("general.maxDateMessage")}
                                invalidDateMessage={t("general.invalidDateMessage")}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}