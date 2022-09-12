import React, { Component } from "react";
import {
    Dialog,
    Button,
    Grid,
    IconButton,
    Icon,
    DialogActions,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import {
    searchByPageDrug,
    getById,
} from "./PatientService";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import moment from "moment";

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function MaterialButton(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    return (
        <div>
            <IconButton onClick={() => props.onSelect(item, 1)}>
                <Icon color="error">delete</Icon>
            </IconButton>
        </div>
    );
}
export default class AssetTransferPrint extends Component {
    state = {
        type: 2,
        rowsPerPage: 1,
        page: 0,
        totalElements: 0,
        departmentId: "",
        name: "",
        asset: {},
        isView: false,
    };

    handleFormSubmit = () => {
        let content = document.getElementById("divcontents");
        let pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    };

    componentDidMount() {
        let { t, location } = this.props;
        let id = this.props.id;
        if (id != null) {
            getById(id).then(({ data }) => {
                if (data.parent === null) {
                    data.parent = {};
                }
                this.setState({ ...data });
                this.setState({ didMountComplete: true });
            });
        } else {
            this.setState({ didMountComplete: true });
        }

        var searchObject = {};
        searchObject.pageIndex = 1;
        searchObject.pageSize = 10000;
        getLabTests(searchObject).then(({ data }) => {
            this.setState({ listLabTest: [...data.content] });
        });
        searchByPageDrug(searchObject).then(({ data }) => {
            this.setState({ listDrug: [...data.content] });
        });

        document.addEventListener("keydown", this.escFunction, false);
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    };

    render() {
        let { open, handleClose, handleOKEditClose, t, i18n, item } = this.props;
        let {
            rowsPerPage,
            page,
            assetVouchers,
            displayName,
            patientCode,
            eTBCode,
            height,
            weight,
            lungDamage,
            outOfLungDamage,
            bothDamage,
            unknown,
            gender,
            birthDate,
            classify,
            otherClassify,
            oldOrg,
            clinicalStatusDto,
            drugHistories,
            patientLabtestResults,
            tbDrugs,
            hearingLeft,
            hearingRight,
            eyeSightLeft,
            eyeSightRight,
            qtc,
            qTcF,
            heartbeat,
            otherTest,
            patientIncidents,
            dateReport,
            reportBy,
            healthOrg,
        } = this.state;
        return (
            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                maxWidth="md"
                fullWidth
                style={{ overflowY: "visible" }}
            >
                <iframe
                    id="ifmcontentstoprint"
                    style={{
                        height: "0px",
                        width: "0px",
                        position: "absolute",
                        print: { size: "auto", margin: "0mm" },
                    }}
                ></iframe>

                <ValidatorForm
                    className="validator-form-scroll-dialog"
                    ref="form"
                    onSubmit={this.handleFormSubmit}
                    style={{ height: 1682 }}
                >
                    <DialogContent id="divcontents">
                        <Grid>
                            <div>
                                <meta
                                    httpEquiv="Content-Type"
                                    content="text/html; charset=UTF-8"
                                />
                                <style
                                    type="text/css"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "\n\nbody{margin-top: 0px;margin-left: 0px;}\n\ntable.GeneratedTable {width: 300px;height: 93px;background-color: #ffffff;border-collapse: collapse;border-width: 1px;border-color: #000000;border-style: solid;color: #000000;}\ntable.GeneratedTable td, table.GeneratedTable th {border-width: 1px;-color: #000000;border-style: solid;padding: 0px;}\n#page_1 {position:relative; margin: 2em auto;padding: 0px;border: none;width: 730px;}\n#page_1 #id1_1 {border:none;margin: 0px 0px 0px 3px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_1 #id1_2 {border:none;margin: 2px 0px 0px 17px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_1 #id1_2 #id1_2_1 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 350px;overflow: hidden;}\n#page_1 #id1_2 #id1_2_2 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 388px;overflow: hidden;}\n#page_1 #id1_3 {border:none;margin: 11px 0px 0px 3px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_1 #id1_3 #id1_3_1 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 269px;overflow: hidden;}\n#page_1 #id1_3 #id1_3_2 {float:left;border:none;margin: 22px 0px 0px 0px;padding: 0px;border:none;width: 453px;overflow: hidden;}\n#page_1 #id1_4 {border:none;margin: 23px 0px 0px 0px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_1 #id1_5 {border:none;margin: 5px 0px 0px 0px;padding: 0px;border:none;width: 520px;overflow: hidden;}\n\n#page_1 #p1dimg1 {position:absolute;top:8px;left:2px;z-index:-1;width:794px;height:1123px;}\n#page_1 #p1dimg1 #p1img1 {width:794px;height:1123px;}\n\n\n\n\n#page_2 {position:relative; overflow: hidden;margin: 2em auto;padding: 0px;border: none;width:730px;}\n#page_2 #id2_1 {border:none;margin: 0px 0px 0px 7px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_2 #id2_1 #id2_1_1 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 340px;overflow: hidden;}\n#page_2 #id2_1 #id2_1_2 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 420px;overflow: hidden;}\n#page_2 #id2_2 {border:none;margin: 19px 0px 0px 0px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_2 #id2_3 {border:none;margin: 44px 0px 0px 24px;padding: 0px;border:none;width: 760px;overflow: hidden;}\n#page_2 #id2_3 #id2_3_1 {float:left;border:none;margin: 5px 0px 0px 0px;padding: 0px;border:none;width: 197px;overflow: hidden;}\n#page_2 #id2_3 #id2_3_2 {float:left;border:none;margin: 18px 0px 0px 0px;padding: 0px;border:none;width: 139px;overflow: hidden;}\n#page_2 #id2_3 #id2_3_3 {float:left;border:none;margin: 0px 0px 0px 0px;padding: 0px;border:none;width: 406px;overflow: hidden;}\n#page_2 #id2_4 {border:none;margin: 76px 0px 0px 0px;padding: 0px;border:none;width: 550px;overflow: hidden;}\n\n#page_2 #p2dimg1 {position:absolute;top:0px;left:10px;z-index:-1;width:794px;height:1123px;}\n#page_2 #p2dimg1 #p2img1 {width:794px;height:1123px;}\n\n\n\n\n.dclr {clear:both;float:none;height:1px;margin:0px;padding:0px;overflow:hidden;}\n\n.ft0{font: bold 16px 'Arial';line-height: 19px;}\n.ft1{font: italic 15px 'Arial';line-height: 17px;}\n.ft2{font: bold 15px 'Arial';color: #0d0d0d;line-height: 18px;}\n.ft3{font: bold 14px 'Arial';color: #0d0d0d;margin-left: 9px;line-height: 23px;}\n.ft4{font: 14px 'Arial';color: #0d0d0d;line-height: 23px;}\n.ft5{font: bold 14px 'Arial';color: #0d0d0d;line-height: 23px;}\n.ft6{font: 1px 'Arial';line-height: 1px;}\n.ft7{font: 15px 'Arial';color: #0d0d0d;line-height: 17px;word-wrap: break-word;}\n.ft8{font: 13px 'Arial';color: #0d0d0d;line-height: 16px;}\n.ft9{font: 15px 'Segoe UI Symbol';color: #0d0d0d;line-height: 20px;}\n.ft10{font: 15px 'MS Gothic';color: #0d0d0d;line-height: 15px;}\n.ft11{font: 14px 'MS Gothic';color: #0d0d0d;line-height: 14px;}\n.ft12{font: 15px 'Arial';color: #0d0d0d;margin-left: 4px;line-height: 17px;}\n.ft121{font: 15px 'Arial';color: #0d0d0d;margin-left: 0px;line-height: 17px;}\n.ft13{font: bold 14px 'Arial';color: #0d0d0d;line-height: 16px;}\n.ft14{font: 1px 'Arial';line-height: 6px;}\n.ft15{font: 1px 'Arial';line-height: 8px;}\n.ft16{font: bold 13px 'Arial';color: #0d0d0d;line-height: 16px;}\n.ft17{font: italic 15px 'Arial';color: #0d0d0d;line-height: 17px;}\n.ft18{font: 1px 'Arial';line-height: 7px;}\n.ft19{font: bold 15px 'Arial';color: #0d0d0d;margin-left: 8px;line-height: 18px;}\n.ft20{font: 1px 'Arial';line-height: 4px;}\n.ft21{font: 1px 'Arial';line-height: 5px;}\n.ft22{font: 11px 'Arial';color: #0d0d0d;line-height: 14px;}\n.ft23{font: 13px 'Arial';color: #0d0d0d;line-height: 11px;}\n.ft24{font: 1px 'Arial';line-height: 11px;}\n.ft25{font: 1px 'Arial';line-height: 12px;}\n.ft26{font: italic 12px 'Arial';line-height: 16px;}\n.ft27{font: 1px 'Arial';line-height: 3px;}\n.ft28{font: 1px 'Arial';line-height: 10px;}\n.ft29{font: 1px 'Arial';line-height: 9px;}\n.ft30{font: bold 15px 'Arial';color: #0d0d0d;margin-left: 11px;line-height: 18px;}\n.ft31{font: 12px 'Arial';color: #0d0d0d;line-height: 15px;}\n.ft32{font: 1px 'Arial';line-height: 2px;}\n.ft33{font: 15px 'Calibri';color: #0d0d0d;line-height: 18px;}\n.ft34{font: italic bold 15px 'Arial';color: #0d0d0d;line-height: 17px;}\n.ft35{font: 13px 'Arial';text-decoration: underline;color: #0d0d0d;margin-left: 29px;line-height: 16px;}\n.ft36{font: 13px 'Arial';text-decoration: underline;color: #0d0d0d;line-height: 16px;}\n\n.p0{text-align: left;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p1{text-align: left;padding-left: 55px;margin-top: 0px;margin-bottom: 0px;}\n.p2{text-align: left;padding-right: 585px;margin-top: 24px;margin-bottom: 0px;}\n.p3{text-align: left;padding-left: 64px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p4{text-align: right;padding-right: 14px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p5{text-align: right;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p6{text-align: left;padding-left: 3px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p666{text-align: center;padding-left: 3px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p7{text-align: left;padding-left: 2px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p8{text-align: left;padding-left: 28px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p9{text-align: left;padding-left: 1px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p10{text-align: left;padding-left: 27px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p11{text-align: left;margin-top: 14px;margin-bottom: 0px;}\n.p12{text-align: left;margin-top: 0px;margin-bottom: 0px;}\n.p13{text-align: left;margin-top: 1px;margin-bottom: 0px;}\n.p14{text-align: left;margin-top: 3px;margin-bottom: 0px;}\n.p15{text-align: left;padding-left: 8px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p16{text-align: left;padding-left: 7px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p17{text-align: center;padding-right: 1px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p18{text-align: left;padding-left: 22px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p19{text-align: left;padding-left: 4px;margin-top: 18px;margin-bottom: 0px;}\n\n.p20{text-align: left;padding-left: 7px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p201{text-align: left;padding-left: 7px;margin-top: 9px;margin-bottom: 0px;white-space: nowrap;}\n.p21{text-align: left;padding-left: 25px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p22{text-align: left;padding-left: 3px;margin-top: 0px;margin-bottom: 0px;}\n.p23{text-align: left;padding-left: 6px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p24{text-align: left;padding-left: 88px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p25{text-align: left;margin-top: 13px;margin-bottom: 0px;}\n.p26{text-align: left;padding-left: 9px;margin-top: 9px;margin-bottom: 0px; word-wrap: break-word;}\n.p27{text-align: left;padding-left: 105px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p28{text-align: left;padding-left: 42px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p29{text-align: left;margin-top: 12px;margin-bottom: 0px;}\n.p30{text-align: left;padding-left: 165px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p31{text-align: left;padding-left: 29px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p32{text-align: right;padding-right: 567px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p33{text-align: center;padding-right: 2px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p34{text-align: left;margin-top: 23px;margin-bottom: 0px;}\n.p35{text-align: center;padding-left: 0px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p36{text-align: right;padding-right: 33px;margin-top: 0px;margin-bottom: 0px;white-space: nowrap;}\n.p37{text-align: left;padding-left: 14px;margin-top: 0px;margin-bottom: 0px;}.p377{text-align: center;margin-top: 0px;margin-bottom: 0px;}\n\n.td0{padding: 0px;margin: 0px;width: 405px;vertical-align: bottom;}\n.td1{padding: 0px;margin: 0px;width: 232px;vertical-align: bottom;}\n.td2{padding: 0px;margin: 0px;width: 138px;vertical-align: bottom;}\n.td3{padding: 0px;margin: 0px;width: 3px;vertical-align: bottom;}\n.td4{padding: 0px;margin: 0px;width: 7px;vertical-align: bottom;}\n.td5{padding: 0px;margin: 0px;width: 4px;vertical-align: bottom;}\n.td6{padding: 0px;margin: 0px;width: 14px;vertical-align: bottom;}\n.td7{padding: 0px;margin: 0px;width: 36px;vertical-align: bottom;}\n.td8{padding: 0px;margin: 0px;width: 81px;vertical-align: bottom;}\n.td9{padding: 0px;margin: 0px;width: 29px;vertical-align: bottom;}\n.td10{padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;}\n.td11{padding: 0px;margin: 0px;width: 25px;vertical-align: bottom;}\n.td12{padding: 0px;margin: 0px;width: 16px;vertical-align: bottom;}\n.td13{padding: 0px;margin: 0px;width: 9px;vertical-align: bottom;}\n.td14{padding: 0px;margin: 0px;width: 294px;vertical-align: bottom;}\n.td15{padding: 0px;margin: 0px;width: 79px;vertical-align: bottom;}\n.td16{padding: 0px;margin: 0px;width: 6px;vertical-align: bottom;}\n.td17{padding: 0px;margin: 0px;width: 24px;vertical-align: bottom;}\n.td18{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 9px;vertical-align: bottom;}\n.td19{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 10px;vertical-align: bottom;}\n.td20{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 18px;vertical-align: bottom;}\n.td21{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 36px;vertical-align: bottom;}\n.td22{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 11px;vertical-align: bottom;}\n.td23{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 81px;vertical-align: bottom;}\n.td24{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 29px;vertical-align: bottom;}\n.td25{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;}\n.td26{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 4px;vertical-align: bottom;}\n.td27{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 25px;vertical-align: bottom;}\n.td28{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 3px;vertical-align: bottom;}\n.td29{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 16px;vertical-align: bottom;}\n.td30{padding: 0px;margin: 0px;width: 123px;vertical-align: bottom;}\n.td31{border-top: #0d0d0d 1px solid;padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;}\n.td32{padding: 0px;margin: 0px;width: 6px;vertical-align: bottom;background: #0d0d0d;}\n.td33{padding: 0px;margin: 0px;width: 24px;vertical-align: bottom;background: #0d0d0d;}\n.td34{padding: 0px;margin: 0px;width: 4px;vertical-align: bottom;background: #0d0d0d;}\n.td35{padding: 0px;margin: 0px;width: 16px;vertical-align: bottom;background: #0d0d0d;}\n.td36{padding: 0px;margin: 0px;width: 9px;vertical-align: bottom;background: #0d0d0d;}\n.td37{padding: 0px;margin: 0px;width: 3px;vertical-align: bottom;background: #0d0d0d;}\n.td38{padding: 0px;margin: 0px;width: 7px;vertical-align: bottom;background: #0d0d0d;}\n.td39{padding: 0px;margin: 0px;width: 14px;vertical-align: bottom;background: #0d0d0d;}\n.td40{padding: 0px;margin: 0px;width: 36px;vertical-align: bottom;background: #0d0d0d;}\n.td41{padding: 0px;margin: 0px;width: 81px;vertical-align: bottom;background: #0d0d0d;}\n.td42{padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;}\n.td43{padding: 0px;margin: 0px;width: 59px;vertical-align: bottom;}\n.td44{padding: 0px;margin: 0px;width: 64px;vertical-align: bottom;}\n.td45{padding: 0px;margin: 0px;width: 161px;vertical-align: bottom;}\n.td46{padding: 0px;margin: 0px;width: 319px;vertical-align: bottom;}\n.td47{padding: 0px;margin: 0px;width: 50px;vertical-align: bottom;}\n.td48{padding: 0px;margin: 0px;width: 322px;vertical-align: bottom;}\n.td49{padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;background: #0d0d0d;}\n.td50{padding: 0px;margin: 0px;width: 25px;vertical-align: bottom;background: #0d0d0d;}\n.td51{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 120px;vertical-align: bottom;background: #d9d9d9;}\n.td52{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 59px;vertical-align: bottom;background: #d9d9d9;}\n.td53{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 65px;vertical-align: bottom;background: #d9d9d9;}\n.td54{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 120px;vertical-align: bottom;}\n.td55{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 59px;vertical-align: bottom;}\n.td56{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 65px;vertical-align: bottom;}\n.td57{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 120px;vertical-align: bottom;}\n.td58{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 59px;vertical-align: bottom;}\n.td59{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 65px;vertical-align: bottom;}\n.td60{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 120px;vertical-align: bottom;}\n.td61{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 59px;vertical-align: bottom;}\n.td62{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 65px;vertical-align: bottom;}\n.td63{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;background: #d9d9d9;}\n.td64{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;background: #d9d9d9;}\n.td65{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;background: #d9d9d9;}\n.td66{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td67{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;}\n.td68{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td69{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td70{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;}\n.td71{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td72{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td73{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;}\n.td74{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 154px;vertical-align: bottom;}\n.td75{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 122px;vertical-align: bottom;background: #d9d9d9;}\n.td76{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 67px;vertical-align: bottom;background: #d9d9d9;}\n.td77{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;background: #d9d9d9;}\n.td78{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 5px;vertical-align: bottom;}\n.td79{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 191px;vertical-align: bottom;background: #d9d9d9;}\n.td80{border-left: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 92px;vertical-align: bottom;background: #d9d9d9;}\n.td81{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 3px;vertical-align: bottom;background: #d9d9d9;}\n.td82{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 5px;vertical-align: bottom;background: #d9d9d9;}\n.td83{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;background: #d9d9d9;}\n.td84{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 65px;vertical-align: bottom;background: #d9d9d9;}\n.td85{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 71px;vertical-align: bottom;background: #d9d9d9;}\n.td86{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 191px;vertical-align: bottom;background: #d9d9d9;}\n.td87{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 122px;vertical-align: bottom;}\n.td88{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 191px;vertical-align: bottom;}\n.td89{border-left: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 92px;vertical-align: bottom;}\n.td90{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 8px;vertical-align: bottom;}\n.td91{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;}\n.td92{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 191px;vertical-align: bottom;}\n.td93{padding: 0px;margin: 0px;width: 8px;vertical-align: bottom;}\n.td94{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 3px;vertical-align: bottom;}\n.td95{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 5px;vertical-align: bottom;}\n.td96{border-left: #000000 1px solid;padding: 0px;margin: 0px;width: 95px;vertical-align: bottom;}\n.td97{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 27px;vertical-align: bottom;}\n.td98{border-left: #000000 1px solid;padding: 0px;margin: 0px;width: 92px;vertical-align: bottom;}\n.td99{padding: 0px;margin: 0px;width: 5px;vertical-align: bottom;}\n.td100{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 22px;vertical-align: bottom;}\n.td101{border-left: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 95px;vertical-align: bottom;}\n.td102{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 122px;vertical-align: bottom;}\n.td103{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 94px;vertical-align: bottom;}\n.td104{border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 124px;vertical-align: bottom;}\n.td105{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 150px;vertical-align: bottom;}\n.td106{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 94px;vertical-align: bottom;}\n.td107{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 124px;vertical-align: bottom;}\n.td108{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 150px;vertical-align: bottom;}\n.td109{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 94px;vertical-align: bottom;}\n.td110{padding: 0px;margin: 0px;width: 124px;vertical-align: bottom;}\n.td111{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 150px;vertical-align: bottom;}\n.td112{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 278px;vertical-align: bottom;background: #d9d9d9;}\n.td113{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 144px;vertical-align: bottom;background: #d9d9d9;}\n.td114{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 156px;vertical-align: bottom;background: #d9d9d9;}\n.td115{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #d9d9d9 1px solid;padding: 0px;margin: 0px;width: 137px;vertical-align: bottom;background: #d9d9d9;}\n.td116{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 278px;vertical-align: bottom;}\n.td117{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 144px;vertical-align: bottom;}\n.td118{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 156px;vertical-align: bottom;}\n.td119{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 137px;vertical-align: bottom;}\n.td120{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 278px;vertical-align: bottom;}\n.td121{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 144px;vertical-align: bottom;}\n.td122{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 156px;vertical-align: bottom;}\n.td123{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 137px;vertical-align: bottom;}\n.td124{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 588px;vertical-align: bottom;background: #d9d9d9;}\n.td125{border-right: #000000 1px solid;border-top: #000000 1px solid;padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;background: #d9d9d9;}\n.td126{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 588px;vertical-align: bottom;background: #d9d9d9;}\n.td127{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;background: #d9d9d9;}\n.td128{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 588px;vertical-align: bottom;}\n.td129{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;}\n.td130{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 588px;vertical-align: bottom;}\n.td131{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 135px;vertical-align: bottom;}\n.td132{border-left: #000000 1px solid;border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 284px;vertical-align: bottom;background: #d9d9d9;}\n.td133{border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 108px;vertical-align: bottom;background: #d9d9d9;}\n.td134{border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 34px;vertical-align: bottom;background: #d9d9d9;}\n.td135{border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 4px;vertical-align: bottom;background: #d9d9d9;}\n.td136{border-right: #000000 1px solid;border-top: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 295px;vertical-align: bottom;background: #d9d9d9;}\n.td137{border-left: #000000 1px solid;border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 284px;vertical-align: top;}\n.td138{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 441px;vertical-align: top;}\n.td139{padding: 0px;margin: 0px;width: 108px;vertical-align: bottom;}\n.td140{padding: 0px;margin: 0px;width: 34px;vertical-align: bottom;}\n.td141{padding: 0px;margin: 0px;width: 30px;vertical-align: bottom;}\n.td142{border-right: #000000 1px solid;padding: 0px;margin: 0px;width: 229px;vertical-align: bottom;}\n.td143{border-left: #000000 1px solid;border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 284px;vertical-align: bottom;}\n.td144{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 108px;vertical-align: bottom;}\n.td145{border-top: #0d0d0d 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 34px;vertical-align: bottom;}\n.td146{border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 4px;vertical-align: bottom;}\n.td147{border-top: #0d0d0d 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 30px;vertical-align: bottom;}\n.td148{border-top: #0d0d0d 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 33px;vertical-align: bottom;}\n.td149{border-right: #000000 1px solid;border-bottom: #000000 1px solid;padding: 0px;margin: 0px;width: 229px;vertical-align: bottom;}\n.td150{padding: 0px;margin: 0px;width: 38px;vertical-align: bottom;}\n.td151{padding: 0px;margin: 0px;width: 66px;vertical-align: bottom;}\n\n.tr0{height: 25px;}\n.tr1{height: 21px;}\n.tr2{height: 20px;}\n.tr3{height: 1px;}\n.tr4{height: 30px;}\n.tr5{height: 24px;}\n.tr6{height: 27px;}\n.tr7{height: 19px;}\n.tr8{height: 6px;}\n.tr9{height: 8px;}\n.tr10{height: 7px;}\n.tr11{height: 18px;}\n.tr12{height: 4px;}\n.tr13{height: 5px;}\n.tr14{height: 29px;}\n.tr15{height: 17px;}\n.tr16{height: 28px;}\n.tr17{height: 11px;}\n.tr18{height: 12px;}\n.tr19{height: 23px;}\n.tr191{height: 1px;}\n.tr20{height: 3px;}\n.tr21{height: 26px;}\n.tr22{height: 22px;}\n.tr23{height: 10px;}\n.tr24{height: 9px;}\n.tr25{height: 2px;}\n\n.t0{width: 637px;margin-left: 24px;font: bold 16px 'Arial';}\n.t1{width: 725px;font: 13px 'Arial';color: #0d0d0d;}\ntt1{width: 247px;margin-left: 7px;margin-top: 4px;font: 14px 'MS Gothic';color: #0d0d0d; border:'1px solid black';}\n.t2{width: 247px;margin-left: 7px;margin-top: 4px;font: 14px 'MS Gothic';color: #0d0d0d;}\n.t3{width: 453px;font: 15px 'MS Gothic';margin-left: 7pxcolor: #0d0d0d;}\n.t4{width: 723px;margin-top: 4px;margin-left: 7px;font: 13px 'Arial';color: #0d0d0d;}\n.t5{width: 373px;font: 13px 'Arial';color: #0d0d0d; margin-left: 7px}\n.t6{width: 723px;margin-left: 7px;margin-top: 4px;font: bold 15px 'Arial';color: #0d0d0d;}\n.t7{width: 723px;margin-left: 7px;margin-top: 3px;font: 15px 'Arial';color: #0d0d0d;}\n.t8{width: 723px;margin-left: 7px;margin-top: 4px;font: 15px 'Arial';color: #0d0d0d;}\n.pCenter{text-align: center;padding-left: 0px;margin-top: 0px; font: 13px arial;margin-bottom: 0px;white-space: nowrap;}\n\n.pCenter2{text-align: center;padding-left: 0px;margin-top: 0px; font: 15px arial;margin-bottom: 5px;white-space: nowrap;}}\n",
                                    }}
                                />
                                <div id="page_1">
                                    <div style={{ overflow: "hidden" }}>
                                        <div id="id1_1">
                                            <table cellPadding={0} cellSpacing={0} className="t0">
                                                <tbody>
                                                    <tr>
                                                        <td className="tr0 td0">
                                                            <p className="p0 ft0">
                                                                MẪU 1: THÔNG TIN TRƯỚC ĐIỀU TRỊ
                                                            </p>
                                                        </td>
                                                        <td className="tr0 td1">
                                                            <p className="p0 ft0">
                                                                Cơ sở điều trị:{" "}
                                                                <span className="ft12">
                                                                    {healthOrg
                                                                        ? healthOrg.name
                                                                            ? healthOrg.name
                                                                            : "_______________"
                                                                        : "_______________"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="p1 ft1">Áp dụng trong hoạt động aDSM</p>
                                            <p className="p2 ft5">
                                                <span className="ft2">A.</span>
                                                <span className="ft3">THÔNG TIN CHUNG</span>
                                            </p>
                                            <table cellPadding={0} cellSpacing={0} className="t1">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={6} className="tr1 td2">
                                                            <p className="p0 ft2">
                                                                {" "}
                                                                Họ và tên bệnh nhân:{" "}
                                                                <span className="ft12">
                                                                    {displayName
                                                                        ? displayName
                                                                        : "_______________________"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={21} className="tr1 td2">
                                                            <p className="p0 ft2">
                                                                Mã số bệnh nhân:{" "}
                                                                <span className="ft12">
                                                                    {patientCode
                                                                        ? patientCode
                                                                        : "___________________"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td colSpan={3} className="tr1 td14">
                                                            <p className="p3 ft2">
                                                                Số eTB:{" "}
                                                                <span className="ft12">
                                                                    {eTBCode ? eTBCode : "______________"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr1 td15" colSpan={24}>
                                                            <p className="p0 ft2">
                                                                Ngày sinh:{" "}
                                                                <span className="ft12">
                                                                    {birthDate
                                                                        ? moment(birthDate).format("DD/MM/YYYY")
                                                                        : "_____/_____/_____"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr3 td15" colSpan={24}>
                                                            <p className="p0 ft6"></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr4 td15">
                                                            <p className="p0 ft2">
                                                                Giới tính:{" "}
                                                                <span className="ft12">
                                                                    {gender
                                                                        ? gender === "F"
                                                                            ? "Nữ"
                                                                            : "Nam"
                                                                        : "______________"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td colSpan={12} className="tr4 td43">
                                                            <p className="p6 ft7"></p>
                                                        </td>
                                                        <td colSpan={6} className="tr4 td45">
                                                            <p className="p8 ft2">Vị trí tổn thương: </p>
                                                        </td>
                                                        <td colSpan={5} className="tr4 td46">
                                                            <p className="p9 ft7">
                                                                <span className="ft9">
                                                                    {" "}
                                                                    {lungDamage
                                                                        ? lungDamage === false
                                                                            ? "☐"
                                                                            : "✓"
                                                                        : "☐"}
                                                                </span>
                                                                Phổi{" "}
                                                                <span className="ft9">
                                                                    {outOfLungDamage
                                                                        ? outOfLungDamage === false
                                                                            ? "☐"
                                                                            : "✓"
                                                                        : "☐"}
                                                                </span>
                                                                Ngoài phổi{" "}
                                                                <span className="ft9">
                                                                    {bothDamage
                                                                        ? bothDamage === false
                                                                            ? "☐"
                                                                            : "✓"
                                                                        : "☐"}
                                                                </span>
                                                                Cả hai{" "}
                                                                <span className="ft10">
                                                                    {unknown
                                                                        ? unknown === false
                                                                            ? "☐"
                                                                            : "✓"
                                                                        : "☐"}
                                                                </span>
                                                                Không rõ
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr5 td15" colSpan={11}>
                                                            <p className="p0 ft2">
                                                                Chiều cao:{" "}
                                                                <span className="ft12">
                                                                    {height ? height + "cm" : "|___|___|___| cm"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td4">
                                                            <p className="p0 ft6"></p>
                                                        </td>
                                                        <td className="tr5 td5">
                                                            <p className="p0 ft6"></p>
                                                        </td>
                                                        <td colSpan={11} className="tr5 td45">
                                                            <p className="p10 ft2">
                                                                Cân nặng:{" "}
                                                                <span className="ft12">
                                                                    {weight ? weight + "kg" : "|___|___|___| kg"}
                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr3 td15" colSpan={24}>
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="p11 ft2">Phân loại bệnh nhân</p>
                                        </div>
                                        <div id="id1_2">
                                            <div id="id1_2_1">
                                                <p className="p12 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "ans1" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">Mắc mới</span>
                                                </p>
                                                <p className="p13 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "ans2" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">Tái phát</span>
                                                </p>
                                                <p className="p14 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "ans4" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">
                                                        Chuyển đến (cơ sở cũ:{" "}
                                                        {oldOrg ? oldOrg : "………………………"})
                                                    </span>
                                                </p>
                                            </div>
                                            <div id="id1_2_2">
                                                <p className="p12 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "ans3" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">
                                                        Thất bại phác đồ lao trước đó
                                                    </span>
                                                </p>
                                                <p className="p13 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "ans5" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">Điều trị lại sau bỏ trị</span>
                                                </p>
                                                <p className="p14 ft7">
                                                    <span className="ft11">
                                                        {classify ? (classify == "OTHER" ? "✓" : "☐") : "☐"}
                                                    </span>
                                                    <span className="ft12">
                                                        Khác (cụ thể:{" "}
                                                        {otherClassify ? otherClassify : "…………………………………………"}
                                                        )
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div id="id1_3">
                                            <div id="id1_3_1">
                                                <p className="p12 ft2">B. TÌNH TRẠNG LÂM SÀNG</p>
                                                <table cellPadding={0} cellSpacing={0} className="t2">
                                                    <tbody>
                                                        <tr>
                                                            <td className="tr6 td51">
                                                                <p className="p15 ft2">Đặc điểm</p>
                                                            </td>
                                                            <td className="tr6 td52">
                                                                <p className="p16 ft2">Có</p>
                                                            </td>
                                                            <td className="tr6 td53">
                                                                <p className="p16 ft2">Không</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="tr7 td54">
                                                                <p className="p15 ft7">Suy kiệt</p>
                                                            </td>
                                                            <td className="tr7 td55">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.exhausted === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td56">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Nghiện rượu</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.alcoholism === false
                                                                        ? ""
                                                                        : "✓"}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Nghiện thuốc lá</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.addictionToCigarettes ===
                                                                        true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Nghiện ma túy</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.drugAddict === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Mang thai</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.pregnant === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Cho con bú</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.breastfeeding === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td57">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td58">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td60">
                                                                <p className="p15 ft7">Khác</p>
                                                            </td>
                                                            <td className="tr7 td61">
                                                                <p className="p18 ft10">
                                                                    {clinicalStatusDto?.other === true ? "✓" : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p17 ft11">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr9 td57">
                                                                <p className="p0 ft15">&nbsp;</p>
                                                            </td>
                                                            <td className="tr9 td58">
                                                                <p className="p0 ft15">&nbsp;</p>
                                                            </td>
                                                            <td className="tr9 td59">
                                                                <p className="p0 ft15">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="tt1" style={{ marginLeft: "5px" }}>
                                                    <tr>
                                                        <th>
                                                            <p className="p19 ft16">
                                                                TIỀN SỬ DỊ ỨNG{" "}
                                                                <span className="ft8">(mô tả nếu có)</span>
                                                            </p>
                                                        </th>
                                                    </tr>
                                                    <tr
                                                        rowSpan={2}
                                                        style={{
                                                            height: "65px",
                                                            border: "1px solid black",
                                                        }}
                                                    >
                                                        <th
                                                            style={{
                                                                width: "245px",
                                                                border: "1px solid black",
                                                                textAlign: "center",
                                                                overflowWrap: "break-word",
                                                                font: "14px arial",
                                                            }}
                                                        >
                                                            {clinicalStatusDto
                                                                ? clinicalStatusDto.allergyHistory
                                                                    ? clinicalStatusDto.allergyHistory
                                                                    : ""
                                                                : ""}
                                                        </th>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    left: "570px",
                                                    top: "361px",
                                                    width: "154px",
                                                    height: "281px",
                                                    overflowWrap: "break",
                                                    font: "14px arial",
                                                }}
                                            >
                                                {clinicalStatusDto
                                                    ? clinicalStatusDto.descriptionComorbidities
                                                        ? clinicalStatusDto.descriptionComorbidities
                                                        : ""
                                                    : ""}
                                            </div>
                                            <div id="id1_3_2">
                                                <table cellPadding={0} cellSpacing={0} className="t3">
                                                    <tbody>
                                                        <tr>
                                                            <td className="tr6 td63">
                                                                <p className="p15 ft2">Bệnh mắc kèm</p>
                                                            </td>
                                                            <td className="tr6 td53">
                                                                <p className="p20 ft2">Có</p>
                                                            </td>
                                                            <td className="tr6 td64">
                                                                <p className="p20 ft2">Không</p>
                                                            </td>
                                                            <td className="tr6 td65">
                                                                <p className="p8 ft17">
                                                                    <span className="ft2">Mô tả </span>(nếu có)
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td66">
                                                                <p className="p15 ft7">HIV</p>
                                                            </td>
                                                            <td className="tr7 td56">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.hiv === true ? "✓" : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td67">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td68" rowSpan="5">
                                                                <p className="p0 ft6"></p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Thiếu máu</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.anemia === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Đái tháo đường</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.diabetes === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td71">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh thính giác</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.hearingDisease === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td71">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh thị giác</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.visionDisease === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td71">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh gan</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.liverDisease === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td71">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh thận</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.kidneyDisease === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr10 td69">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td59">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td70">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr9 td71">
                                                                <p className="p0 ft15">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh tim mạch</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.heartDiseaes === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr10 td69">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td59">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td70">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr9 td71">
                                                                <p className="p0 ft15">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Bệnh cơ xương khớp</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.musculoskeletalDisease ===
                                                                        true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td71">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Rối loạn tâm thần</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.psychosis === true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td71">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr7 td72">
                                                                <p className="p15 ft7">Khác</p>
                                                            </td>
                                                            <td className="tr7 td62">
                                                                <p className="p21 ft10">
                                                                    {clinicalStatusDto?.otherComorbidities ===
                                                                        true
                                                                        ? "✓"
                                                                        : ""}
                                                                </p>
                                                            </td>
                                                            <td className="tr7 td73">
                                                                <p className="p8 ft10"></p>
                                                            </td>
                                                            <td className="tr7 td71">
                                                                <p className="p0 ft6">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr8 td69">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td59">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td70">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                            <td className="tr8 td74">
                                                                <p className="p0 ft14">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="id1_4">
                                            <p className="p22 ft2">
                                                <span className="ft2">C.</span>
                                                <span className="ft19">
                                                    XÉT NGHIỆM TRƯỚC ĐIỀU TRỊ LAO{" "}
                                                </span>
                                                <span className="ft17">
                                                    (các xét nghiệm gần đây nhất)
                                                </span>
                                            </p>
                                            <table cellPadding={0} cellSpacing={0} className="t4">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td75" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p15 ft16">Tên xét nghiệm</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Đơn vị</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p23 ft16">Kết quả</p>
                                                        </td>
                                                        <td className="tr5 td77" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Ngày XN</p>
                                                        </td>
                                                        <td className="tr5 td77" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Bất</p>
                                                        </td>
                                                        <td className="tr0 td78" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p0 ft6">&nbsp;&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td79" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Tên xét nghiệm</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Đơn vị</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Kết quả</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Ngày XN</p>
                                                        </td>
                                                        <td className="tr5 td76" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">Bất</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr11 td80">
                                                            <p className="p18 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td81">
                                                            <p className="p18 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td82">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td83">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td83" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">tính</p>
                                                        </td>
                                                        <td className="tr11 td84">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td84">
                                                            <p className="p20 ft16">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td84" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">thường</p>
                                                        </td>
                                                        <td className="tr7 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td86">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td86" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">tính</p>
                                                        </td>
                                                        <td className="tr11 td84">
                                                            <p className="p20 ft16">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td84">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr11 td84" style={{ verticalAlign: "inherit" }}>
                                                            <p className="p20 ft16">thường</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td87">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[0].labTest
                                                                        ? patientLabtestResults[0].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[0].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[0].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[0].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[0].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[0].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[1].labTest
                                                                        ? patientLabtestResults[1].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[1].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[1].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[1].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[1].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[1].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr12 td89">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td colSpan={2} className="tr12 td90">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td91">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td70">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td70">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td78">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td92">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                        <td className="tr12 td59">
                                                            <p className="p0 ft20">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td87">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[2].labTest
                                                                        ? patientLabtestResults[2].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[2].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[2].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[2].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[2].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[2].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[3].labTest
                                                                        ? patientLabtestResults[3].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[3].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[3].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[3].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[3].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[3].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr13 td89">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td94">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td95">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td91">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td87">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[4].labTest
                                                                        ? patientLabtestResults[4].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[4].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[4].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[4].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[4].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[4].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[5].labTest
                                                                        ? patientLabtestResults[5].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[5].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[5].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[5].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[5].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[5].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr13 td89">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td94">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td95">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td91">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td87">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[6].labTest
                                                                        ? patientLabtestResults[6].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[6].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[6].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[6].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[6].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[6].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[7].labTest
                                                                        ? patientLabtestResults[7].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[7].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[7].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[7].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[7].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[7].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr13 td89">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td94">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td95">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td91">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr19 td98">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[8].labTest
                                                                        ? patientLabtestResults[8].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td3">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td99">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td100">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[8].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[8].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[8].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[8].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[8].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[9].labTest
                                                                        ? patientLabtestResults[9].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[9].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[9].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[9].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[9].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[9].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} className="tr13 td101">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td95">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td91">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} className="tr5 td96">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[10].labTest
                                                                        ? patientLabtestResults[10].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td99">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td100">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[10].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[10].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[10].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[10].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[10].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[11].labTest
                                                                        ? patientLabtestResults[11].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[11].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[11].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[11].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[11].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[11].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr13 td89">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td94">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td95">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td91">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr19 td98">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[12].labTest
                                                                        ? patientLabtestResults[12].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td3">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td99">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td100">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[12].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[12].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[12].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[12].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[12].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr19 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[13].labTest
                                                                        ? patientLabtestResults[13].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[13].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[13].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[13].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[13].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr19 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[13].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr13 td102">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td70">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td78">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td92">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                        <td className="tr13 td59">
                                                            <p className="p0 ft21">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="tr5 td87">
                                                            <p className="p15 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[14].labTest
                                                                        ? patientLabtestResults[14].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[14].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[14].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[14].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[14].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td73">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[14].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td78">
                                                            <p className="p0 ft6">&nbsp;</p>
                                                        </td>
                                                        <td className="tr5 td88">
                                                            <p className="p20 ft8">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[15].labTest
                                                                        ? patientLabtestResults[15].labTest.name
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[15].measure
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[15].numberResult
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[15].testedDate
                                                                        ? moment(
                                                                            patientLabtestResults[15].testedDate
                                                                        ).format("DD/MM/YYYY")
                                                                        : ""
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                        <td className="tr5 td62">
                                                            <p className="pCenter ">
                                                                {patientLabtestResults
                                                                    ? patientLabtestResults[15].isExtraordinary ? "✓"
                                                                        : "☐" : "☐"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr8 td89">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td94">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td95">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td91">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td70">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td70">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr10 td78">
                                                            <p className="p0 ft18">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td92">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                        <td className="tr8 td59">
                                                            <p className="p0 ft14">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="id1_5">
                                            <p className="p12 ft26">
                                                Có thể sử dụng nhiều MẪU 1 nếu bệnh nhân có nhiều thuốc
                                                dùng kèm hoặc nhiều biến cố Version 24/11/2017
                                            </p>
                                        </div>
                                    </div>
                                    <div id="page_2">
                                        <div id="id2_1">
                                            <div id="id2_1_1">
                                                <table class="GeneratedTable">
                                                    <tbody>
                                                        <tr>
                                                            <td>Khoảng QT (ms):</td>
                                                            <td
                                                                style={{ width: "150px", textAlign: "center" }}
                                                            >
                                                                {qtc}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Khoảng QTcF (ms):</td>
                                                            <td
                                                                style={{ width: "150px", textAlign: "center" }}
                                                            >
                                                                {qTcF}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nhịp tim:</td>
                                                            <td
                                                                style={{ width: "150px", textAlign: "center" }}
                                                            >
                                                                {heartbeat}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="id2_1_2">
                                                <table cellPadding={0} cellSpacing={0} className="t5">
                                                    <tbody>
                                                        <tr>
                                                            <td className="tr0 td103">
                                                                <p className="p26 ft8">Đo thính lực</p>
                                                            </td>
                                                            <td className="tr0 td104">
                                                                <p className="p23 ft8">
                                                                    Tai trái: {hearingLeft}
                                                                </p>
                                                            </td>
                                                            <td className="tr0 td105">
                                                                <p className="p0 ft8">
                                                                    Tai phải: {hearingRight}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr20 td106">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                            <td className="tr20 td107">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                            <td className="tr20 td108">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr21 td109">
                                                                <p className="p26 ft8">Đo thị lực</p>
                                                            </td>
                                                            <td className="tr21 td110">
                                                                <p className="p23 ft8">
                                                                    Mắt trái: {eyeSightLeft}
                                                                </p>
                                                            </td>
                                                            <td className="tr21 td111">
                                                                <p className="p0 ft8">
                                                                    Mắt phải: {eyeSightRight}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr20 td106">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                            <td className="tr20 td107">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                            <td className="tr20 td108">
                                                                <p className="p0 ft27">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr22 td109">
                                                                <p className="p26 ft8">Khác</p>
                                                            </td>
                                                            <td className="tr22 td110">
                                                                <p className="p26 ft8"> {otherTest}</p>
                                                            </td>
                                                            <td className="tr22 td111">
                                                                <p className="p26 ft8">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tr10 td106">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td107">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                            <td className="tr10 td108">
                                                                <p className="p0 ft18">&nbsp;</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="id2_2">
                                            <p className="p12 ft2">D. THUỐC ĐIỀU TRỊ LAO</p>
                                            <table cellPadding={0} cellSpacing={0} className="t6">
                                                <tbody>
                                                    <tr>
                                                        <td className="tr21 td112">
                                                            <p className="p27 ft2">Tên thuốc</p>
                                                        </td>
                                                        <td className="tr21 td113">
                                                            <p className="p20 ft2">Liều/ngày (đơn vị)</p>
                                                        </td>
                                                        <td className="tr21 td114">
                                                            <p className="p28 ft2">Ngày/tuần</p>
                                                        </td>
                                                        <td className="tr21 td115">
                                                            <p className="p18 ft2">Ngày bắt đầu</p>
                                                        </td>
                                                    </tr>
                                                    {this.state.tbDrugs != null ? (
                                                        this.state.tbDrugs?.map((item) => (
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="pCenter2 ft7">
                                                                        {item ? item.drug.name : ""}
                                                                    </p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="pCenter2 ft7">
                                                                        {item ? item.doseInDay : ""}
                                                                    </p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="pCenter2 ft7 ">
                                                                        {item ? item.dayInWeek : ""}
                                                                    </p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="pCenter2 ft7 ">
                                                                        {item
                                                                            ? item.startDate
                                                                                ? moment(item.startDate).format(
                                                                                    "DD/MM/YYYY"
                                                                                )
                                                                                : ""
                                                                            : ""}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td116">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td117">
                                                                    <p className="p0 ft7"></p>
                                                                </td>
                                                                <td className="tr21 td118">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                                <td className="tr21 td119">
                                                                    <p className="p0 ft7 "></p>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                            <p className="p29 ft2">
                                                E. TIỀN SỬ DÙNG THUỐC{" "}
                                                <span className="ft17">
                                                    (trong vòng 30 ngày gần đây){" "}
                                                </span>
                                                <span className="ft7">và </span>THUỐC DÙNG KÈM
                                            </p>

                                            <table cellPadding={0} cellSpacing={0} className="t7">
                                                <tbody>
                                                    <tr>
                                                        <td className="tr21 td124">
                                                            <p className="p30 ft7">
                                                                <span className="ft2">Thuốc </span>(tên thuốc,
                                                                liều dùng, đường dùng)
                                                            </p>
                                                        </td>
                                                        <td className="tr21 td125">
                                                            <p className="p31 ft2">Đang dùng</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tr10 td126">
                                                            <p className="p0 ft18">&nbsp;</p>
                                                        </td>
                                                        <td className="tr10 td127">
                                                            <p className="p0 ft18">&nbsp;</p>
                                                        </td>
                                                    </tr>
                                                    {this.state.drugHistories != null ? (
                                                        this.state.drugHistories?.map((item, index) => (
                                                            <>
                                                                <tr>
                                                                    <td className="tr11 td128">
                                                                        <p className="p0 ft7">
                                                                            {index + 1 + ". "}
                                                                            {item.drug.name
                                                                                ? item.drug.name
                                                                                : ""}, {item.dosage ? item.dosage : ""},{" "}
                                                                            {item.drugRoute ? item.drugRoute : ""}
                                                                        </p>
                                                                    </td>
                                                                    <td className="tr11 td129">
                                                                        <p className="p33 ">
                                                                            {item.inUsed === true ? "✓" : "☐"}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="tr23 td130">
                                                                        <p className="p0 ft28">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr23 td131">
                                                                        <p className="p0 ft28">&nbsp;</p>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <tr>
                                                                <td className="tr11 td128">
                                                                    <p className="p32 ft7">1.</p>
                                                                </td>
                                                                <td className="tr11 td129">
                                                                    <p className="p33 ft11">☐</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr23 td130">
                                                                    <p className="p0 ft28">&nbsp;</p>
                                                                </td>
                                                                <td className="tr23 td131">
                                                                    <p className="p0 ft28">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr11 td128">
                                                                    <p className="p32 ft7">2.</p>
                                                                </td>
                                                                <td className="tr11 td129">
                                                                    <p className="p33 ft11">☐</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr24 td130">
                                                                    <p className="p0 ft29">&nbsp;</p>
                                                                </td>
                                                                <td className="tr24 td131">
                                                                    <p className="p0 ft29">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr7 td128">
                                                                    <p className="p32 ft7">3.</p>
                                                                </td>
                                                                <td className="tr7 td129">
                                                                    <p className="p33 ft11">☐</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr24 td130">
                                                                    <p className="p0 ft29">&nbsp;</p>
                                                                </td>
                                                                <td className="tr24 td131">
                                                                    <p className="p0 ft29">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr11 td128">
                                                                    <p className="p32 ft7">4.</p>
                                                                </td>
                                                                <td className="tr11 td129">
                                                                    <p className="p33 ft11">☐</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr23 td130">
                                                                    <p className="p0 ft28">&nbsp;</p>
                                                                </td>
                                                                <td className="tr23 td131">
                                                                    <p className="p0 ft28">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr11 td128">
                                                                    <p className="p32 ft7">5.</p>
                                                                </td>
                                                                <td className="tr11 td129">
                                                                    <p className="p33 ft11">☐</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr17 td130">
                                                                    <p className="p0 ft24">&nbsp;</p>
                                                                </td>
                                                                <td className="tr17 td131">
                                                                    <p className="p0 ft24">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                            <p className="p34 ft2">
                                                <span className="ft2">F.</span>
                                                <span className="ft30">
                                                    CÁC BIẾN CỐ LIÊN QUAN ĐẾN SỨC KHỎE{" "}
                                                </span>
                                                <span className="ft17">
                                                    (trong vòng 30 ngày gần đây)
                                                </span>
                                            </p>
                                            <table cellPadding={0} cellSpacing={0} className="t8">
                                                <tbody>
                                                    <tr>
                                                        <td className="tr21 td132">
                                                            <p className="p35 ft2">Mô tả đặc điểm biến cố</p>
                                                        </td>
                                                        <td colSpan={7} className="tr21 td136">
                                                            <p className="p666 ft2">Thông tin về biến cố</p>
                                                        </td>
                                                    </tr>
                                                    {this.state.patientIncidents != null ? (
                                                        this.state.patientIncidents?.map((item, index) => (
                                                            <>
                                                                <tr>
                                                                    <td className="tr21 td137">
                                                                        <p className="p26 ft7">
                                                                            {index + 1 + ". "}
                                                                            {item.description ? item.description : ""}
                                                                        </p>
                                                                    </td>
                                                                    <td colSpan={7} className="tr21 td138">
                                                                        <div>
                                                                            <p className="p201 ft7">
                                                                                Biến cố còn tồn tại:{" "}
                                                                                <span className="ft10">
                                                                                    {item.stillInExistence === true
                                                                                        ? "✓"
                                                                                        : "☐"}
                                                                                </span>
                                                                                Có <span className="ft10">☐ </span>Không
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="p201 ft7">
                                                                                Ngày xuất hiện:{" "}
                                                                                {item.appearDate
                                                                                    ? moment(item.appearDate).format(
                                                                                        "DD/MM/YYYY"
                                                                                    )
                                                                                    : ""}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="tr191 td137">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr191 td139"></td>
                                                                    <td className="tr191 td140">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr191 td5">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr191 td141">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                    <td colSpan={2} className="tr191 td7">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr191 td142">
                                                                        <p className="p0 ft6">&nbsp;</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="tr20 td143">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td144">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td144">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td146">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td144">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td94">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td144">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                    <td className="tr20 td149">
                                                                        <p className="p0 ft27">&nbsp;</p>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <tr>
                                                                <td className="tr21 td137">
                                                                    <p className="p26 ft7">1.</p>
                                                                </td>
                                                                <td colSpan={7} className="tr21 td138">
                                                                    <p className="p20 ft7">
                                                                        Biến cố còn tồn tại:{" "}
                                                                        <span className="ft10">☐ </span>Có{" "}
                                                                        <span className="ft10">☐ </span>Không
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr19 td137">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                                <td className="tr19 td139">
                                                                    <p className="p20 ft7">Ngày xuất hiện:</p>
                                                                </td>
                                                                <td className="tr19 td140">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                                <td className="tr19 td5">
                                                                    <p className="p5 ft8">/</p>
                                                                </td>
                                                                <td className="tr19 td141">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                                <td colSpan={2} className="tr19 td7">
                                                                    <p className="p36 ft31">/</p>
                                                                </td>
                                                                <td className="tr19 td142">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr20 td143">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td144">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr25 td145">
                                                                    <p className="p0 ft32">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td146">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr25 td147">
                                                                    <p className="p0 ft32">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td94">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr25 td148">
                                                                    <p className="p0 ft32">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td149">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr21 td137">
                                                                    <p className="p26 ft33">2.</p>
                                                                </td>
                                                                <td colSpan={7} className="tr21 td138">
                                                                    <p className="p20 ft7">
                                                                        Biến cố còn tồn tại:{" "}
                                                                        <span className="ft10">☐ </span>Có{" "}
                                                                        <span className="ft10">☐ </span>Không
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr19 td137">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                                <td className="tr19 td139">
                                                                    <p className="p20 ft7">Ngày xuất hiện:</p>
                                                                </td>
                                                                <td colSpan={2} className="tr19 td150">
                                                                    <p className="p5 ft8">/</p>
                                                                </td>
                                                                <td colSpan={3} className="tr19 td151">
                                                                    <p className="p36 ft8">/</p>
                                                                </td>
                                                                <td className="tr19 td142">
                                                                    <p className="p0 ft6">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="tr12 td143">
                                                                    <p className="p0 ft20">&nbsp;</p>
                                                                </td>
                                                                <td className="tr12 td144">
                                                                    <p className="p0 ft20">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td145">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr12 td146">
                                                                    <p className="p0 ft20">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td147">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr12 td94">
                                                                    <p className="p0 ft20">&nbsp;</p>
                                                                </td>
                                                                <td className="tr20 td148">
                                                                    <p className="p0 ft27">&nbsp;</p>
                                                                </td>
                                                                <td className="tr12 td149">
                                                                    <p className="p0 ft20">&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="id2_2">
                                            <table
                                                style={{
                                                    width: "723px",
                                                    height: "100px",
                                                    marginLeft: "6px",
                                                    marginRight: "auto",
                                                    borderCollapse: "collapse",
                                                    border: "1px solid black",
                                                }}
                                            >
                                                <tr style={{ height: "9px" }}>
                                                    <td
                                                        style={{
                                                            width: "12.1384%",
                                                            height: "30px",
                                                            border: "1px solid black",
                                                        }}
                                                        colSpan={2}
                                                        rowSpan={2}
                                                    >
                                                        &nbsp; &nbsp;Ngày báo cáo
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "12.3967%",
                                                            height: "30px",
                                                            border: "1px solid black",
                                                            textAlign: "center",
                                                        }}
                                                        colSpan={2}
                                                        rowSpan={2}
                                                    >
                                                        <p className="p377 ">
                                                            {dateReport
                                                                ? moment(dateReport).format("DD/MM/YYYY")
                                                                : "___/___/___"}
                                                        </p>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "12.3967%",
                                                            height: "30px",
                                                            border: "1px solid black",
                                                        }}
                                                        colSpan={2}
                                                        rowSpan={2}
                                                    >
                                                        <p>&nbsp; &nbsp; &nbsp; &nbsp; Người báo cáo</p>
                                                        <p>&nbsp; &nbsp; &nbsp; (ký ghi rõ họ tên)</p>
                                                    </td>
                                                    <td
                                                        style={{ width: "12.3967%", height: "9px" }}
                                                        colSpan={2}
                                                    >
                                                        <p
                                                            className="p377 ft121"
                                                            style={{ textAlign: "center" }}
                                                        >
                                                            {reportBy ? reportBy : ""}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr
                                                    style={{ height: "21px", border: "1px solid black" }}
                                                >
                                                    <td
                                                        style={{ width: "12.3967%", height: "21px" }}
                                                        colSpan={2}
                                                    >
                                                        &nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                            </table>
                                            {/* <div id="id2_3_1">
              <p className="p12 ft34">Ngày báo cáo</p>
            </div>
            <div id="id2_3_2">
              <p className="p12 ft34">{dateReport?moment(dateReport).format("DD/MM/YYYY"):""}</p>
            </div>
            <div id="id2_3_3">
              <p className="p37 ft34">Người báo cáo: {reportBy?reportBy:""}</p>
              <p className="p14 ft17">(ký và ghi rõ họ tên)</p>
            </div> */}
                                        </div>
                                        <div id="id2_4" style={{ position: "fix", bottom: "0px" }}>
                                            <p className="p12 ft26">
                                                Có thể sử dụng nhiều MẪU 1 nếu bệnh nhân có nhiều thuốc
                                                dùng kèm hoặc nhiều biến cố Version 24/11/2017
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex flex-space-between flex-middle">
                            <Button
                                variant="contained"
                                color="secondary"
                                className="mr-12"
                                onClick={() => this.props.handleClose()}
                            >
                                {t("Huỷ")}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mr-16"
                                type="submit"
                            >
                                {t("In")}
                            </Button>
                        </div>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

// export default AssetTransferPrint;
