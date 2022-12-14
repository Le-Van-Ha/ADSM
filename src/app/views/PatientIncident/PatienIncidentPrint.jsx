import React, { Component } from "react";
import {
    Dialog,
    Button,
    Grid,
    IconButton,
    Icon,
    DialogActions,
} from "@material-ui/core";
import ConstantList from "../../appConfig";
import { ValidatorForm } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import { getById as getPatientById } from "../Patient/PatientService";
import { searchByPage as getDrugs } from "../Drugs/DrugsService";
import { getById } from "./PatientIncidentService";
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

export default class AssetTransferPrint extends Component {
    state = {
        //listPatientIncident: [],
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
        let { location } = this.props;
        if (location && location.state && location.state.readOnly) {
            this.setState({ readOnly: location.state.readOnly });
        }
        let { parentId, id } = this.props;

        if (id != null) {
            getById(id).then(({ data }) => {
                this.setState({ ...data }, () => {
                    getPatientById(parentId).then(({ data }) => {
                        this.setState({ patient: data });
                        this.setState({ didMountComplete: true });
                    });
                });
            });
        } else {
            getPatientById(parentId).then(({ data }) => {
                this.setState({ patient: data });
                this.setState({ didMountComplete: true });
            });
        }

        var searchObject = {};
        searchObject.pageIndex = 1;
        searchObject.pageSize = 10000;
        getDrugs(searchObject).then(({ data }) => {
            this.setState({ listDrugs: [...data.content] });
        });
        getLabTests(searchObject).then(({ data }) => {
            this.setState({ listLabTest: [...data.content] });
        });

        document.addEventListener("keydown", this.escFunction, false);
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    };

