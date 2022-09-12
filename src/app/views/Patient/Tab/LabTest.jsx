import { Checkbox, Grid, TextField } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import NiceTextField from "../../Component/Form/NiceTextField";
export default function LabTest(props) {
    const { t, formik, listLabTest, disabled } = props;

    const [patientLabtestResults, setPatientLabtestResults] = React.useState(
        formik.values.patientLabtestResults
    );


    const handleChangeNumberResult = (index, event) => {
        const regex = /[^0-9.]/gi;
        if (regex.test(event.target.value)) {
            let patientLabtestResults = formik.values.patientLabtestResults;
            formik.setFieldValue("patientLabtestResults", patientLabtestResults);
            return;
        } else {
            patientLabtestResults[index].numberResult = event.target.value;
            formik.setFieldValue("patientLabtestResults", patientLabtestResults);
        }
    };


    const handleChangeCheckIsExtraordinary = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = [];
        }
        patientLabtestResults[index].isExtraordinary = event.target.checked;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    };

    const handleChangeMeasure = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = [];
        }
        patientLabtestResults[index].measure = event;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    };

    const handleChangeOtherLabTestName = (index, event) => {
        let patientLabtestResults = formik.values.patientLabtestResults;
        if (patientLabtestResults == null) {
            patientLabtestResults = [];
        }
        patientLabtestResults[index].otherLabTestName = event.target.value;
        formik.setFieldValue("patientLabtestResults", patientLabtestResults);
    };

    const handleMove = (index, event, name) => {
        let lastIndex = formik.values.patientLabtestResults.length - 1;
        //  Down arrow
        if (event.keyCode === 40) {
            document
                .querySelector(`#${name}${index === lastIndex ? 0 : index + 1}`)
                .focus();
        }
        // Up arrow
        if (event.keyCode === 38) {
            document
                .querySelector(`#${name}${index === 0 ? lastIndex : index - 1}`)
                .focus();
        }
    };
    const onChangeTestedDate = (event, value, index) => {
        let patientLabtestResultsCopy = null;
        if (index === 0 && event !== null && event != "Invalid Date") {
            patientLabtestResultsCopy = formik.values.patientLabtestResults.map((item) => {
                return { ...item, testedDate: event };
            });
        } else {
            patientLabtestResultsCopy = formik.values.patientLabtestResults.slice();
            patientLabtestResultsCopy[index]["testedDate"] = event;
        }
        formik.setFieldValue("patientLabtestResults", patientLabtestResultsCopy);
    };

    const columns = [
        {
            title: "Tên xét nghiệm",
            field: "labTest.name",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <TextField
                    value={
                        rowData.labTest && rowData.labTest.name
                            ? rowData.labTest.name
                            : rowData.otherLabTestName
                    }
                    className="w-100"
                    name="name"
                    disabled={
                        formik.values.patientLabtestResults.length - 1 !=
                        rowData.tableData.id || disabled
                    }
                    onChange={(event) =>
                        handleChangeOtherLabTestName(rowData.tableData.id, event)
                    }
                    id={`name${rowData.tableData.id}`}
                    onKeyDown={(event) => handleMove(rowData.tableData.id, event, "name")}
                    type="text"
                    variant="outlined"
                    size="small"
                />
            ),
        },
        {
            title: "Đơn vị đo",
            field: "measure",
            align: "center",
            width: "30%",
            render: (rowData) => {
                let list = [];
                if (rowData.labTest != null && rowData.labTest.labTestUnitDto) {
                    let { option1, option2, option3, option4 } = rowData.labTest.labTestUnitDto;
                    list = [option1, option2, option3, option4].filter(item => item != null);
                }
                return (<Autocomplete
                    options={list}
                    value={rowData.measure}
                    getOptionLabel={(option) => option}
                    freeSolo
                    onChange={(event, value) =>
                        handleChangeMeasure(rowData.tableData.id, value)
                    }
                    renderInput={(params) =>
                        <TextField {...params}
                            onChange={(event) => handleChangeMeasure(rowData.tableData.id, event.target.value)}
                            size="small"
                            variant="outlined"
                            value={rowData.measure}
                        />
                    }
                    disabled={disabled ? disabled : false}
                />)
            },
        },
        {
            title: "Kết quả",
            field: "numberResult",
            align: "center",
            width: "30%",
            render: (rowData) => (
                <>
                    <TextField
                        value={rowData.numberResult}
                        id={`numberResult${rowData.tableData.id}`}
                        className="w-100"
                        name="numberResult"
                        onChange={(event) =>
                            handleChangeNumberResult(rowData.tableData.id, event)
                        }
                        onKeyDown={(event) =>
                            handleMove(rowData.tableData.id, event, "numberResult")
                        }
                        type="text"
                        variant="outlined"
                        size="small"
                        disabled={disabled ? disabled : false}
                    />
                </>
            ),
        },
        {
            title: "Ngày XN",
            field: "testedDate",
            align: "center",
            width: "30%",
            render: (rowData) =>
            (<MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <KeyboardDatePicker
                    fullWidth
                    id={`testedDate${rowData.tableData.id}`}
                    name={"testedDate"}
                    openTo="year"
                    views={["year", "month", "date"]}
                    autoOk
                    className="testedDate_KeyboardDatePicker"
                    variant="inline"
                    invalidDateMessage={t("general.invalidDateMessage")}
                    inputVariant="outlined"
                    value={rowData?.numberResult ? (rowData?.testedDate || null) : null}
                    onChange={(event, value) =>
                        onChangeTestedDate(event, value, rowData.tableData.id)
                    }
                    disableFuture={true}
                    format={"dd/MM/yyyy"}
                    size="small"
                    maxDateMessage={t("general.maxDateMessage")}
                    InputAdornmentProps={{ position: "end" }}
                    disabled={(patientLabtestResults[rowData.tableData.id].numberResult == null ||
                        patientLabtestResults[rowData.tableData.id].numberResult == "")
                        ? true : false}
                />
            </MuiPickersUtilsProvider>
            ),
        },
        {
            title: "GT bất thường",
            field: "isExtraordinary",
            align: "center",
            width: "30%",
            render: (rowData) => {
                return (<Checkbox
                    value={rowData?.numberResult ? (rowData?.isExtraordinary) : false}
                    checked={rowData?.numberResult ? rowData?.isExtraordinary : false}
                    name="isExtraordinary"
                    onChange={(event) =>
                        handleChangeCheckIsExtraordinary(rowData.tableData.id, event)
                    }
                    disabled={(patientLabtestResults[rowData.tableData.id].numberResult == null ||
                        patientLabtestResults[rowData.tableData.id].numberResult == "")
                        ? true : false}
                />)
            },
        },
    ];

    const handleAddRow = () => {
        let list = [];
        if (listLabTest && listLabTest.length > 0) {
            listLabTest.forEach((element) => {
                let p = {};
                p.labTest = element;
                list.push(p);
            });
        }

        list.push({
            labTest: null,
        });

        setPatientLabtestResults(list);
        formik.setFieldValue("patientLabtestResults", list);
    };


    React.useEffect(() => {
        if (
            typeof formik.values.patientLabtestResults === "undefined" ||
            formik.values.patientLabtestResults == null ||
            formik.values.patientLabtestResults.length == 0
        ) {
            handleAddRow();
        } else {
            setPatientLabtestResults(formik.values.patientLabtestResults);
        }
    }, [formik.values.patientLabtestResults]);
    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Grid container spacing={2}>
                    <MaterialTable
                        data={patientLabtestResults}
                        columns={columns}
                        className="w-100"
                        disabled={disabled ? disabled : false}
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
                            headerStyle: { border: "none", fontSize: "15px" },
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
                    <Grid item md={6} sm={6} xs={6} style={{ marginTop: "12px" }}>
                        <Grid container spacing={2} style={{ alignItems: "center" }}>
                            <Grid item md={4} sm={4} xs={4}>
                                <span style={{ fontWeight: "bold" }}>Đo thính lực: </span>
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="hearingLeft"
                                    size="small"
                                    label={"Tai trái"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="hearingRight"
                                    size="small"
                                    label={"Tai phải"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6} style={{ marginTop: "12px" }}>
                        <Grid container spacing={2} style={{ alignItems: "center" }}>
                            <Grid item md={4} sm={4} xs={4}>
                                <span style={{ fontWeight: "bold" }}>Đo thị lực: </span>
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="eyeSightLeft"
                                    size="small"
                                    label={"Mắt trái"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item md={4} sm={4} xs={4}>
                                <NiceTextField
                                    formik={formik}
                                    field="eyeSightRight"
                                    size="small"
                                    label={"Mắt phải"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="qtc"
                            size="small"
                            label={"Khoảng QT(ms)"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                            type="number"
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="qTcF"
                            size="small"
                            type="number"
                            label={"Khoảng QTcF (ms)"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="heartbeat"
                            type="number"
                            size="small"
                            label={"Nhịp tim"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                        <NiceTextField
                            formik={formik}
                            field="otherTest"
                            size="small"
                            label={"Khác"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
