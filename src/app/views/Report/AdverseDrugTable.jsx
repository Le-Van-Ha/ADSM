import React, { Component } from "react";
import {
    Input,
    InputAdornment,
    Link,
    FormControl,
    Grid,
    Button,
    TextField,
    Collapse,
} from "@material-ui/core";
import { Breadcrumb } from "egret";
import {
    searchByPage,
    getAdverseDrugById,
} from "../Report/AdverseDrugReportService";
import "react-toastify/dist/ReactToastify.css";
import { Add, ArrowDropDown, Search, Tune } from "@material-ui/icons";
import "styles/globitsStyles.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NiceActionButton from "../Component/Table/NiceActionButton";
import ConstantList from "../../appConfig";
import MaterialTable from "material-table";
import NicePagination from "../Component/Pagination/NicePagination";
import AdverseDrugReportPrint from "./AdverseDrugReportPrint";
import AdverseDrugFilter from "./AdverseDrugFilter";
import { getCurrentUser } from "../User/UserService";
import InputPopupHealOrg from '../Patient/InputPopupHealOrg'
class AdverseDrugTable extends Component {
    state = {
        textSearch: "",
        level: null,
        rowsPerPage: 5,
        page: 1,
        totalPages: 0,
        patientIncident: null,
        itemList: [],
        listPatientIncident: [],
        listAdverseReport: [],
        shouldOpenEditorDialog: false,
        shouldOpenPrintDialogListDialog: false,
        totalElements: null,
        checkedFilter: false,
        hidden: false,
        userOrganization: null
    };

    componentDidMount = () => {
        this.updatePageData();
        this.getUserRole();
    };

    getUserRole = () => {
        getCurrentUser()
            .then(({ data }) => {
                return data.roles[0].name;
            })
            .then((role) => {
                const listRole = ["ROLE_PV", "ROLE_ADMIN"];
                if (!listRole.includes(role)) {
                    this.setState({ hidden: true });
                }
            });
    };

    search = () => {
        let searchObject = {};
        searchObject.text = this.state.textSearch;
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        searchObject.fromQuarter = this.state.fromQuarter;
        searchObject.toQuarter = this.state.toQuarter;
        searchObject.fromYear = this.state.fromYear;
        searchObject.toYear = this.state.toYear;
        searchObject.idHealthOrg = this.state.idHealthOrg;
        searchByPage(searchObject).then(({ data }) => {
            this.setState({
                listAdverseReport: [...data.content],
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        });
    };

    setPage = (page) => {
        this.setState({ page }, () => {
            this.updatePageData();
        });
    };

    setRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 1 }, () => {
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
                shouldShowPdfPreviewDialog: false,
                shouldOpenGetPrint: false,
            },
            () => {
                this.updatePageData();
            }
        );
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSelect = (value, name) => {
        this.setState(
            {
                [name]: value,
            },
            () => {
                this.search();
            }
        );
    };

