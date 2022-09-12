import React, { Component } from "react";
import { Grid, IconButton, Icon, Button, Tooltip } from "@material-ui/core";
import MaterialTable from "material-table";
import { searchByPage, getById, deleteItem } from "./DrugsService";
import DrugsEditorDialog from "./DrugsEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globitsStyles.css";
import SearchInput from "../Component/SearchInput/SearchInput";
import NicePagination from "../Component/Pagination/NicePagination";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

function MaterialButton(props) {
    const { t, i18n } = useTranslation();
    const { item } = props;
    return (
        <div>
            <Tooltip
                title={t("general.button.edit")}
                placement="left"
                enterDelay={300}
                leaveDelay={100}
            >
                <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
                    <Icon fontSize="small" color="primary">
                        edit
                    </Icon>
                </IconButton>
            </Tooltip>
            <Tooltip
                title={t("general.button.delete")}
                placement="left"
                enterDelay={300}
                leaveDelay={100}
            >
                <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
                    <Icon fontSize="small" color="error">
                        delete
                    </Icon>
                </IconButton>
            </Tooltip>
        </div>
    );
}
class DrugsTable extends Component {
    state = {
        rowsPerPage: 10,
        page: 1,
        keyword: "",
        totalPages: 10,
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteListDialog: false,
    };

    updatePageData = (item) => {
        var searchObject = {};
        if (item != null) {
            this.setState(
                {
                    page: 1,
                    text: item.text,
                    orgType: item.orgType,
                },
                () => {
                    searchObject.text = this.state.text;
                    searchObject.pageIndex = this.state.page;
                    searchObject.pageSize = this.state.rowsPerPage;
                    searchObject.orgType = this.state.orgType;
                    searchByPage(searchObject).then(({ data }) => {
                        this.setState({
                            itemList: [...data.content],
                            totalElements: data.totalElements,
                            totalPages: data.totalPages,
                        });
                        var treeValues = [];

                        let itemListClone = [...data.content];

                        itemListClone.forEach((item) => {
                            var items = this.getListItemChild(item);
                            treeValues.push(...items);
                        });
                    });
                }
            );
        } else {
            searchObject.text = this.state.text;
            searchObject.pageIndex = this.state.page;
            searchObject.pageSize = this.state.rowsPerPage;
            searchObject.orgType = this.state.orgType;
            searchByPage(searchObject).then(({ data }) => {
                this.setState({
                    itemList: [...data.content],
                    totalElements: data.totalElements,
                    totalPages: data.totalPages,
                });
                var treeValues = [];

                let itemListClone = [...data.content];

                itemListClone.forEach((item) => {
                    var items = this.getListItemChild(item);
                    treeValues.push(...items);
                });
            });
        }
    };

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
    handleDeleteListItem = async (event) => {
        let check = false;
        let datacheck;
        let listResultCheck;
        let { t } = this.props;
        if (this.state.data != null) {
            datacheck = this.state.data.map((item) => {
                let checked = deleteItem(item.id);
                return checked;
            });
            await Promise.all(datacheck)
                .then((data) => {
                    listResultCheck = data;
                })
                .then(() => {
                    listResultCheck.forEach((item) => {
                        if (!item.data) {
                            check = true;
                        }
                    });
                })
                .then(() => {
                    if (check) {
                        toast.info(t("Có thuốc đã được sử dụng ở một bảng khác."));
                        this.handleClose();
                        this.setState({
                            data: null,
                        });
                        return;
                    }
                    this.handleClose();
                    this.setState({
                        data: null,
                    });
                    toast.success("Xoá thành công");
                });
        } else {
            toast.warning("Chưa chọn bản ghi");
        }
    };
    handleConfirmDeleteItem = () => {
        let { t } = this.props;
        deleteItem(this.state.id)
            .then(({ data }) => {
                if (data) {
                    this.updatePageData();
                    this.handleClose();
                    toast.success(t("toast.delete_success"));
                } else {
                    this.handleClose();
                    toast.info(t("Thuốc đã được sử dụng ở một bảng khác."));
                }
            })
            .catch((res) => {
                toast.warning(t("Có lỗi trong quá trình xóa"));
                this.handleClose();
            });
    };
    handleDelete = (id) => {
        this.setState({
            id,
            shouldOpenConfirmationDialog: true,
        });
    };
    //handle delete end

