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
    //h???t h??m d??ng chung

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
            title: t("Thu???c nghi ng???"),
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
            title: t("D???ng b??o ch???, h??m l?????ng"),
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
            title: t("Li???u d??ng (????n v???)"),
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
            title: t("S??? l???n d??ng"),
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
            title: t("???????ng d??ng"),
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
            title: t("Ng??y b???t ?????u ??i???u tr???"),
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
            title: t("Ng??y k???t th??c ??i???u tr???"),
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
            title: t("C?? ng???ng/gi???m li???u thu???c nghi ng????"),
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
            title: t("Ph???n ???ng c?? c???i thi???n khi ng???ng/gi???m li???u thu???c?"),
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
            title: t("C?? t??i s??? d???ng thu???c nghi ng????"),
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
            title: t("Ph???n ???ng c?? l???p l???i khi t??i s??? d???ng thu???c nghi ng???"),
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
            title: t("T??n thu???c"),
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
            title: t("H??m l?????ng"),
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
            title: t("Li???u d??ng (????n v???)"),
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
            title: t("???????ng d??ng"),
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
            title: t("Ng??y b???t ?????u ??i???u tr???"),
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
            title: t("Ng??y k???t th??c ??i???u tr???"),
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
                <h5>C??C THU???C NGHI NG??? G??Y BI???N C???</h5>
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

            {/* B???ng th??? 2 */}
            <Grid item md={12} className="dynamic-table" style={{ marginTop: "24px" }}>
                <h5>C??C THU???C D??NG ?????NG TH???I (Tr?????c khi x???y ra bi???n c???)</h5>
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
                <p><b>B??nh lu???n, ????nh gi?? c???a c??n b??? y t???</b>{` (Th??ng tin b??? sung c?? li??n quan ?????n bi???n c???? Anh/ch??? ngh?? ?????n bi???n c??? x???y ra do thu???c n??o? C?? s??? c?? ti???n h??nh gi???i m???n c???m ho???c s???
                d???ng l???i thu???c nghi ng??? v???i li???u th???p h??n kh??ng? Sau x??? tr?? bi???n c???, b???nh nh??n ???????c ??i???u tr??? b???ng ph??c ????? lao n??o? v.v..): 
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