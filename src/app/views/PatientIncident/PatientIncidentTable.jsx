import { FIRST_REPORT_TYPE } from "./Const";
import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { searchByPage, deleteItem } from "./PatientIncidentService";
import { searchByPage as searchAllPatient } from "../Patient/PatientService";
import { getCurrentUser } from "../User/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globitsStyles.css";
import SearchInput from "../Component/SearchInput/SearchInput";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NiceTable from "../Component/Table/NiceTable";
import NiceActionButton from "../Component/Table/NiceActionButton";
import ConstantList from "../../appConfig";
import PatienIncidentPrint from "./PatienIncidentPrint";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    //etc you get the idea
});

class PatientIncidentTable extends React.Component {
    state = {
        text: "",
        rowsPerPage: 10,
        page: 1,
        totalPages: 0,
        patientIncident: null,
        itemList: [],
        listPatientIncident: [],
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteListDialog: false,
        rowdata: null,
    };

    //Search/load data handle start
    updatePageData = (item) => {
        var searchObject = {};
        if (item != null) {
            this.setState({ page: 1, text: item.text }, () => {
                this.search(searchObject);
            });
        } else {
            this.search(searchObject);
        }
    };
    search = () => {
        // debugger
        let searchObject = {};
        searchObject.text = this.state.text;
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        searchObject.incidentType = 2;
        searchByPage(searchObject).then(({ data }) => {
            this.setState({
                itemList: [...data.content],
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        });
    };
    //Search/load data handle end

    //Paging handle start
    setPage = (page) => {
        this.setState({ page }, function () {
            this.updatePageData();
        });
    };
    setRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 1 }, function () {
            this.updatePageData();
        });
    };

    getAllPatientIncident = () => {
        let searchObjectPatientIncident = { pageIndex: 0, pageSize: 10000000 };
        searchAllPatient(searchObjectPatientIncident).then(({ data }) => {
            if (data && data.content && data.content.length > 0) {
                let content = data.content;
                this.setState({ listPatientIncident: content /* arr */ });
            }
        });
    };

    selectPatientIncident = (patient) => {
        if (patient != null && patient.displayName != null) {
            this.setState({ patient: patient, text: patient.displayName }, () => {
                this.search();
            });
        } else {
            this.setState({ patient: null, text: null }, () => {
                this.search();
            });
        }
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };
    //Paging handle end

    //handle popup open/close start
    handleClose = () => {
        this.setState(
            {
                shouldOpenEditorDialog: false,
                shouldOpenConfirmationDialog: false,
                shouldOpenConfirmationDeleteListDialog: false,
                shouldShowPdfPreviewDialog: false,
                shouldOpenGetPrint: false,
            },
            () => {
                this.updatePageData();
            }
        );
    };
    // handleEditItem = item => {
    //   this.setState({
    //     //item: item,
    //     shouldOpenEditorDialog: true
    //   });
    // };
    //handle popup open/close end

    //handle delete start
    async handleDeleteList(list) {
        let listAlert = [];
        let { t } = this.props;
        for (var i = 0; i < list.length; i++) {
            try {
                await deleteItem(list[i].id);
            } catch (error) {
                listAlert.push(list[i].name);
            }
        }
        this.handleClose();
        toast.success(t("toast.delete_success"));
    }
    handleDeleteListItem = (event) => {
        let { t } = this.props;
        if (this.data != null) {
            this.handleDeleteList(this.data).then(() => {
                this.updatePageData();
            });
        } else {
            this.handleClose();
            toast.warning(t("toast.please_select"));
        }
    };
    handleConfirmDeleteItem = () => {
        let { t } = this.props;
        deleteItem(this.state.id).then(() => {
            this.handleClose();
            toast.success(t("toast.delete_success"));
        });
    };
    handleDelete = (id) => {
        this.setState({
            id,
            shouldOpenConfirmationDialog: true,
        });
    };
    //handle delete end

    componentDidMount() {
        this.updatePageData();
        this.getAllPatientIncident();
        this.getUserRole();
    }

    getUserRole = () => {
        getCurrentUser()
            .then(({ data }) => {
                return data.roles[0].name;
            })
            .then((role) => {
                const listRole = [
                    "ROLE_PROVINCE",
                    "ROLE_DISTRICT",
                    "ROLE_SUB_DISTRICT",
                    "ROLE_ADMIN",
                    "ROLE_DOMAIN", ,
                ];
                if (!listRole.includes(role)) {
                    this.setState({ hidden: true });
                }
            });
    };

    createPatientIncident = () => {
        this.props.history.push(
            ConstantList.ROOT_PATH + "patient-incident/create/"
        );
    };

    handlePatientIncident(item) {
        this.props.history.push(
            ConstantList.ROOT_PATH +
            "patient-incident/create/" +
            item.id +
            "/" +
            this.state.page +
            "/" +
            this.state.rowsPerPage
        );
    }

    showPdfPreviewDialog = (parentId, rowdata) => {
        this.setState({ shouldOpenGetPrint: true, parentId, rowdata: rowdata });
    };

    render() {
        const { t, i18n } = this.props;

        let {
            itemList,
            patient,
            listPatientIncident,
            shouldOpenEditorDialog,
            shouldOpenConfirmationDialog,
            shouldOpenConfirmationDeleteListDialog,
            rowdata,
            shouldOpenGetPrint,
            parentId,
        } = this.state;

        let columns1 = [
            {
                title: t("Tên bệnh nhân"),
                field: "patient.displayName",
                defaultSort: "asc",
                align: "left",
                width: "150",
            },
            {
                title: t("Mã bệnh nhân"),
                field: "patient.patientCode",
                align: "left",
                width: "150",
            },
            {
                title: t("Mô tả biến cố"),
                field: "description",
                align: "left",
                width: "150",
            },
            {
                title: "Lần báo cáo",
                field: "reportSeq",
                align: "left",
                width: "150",
                render: (rowData) => (
                    <>
                        {rowData.reportType === FIRST_REPORT_TYPE
                            ? rowData.reportType
                            : rowData.reportSeq
                                ? `Lần ${rowData.reportSeq}`
                                : null}
                    </>
                ),
            },
            {
                title: t("general.action"),
                field: "custom",
                type: "numeric",
                width: "250",
                render: (rowData) => (
                    <>
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="primary"
                            icon="edit"
                            title={t("general.button.edit")}
                            onSelect={(rowData) => {
                                this.props.history.push(
                                    ConstantList.ROOT_PATH +
                                    "patient-incident/create/" +
                                    rowData.patient.id +
                                    "/" +
                                    rowData.id
                                );
                            }}
                        />
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="secondary"
                            icon="account_box"
                            title="Xem"
                            onSelect={(rowData) => {
                                this.props.history.push({
                                    pathname:
                                        ConstantList.ROOT_PATH +
                                        "patient-incident/create/" +
                                        rowData.patient.id +
                                        "/" +
                                        rowData.id,
                                    state: { readOnly: true },
                                });
                            }}
                        />

                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="error"
                            icon="delete"
                            title={t("general.button.delete")}
                            onSelect={(rowData) => {
                                this.handleDelete(rowData.id);
                            }}
                        />
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="info"
                            icon="picture_as_pdf"
                            title={t("general.button.viewPDF")}
                            onSelect={(rowData) =>
                                this.showPdfPreviewDialog(rowData.patient.id, rowData)
                            }
                        />
                    </>
                ),
            },
        ];
        let columns2 = [
            {
                title: t("Tên bệnh nhân"),
                field: "patient.displayName",
                defaultSort: "asc",
                align: "left",
                width: "150",
            },
            {
                title: t("Mã bệnh nhân"),
                field: "patient.patientCode",
                align: "left",
                width: "150",
            },
            {
                title: t("Mô tả biến cố"),
                field: "description",
                align: "left",
                width: "150",
            },
            {
                title: "Lần báo cáo",
                field: "reportSeq",
                align: "left",
                width: "150",
                render: (rowData) => (
                    <>
                        {rowData.reportType === FIRST_REPORT_TYPE
                            ? rowData.reportType
                            : rowData.reportSeq
                                ? `Lần ${rowData.reportSeq}`
                                : null}
                    </>
                ),
            },
            {
                title: t("general.action"),
                field: "custom",
                type: "numeric",
                width: "250",
                render: (rowData) => (
                    <>
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="secondary"
                            icon="account_box"
                            title="Xem"
                            onSelect={(rowData) => {
                                this.props.history.push({
                                    pathname:
                                        ConstantList.ROOT_PATH +
                                        "patient-incident/create/" +
                                        rowData.patient.id +
                                        "/" +
                                        rowData.id,
                                    state: { readOnly: true },
                                });
                            }}
                        />
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="info"
                            icon="picture_as_pdf"
                            title={t("general.button.viewPDF")}
                            onSelect={(rowData) =>
                                this.showPdfPreviewDialog(rowData.patient.id, rowData)
                            }
                        />
                    </>
                ),
            },
        ];

        //phân quyền
        let columns = [];
        if (this.state.hidden) {
            columns = columns2;
        } else {
            columns = columns1;
        }
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[{ name: t("Danh sách biến cố bất lợi") }]}
                    />
                </div>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12}>
                        <>
                            <Button
                                className="mb-16 mr-16 btn btn-success d-inline-flex"
                                startIcon={<AddIcon />}
                                variant="contained"
                                onClick={() => this.createPatientIncident()}
                            >
                                {t("general.button.add")}
                            </Button>
                            {shouldOpenConfirmationDeleteListDialog && (
                                <ConfirmationDialog
                                    open={shouldOpenConfirmationDeleteListDialog}
                                    onConfirmDialogClose={this.handleClose}
                                    onYesClick={this.handleDeleteListItem}
                                    title={t("confirm_dialog.delete_list.title")}
                                    text={t("confirm_dialog.delete_list.text")}
                                    agree={t("confirm_dialog.delete_list.agree")}
                                    cancel={t("confirm_dialog.delete_list.cancel")}
                                />
                            )}
                        </>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Autocomplete
                            options={listPatientIncident ? listPatientIncident : []}
                            value={patient ? patient : null}
                            getOptionLabel={(option) => option.displayName}
                            onChange={(event, value) => this.selectPatientIncident(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={<span>{t("Lọc theo bệnh nhân")}</span>}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <SearchInput search={this.updatePageData} t={t} />
                    </Grid>

                    <Grid item xs={12}>
                        {shouldOpenGetPrint && (
                            <PatienIncidentPrint
                                t={t}
                                open={shouldOpenGetPrint}
                                item={rowdata}
                                parentId={parentId}
                                handleClose={this.handleClose}
                            />
                        )}

                        {shouldOpenConfirmationDialog && (
                            <ConfirmationDialog
                                open={shouldOpenConfirmationDialog}
                                onConfirmDialogClose={this.handleClose}
                                onYesClick={this.handleConfirmDeleteItem}
                                title={t("confirm_dialog.delete.title")}
                                text={t("confirm_dialog.delete.text")}
                                agree={t("confirm_dialog.delete.agree")}
                                cancel={t("confirm_dialog.delete.cancel")}
                            />
                        )}
                        <NiceTable
                            itemList={itemList}
                            t={t}
                            columns={columns}
                            options={{ sorting: true }}
                            totalPages={this.state.totalPages}
                            handleChangePage={this.handleChangePage}
                            setRowsPerPage={this.setRowsPerPage}
                            pageSize={this.state.rowsPerPage}
                            pageSizeOption={[1, 2, 3, 5, 10, 25]}
                            totalElements={this.state.totalElements}
                            page={this.state.page}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PatientIncidentTable;