    updatePageData = () => {
        var searchObject = {};
        searchObject.pageIndex = this.state.page;
        searchObject.pageSize = this.state.rowsPerPage;
        searchByPage(searchObject).then(({ data }) => {
            this.setState({
                listAdverseReport: [...data.content],
                totalElements: data.totalElements,
                totalPages: data.totalPages,
            });
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.search();
        }
    };

    showPdfPreviewDialog = (rowData) => {
        getAdverseDrugById(rowData.id).then(({ data }) => {
            this.setState({
                shouldOpenPrintDialogListDialog: true,
                itemList: data,
            });
        });
    };

    handleCollapseFilter = () => {
        let { checkedFilter } = this.state;
        this.setState({ checkedFilter: !checkedFilter });
    };

    handleFilter = (option) => {
        this.setState({
            ...option,
        });
        this.search();
    };

    selectHealthOrg = (healthOrg) => {
        if (healthOrg != null && healthOrg.id != null) {
            this.setState({ healthOrg: healthOrg, idHealthOrg: healthOrg.adminUnit.id }, () => {
                this.search();
            });
        } else {
            this.setState({ healthOrg: null, idHealthOrg: null }, () => {
                this.search();
            });
        }
    };

    render() {
        const { t } = this.props;
        let {
            itemList,
            textSearch,
            totalElements,
            listAdverseReport,
            rowsPerPage,
            level,
            page,
            totalPages,
            shouldOpenPrintDialogListDialog,
            checkedFilter,
            hidden
        } = this.state;
        let columns = [
            {
                title: t("Tên đơn vị"),
                field: "userOrganization.user.username",
                align: "left",
                width: "150",
            },
            {
                title: t("Người báo cáo"),
                field: "executorName",
                align: "left",
                width: "150",
            },
            {
                title: t("Tổng số lượng bệnh nhân"),
                field: "numberOfsampleReport1",
                align: "left",
                width: "150",
            },
            {
                title: t("Tổng số lượng biến cố"),
                field: "numberOfsampleReport2",
                align: "left",
                width: "150",
            },
            {
                title: t("Số điện thoại"),
                field: "phoneNumber",
                align: "left",
                width: "150",
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
                                        "adverse_drug_report/" +
                                        rowData.id,
                                    state: { id: rowData.id, disabled: true },
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
                            onSelect={(rowData) => this.showPdfPreviewDialog(rowData)}
                        />
                    </>
                ),
            },
        ];
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[{ name: t("Danh sách biến cố bất lợi thuốc") }]}
                    />
                </div>
                <Grid container spacing={2}>
                    <Grid item md={3} sm={6} xs={6}>
                        {hidden === false && (
                            <Button
                                className="mb-16 btn btn-success d-inline-flex"
                                startIcon={<Add />}
                                variant="contained"
                                onClick={() => {
                                    this.props.history.push({
                                        pathname: ConstantList.ROOT_PATH + "adverse_drug_report",
                                        state: { itemList: null, disabled: false },
                                    });
                                }}
                            >
                                {t("general.button.add")}
                            </Button>
                        )}
                    </Grid>

                    <Grid item lg={2} md={2} sm={6} xs={6}>
                        <Button
                            className="px-16 float-right"
                            color="secondary"
                            variant="contained"
                            onClick={this.handleCollapseFilter}
                        >
                            <Tune className="mr-4" />
                            <span>{t("general.button.filter")}</span>
                            <ArrowDropDown
                                style={
                                    checkedFilter === true
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

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <InputPopupHealOrg
                            label={t("Lọc theo đơn vị")}
                            field="healthOrg"
                            variant="outlined"
                            size="small"
                            tree="true"
                            // value={healthOrg ? healthOrg : null}
                            t={t}
                            handleSelect={this.selectHealthOrg}
                        />
                    </Grid>

                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <Input
                                className="mt-10 search_box w-100 stylePlaceholder"
                                type="text"
                                name="textSearch"
                                value={textSearch}
                                onKeyDown={this.handleKeyDown}
                                onChange={this.handleChange}
                                placeholder={t("general.enter_search")}
                                id="search_box"
                                startAdornment={
                                    <InputAdornment>
                                        <Link to="#">
                                            <Search
                                                onClick={this.search}
                                                style={{
                                                    position: "absolute",
                                                    top: "0",
                                                    right: "0",
                                                }}
                                            />
                                        </Link>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        {shouldOpenPrintDialogListDialog && (
                            <AdverseDrugReportPrint
                                item={itemList}
                                open={shouldOpenPrintDialogListDialog}
                                handleClose={() => {
                                    this.setState({ shouldOpenPrintDialogListDialog: false });
                                }}
                                handleOKEditClose={() => {
                                    this.setState({ shouldOpenPrintDialogListDialog: false });
                                }}
                                t={t}
                            />
                        )}

                        <Grid item md={12} sm={12} xs={12} className="mb-12">
                            <Collapse
                                in={checkedFilter}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <AdverseDrugFilter handleFilter={this.handleFilter} t={t} />
                            </Collapse>
                        </Grid>

                        {listAdverseReport && (
                            <>
                                <MaterialTable
                                    data={listAdverseReport}
                                    columns={columns}
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
                                            backgroundColor:
                                                index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
                                        }),
                                    }}
                                />
                                <NicePagination
                                    totalPages={totalPages}
                                    handleChangePage={this.handleChangePage}
                                    setRowsPerPage={this.setRowsPerPage}
                                    pageSize={rowsPerPage}
                                    pageSizeOption={[1, 2, 3, 5, 10, 25]}
                                    t={t}
                                    totalElements={totalElements}
                                    page={page}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AdverseDrugTable;
