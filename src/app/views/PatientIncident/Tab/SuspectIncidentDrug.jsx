import React from "react";
import {
    TextField,
    Grid,
    Button,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';
import NiceTextField from "app/views/Component/Form/NiceTextField";
import NiceActionButton from '../../Component/Table/NiceActionButton';
import './DynamicTableStyles.css';
import viLocale from "date-fns/locale/vi"
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { deleteListCombination } from '../PatientIncidentService'

export default function SuspectIncidentDrug(props) {

    const {
        t,
        formik,
        listDrugs,
        disabled,
    } = props;

    const [suspectIncidentDrugs, setSuspectIncidentDrugs] = React.useState(formik.values.listSuspectIncidentDrugDto ? formik.values.listSuspectIncidentDrugDto : []);

    const handleAddRow = () => {
        let list = [];
        list = suspectIncidentDrugs;
        list.push({
            type: 1
        });
        setSuspectIncidentDrugs(list);
        formik.setFieldValue("listSuspectIncidentDrugDto", list);

    }

    const handleRemoveRow = (rowId) => {
        let list = [];
        list = suspectIncidentDrugs;
        list.splice(rowId, 1);
        setSuspectIncidentDrugs(list);
        formik.setFieldValue("listSuspectIncidentDrugDto", list);
    }

    const handleCheckbox = (event, item, field) => {
        let listData = formik.values.listSuspectIncidentDrugDto;
        listData[item][field] = event.target.checked
        formik.setFieldValue("listSuspectIncidentDrugDto", listData)
    }

    React.useEffect(() => {
        if (typeof formik.values.listSuspectIncidentDrugDto === "undefined"
            || formik.values.listSuspectIncidentDrugDto == null
            || formik.values.listSuspectIncidentDrugDto.length == 0) {
            handleAddRow();
        }
    }, [suspectIncidentDrugs])

    const handleChangeAutoComplete = (index, event, list, field) => {
        let listData = formik.values[list];
        if (listData == null) {
            listData = []
        }
        if (field === "drugText") {
            let objDrug = { name: event, type: false };
            listData[index]["drug"] = objDrug;
        } else {
            listData[index][field] = event;
        }
        formik.setFieldValue(list, listData);
    }

    const handleChangeTextField = (index, event, list, field) => {
        let listData = formik.values[list];
        if (listData == null) {
            listData = []
        }
        listData[index][event.target.name] = event.target.value;
        formik.setFieldValue(list, listData);
    }

    const handleChangeDate = (index, date, list, field) => {
        let listData = formik.values[list];
        if (listData == null) {
            listData = []
        }
        listData[index][field] = date;
        formik.setFieldValue(list, listData);
    }
    //hết hàm dùng chung

    const columns = [
        {
            title: t("STT"),
            field: "custom",
            align: "center",
            width: "100%",
            headerStyle: {
                padding: "0px",
                maxWidth: "30px"
            },
            cellStyle: {
                padding: "0px",
                maxWidth: "30px"
            },
            render: (rowData) => (
                <span>{rowData.tableData.id + 1}</span>
            ),
        },
        {
            title: t("Thuốc nghi ngờ"),
            field: "custom",
            align: "center",
            width: "100%",
            headerStyle: {
                padding: "0px",
            },
            cellStyle: {
                padding: "0px",
            },
            render: (rowData) => (
                <Autocomplete
                    id="drug-id"
                    options={listDrugs ? listDrugs : []}
                    value={rowData.drug ? rowData.drug : null}
                    getOptionLabel={(option) => option.name}
                    onChange={(even, value) => handleChangeAutoComplete(rowData.tableData.id, value, "listSuspectIncidentDrugDto", "drug")}
                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Dạng bào chế, hàm lượng"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.content}
                    className="w-100"
                    name="content"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listSuspectIncidentDrugDto", "content")}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Liều dùng (đơn vị)"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.dose}
                    className="w-100"
                    name="dose"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listSuspectIncidentDrugDto", "dose")}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}

                />
            ),
        },
        {
            title: t("Số lần dùng"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.numberOfUse}
                    className="w-100"
                    name="numberOfUse"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listSuspectIncidentDrugDto", "numberOfUse")}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Đường dùng"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.drugRoute}
                    className="w-100"
                    name="drugRoute"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listSuspectIncidentDrugDto", "drugRoute")}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Ngày bắt đầu điều trị"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="startDate"
                        name="startDate"
                        openTo="year"
                        views={["year", "month", "date"]}
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "listSuspectIncidentDrugDto", "startDate")}
                        value={rowData.startDate ? rowData.startDate : null}
                        disableFuture={true}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage={t("general.invalidDateMessage")}
                        disabled={disabled ? disabled : false}
                    />
                </MuiPickersUtilsProvider>
            ),
        },
        {
            title: t("Ngày kết thúc điều trị"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="endDate"
                        name="endDate"
                        openTo="year"
                        views={["year", "month", "date"]}
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "listSuspectIncidentDrugDto", "endDate")}
                        value={rowData.endDate ? rowData.endDate : null}
                        disableFuture={true}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage={t("general.invalidDateMessage")}
                        disabled={disabled ? disabled : false}
                    />
                </MuiPickersUtilsProvider>
            ),
        },
        {
            title: t("Có ngừng/giảm liều thuốc nghi ngờ?"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) =>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rowData.hasReduce ? rowData.hasReduce : false}
                            onChange={(e) =>
                                handleCheckbox(e, rowData.tableData.id, "hasReduce")
                            }
                            name={"hasReduce" + rowData.tableData.id}
                        />}
                />
        },
        {
            title: t("Phản ứng có cải thiện khi ngừng/giảm liều thuốc?"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) =>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rowData.hasImprove ? rowData.hasImprove : false}
                            onChange={(e) =>
                                handleCheckbox(e, rowData.tableData.id, "hasImprove")
                            }
                            name={"hasImprove" + rowData.tableData.id}
                            disabled={disabled ? disabled : false}
                        />}
                />
        },
        {
            title: t("Có tái sử dụng thuốc nghi ngờ?"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) =>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rowData.reTakeSuspecDrug ? rowData.reTakeSuspecDrug : false}
                            onChange={(e) =>
                                handleCheckbox(e, rowData.tableData.id, "reTakeSuspecDrug")
                            }
                            name={"reTakeSuspecDrug" + rowData.tableData.id}
                            disabled={disabled ? disabled : false}
                        />}
                />
        },
        {
            title: t("Phản ứng có lặp lại khi tái sử dụng thuốc nghi ngờ"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) =>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rowData.repeatDrugReaction ? rowData.repeatDrugReaction : false}
                            onChange={(e) =>
                                handleCheckbox(e, rowData.tableData.id, "repeatDrugReaction")
                            }
                            name={"repeatDrugReaction" + rowData.tableData.id}
                            disabled={disabled ? disabled : false}
                        />}
                />
        },
        {
            title: "",
            field: "custom",
            align: "center",
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

    const [combinationDrugs, setCombinationDrugs] = React.useState(formik.values.listCombinationDrugDto ? formik.values.listCombinationDrugDto : []);

    const handleAddRowB = () => {
        let list = [];
        list = combinationDrugs;
        list.push({
            type: 2
        });
        setCombinationDrugs(list);
        formik.setFieldValue("listCombinationDrugDto", list);

    }
    const handleRemoveRowB = (rowId, id) => {
        let list = [];
        deleteListCombination(id).then((res) => {
            list = combinationDrugs;
            list.splice(rowId, 1);
            setCombinationDrugs(list);
            formik.setFieldValue("listCombinationDrugDto", list);
        })
    }


    React.useEffect(() => {
        if (typeof formik.values.listCombinationDrugDto === "undefined"
            || formik.values.listCombinationDrugDto == null
            || formik.values.listCombinationDrugDto.length == 0) {
            handleAddRowB();
        }
    }, [combinationDrugs])

    const columnsB = [
        {
            title: t("Tên thuốc"),
            field: "custom",
            align: "center",
            width: "100%",
            headerStyle: {
                padding: "0px",
            },
            cellStyle: {
                padding: "0px",
            },
            render: (rowData) => (
                <Autocomplete
                    id="drug"
                    options={listDrugs ? listDrugs : []}
                    value={rowData.drug ? rowData.drug : {}}
                    getOptionLabel={(option) => option.name}
                    freeSolo
                    onChange={(event, value) =>
                        handleChangeAutoComplete(rowData.tableData.id, value, "listCombinationDrugDto", "drug")}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            size="small"
                            variant="outlined"
                            value={rowData.drug ? rowData.drug : {}}
                            onChange={(event) =>
                                handleChangeAutoComplete(rowData.tableData.id,
                                    event.target.value,
                                    "listCombinationDrugDto",
                                    "drugText")}
                        />}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Hàm lượng"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.content}
                    className="w-100"
                    name="content"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listCombinationDrugDto", "content")}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Liều dùng (đơn vị)"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.dose}
                    className="w-100"
                    name="dose"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listCombinationDrugDto", "dose")}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Đường dùng"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <TextField
                    value={rowData.drugRoute}
                    className="w-100"
                    name="drugRoute"
                    onChange={(event) => handleChangeTextField(rowData.tableData.id, event, "listCombinationDrugDto", "drugRoute")}
                    type="text"
                    variant="outlined"
                    size="small"
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Ngày bắt đầu điều trị"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="startDate"
                        name="startDate"
                        openTo="year"
                        views={["year", "month", "date"]}
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "listCombinationDrugDto", "startDate")}
                        value={rowData.startDate ? rowData.startDate : null}
                        disableFuture={true}
                        disabled={disabled ? disabled : false}
                        maxDateMessage={t("general.maxDateMessage")}
                        invalidDateMessage={t("general.invalidDateMessage")}
                    />
                </MuiPickersUtilsProvider>
            ),
        },
        {
            title: t("Ngày kết thúc điều trị"),
            field: "custom",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                        fullWidth
                        id="endDate"
                        name="endDate"
                        openTo="year"
                        views={["year", "month", "date"]}
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date) => handleChangeDate(rowData.tableData.id, date, "listCombinationDrugDto", "endDate")}
                        value={rowData.endDate ? rowData.endDate : null}
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
            align: "center",
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
                            handleRemoveRowB(rowData.tableData.id, rowData.id);
                        }
                    }}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
    ];
    return (
        <>
            <Grid item md={12} className="dynamic-table">
                <h5>CÁC THUỐC NGHI NGỜ GÂY BIẾN CỐ</h5>
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
                    data={formik.values.listSuspectIncidentDrugDto}
                    columns={columns}
                    className="w-100"
                    options={{
                        toolbar: false,
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        padding: "dense",
                        border: "none",
                        cellStyle: { border: "none" },
                        headerStyle: {
                            backgroundColor: "#2a80c8",
                            color: "#fff",
                            whiteSpace: "nowrap"
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

            {/* Bảng thứ 2 */}
            <Grid item md={12} className="dynamic-table" style={{ marginTop: "24px" }}>
                <h5>CÁC THUỐC DÙNG ĐỒNG THỜI (Trước khi xảy ra biến cố)</h5>
                <Button
                    className="mb-16 mr-16 btn btn-success d-inline-flex"
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => {
                        handleAddRowB()
                    }
                    }
                    disabled={disabled ? disabled : false}
                >
                    {t('general.button.add')}
                </Button>
                <MaterialTable
                    data={formik.values.listCombinationDrugDto}
                    columns={columnsB}
                    className="w-100"
                    options={{
                        toolbar: false,
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        padding: "dense",
                        border: "none",
                        cellStyle: { border: "none" },
                        headerStyle: {
                            backgroundColor: "#2a80c8",
                            color: "#fff",
                            whiteSpace: "nowrap"
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

            <Grid item md={12} style={{ marginTop: "24px" }}>
                <p><b>Bình luận, đánh giá của cán bộ y tế</b>{` (Thông tin bổ sung có liên quan đến biến cố? Anh/chị nghĩ đến biến cố xảy ra do thuốc nào? Cơ sở có tiền hành giải mẫn cảm hoặc sử
                dụng lại thuốc nghi ngờ với liều thấp hơn không? Sau xử trí biến cố, bệnh nhân được điều trị bằng phác đồ lao nào? v.v..): 
                `}</p>
                <NiceTextField
                    formik={formik}
                    field="doctorNote"
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    disabled={disabled ? disabled : false}
                />
            </Grid>

        </>
    )
}