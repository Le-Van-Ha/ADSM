import React from "react";
import { toast } from "react-toastify";
import {
    DialogActions,
    Button,
    DialogContent,
    Grid,
    TextField,
} from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import BlockIcon from "@material-ui/icons/Block";
import "react-toastify/dist/ReactToastify.css";
import "styles/globitsStyles.css";
import MaterialTable, { MTableToolbar } from "material-table";
import {
    getAdverseDrug,
    sendAdverseDrug,
    getAdverseDrugById,
} from "./AdverseDrugReportService";
import DateFnsUtils from "@date-io/date-fns";
import AdverseDrugReportPrint from "./AdverseDrugReportPrint";
import ConstantList from "../../appConfig";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import InputPopupOrganization from "./InputPopupOrganization";
import { getCurrentOrganization } from "../User/UserService";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

class AdverseDrugReport extends React.Component {
    state = {
        listPatientIncident: [],
        history: null,
        adverseDrug: null,
        shouldOpenConfirmationDeleteListDialog: false,
        shouldOpenPrintDialogListDialog: false,
        item: [],
        disabled: false,
        isSent: false,
    };

    componentDidMount = () => {
        if (this.props.location.state) {
            const { id, disabled } = this.props.location.state;
            if (id != null && id) {
                getAdverseDrugById(id).then(({ data }) => {
                    this.setState({ adverseDrug: data, disabled: disabled });
                    this.handleSelect(data.userOrganization)
                });
            } else {
                this.getUserOrganization();
            }
        } else {
            this.getUserOrganization();
        }
    };

    updateReportForm = (date, userOrganization) => {
        var searchObject = {};
        searchObject.dateReport = date;
        searchObject.userOrganization = userOrganization;
        getAdverseDrug(searchObject).then(({ data }) => {
            let newItem = this.state.adverseDrug;
            if (newItem == null) {
                newItem = {};
            }
            newItem.userOrganization =
                data.userOrganization != null ? data.userOrganization : {};
	    newItem.dateReport =
                data.dateReport != null ? data.dateReport : "";
            newItem.totalPatienIncident = data.totalPatienIncident;
            newItem.totalSampleReport = data.totalSampleReport;
            newItem.numberOfHandledIncident = data.numberOfHandledIncident;
            newItem.numberOfSeriousIncident = data.numberOfSeriousIncident;
            newItem.numberOfsampleReport1 = data.numberOfsampleReport1;
            newItem.numberOfsampleReport2 = data.numberOfsampleReport2;
            newItem.quarters = data.quarters;
            newItem.yearReport = data.yearReport;
            newItem.patientIncidentReports = data.patientIncidentReports;
            newItem.inferiorityPatientIncidentReports =
                data.inferiorityPatientIncidentReports;
            this.setState({ adverseDrug: newItem });
        });
    };

    getUserOrganization = () => {
        getCurrentOrganization().then(({ data }) => {
            this.updateReportForm(Date.now(), data);
            const listRole = ["ROLE_PV", "ROLE_ADMIN"];
            this.setState({ disabled: !listRole.includes(data.user.roles[0].name) });
            this.handleSelect(data);
        })
    }

    handleFinishReportDate = (date, userOrganization) => {
        let newItem = this.state.adverseDrug;
        if (newItem == null) {
            newItem = {};
        }
        newItem.date = date;
        this.setState({
            adverseDrug: newItem,
        });
        this.updateReportForm(date, userOrganization);
    };

    handleChange = (event, name) => {
        let newItem = this.state.adverseDrug;
        if (newItem == null) {
            newItem = {};
        }
        newItem[name] = event.target.value;
        this.setState({
            adverseDrug: newItem,
        });
    };

    handleChangeRowData = (index, event, name) => {
        let newItem = this.state.adverseDrug;
        if (newItem == null) {
            newItem = {};
        }
        newItem.patientIncidentReports[index][name] = event.target.value;
        this.setState({
            adverseDrug: newItem,
        });
    };