    render() {
        let { open, t, item } = this.props;
        let { patient } = this.state;
        let length = null;
        if (item.patientIncidentLabtests?.length === 1) {
            length = 1;
        }
        if (item.patientIncidentLabtests?.length === 2) {
            length = 2;
        }
        if (item.patientIncidentLabtests?.length === 3) {
            length = 3;
        }
        if (item.patientIncidentLabtests?.length === 4) {
            length = 4;
        }
        if (item.patientIncidentLabtests === null) {
            length = "isNull";
        }

        return (
            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                maxWidth="md"
                fullWidth
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
                    style={{ minHeight: 2180 }}
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
                                            "\n<!--\nspan.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_004{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_021{font-family:Arial,serif;font-size:11.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_021{font-family:Arial,serif;font-size:11.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_013{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_025{font-family:Arial,serif;font-size:10.1px;color:rgb(63,63,170);font-weight:bold;font-style:normal;text-decoration: underline}\ndiv.cls_025{font-family:Arial,serif;font-size:10.1px;color:rgb(63,63,170);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(63,63,170);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(63,63,170);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(63,63,170);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:8.6px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Arial,serif;font-size:8.6px;color:rgb(63,63,170);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_015{font-family:Arial,serif;font-size:10.1px;color:rgb(255,255,255);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_015{font-family:Arial,serif;font-size:10.1px;color:rgb(255,255,255);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_017{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_017{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_018{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_018{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_026{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: underline}\ndiv.cls_026{font-family:Arial,serif;font-size:9.1px;color:rgb(4,4,4);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_022{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_022{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_023{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_023{font-family:Arial,serif;font-size:10.1px;color:rgb(4,4,4);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_024{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_024{font-family:Arial,serif;font-size:8.0px;color:rgb(4,4,4);font-weight:bold;font-style:normal;text-decoration: none}\n-->\n",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        marginLeft: "-434px",
                                        top: "20px",
                                        width: "866px",
                                        height: "1050px",
                                        borderStyle: "outset",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{ position: "absolute", left: "0px", top: "0px" }}
                                    ></div>
                                    <img
                                        style={{ position: "absolute", zIndex: -9 }}
                                        src={
                                            ConstantList.ROOT_PATH +
                                            "assets/images/background/background1.jpg"
                                        }
                                        width={841}
                                        height={819}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "37.24px",
                                            top: "13.21px",
                                        }}
                                        className="cls_002"
                                    >
                                        <span className="cls_002">
                                            C?? th??? s??? d???ng nhi???u M???U 2 n???u b???nh nh??n g???p nhi???u lo???i
                                            bi???n c??? kh??c nhau
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "732.21px",
                                            top: "13.21px",
                                        }}
                                        className="cls_002"
                                    >
                                        <span className="cls_002">Version: 09.2020</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "183.41px",
                                            top: "40.48px",
                                        }}
                                        className="cls_004"
                                    >
                                        <span className="cls_004">
                                            B??O C??O BI???N C??? B???T L???I TRONG ??I???U TR??? MDR-TB
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "49.68px",
                                            top: "41.79px",
                                        }}
                                        className="cls_021"
                                    >
                                        <span className="cls_021">M???U 2</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "254.67px",
                                            top: "54.42px",
                                        }}
                                        className="cls_005"
                                    >
                                        <span className="cls_005">
                                            ??p d???ng trong ho???t ?????ng aDSM
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "638.64px",
                                            top: "62.07px",
                                        }}
                                        className="cls_012"
                                    >
                                        <span className="cls_012">N??i b??o c??o:</span>
                                        <span className="cls_013">?????????????????????????????????????????????</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "47.16px",
                                            top: "66.63px",
                                        }}
                                        className="cls_025"
                                    >
                                        <span className="cls_025">C??c tr?????ng h???p C???N B??O C??O:</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "43.73px",
                                            top: "81.36px",
                                        }}
                                        className="cls_008"
                                    >
                                        <span className="cls_008">
                                            ??? B???nh nh??n g???p b???t k??? tri???u ch???ng l??m s??ng b???t th?????ng
                                            (thay ?????i so v???i ban ?????u) v??/ho???c gi?? tr??? x??t nghi???m n???m
                                            ngo??i gi???i h???n b??nh th?????ng
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "52.73px",
                                            top: "94.20px",
                                        }}
                                        className="cls_008"
                                    >
                                        <span className="cls_008">
                                            thu???c M???T trong c??c bi???n c??? sau:
                                        </span>
                                        <span className="cls_009">
                                            {" "}
                                            (1) K??o d??i kho???ng QT; (2) ?????c t??nh tr??n th???n; (3) M???t
                                            th??nh l???c; (4) Thay ?????i th??? gi??c; (5) B???nh l?? th???n
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "52.73px",
                                            top: "106.03px",
                                        }}
                                        className="cls_009"
                                    >
                                        <span className="cls_009">
                                            kinh ngo???i bi??n; (6) B???t th?????ng v??? huy???t h???c{" "}
                                        </span>
                                        <span className="cls_010">
                                            (gi???m b???ch c???u, gi???m ti???u c???u, thi???u m??u, b???t s???n h???ng
                                            c???u, b???t th?????ng ????ng m??u v?? b???ch c???u ??i toan)
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "638.94px",
                                            top: "106.17px",
                                        }}
                                        className="cls_012"
                                    >
                                        <span className="cls_012">M?? s??? b??o c??o </span>
                                        <span className="cls_014">
                                            (do Trung t??m DI &amp; ADR Qu???c gia
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "43.74px",
                                            top: "119.56px",
                                        }}
                                        className="cls_011"
                                    >
                                        <span className="cls_011">???</span>
                                        <span className="cls_008">
                                            {" "}
                                            HO???C b???t k??? bi???n c??? thu???c lo???i nghi??m tr???ng (SAE) l?? bi???n
                                            c??? g??y ra M???T trong c??c h???u qu??? sau:{" "}
                                        </span>
                                        <span className="cls_009">
                                            (1) T??? vong; (2) ??e d???a t??nh m???ng;
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "638.94px",
                                            top: "122.08px",
                                        }}
                                        className="cls_014"
                                    >
                                        <span className="cls_014">qu???n l??):</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "51.39px",
                                            top: "131.91px",
                                        }}
                                        className="cls_009"
                                    >
                                        <span className="cls_009">
                                            (3) Nh???p vi???n ho???c k??o d??i th???i gian n???m vi???n; (4) T??n t???t
                                            v??nh vi???n/n???ng n??? ho???c (5) D??? t???t thai nhi;
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "638.94px",
                                            top: "137.97px",
                                        }}
                                        className="cls_013"
                                    >
                                        <span className="cls_013">????????????????????????????????????????????????????????????..</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "43.74px",
                                            top: "144.86px",
                                        }}
                                        className="cls_011"
                                    >
                                        <span className="cls_011">???</span>
                                        <span className="cls_008">
                                            {" "}
                                            HO???C b???t k??? bi???n c??? n??o d???n ?????n{" "}
                                        </span>
                                        <span className="cls_009">
                                            Thay ?????i ph??c ????? ??i???u tr??? lao{" "}
                                        </span>
                                        <span className="cls_010">
                                            (ng???ng thu???c, ?????i thu???c, gi???m li???u)
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "44.64px",
                                            top: "157.12px",
                                        }}
                                        className="cls_015"
                                    >
                                        <span className="cls_015">A. TH??NG TIN V??? B???NH NH??N</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "492.54px",
                                            top: "171.16px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            Ng??y sinh:
                                            {`${patient?.birthDate
                                                    ? moment(patient.birthDate).format("DD/MM/YYYY")
                                                    : ""
                                                }`}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "638.64px",
                                            top: "171.16px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">Gi???i t??nh:</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "726.42px",
                                            top: "171.16px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">C??n n???ng: {patient?.weight}</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "808.49px",
                                            top: "171.16px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">kg</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "44.64px",
                                            top: "176.38px",
                                        }}
                                        className="cls_016"
                                    >
                                        <span className="cls_016">
                                            H??? v?? t??n b???nh nh??n: {patient?.displayName}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "258.65px",
                                            top: "176.38px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            M?? s??? BN:{" "}
                                            {item.patient.patientCode
                                                ? item.patient.patientCode
                                                : "??????????????????"}
                                            . S??? eTB:
                                            {item.patient.eTBCode ? (
                                                item.patient.eTBCode
                                            ) : (
                                                <span>.........</span>
                                            )}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "492.54px",
                                            top: "183.52px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">Ho???c tu???i: </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "651.18px",
                                            top: "183.52px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.patient.gender === "F" ? "" : "Nam"}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "692.70px",
                                            top: "183.52px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.patient.gender === "F" ? "N???" : ""}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "726.42px",
                                            top: "183.52px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">Chi???u cao:{patient?.height}</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "805.98px",
                                            top: "183.52px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">cm</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "44.64px",
                                            top: "194.32px",
                                        }}
                                        className="cls_015"
                                    >
                                        <span className="cls_015">
                                            B. TH??NG TIN V??? BI???N C??? B???T L???I
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "44.64px",
                                            top: "206.32px",
                                        }}
                                        className="cls_018"
                                    >
                                        <span className="cls_018">M?? t??? ?????c ??i???m bi???n c???</span>
                                        <span className="cls_019">
                                            {" "}
                                            (bao g???m c??c x??t nghi???m c?? li??n quan, n???u c??)
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "44.64px",
                                            top: "246.32px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span
                                            className="cls_017"
                                            style={{
                                                display: "block",
                                                width: "80%",
                                                lineHeight: "15px",
                                            }}
                                        >
                                            {item.description}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "212.30px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">Ng??y xu???t hi???n bi???n c???</span>
                                        <span className="cls_017"></span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "483.65px",
                                            top: "212.30px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">{`${moment(
                                            item.appearDate
                                        ).format("DD/MM/YYYY")}`}</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "578.70px",
                                            top: "212.30px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">
                                            Ng??y h???i ph???c bi???n c??? (n???u c??)
                                        </span>
                                        <span className="cls_017"> ???</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "733.72px",
                                            top: "212.30px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.recoveryDay
                                                ? moment(item.recoveryDay).format("DD/MM/YYYY")
                                                : ""}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "228.70px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">
                                            M???C ????? NGHI??M TR???NG C???A BI???N C???
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "239.56px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityDead ? "???" : "???"} T??? vong
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.62px",
                                            top: "239.56px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityLifeThreatening ? "???" : "???"} ??e d???a t??nh
                                            m???ng
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "251.50px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityHospitalizationOrExtensionOfHospitalStay
                                                ? "???"
                                                : "???"}{" "}
                                            Nh???p vi???n/k??o d??i th???i gian n???m vi???n
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.62px",
                                            top: "251.50px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityPermanentOrSeverelyBurdensome ? "???" : "???"}{" "}
                                            T??n t???t v??nh vi???n/n???ng n???
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.12px",
                                            top: "263.38px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityChangeTBTreatmentRegimen ? "???" : "???"} Thay
                                            ?????i ph??c ????? ??i???u tr??? lao
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.61px",
                                            top: "263.38px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityFetalMalformation ? "???" : "???"} D??? t???t thai
                                            nhi
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "276.94px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.severityOther ? "???" : "???"} Kh??c{" "}
                                        </span>
                                        <span className="cls_019">(C??? th???:</span>
                                        <span className="cls_017">
                                            {" "}
                                            {item.severityInstrument
                                                ? item.severityInstrument
                                                : "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"}
                                            )
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "292.30px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">M???C ????? N???NG C???A BI???N C???</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "307.24px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.seriousLevel === "lv1" ? "???" : "???"} ????? 1
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "503.70px",
                                            top: "307.24px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.seriousLevel === "lv2" ? "???" : "???"} ????? 2
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "625.74px",
                                            top: "307.24px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.seriousLevel === "lv3" ? "???" : "???"} ????? 3
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "747.72px",
                                            top: "307.24px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.seriousLevel === "lv4" ? "???" : "???"} ????? 4
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "322.60px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">C??CH X??? TR?? BI???N C???</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.15px",
                                            top: "334.54px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingStoppingDrug ? "???" : "???"} T???m ng???ng
                                            thu???c
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "508.26px",
                                            top: "334.54px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingStopDrug ? "???" : "???"} Ng???ng thu???c
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.13px",
                                            top: "349.42px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingReduceDose ? "???" : "???"} Gi???m li???u
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "507.71px",
                                            top: "349.42px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingOther ? "???" : "???"} ?????i thu???c lao
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.13px",
                                            top: "364.36px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingSymptomaticTreatment ? "???" : "???"}{" "}
                                            ??i???u tr??? tri???u ch???ng
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "508.73px",
                                            top: "364.36px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.incidentHandlingOther ? "???" : "???"} X??? tr?? kh??c
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.12px",
                                            top: "382.27px",
                                        }}
                                        className="cls_019"
                                    >
                                        <span className="cls_019">Ghi chi ti???t c??ch x??? tr??: </span>
                                        <span className="cls_017">
                                            {item.incidentHandlingDetails}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "400.12px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017"></span>
                                    </div>

                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "442.06px",
                                        }}
                                        className="cls_020"
                                    >
                                        <span className="cls_020">K???T QU??? SAU X??? TR?? BI???N C???</span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.14px",
                                            top: "460.00px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.result === "result3" ? "???" : "???"} H???i ph???c kh??ng c??
                                            di ch???ng
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.58px",
                                            top: "460.00px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.result === "result4" ? "???" : "???"} H???i ph???c c?? di
                                            ch???ng, c??? th???:
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.58px",
                                            top: "471.94px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.recoveryHaveSequelaeDetails}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.13px",
                                            top: "474.94px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.result === "result2" ? "???" : "???"} ??ang h???i ph???c
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.58px",
                                            top: "486.82px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017"></span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.12px",
                                            top: "489.82px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.result === "result1" ? "???" : "???"} Ch??a h???i ph???c
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "577.58px",
                                            top: "501.76px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.dayOfDeath ? "???" : "???"} T??? vong (Ng??y t??? vong:
                                            {item.dayOfDeath
                                                ? moment(item.dayOfDeath).format("DD/MM/YYYY")
                                                : ""}
                                            )
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "364.11px",
                                            top: "504.76px",
                                        }}
                                        className="cls_017"
                                    >
                                        <span className="cls_017">
                                            {item.result === "UNKNOWN" ? "???" : "???"} Kh??ng r??
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            border: "1px solid #868686",
                                            minHeight: "130px",
                                            width: "787px",
                                            display: "flex",
                                            position: "relative",
                                            left: "38.38px",
                                            top: "438.18px",
                                        }}
                                    >
                                        <div style={{ width: "318px" }}>
                                            <table
                                                style={{
                                                    position: "relative",
                                                    borderCollapse: "collapse",
                                                    left: "-1px",
                                                }}
                                            >
                                                <tr
                                                    style={{
                                                        display: "flex",
                                                        borderBottom: "1px solid  #868686",
                                                        width: "319px",
                                                    }}
                                                >
                                                    <td
                                                        style={{
                                                            width: "76.2px",
                                                            borderRight: "1px solid  #868686",
                                                            whiteSpace: "normal",
                                                            overflowWrap: "break-word",
                                                        }}
                                                        className="cls_019"
                                                    >
                                                        <span className="cls_019">
                                                            <span className="cls_019">T??n x??t nghi???m</span>{" "}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "44px",
                                                            borderRight: "1px solid  #868686",
                                                            whiteSpace: "normal",
                                                            overflowWrap: "break-word",
                                                        }}
                                                        className="cls_019"
                                                    >
                                                        <span className="cls_019">
                                                            <span className="cls_019">????n v???</span>
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "75.5px",
                                                            borderRight: "1px solid  #868686",
                                                            whiteSpace: "normal",
                                                            overflowWrap: "break-word",
                                                        }}
                                                        className="cls_019"
                                                    >
                                                        <span className="cls_019">
                                                            <span className="cls_019">GT b??nh th?????ng</span>
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "63px",
                                                            borderRight: "1px solid  #868686",
                                                            whiteSpace: "normal",
                                                            overflowWrap: "break-word",
                                                        }}
                                                        className="cls_019"
                                                    >
                                                        <span className="cls_019">
                                                            <span className="cls_019">K???t qu??? XN</span>
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "61px",
                                                            borderRight: "1px solid  #868686",
                                                            whiteSpace: "normal",
                                                            overflowWrap: "break-word",
                                                        }}
                                                        className="cls_019"
                                                    >
                                                        <span className="cls_019">
                                                            <span className="cls_019">Ng??y XN</span>
                                                        </span>
                                                    </td>
                                                </tr>
                                                {length === "isNull" && (
                                                    <tr
                                                        style={{
                                                            display: "flex",
                                                            borderBottom: "1px solid  #868686",
                                                            width: "319px",
                                                        }}
                                                    >
                                                        <td
                                                            style={{
                                                                width: "76.2px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                                minHeight: "130px",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                <span className="cls_019"></span>{" "}
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "44px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                <span className="cls_019"></span>
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "75.5px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                <span className="cls_019"></span>
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "63px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                <span className="cls_019"></span>
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "61px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                <span className="cls_019"></span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )}
                                                {item.patientIncidentLabtests?.map((item) => (
                                                    <tr style={{ display: "flex", width: "319px" }}>
                                                        <td
                                                            style={{
                                                                width: "76.2px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                                minHeight: `${length ? 130 / length : 1}px`,
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                {" "}
                                                                <span style={{ fontSize: "10px" }}>
                                                                    {item.labTest.name}
                                                                </span>{" "}
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "44px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">{item.labName}</span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "75.5px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                {item.normalResult}
                                                            </span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "63px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">{item.result}</span>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: "61px",
                                                                borderRight: "1px solid  #868686",
                                                                whiteSpace: "normal",
                                                                overflowWrap: "break-word",
                                                            }}
                                                            className="cls_019"
                                                        >
                                                            <span className="cls_019">
                                                                {item.testDate
                                                                    ? moment(item.testDate).format("DD/MM/YYYY")
                                                                    : ""}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                        <div style={{ borderLeft: "1px solid  #868686 " }}></div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        marginLeft: "-434px",
                                        top: "1070px",
                                        width: "866px",
                                        height: "1050px",
                                        borderStyle: "outset",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{ position: "absolute", left: "0px", top: "0px" }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "37.24px",
                                            top: "13.21px",
                                        }}
                                        className="cls_002"
                                    >
                                        <span className="cls_002">
                                            C?? th??? s??? d???ng nhi???u M???U 2 n???u b???nh nh??n g???p nhi???u lo???i
                                            bi???n c??? kh??c nhau
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "732.21px",
                                            top: "13.21px",
                                        }}
                                        className="cls_002"
                                    >
                                        <span className="cls_002">Version: 09.2020</span>
                                    </div>
                                    <table
                                        style={{
                                            border: "1px solid black",
                                            borderCollapse: "collapse",
                                            position: "relative",
                                            left: "39.38px",
                                            top: "49.2px",
                                            width: "782px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <th
                                                    colSpan={8}
                                                    style={{
                                                        border: "1px solid black",
                                                        backgroundColor: "black",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020" style={{ color: "white" }}>
                                                        C. TH??NG TIN V??? THU???C NGHI NG??? G??Y BI???N C???
                                                    </span>{" "}
                                                </th>
                                                <th
                                                    colSpan={4}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_016">????nh d???u</span>
                                                    <span className="cls_020">
                                                        {" "}
                                                        (X) = C??, (O) = Kh??ng
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020"></span>TT
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Thu???c nghi ng??? (t??n g???c v??/ho???c t??n th????ng m???i)
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        D???ng b??o ch???, h??m l?????ng
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">Li???u d??ng (????n v???)</span>{" "}
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">S??? l???n d??ng</span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">???????ng d??ng</span>
                                                </td>
                                                <td
                                                    colSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Ng??y ??i???u tr??? (ghi ng??y/th??ng/n??m)
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        C?? ng???ng/gi???m li???u thu???c nghi ng????
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Ph???n ???ng c?? c???i thi???n khi ng???ng/gi???m li???u thu???c?
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        C?? t??i s??? d???ng thu???c nghi ng????
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Ph???n ???ng c?? l???p l???i khi t??i s??? d???ng thu???c nghi ng????
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020">B???t ?????u</span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">K???t th??c</span>
                                                </td>
                                            </tr>
                                            {item.listSuspectIncidentDrugDto?.map((item, index) => (
                                                <tr>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{index + 1}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">
                                                            {item.drug.name ? item.drug.name : ""}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{item.content}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{item.dose}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{item.numberOfUse}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{item.drugRoute}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{`${item.startDate
                                                                ? moment(item.startDate).format("DD/MM/YYYY")
                                                                : ""
                                                            }`}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">{`${item.endDate
                                                                ? moment(item.endDate).format("DD/MM/YYYY")
                                                                : ""
                                                            }`}</span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            textAlign: "center",
                                                        }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">
                                                            {item.hasReduce === true ? "X" : "O"}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            textAlign: "center",
                                                        }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">
                                                            {item.hasImprove === true ? "X" : "O"}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            textAlign: "center",
                                                        }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">
                                                            {item.reTakeSuspecDrug === true ? "X" : "O"}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid black",
                                                            textAlign: "center",
                                                        }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_020">
                                                            {item.repeatDrugReaction === true ? "X" : "O"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        {item.listSuspectIncidentDrugDto
                                                            ? item.listSuspectIncidentDrugDto.length + 1
                                                            : 1}
                                                    </span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style={{
                                            border: "1px solid black",
                                            borderCollapse: "collapse",
                                            position: "relative",
                                            left: "39.38px",
                                            top: "49.2px",
                                            width: "782px",
                                            marginTop: "40px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <th
                                                    colSpan={8}
                                                    style={{
                                                        border: "1px solid black",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        <span className="cls_018">
                                                            C??c thu???c d??ng ?????ng th???i
                                                        </span>
                                                        <span className="cls_022"> (</span>
                                                        <span className="cls_023">
                                                            Tr?????c khi x???y ra bi???n c???
                                                        </span>
                                                        <span className="cls_022">)</span>
                                                    </span>{" "}
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020">T??n thu???c (h??m l?????ng)</span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">Li???u d??ng, ???????ng d??ng</span>
                                                </td>
                                                <td
                                                    colSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Ng??y ??i???u tr??? (ghi ng??y/th??ng/n??m)
                                                    </span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020">T??n thu???c (h??m l?????ng)</span>
                                                </td>
                                                <td
                                                    rowSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">Li???u d??ng, ???????ng d??ng</span>
                                                </td>
                                                <td
                                                    colSpan={2}
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        Ng??y ??i???u tr??? (ghi ng??y/th??ng/n??m)
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020">B???t ?????u</span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">K???t th??c</span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    {" "}
                                                    <span className="cls_020">B???t ?????u</span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">K???t th??c</span>
                                                </td>
                                            </tr>
                                            {item.listCombinationDrugDto?.map((item) => (
                                                <tr>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024">{`${item.drug.name ? item.drug.name : ""
                                                            }(${item.drug.drugContent ? item.drug.drugContent : ""
                                                            })`}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024">{` ${item.dose ? item.dose : ""
                                                            } , ${item.drugRoute ? item.drugRoute : ""}`}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024">{`${item.startDate
                                                                ? moment(item.startDate).format("DD/MM/YYYY")
                                                                : ""
                                                            }`}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024">{`${item.endDate
                                                                ? moment(item.endDate).format("DD/MM/YYYY")
                                                                : ""
                                                            }`}</span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024"></span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024"></span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024"></span>
                                                    </td>
                                                    <td
                                                        style={{ border: "1px solid black" }}
                                                        className="cls_020"
                                                    >
                                                        <span className="cls_024"></span>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr style={{ height: "21px" }}>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                                <td
                                                    style={{ border: "1px solid black" }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_024"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table
                                        style={{
                                            border: "1px solid black",
                                            borderCollapse: "collapse",
                                            position: "relative",
                                            left: "39.38px",
                                            top: "49.2px",
                                            width: "782px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020">
                                                        <span className="cls_018">
                                                            {" "}
                                                            <span className="cls_018">
                                                                B??nh lu???n, ????nh gi?? c???a c??n b??? y t???
                                                            </span>
                                                            <span className="cls_022"> (</span>
                                                            <span className="cls_023">
                                                                Th??ng tin b??? sung c?? li??n quan ?????n bi???n c????
                                                            </span>
                                                            <span className="cls_022"> </span>
                                                            <span className="cls_023">
                                                                Anh/ch??? ngh?? ?????n bi???n c??? x???y ra do thu???c n??o? C??
                                                                s??? c?? ti???n h??nh gi???i m???n c???m ho???c s???
                                                            </span>
                                                            <span className="cls_023">
                                                                d???ng l???i thu???c nghi ng??? v???i li???u th???p h??n kh??ng?
                                                                Sau x??? tr?? bi???n c???, b???nh nh??n ???????c ??i???u tr??? b???ng
                                                                ph??c ????? lao n??o? v.v..)
                                                            </span>
                                                            <span className="cls_022">:</span>
                                                        </span>
                                                        <span className="cls_022"> (</span>
                                                        <span className="cls_023">
                                                            Tr?????c khi x???y ra bi???n c???
                                                        </span>
                                                        <span className="cls_022">)</span>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <div style={{ minHeight: "70px" }}>
                                                        <p>{item.doctorNote}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table
                                        style={{
                                            border: "1px solid black",
                                            borderTop: "none",
                                            borderCollapse: "collapse",
                                            position: "relative",
                                            left: "39.38px",
                                            top: "49.2px",
                                            width: "782px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <th
                                                    colSpan={3}
                                                    style={{
                                                        border: "1px solid black",
                                                        backgroundColor: "black",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_020" style={{ color: "white" }}>
                                                        D. TH??NG TIN V??? NG?????I B??O C??O
                                                    </span>{" "}
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                        height: "65px",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "58.56px",
                                                            top: "34px",
                                                        }}
                                                        className="cls_017"
                                                    >
                                                        <span className="cls_017">
                                                            H??? v?? t??n:{item.reportBy}
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "436.56px",
                                                            top: "34px",
                                                        }}
                                                        className="cls_017"
                                                    >
                                                        <span className="cls_017">
                                                            Ngh??? nghi???p/Ch???c v???:{item.reporterTitle}
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "58.54px",
                                                            top: "57px",
                                                        }}
                                                        className="cls_017"
                                                    >
                                                        <span className="cls_017">
                                                            ??i???n tho???i li??n l???c:{item.reporterPhoneNumber}
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "438.58px",
                                                            top: "57px",
                                                        }}
                                                        className="cls_017"
                                                    >
                                                        <span className="cls_017">
                                                            Email:{item.reporterEmail}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                        width: "250px",
                                                        height: "40px",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_017">Ch??? k??</span>
                                                </td>
                                                <td
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_013">20</span>
                                                    <span className="cls_022">.</span>
                                                    <span className="cls_017">
                                                        {" "}
                                                        D???ng b??o c??o: {item.reportType}
                                                    </span>
                                                    <span className="cls_017">
                                                        (l???n th???:{item.reportSeq})
                                                    </span>
                                                </td>
                                                <td
                                                    style={{
                                                        border: "1px solid black",
                                                        borderTop: "none",
                                                        textAlign: "left",
                                                    }}
                                                    className="cls_020"
                                                >
                                                    <span className="cls_017">
                                                        Ng??y b??o c??o:
                                                        {item.reportDate
                                                            ? moment(item.reportDate).format("DD/MM/YYYY")
                                                            : ""}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                {t("Hu???")}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mr-32"
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
