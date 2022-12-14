import React, { Component } from "react";
import {
    Grid,
    IconButton,
    Icon,
    Button,
    Collapse,
    Tooltip
} from "@material-ui/core";
import MaterialTable, { } from 'material-table';
import { deleteItem, searchByPage, getOne, downloadExcel } from "./HealthOrgService";
import HealthOrgEditorDialog from "./HealthOrgEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation } from 'react-i18next';
import 'styles/globitsStyles.css';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchInput from '../Component/SearchInput/SearchInput';
import NicePagination from '../Component/Pagination/NicePagination';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from "@material-ui/icons/FilterList";
import HealthOrgFilter from './HealthOrgFilter';
import Constant from './Constant';
import ImportExcelDialog from "./ImportExcelDialog";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3
    //etc you get the idea
});

function MaterialButton(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    return <div>
        <Tooltip title={t('general.button.edit')} placement="left" enterDelay={300} leaveDelay={100}>
            <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
                <Icon fontSize="small" color="primary">edit</Icon>
            </IconButton>
        </Tooltip>
        <Tooltip title={t('general.button.delete')} placement="left" enterDelay={300} leaveDelay={100}>
            <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
                <Icon fontSize="small" color="error">delete</Icon>
            </IconButton>
        </Tooltip>
    </div>;
}

class HealthOrgLevelTable extends Component {
    state = {
        rowsPerPage: 10,
        page: 1,
        totalPages: 0,
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenImportExcelDialog: false
    };

    setPage = page => {
        this.setState({ page }, function () {
            this.updatePageData();
        })
    };

    setRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 1
        }, function () {
            this.updatePageData();
        });
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    updatePageData = (item) => {
        var searchObject = {};
        if (item != null) {
            this.setState({
                page: 1,
                text: item.text,
                checking: item.checking,
                screening: item.screening,
                manager: item.manager,
                confirmation: item.confirmation,
                treatment: item.treatment
            }, () => {
                searchObject.text = this.state.text;
                searchObject.pageIndex = this.state.page;
                searchObject.pageSize = this.state.rowsPerPage;
                searchObject.checking = this.state.checking;
                searchObject.screening = this.state.screening;
                searchObject.manager = this.state.manager;
                searchObject.confirmation = this.state.confirmation;
                searchObject.treatment = this.state.treatment;

                searchByPage(searchObject).then(({ data }) => {
                    var treeValues = [];

                    let itemListClone = [...data.content];

                    itemListClone.forEach(item => {
                        var items = this.getListItemChild(item);
                        treeValues.push(...items);
                    })
                    this.setState({
                        itemList: itemListClone,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages
                    })
                }
                );
            });
        } else {
            searchObject.text = this.state.text;
            searchObject.pageIndex = this.state.page;
            searchObject.pageSize = this.state.rowsPerPage;
            searchObject.orgType = this.state.orgType;

            searchByPage(searchObject).then(({ data }) => {
                var treeValues = [];

                let itemListClone = [...data.content];

                itemListClone.forEach(item => {
                    var items = this.getListItemChild(item);
                    treeValues.push(...items);
                })
                this.setState({
                    itemList: itemListClone,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages
                })
            }
            );
        }
    };

    handleClose = () => {
        this.setState({
            shouldOpenEditorDialog: false,
            shouldOpenConfirmationDialog: false,
            shouldOpenConfirmationDeleteListDialog: false,
            shouldOpenImportExcelDialog: false
        }, () => {
            this.updatePageData();
        });
    };

    handleConfirmDeleteItem = () => {
        let { t } = this.props
        deleteItem(this.state.id).then(({ data }) => {
            if (data === true) {
                this.updatePageData();
                this.handleClose();
                toast.success(t('toast.delete_success'));
            }
            else if (data === false) {
                toast.warning(t('????n v??? c?? d??? li???u r??ng bu???c'));
                this.handleClose();
            }
            else {
                this.updatePageData();
                this.handleClose();
                toast.success(t('toast.delete_success'));
            }
            // if(data){
            //   this.updatePageData();
            //   this.handleClose();
            //   toast.success(t('toast.delete_success'));
            // }
        });
    };

    handleCollapseFilter = () => {
        let { checkedFilter } = this.state;
        this.setState({ checkedFilter: !checkedFilter });
    };
    componentDidMount() {
        this.updatePageData();
    }

    handleEditItem = item => {
        this.setState({
            item: item,
            shouldOpenEditorDialog: true
        });
    };

    handleDelete = id => {
        this.setState({
            id,
            shouldOpenConfirmationDialog: true
        });
    };

    // async handleDeleteList(list) {
    //   let listAlert = [];
    //   let { t } = this.props
    //   for (var i = 0; i < list.length; i++) {
    //     try {
    //       await deleteItem(list[i].id).then(({data}));
    //     } catch (error) {
    //       listAlert.push(list[i].name);
    //     }
    //   }
    //   this.handleClose();
    //   toast.success(t('toast.delete_success'));
    // };
    async handleDeleteList(list) {
        let listAlert = [];
        let { t } = this.props
        for (var i = 0; i < list.length; i++) {
            try {
                await deleteItem(list[i].id).then(({ data }) => {
                    if (data) {
                        this.updatePageData();
                        this.handleClose();
                        toast.success(t('toast.delete_success'));
                    } else {
                        this.handleClose();
                        toast.warning(t('????n v??? c?? d??? li???u r??ng bu???c'));
                    }
                });
            } catch (error) {
                listAlert.push(list[i].name);
            }
        }
        this.handleClose()
        toast.success(t('toast.delete_success'));
    };
    handleDeleteListItem = (event) => {
        let { t } = this.props
        if (this.data != null) {
            this.handleDeleteList(this.data);
        } else {
            this.handleClose();
            toast.warning(t('toast.please_select'));
        };
    }
    getListItemChild(item) {
        // debugger
        var result = [];
        var root = {};
        root.name = item.name;
        root.code = item.code;
        root.id = item.id;
        root.description = item.description;
        root.displayOrder = item.displayOrder;
        root.foundedDate = item.foundedDate;
        root.parentId = item.parentId;
        result.push(root);
        if (item.children) {
            item.children.forEach(child => {
                var childs = this.getListItemChild(child);
                result.push(...childs);
            });
        }
        return result;
    }

    importExcel = () => {
        this.setState({
            shouldOpenImportExcelDialog: true,
        });
    };
    // changeSelected = (event, value) => {
    //   this.setState({ type: value ? value : null, orgType: value ? value.id : null }, () => { })
    // }

    exportExcel = () => {
        let searchObject = {};

        searchObject.text = this.state.text;
        searchObject.checking = this.state.checking;
        searchObject.screening = this.state.screening;
        searchObject.manager = this.state.manager;
        searchObject.confirmation = this.state.confirmation;
        searchObject.treatment = this.state.treatment;

        downloadExcel(searchObject).then((result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));

            const link = document.createElement("a");
            link.href = url;
            link.download = "DON_VI_Y_TE.xlsx";
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        });
    }
    render() {
        const { t, i18n } = this.props;
        let {
            itemList,
            shouldOpenConfirmationDialog,
            shouldOpenEditorDialog,
            shouldOpenConfirmationDeleteListDialog,
            checkedFilter
        } = this.state;

        let columns = [
            { title: t("health_org.name"), field: "name", width: "150" },
            { title: t("health_org.code"), field: "code", width: "150" },
            {
                title: t("health_org.type"),
                field: "orgType",
                align: "left",
                width: "150",
                cellStyle: {
                    wordWrap: 'break-word'
                },
                render: rowData => {
                    let adminUnits = '';
                    if (rowData.checking) {
                        adminUnits += '????n v??? r?? so??t';
                    }
                    if (rowData.treatment) {
                        if (adminUnits.length > 0) {
                            adminUnits += ', ????n v??? ??i???u tr???';
                        }
                        else {
                            adminUnits += '????n v??? ??i???u tr???';
                        }
                    }
                    if (rowData.manager) {
                        if (adminUnits.length > 0) {
                            adminUnits += ', ????n v??? qu???n l??';
                        }
                        else {
                            adminUnits += '????n v??? qu???n l??';
                        }
                    }
                    if (rowData.confirmation) {
                        if (adminUnits.length > 0) {
                            adminUnits += ', ????n v??? Kh???ng ?????nh';
                        }
                        else {
                            adminUnits += '????n v??? Kh???ng ?????nh';
                        }
                    }
                    if (rowData.screening) {
                        if (adminUnits.length > 0) {
                            adminUnits += ', ????n v??? s??ng l???c';
                        }
                        else {
                            adminUnits += '????n v??? s??ng l???c';
                        }
                    }
                    return adminUnits;
                }
            },
            {
                title: t("general.action"),
                field: "custom",
                type: 'numeric',
                width: "250",
                render: rowData => <MaterialButton item={rowData}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            getOne(rowData.id).then(({ data }) => {
                                if (data.parent === null) {
                                    data.parent = {};
                                }
                                this.setState({
                                    item: data,
                                    shouldOpenEditorDialog: true
                                });
                            })
                        } else if (method === 1) {
                            this.handleDelete(rowData.id);
                        } else {
                            alert('Call Selected Here:' + rowData.id);
                        }
                    }}
                />
            },
        ];

        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb routeSegments={[{ name: t('navigation.health_unit') }]} />
                </div>
                <Grid container spacing={2}>
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                        <Button
                            className="mb-16 mr-16 btn btn-success d-inline-flex"
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => {
                                this.handleEditItem({ startDate: new Date(), endDate: new Date() });
                            }
                            }
                        >
                            {t('general.button.add')}
                        </Button>
                        <Button
                            className="mb-16 mr-16 btn btn-secondary d-inline-flex"
                            variant="contained"
                            onClick={this.importExcel}
                        >
                            {t("general.button.importExcel")}
                        </Button>
                        <Button
                            className="mb-16 mr-16 btn btn-secondary d-inline-flex"
                            variant="contained"
                            onClick={this.exportExcel}
                        >
                            {t("general.button.exportExcel")}
                        </Button>
                    </Grid>
                    {this.state.shouldOpenImportExcelDialog && (
                        <ImportExcelDialog
                            t={t}
                            i18n={i18n}
                            handleClose={this.handleClose}
                            open={this.state.shouldOpenImportExcelDialog}
                        />
                    )}
                    {shouldOpenConfirmationDeleteListDialog && (
                        <ConfirmationDialog
                            open={shouldOpenConfirmationDeleteListDialog}
                            onConfirmDialogClose={this.handleClose}
                            onYesClick={this.handleDeleteListItem}
                            title={t("confirm_dialog.delete_list.title")}
                            text={t('confirm_dialog.delete_list.text')}
                            agree={t("confirm_dialog.delete_list.agree")}
                            cancel={t("confirm_dialog.delete_list.cancel")}
                        />
                    )}
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item lg={8} md={8} sm={6} xs={6}>
                                <SearchInput
                                    search={this.updatePageData}
                                    t={t}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <Button
                                    className="btn_s_right d-inline-flex btn btn-primary-d"
                                    variant="contained"
                                    onClick={this.handleCollapseFilter}
                                    fullWidth
                                >
                                    <FilterListIcon />
                                    <span>{t("general.button.filter")}</span>
                                    <ArrowDropDownIcon
                                        style={
                                            this.state.checkedFilter == true
                                                ? {
                                                    transform: "rotate(180deg)",
                                                    transition: ".3s",
                                                    paddingRight: 5,
                                                }
                                                : {
                                                    transform: "rotate(0deg)",
                                                    transition: ".3s",
                                                    paddingLeft: 5,
                                                }
                                        }
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                        <Collapse
                            in={checkedFilter}
                            style={{
                                width: "100%",
                            }}
                        >
                            <HealthOrgFilter
                                search={this.updatePageData}
                                t={t}
                            />
                        </Collapse>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {shouldOpenEditorDialog && (
                                <HealthOrgEditorDialog t={t} i18n={i18n}
                                    handleClose={this.handleClose}
                                    open={shouldOpenEditorDialog}
                                    item={this.state.item ? this.state.item : {}}
                                    updatePageData={this.updatePageData}
                                />
                            )}

                            {shouldOpenConfirmationDialog && (
                                <ConfirmationDialog
                                    open={shouldOpenConfirmationDialog}
                                    onConfirmDialogClose={this.handleClose}
                                    onYesClick={this.handleConfirmDeleteItem}
                                    title={t("confirm_dialog.delete.title")}
                                    text={t('confirm_dialog.delete.text')}
                                    agree={t("confirm_dialog.delete.agree")}
                                    cancel={t("confirm_dialog.delete.cancel")}
                                />
                            )}
                        </div>
                        <MaterialTable
                            data={itemList}
                            columns={columns}
                            parentChildData={(row, rows) => {
                                var list = rows.find((a) => a.id === row.parentId)
                                return list
                            }}
                            options={{
                                selection: false,
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
                                    backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
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

export default HealthOrgLevelTable;
