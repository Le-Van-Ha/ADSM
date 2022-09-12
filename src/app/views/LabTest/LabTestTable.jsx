import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { getById, searchByPage, deleteItem } from "./LabTestService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globitsStyles.css";
import SearchInput from "../Component/SearchInput/SearchInput";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import NicePagination from "../Component/Pagination/NicePagination";
import NiceActionButton from "../Component/Table/NiceActionButton";
import LabTestEditorDialog from "./LabTestEditorDialog";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    //etc you get the idea
});

class LabTestTable extends React.Component {
    state = {
        text: "",
        rowsPerPage: 10,
        page: 1,
        totalPages: 0,
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteListDialog: false,
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
    search = (searchObject) => {
        searchObject.text = this.state.text;
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
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
    //handle popup open/close end

    //handle delete start
    async handleDeleteList(list) {
        let listAlert = [];
        let { t } = this.props;
        let listSuccess = 0;
        let listFalse = 0;
        let listError = 0;
        for (var i = 0; i < list.length; i++) {
            try {
                await deleteItem(list[i].id).then(({ data }) => {
                    if (data) {
                        listSuccess++;
                    } else {
                        listFalse++;
                    }
                });
            } catch (error) {
                listAlert.push(list[i].name);
                listError++;
            }
        }
        this.handleClose();
        if (listSuccess != 0) {
            toast.success(t("toast.delete_success") + " " + listSuccess + " bản ghi");
        }
        if (listFalse != 0) {
            toast.info(t("toast.delete_false") + " " + listFalse + " bản ghi");
        }
        if (listError != 0) {
            toast.warn(t("toast.error") + " " + listFalse + " bản ghi");
        }
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
        deleteItem(this.state.id).then(({ data }) => {
            if (data) {
                this.handleClose();
                this.updatePageData();
                toast.success(t("toast.delete_success"));
            } else {
                this.handleClose();
                toast.info(t("Xét nghiệm đã được sử dụng ở một nơi khác"));
            }
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
    }

    render() {
        const { t, i18n } = this.props;
        let {
            itemList,
            shouldOpenEditorDialog,
            shouldOpenConfirmationDialog,
            shouldOpenConfirmationDeleteListDialog,
        } = this.state;

        let columns = [
            { title: "STT", field: "orderNumber", align: "left", width: "150" },
            { title: "Mã xét nghiệm", field: "code", align: "left", width: "150" },
            { title: "Tên xét nghiệm", field: "name", width: "150" },
            { title: "Mô tả", field: "description", width: "150" },
            { title: "GT Trung bình", field: "averageNumberResult", width: "150" },
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
                                this.handleEditItem(rowData);
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
                    </>
                ),
            },
        ];
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb routeSegments={[{ name: "Xét nghiệm" }]} />
                </div>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12}>
                        <>
                            <Button
                                className="mb-16 mr-16 btn btn-success d-inline-flex"
                                startIcon={<AddIcon />}
                                variant="contained"
                                onClick={() => {
                                    this.handleEditItem(null);
                                }}
                            >
                                {t("general.button.add")}
                            </Button>
                            <Button
                                className="mb-16 mr-36 btn btn-warning d-inline-flex"
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={() =>
                                    this.setState({
                                        shouldOpenConfirmationDeleteListDialog: true,
                                    })
                                }
                            >
                                {t("general.button.delete")}
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
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <SearchInput search={this.updatePageData} t={t} />
                    </Grid>
                    <Grid item xs={12}>
                        {shouldOpenEditorDialog && (
                            <LabTestEditorDialog
                                t={t}
                                i18n={i18n}
                                handleClose={this.handleClose}
                                open={shouldOpenEditorDialog}
                                item={this.state.item ? this.state.item : {}}
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
                        <MaterialTable
                            data={itemList}
                            columns={columns}
                            parentChildData={(row, rows) => {
                                var list = rows.find((a) => a.id === row.parentId);
                                return list;
                            }}
                            options={{
                                selection: true,
                                actionsColumnIndex: -1,
                                paging: false,
                                search: false,
                                toolbar: false,
                                maxBodyHeight: "440px",
                                headerStyle: {
                                    backgroundColor: "#2a80c8",
                                    color: "#fff",
                                },
                                rowStyle: (rowData, index) => ({
                                    backgroundColor:
                                        index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
                                }),
                                // tableLayout: 'fixed'
                            }}
                            onSelectionChange={(rows) => {
                                this.data = rows;
                            }}
                        />
                        <NicePagination
                            totalPages={this.state.totalPages}
                            handleChangePage={this.handleChangePage}
                            setRowsPerPage={this.setRowsPerPage}
                            pageSize={this.state.rowsPerPage}
                            pageSizeOption={[1, 2, 3, 5, 10, 25]}
                            t={t}
                            totalElements={this.state.totalElements}
                            page={this.state.page}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default LabTestTable;
