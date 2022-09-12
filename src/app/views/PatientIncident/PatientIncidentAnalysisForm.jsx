import React, { Component } from "react";
import {
    Grid,
    TextField,
    Button,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import BlockIcon from "@material-ui/icons/Block";
import MaterialTable, { MTableToolbar } from "material-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NiceActionButton from "../Component/Table/NiceActionButton";
import "../../../styles/globitsStyles.scss";
import { update, getById } from "./PatientIncidentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConstantList from "../../appConfig";
import { searchByPageDrug, getDrugByPatient } from "../Patient/PatientService";
import DrugsEditorDialog from "../Drugs/DrugsEditorDialog";
import { getCurrentUser } from "../User/UserService";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

export default class PatientIncidentAnalysisForm extends Component {
    state = {
        numberOfPatient: 1,
        numberOfPV: 1,
        patient: null,
        listDrug: [],
        shouldOpenEditorDialog: false,
        disabled: false,
        readOnly: false,
        shouldOpenDeleteExpertCommentConfirm: false,
        shouldOpenDeleteExpertConfirm: false,
        shouldOpenDeleteExpertConclusionConfirm: false,
    };

    componentDidMount = () => {
        let { id } = this.props.match.params;
        this.getDrugList();
        this.getRoleUser();
        if (id) {
            getById(id).then(({ data }) => {
                let checkExpertConclusions = false;
                if (data.expertComments === null) {
                    checkExpertConclusions = true;
                } else {
                    if (data.expertComments.length > 2 && data.expertConclusions != null && data.expertConclusions[0].createdBy !== this.state.displayName) {
                        checkExpertConclusions = true;
                    }
                }
                this.setState(
                    {
                        patient: { ...data }, readOnly: checkExpertConclusions
                    },
                    () => {
                        this.handleAddProfessor(
                            this.state.patient.expertComments == null ? true : false
                        );
                        this.handleAdd(
                            this.state.patient.expertConclusions == null ? true : false
                        );
                    }
                );
            });
        }
    };

    getRoleUser = () => {
        getCurrentUser()
            .then(({ data }) => {
                this.setState({ displayName: data.username })
                return data.roles[0].name;
            })
            .then((role) => {
                const listRole = ["ROLE_PV", "ROLE_NTP", "ROLE_ADMIN"];
                if (!listRole.includes(role)) {
                    this.setState({ disabled: true });
                }
            });
    };

    getDrugList = () => {
        var searchObject = {};
        searchObject.pageIndex = 1;
        searchObject.pageSize = 10000;
        if (this.props.location.state) {
            searchByPageDrug(searchObject).then(({ data }) => {
                let listDrug = data.content;
                getDrugByPatient(this.props.location.state.idPatient).then(({ data }) => {
                    this.setState({ listDrug: [...listDrug, ...data] });
                })
            });
        }
    };

    handleAddProfessor = (checkData) => {
        const { patient, displayName } = this.state;
        let newArr = [];
        let expertComments = patient.expertComments;
        let obj = {};
        obj.expertsName = "";
        obj.causalityList = [
            {
                incidentName: "",
                adrCode: "",
                drug: null,
                level: "",
                createdBy: displayName
            },
        ];
        obj.createdBy = displayName;
        if (checkData) {
            if (expertComments == null) {
                newArr.push(obj);
                patient.expertComments = newArr;
            } else {
                expertComments.push(obj);
                patient.expertComments = expertComments;
            }
            if (patient.expertComments.length > 2) {
                this.setState({
                    readOnly: false
                });
            }
        } else {
            patient.expertComments = expertComments;
        }

        this.setState({
            patient: { ...patient },
        });
    };

    handleAdd = (checkData) => {
        const { patient, displayName } = this.state;
        let newArr = [];
        let expertConclusions = patient.expertConclusions;
        let obj = {
            incidentName: "",
            relevant: null,
            drug: null,
            createdBy: displayName
        };
        if (checkData) {
            if (expertConclusions == null) {
                newArr.push(obj);
                patient.expertConclusions = newArr;
            } else {
                expertConclusions.push(obj);
                patient.expertConclusions = expertConclusions;
            }
        } else {
            patient.expertConclusions = expertConclusions;
        }

        this.setState({
            patient: { ...patient },
        });
    };

    handleAddRow = (index) => {
        const { patient, displayName } = this.state;
        let expertComments = patient.expertComments;
        let obj = {
            incidentName: "",
            adrCode: "",
            drug: null,
            level: "",
            createdBy: displayName
        };

        if (expertComments[index]) {
            expertComments[index].causalityList.push(obj);
            patient.expertComments = expertComments;
        }

        this.setState({
            patient: { ...patient },
        });
    };

    handleRemoveRow = () => {
        const { patient, expertCommentIndex } = this.state;
        let expertComments = patient.expertComments;
        expertComments.forEach(item => {
            item.causalityList.splice(expertCommentIndex, 1);
        })
        if (patient) {
            patient.expertComments = expertComments;
        }
        this.setState({
            patient: { ...patient },
        });
        this.handleClose();
    };

    handleRemove = () => {
        const { patient, expertConclusionIndex } = this.state;
        let expertConclusions = patient.expertConclusions;
        expertConclusions.splice(expertConclusionIndex, 1);
        if (patient) {
            patient.expertConclusions = expertConclusions;
        }
        this.setState({
            patient: { ...patient },
        });
        this.handleClose();
    };

    handleChangeTextField = (index, id, event, name) => {
        const { patient } = this.state;
        let expertComments = patient.expertComments;
        if (name === "incidentName") {
            expertComments[index].causalityList[id][name] = event.target.value;
        } else if (name === "adrCode") {
            expertComments[index].causalityList[id][name] = event.target.value;
        } else if (name === "drug") {
            expertComments[index].causalityList[id][name] = event;
        } else if (name === "level") {
            expertComments[index].causalityList[id][name] = event;
        } else if (name === "expertsName") {
            expertComments[index][name] = event.target.value;
        } else if (name === "comment") {
            expertComments[index][name] = event.target.value;
        }

        if (patient) {
            patient.expertComments = expertComments;
        }
        this.setState({
            patient: { ...patient },
        });
    };

    handleChangeTextConclusion = (index, event, name) => {
        const { patient } = this.state;
        let expertConclusions = patient.expertConclusions;
        if (name == "relevant") {
            expertConclusions[index][name] =
                event === "Có" ? 1 : event === "Không" ? 0 : null;
        } else {
            expertConclusions[index][name] = event;
        }

        if (patient) {
            patient.expertConclusions = expertConclusions;
        }
        this.setState({
            patient: { ...patient },
        });
    };

    // handleChangeDrug = (index, value) => {

    // }

    handleDeleteProfessor = () => {
        const { patient, expertIndex } = this.state;
        let expertComments = patient.expertComments;
        expertComments.splice(expertIndex, 1);
        if (patient) {
            patient.expertComments = expertComments;
            if (patient.expertComments.length < 2) {
                this.setState({
                    readOnly: true
                });
            }
        }
        this.setState({
            patient: { ...patient },
        });
        this.handleClose();
    };

    handleSubmit = (e) => {
        const { history } = this.props;
        e.preventDefault();
        update(this.state.patient).then((data) => {
            toast.success("Cập nhật phân tích biến cố thành công");
            history.push(ConstantList.ROOT_PATH + "patient-incident/list");
        });
    };

    handleClose = () => {
        this.setState({
            shouldOpenEditorDialog: false,
            shouldOpenDeleteExpertConfirm: false,
            shouldOpenDeleteExpertCommentConfirm: false,
            shouldOpenDeleteExpertConclusionConfirm: false,
        });
    };

    render() {
        const { patient, listDrug, shouldOpenEditorDialog, disabled, readOnly, shouldOpenDeleteExpertCommentConfirm, shouldOpenDeleteExpertConfirm, shouldOpenDeleteExpertConclusionConfirm } = this.state;
        const { t, history, i18n } = this.props;
        let listIncident = [
            "Kéo dài khoảng QT",
            "Độc tính trên thận",
            "Mất thị lực",
            "Thay đổi thị giác",
            "Bệnh lý kính ngoại biên",
            "Bất thường về huyết học",
        ];
        const columns = [
            {
                title: t("Biến cố"),
                align: "center",
                width: "50px",
                render: (rowData) => rowData.tableData.id + 1,
            },
            {
                title: t("Tên biến cố"),
                field: "incidentName",
                align: "center",
                width: "100%",
                render: (rowData) => (
                    <TextField
                        value={rowData.incidentName}
                        className="w-100"
                        name="incidentName"
                        onChange={(event) =>
                            this.handleChangeTextField(
                                rowData.index,
                                rowData.tableData.id,
                                event,
                                "incidentName"
                            )
                        }
                        type="text"
                        variant="outlined"
                        size="small"
                        disabled={disabled || rowData.createdBy != this.state.displayName ? true : false}
                    />
                ),
            },
            {
                title: t("Mã ADR"),
                field: "adrCode",
                align: "center",
                width: "100%",
                render: (rowData) => (
                    <TextField
                        value={rowData.adrCode}
                        className="w-100"
                        name="adrCode"
                        onChange={(event) =>
                            this.handleChangeTextField(
                                rowData.index,
                                rowData.tableData.id,
                                event,
                                "adrCode"
                            )
                        }
                        type="text"
                        variant="outlined"
                        size="small"
                        disabled={disabled || rowData.createdBy != this.state.displayName ? true : false}
                    />
                ),
            },
            {
                title: t("Thuốc liên quan"),
                field: "drug",
                align: "center",
                width: "100%",
                render: (rowData) => {
                    return (
                        <Autocomplete
                            options={listDrug ? listDrug : []}
                            value={rowData.drug}
                            getOptionLabel={(option) => option.name + " " + (option.drugContent ?? "")}
                            onChange={(event, value) =>
                                this.handleChangeTextField(
                                    rowData.index,
                                    rowData.tableData.id,
                                    value,
                                    "drug"
                                )
                            }
                            // freeSolo
                            renderInput={(params) => (
                                <TextField {...params}
                                    // onChange={(event) => this.handleChangeDrug(rowData.tableData.id, event.target.value)}
                                    size="small"
                                    variant="outlined"
                                    value={rowData.measure}
                                />
                            )}
                            disabled={disabled || rowData.createdBy != this.state.displayName ? true : false}
                        />
                    )
                },
            },
            {
                title: t("Mức độ quy kết"),
                field: "level",
                width: "100%",
                align: "center",
                render: (rowData) => (
                    <Autocomplete
                        options={["1", "2", "3", "4"]}
                        value={rowData.level}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) =>
                            this.handleChangeTextField(
                                rowData.index,
                                rowData.tableData.id,
                                value,
                                "level"
                            )
                        }
                        renderInput={(params) => (
                            <TextField {...params} size="small" variant="outlined" />
                        )}
                        disabled={disabled || rowData.createdBy != this.state.displayName ? true : false}
                    />
                ),
            },
            {
                title: "Hành động",
                field: "custom",
                width: "10%",
                align: "center",
                render: (rowData) => (
                    <NiceActionButton
                        item={rowData}
                        size="small"
                        fontSize="small"
                        color="error"
                        icon="delete"
                        title={t("general.button.delete")}
                        disabled={disabled || rowData.createdBy != this.state.displayName ? true : false}
                        onSelect={(rowData, method) => {
                            if (method === 0) {
                                this.setState({
                                    shouldOpenDeleteExpertCommentConfirm: true,
                                    expertCommentIndex: rowData.tableData.id
                                })
                            }
                        }}
                    />
                ),
            },
        ];
        const column1 = [
            {
                title: t("Thuốc"),
                field: "drug",
                align: "center",
                width: "100%",
                render: (rowData) => (
                    <Autocomplete
                        options={listDrug ? listDrug : []}
                        value={rowData.drug}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) =>
                            this.handleChangeTextConclusion(
                                rowData.tableData.id,
                                value,
                                "drug"
                            )
                        }
                        renderInput={(params) => (
                            <TextField {...params} size="small" variant="outlined" />
                        )}
                        disabled={disabled || readOnly ? true : false}
                    />
                ),
            },
            {
                title: t("Liên quan"),
                field: "relevant",
                align: "center",
                width: "100%",
                render: (rowData) => (
                    <Autocomplete
                        options={["Có", "Không"]}
                        value={
                            rowData.relevant == 1
                                ? "Có"
                                : rowData.relevant == 0
                                    ? "Không"
                                    : null
                        }
                        getOptionLabel={(option) => option}
                        onChange={(event, value) =>
                            this.handleChangeTextConclusion(
                                rowData.tableData.id,
                                value,
                                "relevant"
                            )
                        }
                        renderInput={(params) => (
                            <TextField {...params} size="small" variant="outlined" />
                        )}
                        disabled={disabled || readOnly ? true : false}
                    />
                ),
            },
            {
                title: t("Tên biến cố"),
                field: "incidentName",
                align: "center",
                width: "100%",
                render: (rowData) => (
                    <Autocomplete
                        options={listIncident}
                        value={rowData.incidentName}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) =>
                            this.handleChangeTextConclusion(
                                rowData.tableData.id,
                                value,
                                "incidentName"
                            )
                        }
                        renderInput={(params) => (
                            <TextField {...params} size="small" variant="outlined" />
                        )}
                        disabled={disabled || readOnly ? true : false}
                    />
                ),
            },
            {
                title: "Hành động",
                field: "custom",
                width: "10%",
                align: "center",
                render: (rowData) => (
                    <NiceActionButton
                        item={rowData}
                        size="small"
                        fontSize="small"
                        color="error"
                        icon="delete"
                        title={t("general.button.delete")}
                        disabled={disabled || readOnly ? true : false}
                        onSelect={(rowData, method) => {
                            if (method === 0) {
                                this.setState({
                                    shouldOpenDeleteExpertConclusionConfirm: true,
                                    expertConclusionIndex: rowData.tableData.id
                                })
                            }
                        }}
                    />
                ),
            },
        ];
        return (
            <form className="m-sm-30" onSubmit={this.handleSubmit}>
                <div className="mb-sm-30">
                    <Breadcrumb routeSegments={[{ name: t("Phân tích biến cố") }]} />
                </div>
                {shouldOpenEditorDialog && (
                    <DrugsEditorDialog
                        handleClose={this.handleClose}
                        open={shouldOpenEditorDialog}
                        updatePageData={this.getDrugList}
                        t={t}
                        i18n={i18n}
                        patient={this.state.patient}
                    />
                )}
                {shouldOpenDeleteExpertCommentConfirm && (
                    <ConfirmationDialog
                        open={shouldOpenDeleteExpertCommentConfirm}
                        onConfirmDialogClose={this.handleClose}
                        onYesClick={this.handleRemoveRow}
                        title={t("confirm_dialog.delete_list.title")}
                        text={t("confirm_dialog.delete_list.text")}
                        agree={t("confirm_dialog.delete_list.agree")}
                        cancel={t("confirm_dialog.delete_list.cancel")}
                    />
                )}
                {shouldOpenDeleteExpertConfirm && (
                    <ConfirmationDialog
                        open={shouldOpenDeleteExpertConfirm}
                        onConfirmDialogClose={this.handleClose}
                        onYesClick={this.handleDeleteProfessor}
                        title={t("confirm_dialog.delete_list.title")}
                        text={t("confirm_dialog.delete_list.text")}
                        agree={t("confirm_dialog.delete_list.agree")}
                        cancel={t("confirm_dialog.delete_list.cancel")}
                    />
                )}
                {shouldOpenDeleteExpertConclusionConfirm && (
                    <ConfirmationDialog
                        open={shouldOpenDeleteExpertConclusionConfirm}
                        onConfirmDialogClose={this.handleClose}
                        onYesClick={this.handleRemove}
                        title={t("confirm_dialog.delete_list.title")}
                        text={t("confirm_dialog.delete_list.text")}
                        agree={t("confirm_dialog.delete_list.agree")}
                        cancel={t("confirm_dialog.delete_list.cancel")}
                    />
                )}
                {patient && (
                    <DialogContent className="p-0 overflow-hidden">
                        <Grid>
                            <Button
                                className="mb-16 mr-16 btn d-inline-flex"
                                startIcon={<AddIcon />}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.handleAddProfessor(true);
                                }}
                                disabled={disabled ? disabled : false}
                            >
                                {t("Thêm chuyên gia")}
                            </Button>
                        </Grid>
                        {patient.expertComments &&
                            patient.expertComments.map((item, index) => {
                                let data = item.causalityList.map((element) => {
                                    return { ...element, index };
                                });
                                return (
                                    <Grid container key={index}>
                                        <Grid
                                            className="my-16 flex"
                                            alignItems="center"
                                            item
                                            md={12}
                                            xs={12}
                                            sm={12}
                                        >
                                            <Grid item sm={6} md={3} xs={12}>
                                                <h4 className="m-0">Chuyên gia {index + 1}</h4>
                                            </Grid>
                                            <Grid item sm={6} md={4} xs={12}>
                                                <TextField
                                                    className="my-10 w-100"
                                                    value={item.expertsName}
                                                    name="expertsName"
                                                    onChange={(event) =>
                                                        this.handleChangeTextField(
                                                            index,
                                                            null,
                                                            event,
                                                            "expertsName"
                                                        )
                                                    }
                                                    label="Họ và tên"
                                                    variant="outlined"
                                                    size="small"
                                                    disabled={disabled || item.createdBy != this.state.displayName ? true : false}
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                className="flex"
                                                alignItems="center"
                                                justifyContent="flex-end"
                                            >
                                                <Button
                                                    className="btn btn-danger d-inline-flex"
                                                    startIcon={<DeleteIcon />}
                                                    variant="contained"
                                                    onClick={() => { this.setState({ shouldOpenDeleteExpertConfirm: true, expertIndex: index }) }}
                                                    disabled={disabled || item.createdBy != this.state.displayName ? true : false}
                                                >
                                                    {t("Xóa chuyên gia")}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <fieldset>
                                                <legend>QUY KẾT NHÂN QUẢ</legend>
                                                <Button
                                                    className="mb-16 mr-16 btn d-inline-flex"
                                                    startIcon={<AddIcon />}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        this.handleAddRow(index);
                                                    }}
                                                    disabled={disabled || item.createdBy != this.state.displayName ? true : false}
                                                >
                                                    {t("Thêm biến cố")}
                                                </Button>
                                                <Button
                                                    className="mb-16 mr-16 btn d-inline-flex"
                                                    startIcon={<AddIcon />}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        this.setState({ shouldOpenEditorDialog: true });
                                                    }}
                                                    disabled={disabled || item.createdBy != this.state.displayName ? true : false}
                                                >
                                                    {t("Thêm thuốc liên quan")}
                                                </Button>
                                                <Grid container spacing={4}>
                                                    <Grid item sm={12}>
                                                        <Grid item md={12} className="dynamic-table">
                                                            <MaterialTable
                                                                data={data}
                                                                columns={columns}
                                                                className="dynamic-table"
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
                                                                        backgroundColor:
                                                                            index % 2 === 1
                                                                                ? "rgb(237, 245, 251)"
                                                                                : "#FFF",
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
                                                                        emptyDataSourceMessage: `${t(
                                                                            "general.emptyDataMessageTable"
                                                                        )}`,
                                                                    },
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </fieldset>
                                        </Grid>
                                        <Grid
                                            className="my-16"
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                className="w-100"
                                                name="comment"
                                                value={item.comment}
                                                onChange={(event) =>
                                                    this.handleChangeTextField(
                                                        index,
                                                        null,
                                                        event,
                                                        "comment"
                                                    )
                                                }
                                                label="Nhận xét"
                                                variant="outlined"
                                                size="small"
                                                disabled={disabled || item.createdBy != this.state.displayName ? true : false}
                                            />
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        <Grid className="my-16" item lg={12} md={12} sm={12} xs={12}>
                            <fieldset>
                                <legend>KẾT LUẬN</legend>
                                {patient.expertConclusions && (
                                    <Button
                                        className="mb-16 mr-16 btn d-inline-flex"
                                        startIcon={<AddIcon />}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            this.handleAdd(true);
                                        }}
                                        disabled={disabled || readOnly ? true : false}
                                    >
                                        {t("Thêm biến cố")}
                                    </Button>)}
                                {patient && (
                                    <MaterialTable
                                        data={patient.expertConclusions}
                                        columns={column1}
                                        className="dynamic-table"
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
                                                backgroundColor:
                                                    index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
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
                                                emptyDataSourceMessage: `${t(
                                                    "general.emptyDataMessageTable"
                                                )}`,
                                            },
                                        }}
                                    />
                                )}
                            </fieldset>
                        </Grid>
                    </DialogContent>
                )
                }
                <DialogActions className="p-0">
                    <div className="flex flex-space-between flex-middle">
                        <Button
                            startIcon={<BlockIcon />}
                            variant="contained"
                            className="mr-12 btn btn-secondary d-inline-flex"
                            color="secondary"
                            type="button"
                            onClick={() => {
                                history.push({
                                    pathname: ConstantList.ROOT_PATH +
                                        "patient-incident/create/" +
                                        patient.patient.id +
                                        "/" +
                                        patient.id,
                                    state: {
                                        readOnly: this.state.displayName == "admin" ? false : true
                                    }
                                });
                            }}
                        >
                            {t("general.button.cancel")}
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            className="background-color-mariner btn btn-secondary d-inline-flex"
                            color="primary"
                            type="submit"
                            disabled={disabled ? disabled : false}
                        >
                            {t("general.button.save")}
                        </Button>
                    </div>
                </DialogActions>
            </form >
        );
    }
}
