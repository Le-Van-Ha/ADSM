import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConstantList from "../../appConfig";
import PatientForm from "./PatientForm";
import "styles/globitsStyles.css";
import {
    addNew,
    update,
    searchByPageDrug,
    getById,
    checkCode,
} from "./PatientService";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import Const from "./Const";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
    //etc you get the idea
});

class Create extends React.Component {
    state = {
        name: "",
        code: "",
        description: "",
        isRegisteredAddress: false,
        ethnics: {},
        history: null,
        syncAddress: false,
        adding: false,
        readOnly: false,
        isResetForm: true,
    };

    componentDidMount() {
        let { t, location } = this.props;
        if (location && location.state && location.state.readOnly) {
            this.setState({ readOnly: location.state.readOnly });
        }
        if (location && location.state && location.state.isResetForm) {
            this.setState({ isResetForm: location.state.isResetForm });
        }
        let id = this.props.match.params.id;
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
    }

    handleClose(history, pageIndex, pageSize) {
        history.push(ConstantList.ROOT_PATH + Const.url + "list");
    }

    handleFormSubmit = (values) => {
        let { t, history } = this.props;
        let obj = {};
        let id = this.props.match.params.id;
        if (id) {
            obj.id = id;
        }
        this.setState({
            adding: true,
        });
        obj.displayName = values.displayName;
        obj.patientCode = values.patientCode;
        obj.eTBCode = values.eTBCode;
        obj.height = values.height;
        obj.weight = values.weight;
        obj.lungDamage = values.lungDamage;
        obj.outOfLungDamage = values.outOfLungDamage;
        obj.bothDamage = values.bothDamage;
        obj.unknown = values.unknown;
        obj.gender = values.gender;
        obj.birthDate = values.birthDate;
        obj.classify = values.classify;
        obj.otherClassify = values.otherClassify;
        obj.oldOrg = values.oldOrg;
        obj.clinicalStatusDto = values.clinicalStatusDto;
        obj.drugHistories = values.drugHistories;
        obj.tbDrugs = values.tbDrugs;
        obj.hearingLeft = values.hearingLeft;
        obj.hearingRight = values.hearingRight;
        obj.eyeSightLeft = values.eyeSightLeft;
        obj.eyeSightRight = values.eyeSightRight;
        obj.qtc = values.qtc;
        obj.qTcF = values.qTcF;
        obj.heartbeat = values.heartbeat;
        obj.otherTest = values.otherTest;
        obj.patientIncidents = values.patientIncidents;
        obj.dateReport = values.dateReport;
        obj.reportBy = values.reportBy;
        obj.healthOrg = values.healthOrg;
        obj.patientLabtestResults = values.patientLabtestResults;
        if (
            values.patientLabtestResults &&
            values.patientLabtestResults.length > 0
        ) {
            let list = values.patientLabtestResults.map((element, index) => {
                let p = element;
                p.orderNumber = index;
                return p;
            });
            obj.patientLabtestResults = list;
        }

        if (values.patientIncidents && values.patientIncidents.length > 0) {
            let listPI = values.patientIncidents.map((element, index) => {
                let p = element;
                p.orderNumber = index;
                return p;
            });
            obj.patientIncidents = listPI;
        }
        checkCode(id, values.patientCode).then((result) => {
            if (id) {
                update(obj).then(() => {
                    toast.success("Đã cập nhật bệnh nhân");
                    history.push(ConstantList.ROOT_PATH + Const.url + "list");
                });
            } else {
                addNew(obj).then(() => {
                    toast.success("Đã thêm mới bệnh nhân");
                    if (this.state.isResetForm === false) {
                        history.push(ConstantList.ROOT_PATH + Const.url + "list");
                    }
                });
            }
        });
    };
    render() {
        let { t } = this.props;
        let {
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
            <div>
                {this.state.didMountComplete && (
                    <PatientForm
                        initialValues={{
                            displayName: displayName ? displayName : "",
                            patientCode: patientCode ? patientCode : null,
                            eTBCode: eTBCode ? eTBCode : null,
                            height: height ? height : null,
                            weight: weight ? weight : null,
                            lungDamage: lungDamage ? lungDamage : null,
                            outOfLungDamage: outOfLungDamage ? outOfLungDamage : null,
                            bothDamage: bothDamage ? bothDamage : null,
                            unknown: unknown ? unknown : null,
                            gender: gender ? gender : null,
                            birthDate: birthDate ? birthDate : null,
                            classify: classify ? classify : null,
                            otherClassify: otherClassify ? otherClassify : null,
                            oldOrg: oldOrg ? oldOrg : null,
                            drugHistories: drugHistories ? drugHistories : [],
                            patientLabtestResults: patientLabtestResults
                                ? patientLabtestResults
                                : [],
                            tbDrugs: tbDrugs ? tbDrugs : [],
                            hearingLeft: hearingLeft ? hearingLeft : null,
                            hearingRight: hearingRight ? hearingRight : null,
                            eyeSightLeft: eyeSightLeft ? eyeSightLeft : null,
                            eyeSightRight: eyeSightRight ? eyeSightRight : null,
                            qtc: qtc ? qtc : null,
                            qTcF: qTcF ? qTcF : null,
                            heartbeat: heartbeat ? heartbeat : null,
                            otherTest: otherTest ? otherTest : null,
                            patientIncidents: patientIncidents ? patientIncidents : [],
                            dateReport: dateReport ? dateReport : null,
                            reportBy: reportBy ? reportBy : null,
                            clinicalStatusDto: clinicalStatusDto ? clinicalStatusDto : null,
                            healthOrg: healthOrg ? healthOrg : null,
                        }}
                        handleClose={this.handleClose}
                        handleSubmit={this.handleFormSubmit}
                        pageIndex={this.state.pageIndex}
                        pageSize={this.state.pageSize}
                        history={this.props.history}
                        id={this.props.match.params.id}
                        listLabTest={this.state.listLabTest}
                        listDrug={this.state.listDrug}
                        adding={this.state.adding}
                        readOnly={this.state.readOnly}
                        isResetForm={this.state.isResetForm}
                    />
                )}
            </div>
        );
    }
}

export default Create;
