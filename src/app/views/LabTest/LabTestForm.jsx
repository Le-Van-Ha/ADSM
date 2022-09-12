import React, { useEffect } from "react";
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import NiceTextFiend from "../Component/Form/NiceTextField";

const useStyles = makeStyles((theme) => ({
    gridItem: {
        margin: "10px 0 !important",
    },
    gridContainerForm: {
        maxHeight: "100vh",
        overflowY: "auto",
        marginBottom: 10,
        borderBottom: `1px solid ${theme.palette.myTextColor?.textIcon}`,
    },
    textField: {
        width: "99%",
        margin: "10px 0px !important",
    },
}));

export default function LabTestForm(props) {
    const classes = useStyles();
    const { initialValues, handleSubmit, handleClose, readOnly } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        code: Yup.string().required("Mã xét nghiệm không được để trống").nullable(),
        name: Yup.string()
            .required("Tp tên xét nghiệm không được để trống")
            .nullable(),
        normalNumberResult: Yup.string()
            .trim()
            .matches(
                /^\d*\.?\d*\s?-\s?\d*\.?\d*$/,
                "Giá trị nhập vào theo định dạng a.b"
            )
            .nullable(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const [labTestUnit, setLabTestUnit] = React.useState(
        formik.values.labTestUnitDto ?? {}
    );
    const handleChangeOption = (event) => {
        let obj = { ...labTestUnit, [event.target.name]: event.target.value }
        setLabTestUnit(obj);
        formik.setFieldValue("labTestUnitDto", obj);
    }

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                <div className="dialog-body">
                    <DialogContent className="o-hidden">
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="STT"
                                    field="orderNumber"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                    type="number"
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Mã xét nghiệm"
                                    field="code"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Tên xét nghiệm"
                                    field="name"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Mô tả"
                                    field="description"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Giá trị lúc bình thường"
                                    field="normalNumberResult"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFiend
                                    label="Giá trị trung bình"
                                    field="averageNumberResult"
                                    size="small"
                                    variant="outlined"
                                    formik={formik}
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-5">
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    name="option1"
                                    label="Tên đơn vị 1"
                                    variant="outlined"
                                    value={labTestUnit ? labTestUnit.option1 : ""}
                                    onChange={(event) => handleChangeOption(event)}
                                // error={formik.touched[field] && Boolean(formik.errors[field])}
                                // helperText={formik.touched[field] && formik.errors[field]}
                                // disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    name="option2"
                                    label="Tên đơn vị 2"
                                    variant="outlined"
                                    value={labTestUnit ? labTestUnit.option2 : ""}
                                    onChange={(event) => handleChangeOption(event)}
                                // error={formik.touched[field] && Boolean(formik.errors[field])}
                                // helperText={formik.touched[field] && formik.errors[field]}
                                // disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    name="option3"
                                    label="Tên đơn vị 3"
                                    variant="outlined"
                                    value={labTestUnit ? labTestUnit.option3 : ""}
                                    onChange={(event) => handleChangeOption(event)}
                                // error={formik.touched[field] && Boolean(formik.errors[field])}
                                // helperText={formik.touched[field] && formik.errors[field]}
                                // disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    name="option4"
                                    label="Tên đơn vị 4"
                                    variant="outlined"
                                    value={labTestUnit ? labTestUnit.option4 : ""}
                                    onChange={(event) => handleChangeOption(event)}
                                // error={formik.touched[field] && Boolean(formik.errors[field])}
                                // helperText={formik.touched[field] && formik.errors[field]}
                                // disabled={disabled ? disabled : false}
                                />
                            </Grid>
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
                                color="secondary"
                                onClick={() => handleClose()}
                            >
                                {t("general.button.cancel")}
                            </Button>
                            {!readOnly && (
                                <Button
                                    startIcon={<SaveIcon />}
                                    className="mr-0 btn btn-success d-inline-flex"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {t("general.button.save")}
                                </Button>
                            )}
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}
