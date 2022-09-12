import React from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    makeStyles,
    Checkbox,
    TextField,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import NiceDatePicker from "../../Component/Form/NiceDatePicker";
import NiceAutocomplete from "app/views/Component/Form/NiceAutocomplete";
import AddIcon from "@material-ui/icons/Add";
import NiceTextField from "app/views/Component/Form/NiceTextField";
import NiceActionButton from "../../Component/Table/NiceActionButton";
import "./DynamicTableStyles.css";
import NiceCheckbox from "app/views/Component/Form/NiceCheckbox";
import ConstantList from "../../../appConfig";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import viLocale from "date-fns/locale/vi";
const useStyles = makeStyles((theme) => ({}));
export default function PatientIncident(props) {
    const classes = useStyles();

    const { t, formik, id, history, disabled } = props;

    const columns = [
        {
            title: "Lần biến cố",
            field: "custom",
            align: "center",
            width: "40%",
            render: (rowData) =>
                rowData.incidentType !== 2 ? rowData.incidentType : null,
        },
        {
            title: "Mô tả đặc điểm biến cố",
            field: "custom",
            align: "center",
            width: "40%",
            render: (rowData) =>
                rowData.incidentType !== 2 ? (
                    <TextField
                        disabled={disabled ? disabled : false}
                        value={rowData.description ? rowData.description : ""}
                        className="w-100"
                        name="description"
                        onChange={(event) => handleChange(rowData.tableData.id, event)}
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                ) : null,
        },
        {
            title: "Thông tin về biến cố",
            field: "custom",
            align: "center",
            width: "40%",
            render: (rowData) =>
                rowData.incidentType !== 2 ? (
                    <Grid
                        container
                        md={12}
                        sm={12}
                        xs={12}
                        spacing={1}
                        style={{ alignItems: "center" }}
                    >
                        <Grid item md={6} sm={6} xs={6}>
                            <FormControlLabel
                                label="Biến cố còn tồn tại"
                                control={
                                    <Checkbox
                                        disabled={disabled ? disabled : false}
                                        checked={
                                            rowData.stillInExistence
                                                ? rowData.stillInExistence
                                                : false
                                        }
                                        onChange={(e) => handleClick(e, rowData.tableData.id)}
                                        name="checkedA"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item md={5} sm={5} xs={5}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                                <KeyboardDatePicker
                                    disabled={disabled ? disabled : false}
                                    fullWidth
                                    className="mt-1"
                                    id="appearDate"
                                    name="appearDate"
                                    openTo="year"
                                    views={["year", "month", "date"]}
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    size="small"
                                    InputAdornmentProps={{ position: "end" }}
                                    onChange={(date) =>
                                        handleChangeDate(rowData.tableData.id, date, "appearDate")
                                    }
                                    value={rowData.appearDate ? rowData.appearDate : null}
                                    disableFuture={true}
                                    maxDateMessage={t("general.maxDateMessage")}
                                    invalidDateMessage={t("general.invalidDateMessage")}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                ) : null,
        },
        {
            title: "",
            field: "custom",
            align: "center",
            width: "20%",
            render: (rowData) =>
                rowData.incidentType !== 2 ? (
                    <>
                        {/* {rowData.id && 
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="primary"
                            icon="edit"
                            disabled={disabled ? disabled : false}
                            title={t('general.button.edit')}
                            onSelect={(rowData) => {
                                history.push( ConstantList.ROOT_PATH + "patient-incident/create/" + id + "/" + rowData.id);
                            }}
                        />
                    } */}
                        {/* {rowData.id && 
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="secondary"
                            icon="account_box"
                            title={t('Xem trước')}
                            disabled={disabled ? disabled : false}
                            onSelect={(rowData) => {
                                history.push({
                                    pathname:  ConstantList.ROOT_PATH + "patient-incident/create/" + id + "/" + rowData.id,
                                    state: {readOnly:true}
                                });
                                
                            }}
                        />
                    } */}
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="error"
                            icon="delete"
                            title={t("general.button.delete")}
                            disabled={disabled ? disabled : false}
                            onSelect={(rowData, method) => {
                                if (method === 0) {
                                    handleRemoveRow(rowData.tableData.id);
                                }
                            }}
                        />
                    </>
                ) : null,
        },
    ];

    const handleChange = (index, event) => {
        let list = formik.values.patientIncidents;
        if (list == null) {
            list = [];
        }
        list[index].description = event.target.value;
        formik.setFieldValue("patientIncidents", list);
    };

    const handleChangeDate = (index, date, field) => {
        let list = formik.values.patientIncidents;
        if (list == null) {
            list = [];
        }
        list[index][field] = date;
        formik.setFieldValue("patientIncidents", list);
    };

    const handleClick = (event, item) => {
        let listData = formik.values.patientIncidents;
        listData[item].stillInExistence = event.target.checked;

        formik.setFieldValue("patientIncidents", listData);
    };

    const [patientIncidents, setPatientIncidents] = React.useState(
        formik.values.patientIncidents
    );

    const handleAddRow = () => {
        let list = [];
        list = patientIncidents;
        list.push({ stillInExistence: false });

        setPatientIncidents(list);
        formik.setFieldValue("patientIncidents", patientIncidents);
    };
    const handleRemoveRow = (rowId) => {
        let list = [];
        list = patientIncidents;
        list.splice(rowId, 1);
        setPatientIncidents(patientIncidents);
        formik.setFieldValue("patientIncidents", patientIncidents);
    };

    React.useEffect(() => {
        if (
            typeof formik.values.patientIncidents === "undefined" ||
            formik.values.patientIncidents == null ||
            formik.values.patientIncidents.length == 0
        ) {
            handleAddRow();
        } else {
        }
    }, [patientIncidents]);

    return (
        <>
            <Grid item md={12} className="dynamic-table">
                <Button
                    className="mb-16 mr-16 btn btn-success d-inline-flex"
                    startIcon={<AddIcon />}
                    variant="contained"
                    disabled={disabled ? disabled : false}
                    onClick={() => {
                        handleAddRow();
                    }}
                >
                    {t("general.button.add")}
                </Button>
                <MaterialTable
                    data={formik.values.patientIncidents}
                    columns={columns}
                    disabled={disabled ? disabled : false}
                    options={{
                        toolbar: false,
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        padding: "dense",
                        border: "none",
                        // tableLayout: "fixed",
                        cellStyle: { border: "none" },
                        headerStyle: {
                            backgroundColor: "#2a80c8",
                            color: "#fff",
                        },
                        rowStyle: (rowData, index) => ({
                            backgroundColor: index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
                        }),
                    }}
                    components={{
                        Toolbar: (props) => (
                            <div style={{ textHeader: "center" }}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
                        },
                    }}
                />
            </Grid>
            <Grid
                container
                md={12}
                xs={12}
                sm={12}
                spacing={3}
                style={{ marginTop: "12px" }}
            >
                <Grid item md={6} xs={6}>
                    <NiceDatePicker
                        disabled={disabled ? disabled : false}
                        formik={formik}
                        label="Ngày báo cáo"
                        format={"dd/MM/yyyy"}
                        field="dateReport"
                        size="small"
                        inputVariant="outlined"
                        disableFuture={true}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage={t("general.invalidDateMessage")}
                    />
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                    <NiceTextField
                        formik={formik}
                        label="Người báo cáo"
                        field="reportBy"
                        size="small"
                        variant="outlined"
                        required={false}
                        disabled={disabled ? disabled : false}
                    />
                </Grid>
            </Grid>
        </>
    );
}
