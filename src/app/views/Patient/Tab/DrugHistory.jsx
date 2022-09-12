import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import NiceActionButton from "../../Component/Table/NiceActionButton";
import "./DynamicTableStyles.css";

export default function DrugHistory(props) {
    const { t, formik, listDrug, disabled } = props;

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isDose>0", (value) => {
            if (value < 1) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule("isInteger", (value) => {
            if (!Number.isInteger(value)) {
                return false;
            }
            return true;
        });
    }, []);

    const drugRouteList = [
        "Uống",
        "Tiêm",
        "Tĩnh mạch",
        "Truyền tĩnh mạch",
        "Tiêm bắp",
    ];

    const columns = [
        {
            title: t("Tên thuốc"),
            field: "name",
            align: "center",
            width: "100%",
            headerStyle: {
                padding: "0px",
                minWidth: "200px",
            },
            cellStyle: {
                padding: "0px",
                minWidth: "200px",
            },
            render: (rowData) => (
                <Autocomplete
                    id="drug-id"
                    options={listDrug ? listDrug : []}
                    value={rowData.drug}
                    freeSolo
                    getOptionLabel={(option) => option.name}
                    onChange={(even, value) =>
                        handleChangeDrug(rowData.tableData.id, value, "dropdown")
                    }
                    renderInput={(params) => (
                        <TextField {...params}
                            size="small"
                            value={rowData.drug}
                            variant="outlined"
                            onChange={(event, value) =>
                                handleChangeDrug(rowData.tableData.id, event.target.value, "text")
                            }
                        />
                    )}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Liều dùng"),
            field: "dosage",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <ValidatorForm>
                    <TextValidator
                        value={rowData.dosage}
                        className="w-100"
                        name="dosage"
                        onChange={(event) => handleChange(rowData.tableData.id, event)}
                        type="number"
                        variant="outlined"
                        size="small"
                        disabled={disabled ? disabled : false}
                        validators={["isDose>0", "matchRegexp:^[0-9]+$"]}
                        errorMessages={[
                            "Liều dùng phải lớn hơn 0",
                            "Liều nhập vào phải là số nguyên",
                        ]}
                    />
                </ValidatorForm>
            ),
        },
        {
            title: t("Đường dùng"),
            field: "drugRoute",
            align: "center",
            width: "100%",
            render: (rowData) => (
                <Autocomplete
                    id="drug-id"
                    options={drugRouteList}
                    value={rowData.drugRoute}
                    getOptionLabel={(option) => option}
                    onChange={(even, value) =>
                        handleChangeDrugRoute(rowData.tableData.id, value)
                    }
                    renderInput={(params) => (
                        <TextField {...params} size="small" variant="outlined" />
                    )}
                    disabled={disabled ? disabled : false}
                />
            ),
        },
        {
            title: t("Đang dùng"),
            field: "custom",
            align: "center",
            width: "250",
            render: (rowData) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            value={rowData.inUsed}
                            disabled={disabled ? disabled : false}
                            checked={rowData.inUsed}
                            onChange={(e) => handleClick(e, rowData.tableData.id)}
                            name="checkedA"
                        />
                    }
                />
            ),
            // <NiceCheckbox
            //     formik={formik}
            //     field="inUsed"
            //     isCollapse={true}
            //     collapseNode="drugHistories"
            //     collapseIndex={rowData.tableData.id}
            // />
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
                    title={t("general.button.delete")}
                    disabled={disabled ? disabled : false}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleRemoveRow(rowData.tableData.id);
                        }
                    }}
                />
            ),
        },
    ];

    const [drugHistories, setDrugHistories] = React.useState(
        formik.values.drugHistories
    );

    const handleAddRow = () => {
        let list = [];
        list = drugHistories;
        list.push({
            inUsed: false,
        });
        setDrugHistories(list);
        formik.setFieldValue("drugHistories", list);
    };
    const handleRemoveRow = (rowId) => {
        let list = [];
        list = drugHistories;
        list.splice(rowId, 1);
        setDrugHistories(drugHistories);
        formik.setFieldValue("drugHistories", list);
    };

    const handleClick = (event, item) => {
        let listData = formik.values.drugHistories;
        listData[item].inUsed = event.target.checked;

        formik.setFieldValue("drugHistories", listData);
    };

    const handleChangeDrug = (index, event, type) => {
        let listData = formik.values.drugHistories;
        if (listData == null) {
            listData = [];
        }
        if (type === "text") {
            let objDrug = { name: event, type: false };
            listData[index]["drug"] = objDrug;
        } else {
            listData[index].drug = event;
        }
        formik.setFieldValue("drugHistories", listData);
    };

    const handleChangeDrugRoute = (index, event) => {
        let listData = formik.values.drugHistories;
        if (listData == null) {
            listData = [];
        }
        listData[index].drugRoute = event;
        formik.setFieldValue("drugHistories", listData);
    };

    const handleChange = (index, event) => {
        let drugHistories = formik.values.drugHistories;
        if (drugHistories == null) {
            drugHistories = [];
        }
        drugHistories[index][event.target.name] = event.target.value;
        formik.setFieldValue("drugHistories", drugHistories);
    };

    React.useEffect(() => {
        if (
            typeof formik.values.drugHistories === "undefined" ||
            formik.values.drugHistories == null ||
            formik.values.drugHistories.length == 0
        ) {
            handleAddRow();
        }
    }, [drugHistories]);

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
                    data={formik.values.drugHistories}
                    columns={columns}
                    className="w-100"
                    disabled={disabled ? disabled : false}
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
        </>
    );
}
