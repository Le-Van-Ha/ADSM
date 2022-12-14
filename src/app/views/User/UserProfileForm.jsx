import React, { useState } from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    DialogActions,
    Button,
    DialogContent,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import { Link } from "react-router-dom";
import NiceSelect from '../Component/Form/NiceSelect';
import NiceAutocomplete from '../Component/Form/NiceAutocomplete';
import 'styles/globitsStyles.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { searchRegions } from "../AdministrativeUnit/AdministrativeUnitService";
const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: '10px 0 !important'
    },
    gridContainerForm: {
        marginBottom: 10,
        borderBottom: `1px solid ${theme.palette.myTextColor?.textIcon}`
    },
    textField: {
        width: '100%',
        backgroundColor: '#fff',
    },
    select: {
        width: '100%',
        backgroundColor: '#fff',
    },
}));
export default function UserProfileForm(props) {

    const classes = useStyles();
  

    const { initialValues, handleSubmit, listGender, listRole,  listUnit } = props;

    const { t } = useTranslation();

    const [listRegion, setListRegion] = useState({});

    React.useEffect(() => {
        searchRegions().then(({ data }) => {
            setListRegion([...data]);
          })
          
      }, []);

    const isRegion = initialValues?.roles[0]?.name === "ROLE_DOMAIN";   
    const isProvince = initialValues?.roles[0]?.name === "ROLE_PROVINCE";
    

    const validationSchema = Yup.object({
        displayName: Yup.string().required().min(6, 'Too short').max(90, 'Too long'),
        gender: Yup.string().required(),
        // username: Yup.string().required().min(3, 'Too short').max(30, 'Too long'),
        email: Yup.string().email("Invalid email").required(),
        // roles: Yup.array().required(),
        // adminUnit: Yup.object().required()
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
                        <Grid container className={classes.gridContainerForm} spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    required
                                    classes={{ root: classes.textField }}
                                    size="small"
                                    name="displayName"
                                    type="text"
                                    label={t('user.display_name')}
                                    variant="outlined"
                                    value={formik.values.displayName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                                    helperText={formik.touched.displayName && formik.errors.displayName}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                {/* <NiceSelect
                                    label={t('user.gender')}
                                    formik={formik}
                                    field="gender"
                                    size="small"
                                    variant="outlined"
                                    optionList={listGender}
                                /> */}
                                {/* <NiceAutocomplete
                                    formik={formik}
                                    field="gender"
                                    label={t("user.gender")}
                                    options={listGender ? listGender : []}
                                    variant="outlined"
                                    size="small"
                                /> */}
                                <FormControl fullWidth={true} variant="outlined" size="small">
                                    <InputLabel htmlFor="gender-simple">
                                        {
                                            <span className="font">
                                                {t("user.gender")}
                                            </span>
                                        }
                                    </InputLabel>
                                    <Select
                                        label={<span className="font">
                                        
                                            {t("user.gender")}
                                                </span>}
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
                                    required
                                    disabled
                                    fullWidth
                                    // classes={{ root: classes.textField }}
                                    size="small"
                                    name="username"
                                    type="text"
                                    label={t('user.username')}
                                    variant="outlined"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    classes={{ root: classes.textField }}
                                    size="small"
                                    name="email"
                                    type="email"
                                    label={t('user.email')}
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Autocomplete
                                    classes={{ root: classes.select }}
                                    id="roles"
                                    label={t("user.role.title")}
                                    options={listRole ? listRole : []}
                                    value={formik.values.roles[0] ? formik.values.roles[0] : null}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(even, value) => {
                                        formik.setFieldValue("roles", value)
                                    }}
                                    // multiple
                                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
                                    disabled
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                {isRegion?(<FormControl fullWidth={true} variant="outlined" size="small">
                                <InputLabel htmlFor="region">
                                    {
                                        <span className="font">
                                            <span style={{ color: "red" }}>*</span>
                                            {t("V??ng, Mi???n")}
                                        </span>
                                    }
                                </InputLabel>
                                <Select
                                    label={<span className="font">
                                        <span style={{ color: "red" }}>*</span>
                                        {t("V??ng, Mi???n")}
                                    </span>}
                                    value={formik.values.region?formik.values.region:""}
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        name: "region",
                                        id: "region",
                                    }}
                                >
                                    {Object.values(listRegion).map((item) => {
                                        return (
                                            <MenuItem  value={item}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                </FormControl>):(isProvince?
                                <Autocomplete
                                    classes={{ root: classes.select }}
                                    id="adminUnit"
                                   
                                    options={listUnit ? listUnit : []}
                                    value={formik.values.adminUnit ? formik.values.adminUnit : null}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(even, value) => {
                                        formik.setFieldValue("adminUnit", value)
                                    }}
                                    renderInput={(params) => <TextField
                                         {...params} 
                                         size="small"
                                         label={t('administrative_unit.title')}
                                         variant="outlined" />}
                                    disabled
                                />:"")}
                            </Grid>
                        </Grid>
                    </DialogContent>
                </div>
                <div className="dialog-footer">
                    <DialogActions className="p-0">
                        <div className="flex flex-space-between flex-middle">
                            <Link to="/user-manage">
                                <Button
                                    startIcon={<BlockIcon />}
                                    variant="contained"
                                    className="mr-12 btn btn-secondary d-inline-flex"
                                    // color="secondary"
                                    // onClick={() => handleClose()}
                                >
                                    {t("general.button.cancel")}
                                </Button>
                            </Link>
                            <Button
                                startIcon={<SaveIcon />}
                                className="mr-0 btn btn-success d-inline-flex"
                                variant="contained"
                                // color="primary"
                                type="submit">
                                {t("general.button.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}