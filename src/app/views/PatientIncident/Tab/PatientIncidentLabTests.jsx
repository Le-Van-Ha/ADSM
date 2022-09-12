import React from "react";
import {
    Button,
    Grid,
    makeStyles,
    TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTable, { MTableToolbar } from "material-table";
import AddIcon from '@material-ui/icons/Add';
import NiceActionButton from '../../Component/Table/NiceActionButton';
import './DynamicTableStyles.css';
import viLocale from "date-fns/locale/vi"
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({

}));
export default function PatientIncidentLabTests(props) {
    const classes = useStyles();

    const {
        t,
        formik,
        listLabTest,
        disabled
    } = props;

    const columns = [
        {
            title: t("Tên xét nghiệm"),
            field: "labTest",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                <Autocomplete
                    id="labTest"
                    options={listLabTest ? listLabTest : []}
                    value={rowData.labTest ? rowData.labTest : null}
                    getOptionLabel={(option) => option.name}
                    onChange={(even, value) => handleChangeAutoComplete(rowData.tableData.id, value, "patientIncidentLabtests", "labTest")}
                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Đơn vị"),
            field: "labName",
            // align: "center",
            width: "100%",
            render: (rowData) => {
                let list = [];
                if (rowData.labTest != null && rowData.labTest.labTestUnitDto) {
                    let { option1, option2, option3, option4 } = rowData.labTest.labTestUnitDto;
                    list = [option1, option2, option3, option4].filter(item => item != null);
                }
                return (<Autocomplete
                    options={list}
                    value={rowData.labName ? rowData.labName : null}
                    getOptionLabel={(option) => option}
                    freeSolo
                    onChange={(event, value) =>
                        handleChangeAutoComplete(rowData.tableData.id, value, "patientIncidentLabtests", "labName")
                    }
                    renderInput={(params) =>
                        <TextField {...params}
                            onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "patientIncidentLabtests", "labName")}
                            size="small"
                            variant="outlined"
                            value={rowData.labName}
                        />
                    }
                    disabled={disabled ? disabled : false}
                />)
            },
        },
        {
            title: t("GT bình thường"),
            field: "normalResult",
            // align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.normalResult}
                    className="w-100"
                    name="normalResult"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "patientIncidentLabtests", "normalResult")}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Kết quả XN"),
            field: "result",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.result}
                    className="w-100"
                    name="result"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "patientIncidentLabtests", "result")}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Ngày XN"),
            field: "testDate",
            width: "100%",
            render: (rowData) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="testDate"
                        name="testDate"
                        openTo="year"
                        views={["year", "month", "date"]}
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "patientIncidentLabtests", "testDate")}
                        value={rowData.testDate ? rowData.testDate : null}
                        disableFuture={true}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage={t("general.invalidDateMessage")}
                        disabled={disabled ? disabled : false}
                    />
                </MuiPickersUtilsProvider>
            ),
        },
        {
            title: "",
            field: "custom",
            width: "10%",
            headerStyle: {
                padding: "0px",
            },
            cellStyle: {
                padding: "0px",
            },
            render: (rowData) => (
                <NiceActionButton
                    item={rowData}
                    size="small"
                    fontSize="small"
                    color="error"
                    icon="delete"
                    title={t('general.button.delete')}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleRemoveRow(rowData.tableData.id);
                        }
                    }}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
    ];

    const [patientIncidentLabtests, setPatientIncidentLabtests] = React.useState(formik.values.patientIncidentLabtests);

    const handleChangeAutoComplete = (index, event, list, field) => {
        let listData = formik.values[list];
        if (listData === null) {
            listData = []
        }
        listData[index][field] = event;
        formik.setFieldValue(list, listData);
    }

    const handleChangeTextField = (index, event, list, field) => {
        let listData = formik.values[list];
        if (listData === null) {
            listData = []
        }
        listData[index][field] = event.target.value;
        formik.setFieldValue(list, listData);
    }

    const handleChangeDate = (index, date, list, field) => {
        let listData = formik.values[list];
        if (listData === null) {
            listData = []
        }
        listData[index][field] = date;
        formik.setFieldValue(list, listData);
    }

    const handleAddRow = () => {
        let list = [];
        list = patientIncidentLabtests;
        list.push({ labTest: null });

        setPatientIncidentLabtests(list);
        formik.setFieldValue("patientIncidentLabtests", patientIncidentLabtests);

    }
    const handleRemoveRow = (rowId) => {
        let list = [];
        list = patientIncidentLabtests;
        list.splice(rowId, 1);
        setPatientIncidentLabtests(list);
        formik.setFieldValue("patientIncidentLabtests", patientIncidentLabtests);
    }

    React.useEffect(() => {
        if (typeof formik.values.patientIncidentLabtests === "undefined"
            || formik.values.patientIncidentLabtests == null
            || formik.values.patientIncidentLabtests.length == 0) {
            handleAddRow();
        }

    }, [patientIncidentLabtests])


    return (
        <Grid item md={12} className="dynamic-table">
            <Button
                className="mb-16 mr-16 btn btn-success d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                    handleAddRow()
                }
                }
                disabled={disabled ? disabled : false}
            >
                {t('general.button.add')}
            </Button>
            <MaterialTable
                data={formik.values.patientIncidentLabtests}
                columns={columns}
                // className="dynamic-table"
                options={{
                    toolbar: false,
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                    tableLayout: "fixed",
                    padding: "dense",
                    border: "none",
                    cellStyle: { border: "none" },
                    headerStyle: {
                        backgroundColor: "#2a80c8",
                        color: "#fff",
                    },
                    rowStyle: (rowData, index) => ({
                        backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
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
    )
}