import React from "react";
import { Grid } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { searchByPage, deleteItem } from "./PatientService";
import { searchByPage as searchHealthOrg } from "../HealthOrg/HealthOrgService";
import { getCurrentUser } from "../User/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globitsStyles.css";
import SearchInput from "../Component/SearchInput/SearchInput";
import NiceTable from "../Component/Table/NiceTable";
import NiceActionButton from "../Component/Table/NiceActionButton";
import PatienPrint from "./PatienPrint";
import ConstantList from "../../appConfig";
import Const from "./Const";
import moment from "moment";
import InputPopupHealOrg from './InputPopupHealOrg'
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

class PatientTable extends React.Component {
    state = {
        hidden: false,
        text: "",
        rowsPerPage: 10,
        page: 1,
        totalPages: 0,
        healthOrg: null,
        itemList: [],
        listHealthOrg: [],
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteListDialog: false,
        healthOrgPage: 0,
        scrollHealthOrg: 100,
    };

    updatePageData = (item) => {
        var searchObject = {};
        if (item != null) {
            this.setState({ page: 1, text: item.text }, () => {
                this.search();
            });
        } else {
            this.search();
        }
    };
    search = () => {
        let searchObject = {};
        searchObject.text = this.state.text;
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        searchObject.idHealthOrg = this.state.idHealthOrg;
        //searchObject.incidentType = 1;
        searchByPage(searchObject).then(({ data }) => {
            this.setState({
                itemList: [...data.content],
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        });
    };

    getAllHealthOrg = (pageIndex, pageSize) => {
        let searchObjectOrg = { pageIndex: pageIndex, pageSize: pageSize };
        searchHealthOrg(searchObjectOrg).then(({ data }) => {
            this.setState({ healthOrgPage: pageIndex, listHealthOrg: data.content });
        });
    };

    selectHealthOrg = (healthOrg) => {
        if (healthOrg != null && healthOrg.id != null) {
            this.setState({ healthOrg: healthOrg, idHealthOrg: healthOrg.id }, () => {
                this.search();
            });
        } else {
            this.setState({ healthOrg: null, idHealthOrg: null }, () => {
                this.search();
            });
        }
    };

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
    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleClose = () => {
        this.setState(
            {
                shouldOpenEditorDialog: false,
                shouldOpenConfirmationDialog: false,
                shouldOpenConfirmationDeleteListDialog: false,
                shouldOpenGetPrint: false,
            },
            () => {
                this.updatePageData();
            }
        );
    };
    handleEditItem = (item) => {
        this.setState({
            item: item,
            shouldOpenEditorDialog: true,
        });
    };
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

    componentDidMount() {
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
                    "ROLE_DOMAIN",
                ];
                if (!listRole.includes(role)) {
                    this.setState({ hidden: true });
                }
            });
        this.updatePageData();
        this.getAllHealthOrg(0, 20);
    }

    handlePatientIncident(item) {
        this.props.history.push({
            pathname: ConstantList.ROOT_PATH + "patient/create/" + item.id,
            state: { readOnly: true },
        });
    }

    renderGender = (value) => {
        let gender = "";
        Const.listGender.map((item) => {
            if (item.code === value) {
                gender = item.display;
            }
        });
        return gender;
    };

    handleScroll = (event) => {
        const listboxNode = event.currentTarget;
        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            this.getAllHealthOrg(this.state.healthOrgPage + 1, 20);
        }

        if (position == listboxNode.clientHeight) {
            this.getAllHealthOrg(this.state.healthOrgPage - 1, 20);
        }
    }

    render() {
        const { t, i18n } = this.props;
        let {
            role,
            itemList,
            healthOrg,
            listHealthOrg,
            shouldOpenEditorDialog,
            shouldOpenConfirmationDialog,
            shouldOpenConfirmationDeleteListDialog,
            shouldOpenGetPrint,
            id,
        } = this.state;
        let columns1 = [
            {
                title: t("Mã bệnh nhân"),
                field: "patientCode",
                defaultSort: "asc",
                align: "left",
                width: "150",
            },
            {
                title: t("Tên bệnh nhân"),
                field: "displayName",
                align: "left",
                width: "150",
            },
            {
                title: t("Giới tính"),
                field: "gender",
                align: "left",
                width: "150",
                render: (rowData) => this.renderGender(rowData.gender),
            },
            {
                title: t("Đơn vị điều trị"),
                field: "healthOrg.name",
                align: "left",
                width: "150",
            },
            {
                title: t("Ngày sinh"),
                align: "left",
                width: "250px",
                render: (rowData) =>
                    rowData.birthDate ? (
                        <span>{moment(rowData.birthDate).format("DD/MM/YYYY")}</span>
                    ) : (
                        ""
                    ),
            },
            {
                title: t("general.action"),
                field: "custom",
                type: "numeric",
                width: "250",
                render: (rowData) => (
                    <>
                        {this.state.hidden ? (
                            ""
                        ) : (
                            <NiceActionButton
                                item={rowData}
                                size="small"
                                fontSize="small"
                                color="primary"
                                icon="edit"
                                title={t("general.button.edit")}
                                onSelect={(rowData) => {
                                    this.props.history.push({
                                        pathname:
                                            ConstantList.ROOT_PATH +
                                            "patient/create/" +
                                            rowData.id +
                                            "/" +
                                            this.state.page +
                                            "/" +
                                            this.state.rowsPerPage,
                                        state: { isResetForm: false },
                                    });
                                }}
                            />
                        )}

                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="secondary"
                            icon="account_box"
                            title="Xem"
                            onSelect={(rowData) => {
                                this.handlePatientIncident(rowData);
                            }}
                        />
                        {this.state.hidden ? (
                            ""
                        ) : (
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
                        )}
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            icon="picture_as_pdf"
                            title={t("general.button.viewPDF")}
                            onSelect={(rowData) => {
                                this.setState({ shouldOpenGetPrint: true, id: rowData.id });
                            }}
                        />
                    </>
                ),
            },
        ];
        let columns2 = [
            {
                title: t("Mã bệnh nhân"),
                field: "patientCode",
                defaultSort: "asc",
                align: "left",
                width: "150",
            },
            {
                title: t("Tên bệnh nhân"),
                field: "displayName",
                align: "left",
                width: "150",
            },
            {
                title: t("Giới tính"),
                field: "gender",
                align: "left",
                width: "150",
                render: (rowData) => this.renderGender(rowData.gender),
            },
            {
                title: t("Đơn vị điều trị"),
                field: "healthOrg.name",
                align: "left",
                width: "150",
            },
            {
                title: t("Ngày sinh"),
                align: "left",
                width: "250px",
                render: (rowData) =>
                    rowData.birthDate ? (
                        <span>{moment(rowData.birthDate).format("DD/MM/YYYY")}</span>
                    ) : (
                        ""
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
                                this.handlePatientIncident(rowData);
                            }}
                        />
                        <NiceActionButton
                            item={rowData}
                            size="small"
                            fontSize="small"
                            color="info"
                            icon="picture_as_pdf"
                            title={t("general.button.viewPDF")}
                            onSelect={(rowData) => {
                                this.setState({ shouldOpenGetPrint: true, id: rowData.id });
                            }}
                        />
                    </>
                ),
            },
        ];
        let columns = [];
        if (this.state.hidden) {
            columns = columns2;
        } else {
            columns = columns1;
        }
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb routeSegments={[{ name: t("Danh sách bệnh nhân") }]} />
                </div>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <InputPopupHealOrg
                            label={t("Lọc theo đơn vị điều trị")}
                            field="healthOrg"
                            variant="outlined"
                            size="small"
                            tree="true"
                            value={healthOrg ? healthOrg : null}
                            t={t}
                            handleSelect={this.selectHealthOrg}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <SearchInput search={this.updatePageData} t={t} />
                    </Grid>
                    <Grid item xs={12}>
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

                        {shouldOpenGetPrint && (
                            <PatienPrint
                                t={t}
                                open={shouldOpenGetPrint}
                                id={id}
                                handleClose={this.handleClose}
                            />
                        )}

                        <NiceTable
                            itemList={itemList}
                            t={t}
                            columns={columns}
                            totalPages={this.state.totalPages}
                            handleChangePage={this.handleChangePage}
                            setRowsPerPage={this.setRowsPerPage}
                            options={{ sorting: true }}
                            pageSize={this.state.rowsPerPage}
                            pageSizeOption={[2, 5, 10, 25, 50, 100]}
                            totalElements={this.state.totalElements}
                            page={this.state.page}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PatientTable;