    handleSendReport = (e) => {
        e.preventDefault();
        const { t } = this.props;
        sendAdverseDrug({ ...this.state.adverseDrug })
            .then((data) => {
                toast.success(t("adverseDrug.saveSuccess"));
                this.setState({
                    disabled: true,
                    isSent: true,
                });
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.warning(t("adverseDrug.sendDuplicate"));
                } else {
                    toast.error(t("adverseDrug.saveError"));
                }
            });
    };

    handleSelect = (item) => {
        let newItem = this.state.adverseDrug;
        if (newItem == null) {
            newItem = {};
        }
        newItem.userOrganization = item;
        this.setState({ adverseDrug: newItem, })
    };

    render() {
        let { t } = this.props;
        let { adverseDrug, shouldOpenPrintDialogListDialog, disabled, isSent } =
            this.state;
        const columns = [
            {
                title: "Mô tả biến cố",
                align: "center",
                width: "30%",
                render: (rowData) => (
                    <>
                        <TextField
                            value={rowData.description != null ? rowData.description : ""}
                            id={`numberResult${rowData.tableData.id}`}
                            style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                            className="w-100"
                            name="description"
                            type="text"
                            variant="outlined"
                            size="small"
                            disabled
                        />
                    </>
                ),
            },

            {
                title: "Biện pháp xử trí",
                align: "center",
                width: "30%",
                render: (rowData) => (
                    <TextField
                        value={
                            rowData.incidentHandlingDetails != null
                                ? rowData.incidentHandlingDetails
                                : ""
                        }
                        disabled={rowData.id != null ? "disabled" : false}
                        style={
                            rowData.id != null
                                ? { backgroundColor: "#e8e8e8" }
                                : { backgroundColor: "#fff" }
                        }
                        className="w-100"
                        name="incidentHandlingDetails"
                        onChange={(event) =>
                            this.handleChangeRowData(
                                rowData.tableData.id,
                                event,
                                "incidentHandlingDetails"
                            )
                        }
                        variant="outlined"
                        size="small"
                    />
                ),
            },
        ];
        return (
            <>
                <ValidatorForm onSubmit={this.handleSendReport}>
                    <div>
                        <DialogContent className="o-hidden">
                            {adverseDrug && (
                                <Grid container spacing={2} style={{ backgroundColor: "#fff" }}>
                                    <Grid item md={12}>
                                        <fieldset>
                                            <legend>{t("THÔNG TIN CHUNG")}</legend>
                                            <Grid container spacing={2} style={{ marginTop: "4px" }}>
                                                <Grid item md={6} xs={12} sm={6}>
                                                    <InputPopupOrganization
                                                        label={t("Tên đơn vị")}
                                                        field="userOrganization"
                                                        variant="outlined"
                                                        size="small"
                                                        tree="true"
                                                        value={adverseDrug.userOrganization}
                                                        t={t}
                                                        handleSelect={this.handleSelect}
                                                        disabled={disabled ? disabled : false}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        type={"text"}
                                                        size="small"
                                                        name="phoneNumber"
                                                        label={"Số điện thoại"}
                                                        variant="outlined"
                                                        onChange={(event) =>
                                                            this.handleChange(event, "phoneNumber")
                                                        }
                                                        style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                                                        disabled={disabled ? disabled : false}
                                                        value={adverseDrug.phoneNumber || null}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={6} xs={12}>
                                                    <TextValidator
                                                        fullWidth
                                                        type={"text"}
                                                        size="small"
                                                        name="executorName"
                                                        label={"Người thực hiện báo cáo"}
                                                        variant="outlined"
                                                        style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                                                        onChange={(event) =>
                                                            this.handleChange(event, "executorName")
                                                        }
                                                        disabled={disabled ? disabled : false}
                                                        value={adverseDrug.executorName || null}
                                                        validators={["required"]}
                                                        errorMessages={[
                                                            "Người thực hiện báo cáo bắt buộc nhập",
                                                        ]}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={6} xs={12}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            fullWidth
                                                            name={"reportDate"}
                                                            openTo="year"
                                                            views={["year", "month", "date"]}
                                                            autoOk
                                                            variant="inline"
                                                            label={t("Ngày hoàn thành báo cáo")}
                                                            format={"dd/MM/yyyy"}
                                                            inputVariant="outlined"
                                                            style={disabled == true ? { backgroundColor: "#e8e8e8" } : {}}
                                                            size="small"
                                                            InputAdornmentProps={{ position: "end" }}
                                                            value={adverseDrug.dateReport}
                                                            onChange={(date) =>
                                                                this.handleFinishReportDate(date, adverseDrug.userOrganization)
                                                            }
                                                            disabled={disabled ? disabled : false}
                                                            invalidDateMessage={
                                                                "Ngày nhập không đúng định dạng"
                                                            }
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                            </Grid>
                                        </fieldset>
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <fieldset>
                                            <legend>
                                                {t(
                                                    "Số lượng báo cáo mẫu 1 và mẫu 2 của hoạt động aDSM"
                                                )}
                                            </legend>
                                            <Grid container spacing={2} style={{ marginTop: "4px" }}>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t("Tổng số NB RR/MDR – TB")}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        name="totalSampleReport"
                                                        variant="outlined"
                                                        size="small"
                                                        disabled
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        onChange={(event) => {
                                                            this.handleChange(event, "totalSampleReport");
                                                        }}
                                                        value={
                                                            adverseDrug.totalSampleReport != null
                                                                ? adverseDrug.totalSampleReport
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t("Số lượng báo cáo mẫu 1 đã gửi đi")}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        type="number"
                                                        name="numberOfsampleReport1"
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        value={
                                                            adverseDrug.numberOfsampleReport1 != null
                                                                ? adverseDrug.numberOfsampleReport1
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t("Số lượng báo cáo mẫu 2 đã gửi đi")}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        type="text"
                                                        name="numberOfsampleReport2"
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        value={
                                                            adverseDrug.numberOfsampleReport2 != null
                                                                ? adverseDrug.numberOfsampleReport2
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </fieldset>
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <fieldset>
                                            <legend>
                                                {t(
                                                    "Biến cố bất lợi được ghi nhận trong quá trình điều trị bệnh nhân"
                                                )}
                                            </legend>
                                            <Grid container spacing={2} style={{ marginTop: "4px" }}>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t("Tổng số biến cố bất lợi")}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        type="text"
                                                        name="totalPatienIncident"
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        value={
                                                            adverseDrug.totalPatienIncident != null
                                                                ? adverseDrug.totalPatienIncident
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                            inputProps: { min: 0 },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t("Số lượng biến cố nghiêm trọng")}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        type="text"
                                                        name="numberOfSeriousIncident"
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        value={
                                                            adverseDrug.numberOfSeriousIncident != null
                                                                ? adverseDrug.numberOfSeriousIncident
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    {t(
                                                        "Số lượng biến cố được xử trí liên quan đến thay đổi phác đồ lao"
                                                    )}
                                                </Grid>
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        type="text"
                                                        name="numberOfHandledIncident"
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ backgroundColor: "#e8e8e8" }}
                                                        value={
                                                            adverseDrug.numberOfHandledIncident != null
                                                                ? adverseDrug.numberOfHandledIncident
                                                                : 0
                                                        }
                                                        InputProps={{
                                                            style: { textAlign: "left" },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </fieldset>
                                    </Grid>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <fieldset>
                                            <legend>
                                                {t(
                                                    "Xử trí trong quá trình điều trị khi xảy ra các biến cố (nếu có)"
                                                )}
                                            </legend>
                                            <MaterialTable
                                                data={(adverseDrug.patientIncidentReports != null
                                                    ? adverseDrug.patientIncidentReports
                                                    : []
                                                ).concat(
                                                    adverseDrug.inferiorityPatientIncidentReports != null
                                                        ? adverseDrug.inferiorityPatientIncidentReports
                                                        : []
                                                )}
                                                columns={columns}
                                                className="w-100"
                                                style={{
                                                    boxShadow: "0 0 0 transparent",
                                                }}
                                                disabled
                                                options={{
                                                    toolbar: false,
                                                    selection: false,
                                                    actionsColumnIndex: -1,
                                                    paging: false,
                                                    search: false,
                                                    tableLayout: "fixed",
                                                    padding: "dense",
                                                    border: "none",
                                                    cellStyle: {
                                                        border: "none",
                                                    },
                                                    headerStyle: {
                                                        border: "none",
                                                        fontSize: "15px",
                                                    },
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
                                        </fieldset>
                                    </Grid>
                                </Grid>
                            )}
                            {shouldOpenPrintDialogListDialog && (
                                <AdverseDrugReportPrint
                                    item={adverseDrug}
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
                        </DialogContent>
                    </div>
                    {adverseDrug && (
                        <div className="dialog-footer">
                            <DialogActions className="p-0">
                                <div className="flex flex-space-between flex-middle">
                                    <Button
                                        startIcon={<BlockIcon />}
                                        variant="contained"
                                        className="mr-12 btn btn-secondary d-inline-flex"
                                        color="secondary"
                                        type="button"
                                        onClick={() => {
                                            this.props.history.push(
                                                ConstantList.ROOT_PATH + "adverse_drug_table"
                                            );
                                        }}
                                    >
                                        {t("general.button.cancel")}
                                    </Button>
                                    <Button
                                        startIcon={<PrintIcon />}
                                        className="mr-12 btn btn-success d-inline-flex"
                                        variant="contained"
                                        type="button"
                                        style={{
                                            backgroundColor: "red",
                                            borderColor: "transparent",
                                        }}
                                        onClick={() => {
                                            this.setState({ shouldOpenPrintDialogListDialog: true });
                                        }}
                                    >
                                        {t("general.button.print")}
                                    </Button>
                                    <Button
                                        className="mr-0 btn d-inline-flex"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={
                                            this.props.match.params.id || isSent || disabled
                                                ? "disabled"
                                                : false
                                        }
                                    >
                                        {t("general.button.save")}
                                    </Button>
                                </div>
                            </DialogActions>
                        </div>
                    )}
                </ValidatorForm>
            </>
        );
    }
}

export default AdverseDrugReport;