    getListItemChild(item) {
        var result = [];
        var root = {};
        root.name = item.name;
        root.code = item.code;
        root.id = item.id;
        root.dosageForm = item.dosageForm;
        root.drugContent = item.drugContent;
        root.description = item.description;
        root.displayOrder = item.displayOrder;
        root.foundedDate = item.foundedDate;
        root.parentId = item.parentId;
        result.push(root);
        if (item.children) {
            item.children.forEach((child) => {
                var childs = this.getListItemChild(child);
                result.push(...childs);
            });
        }
        return result;
    }
    componentDidMount() {
        this.updatePageData();
    }

    render() {
        const { t, i18n } = this.props;
        let {
            itemList,
            shouldOpenConfirmationDialog,
            shouldOpenConfirmationDeleteListDialog,
            shouldOpenEditorDialog,
        } = this.state;

        let columns = [
            {
                title: t("administrative_unit.code"),
                field: "code",
                width: "100",
            },
            {
                title: t("administrative_unit.name"),
                field: "name",
                width: "200",
            },
            {
                title: "Dạng bào chế",
                field: "dosageForm",
                width: "100",
            },
            {
                title: "Hàm lượng/mg",
                field: "drugContent",
                width: "100",
            },
            {
                title: t("general.action"),
                field: "custom",
                width: "100",
                type: "numeric",
                render: (rowData) => (
                    <MaterialButton
                        item={rowData}
                        onSelect={(rowData, method) => {
                            if (method === 0) {
                                getById(rowData.id).then(({ data }) => {
                                    this.setState({
                                        item: data,
                                        shouldOpenEditorDialog: true,
                                    });
                                });
                            } else if (method === 1) {
                                this.handleDelete(rowData.id);
                            } else {
                                alert("Call Selected Here:" + rowData.id);
                            }
                        }}
                    />
                ),
            },
        ];
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb routeSegments={[{ name: t("drugs.title") }]} />
                </div>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12}>
                        <>
                            <Button
                                className="mb-16 mr-16 btn btn-success d-inline-flex"
                                startIcon={<AddIcon />}
                                variant="contained"
                                onClick={() => {
                                    this.handleEditItem({
                                        startDate: new Date(),
                                        endDate: new Date(),
                                    });
                                }}
                            >
                                {t("general.button.add")}
                            </Button>
                            <Button
                                className="mb-16 mr-16 btn btn-warning d-inline-flex"
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
                            {/* <Button
                  className="mb-16 mr-16 btn btn-secondary d-inline-flex"
                  startIcon={<DescriptionIcon />}
                  variant="contained"
                  onClick={this.importExcel}
                >
                  {t("general.button.importExcel")}
                </Button> */}
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
                    <Grid item md={6} sm={12} xs={12}>
                        <SearchInput search={this.updatePageData} t={t} />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            data={itemList}
                            columns={columns}
                            // parentChildData={(row, rows) => {
                            //   var list = rows.find((a) => a.id === row.parentId)
                            //   return list
                            // }}
                            options={{
                                selection: "true",
                                actionsColumnIndex: -1,
                                paging: false,
                                search: false,
                                toolbar: false,
                                maxBodyHeight: "440px",
                                headerStyle: {
                                    backgroundColor: "#337ab7",
                                    color: "#fff",
                                },
                                tableLayout: "fixed",
                            }}
                            onSelectionChange={(rows) => {
                                this.state.data = rows;
                                // this.setState({selectedItems:rows});
                            }}
                        />
                        <NicePagination
                            totalPages={this.state.totalPages}
                            handleChangePage={this.handleChangePage}
                            setRowsPerPage={this.setRowsPerPage}
                            pageSize={this.state.rowsPerPage}
                            pageSizeOption={[1, 2, 3, 5, 10, 25, 1000]}
                            t={t}
                            totalElements={this.state.totalElements}
                            page={this.state.page}
                        />

                        {shouldOpenEditorDialog && (
                            <DrugsEditorDialog
                                handleClose={this.handleClose}
                                open={shouldOpenEditorDialog}
                                updatePageData={this.updatePageData}
                                item={this.state.item}
                                t={t}
                                i18n={i18n}
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default DrugsTable;
