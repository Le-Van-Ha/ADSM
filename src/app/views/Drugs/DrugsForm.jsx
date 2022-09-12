import React from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent,
    FormControl,
    Select,
    MenuItem,InputLabel
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    textField: {
        width: '100%',
        margin: '10px 0px !important',
    },
    formControl: {
        width: '100%',
        margin: '10px 0px !important',
    },
}));
export default function DrugsForm(props) {
    const classes = useStyles();

    const { initialValues, handleSubmit, handleClose, readOnly } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        code: Yup.string().required('Mã thuốc không được để trống'),
        name: Yup.string().required('Thuốc không được để trống'),
        drugContent: Yup.string().required('Hàm lượng không được để trống'),
        dosageForm: Yup.string().required('Chưa chọn dạng bào chế')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                <div className="dialog-body">
                    <DialogContent className="o-hidden">
                        <Grid >
                            <Grid item sm={12}>
                                <TextField
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="code"
                                    size="small"
                                    name="code"
                                    label={t('occupation.code')}
                                    variant="outlined"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.code && Boolean(formik.errors.code)}
                                    helperText={formik.touched.code && formik.errors.code}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="name"
                                    size="small"
                                    name="name"
                                    label={t('occupation.name')}
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    disabled={readOnly}
                                    classes={{ root: classes.textField }}
                                    id="drugContent"
                                    size="small"
                                    name="drugContent"
                                    label={t('Hàm lượng')}
                                    variant="outlined"
                                    placeholder="Đơn vị tính bằng miligram"
                                    type="text"
                                    value={formik.values.drugContent}
                                    onChange={formik.handleChange}
                                    error={formik.touched.drugContent && Boolean(formik.errors.drugContent)}
                                    helperText={formik.touched.drugContent && formik.errors.drugContent}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <FormControl variant="outlined" size="small"  className={classes.formControl}>
                                    <InputLabel id="dosage-simple-id" htmlFor="dosage-simple">Dạng điều chế *</InputLabel>
                                    <Select
                                        labelId="dosage-simple-id"
                                        label="Dạng điều chế *"
                                        value={formik.values.dosageForm}
                                        onChange={formik.handleChange}
                                        error={formik.touched.drugContent && Boolean(formik.errors.drugContent)}
                                        helperText={formik.touched.drugContent && formik.errors.drugContent}
                                        inputProps={{
                                            name: "dosageForm",
                                            id: "dosage-simple",
                                        }}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="Viên">Viên</MenuItem>
                                        <MenuItem value="Viên kết hợp">Viên kết hợp</MenuItem>
                                        <MenuItem value="Gói">Gói</MenuItem>
                                        <MenuItem value="Lọ">Lọ</MenuItem>  
                                    </Select>
                                </FormControl>
                                {(formik.touched.dosageForm && formik.errors.dosageForm)? <FormHelperText style={{ color: "red", fontSize:'0.75rem', marginLeft:'14px', marginTop:'-8px' }}>{formik.touched.dosageForm && formik.errors.dosageForm}</FormHelperText>:''}
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
                            {!readOnly &&
                            <Button
                                startIcon={<SaveIcon />}
                                className="mr-0 btn btn-success d-inline-flex"
                                variant="contained"
                                color="primary"
                                disabled={props.disableButoon}
                                type="submit">
                                
                                {t("general.button.save")}
                            </Button>}
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}