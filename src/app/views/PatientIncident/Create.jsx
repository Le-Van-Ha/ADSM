import React from "react";
import { toast } from "react-toastify";
import ConstantList from "../../appConfig";
import "react-toastify/dist/ReactToastify.css";
import PatientIncidentForm from "./PatientIncidentForm";
import "styles/globitsStyles.css";
import { searchByPage as getLabTests } from "../LabTest/LabTestService";
import ConstPatient from "../Patient/Const";
import { getById as getPatientById } from "../Patient/PatientService";
import { searchByPage as getDrugs } from "../Drugs/DrugsService";
import { update, addNew, getById } from "./PatientIncidentService";
import { getCurrentUser } from "../User/UserService";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

class Create extends React.Component {
    state = {
        listPatientIncident: [],
        history: null,
        didMountComplete: false,
        readOnly: false,
        isAddNew: false,
        hidden: true,
    };
    componentDidMount() {
        let { location } = this.props;
        if (location && location.state && location.state.readOnly) {
            this.setState({ readOnly: location.state.readOnly });
        }
        let { idPatient, id } = this.props.match.params;
        if (idPatient && id) {
            this.setState({
                isAddNew: true,
            });
        }

        if (idPatient != null) {
            if (id != null) {
                getById(id).then(({ data }) => {
                    this.setState({ ...data }, () => {
                        getPatientById(idPatient).then(({ data }) => {
                            this.setState({ patient: data });
                            this.setState({ didMountComplete: true });
                        });
                    });
                });
            } else {
                getPatientById(idPatient).then(({ data }) => {
                    this.setState({ patient: data });
                    this.setState({ didMountComplete: true });
                });
            }
        } else {
            this.setState({ didMountComplete: true });
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
        this.getRoleUser();
    }

    getRoleUser = () => {
        getCurrentUser()
            .then(({ data }) => {
                return data.roles[0].name;
            })
            .then((role) => {
                const listRole = ["ROLE_NTP"];
                if (!listRole.includes(role)) {
                    this.setState({ hidden: false, disabled: true });
                }
            });
    };

    handleClose = (history) => {
        let { idPatient } = this.props.match.params;
        history.push(ConstantList.ROOT_PATH + "patient-incident/list");
    };

    handleFormSubmit = (values) => {
        let { history } = this.props;
        let obj = {};
        let id = this.props.match.params.id;
        if (id) {
            obj.id = id;
        }
        obj.patient = { ...this.state.patient, healthOrg: values.healthOrg };
        obj.doctorNote = values.doctorNote;
        obj.reportBy = values.reportBy;
        obj.reportDate = values.reportDate;
        obj.reporterPhoneNumber = values.reporterPhoneNumber;
        obj.reporterEmail = values.reporterEmail;
        obj.reporterTitle = values.reporterTitle;
        obj.reportType = values.reportType;
        obj.reportSeq = values.reportSeq;
        obj.listSuspectIncidentDrugDto = values.listSuspectIncidentDrugDto;
        obj.listCombinationDrugDto = values.listCombinationDrugDto;
        obj.description = values.description;
        obj.appearDate = values.appearDate;
        obj.recoveryDay = values.recoveryDay;
        obj.severityDead = values.severityDead;
        obj.severityLifeThreatening = values.severityLifeThreatening;
        obj.severityHospitalizationOrExtensionOfHospitalStay =
            values.severityHospitalizationOrExtensionOfHospitalStay;
        obj.severityPermanentOrSeverelyBurdensome =
            values.severityPermanentOrSeverelyBurdensome;
        obj.severityChangeTBTreatmentRegimen =
            values.severityChangeTBTreatmentRegimen;
        obj.severityFetalMalformation = values.severityFetalMalformation;
        obj.severityOther = values.severityOther;
        obj.severityInstrument = values.severityInstrument;
        obj.incidentHandlingStoppingDrug = values.incidentHandlingStoppingDrug;
        obj.incidentHandlingStopDrug = values.incidentHandlingStopDrug;
        obj.incidentHandlingReduceDose = values.incidentHandlingReduceDose;
        obj.incidentHandlingChangeTBMedicine =
            values.incidentHandlingChangeTBMedicine;
        obj.incidentHandlingSymptomaticTreatment =
            values.incidentHandlingSymptomaticTreatment;
        obj.incidentHandlingOther = values.incidentHandlingOther;
        obj.incidentHandlingDetails = values.incidentHandlingDetails;
        obj.result = values.result;
        obj.recoveryHaveSequelaeDetails = values.recoveryHaveSequelaeDetails;
        obj.dayOfDeath = values.dod;
        obj.seriousLevel = values.seriousLevel;
        obj.stillInExistence = values.stillInExistence;
        obj.handlingDetails = values.handlingDetails;
        obj.patientIncidentLabtests = values.patientIncidentLabtests;
        if (
            values.patientIncidentLabtests &&
            values.patientIncidentLabtests.length > 0
        ) {
            let list = values.patientIncidentLabtests.map((element, index) => {
                let p = element;
                p.orderNumber = index;
                return p;
            });
            obj.patientIncidentLabtests = list;
        }
        // ngày báo cáo
        if (values.reportDate < values.appearDate) {
            toast.warning(
                "Ngày báo cáo không được xảy ra trước ngày bắt đầu biến cố"
            );
            return;
        }
        if (values.recoveryDay != null && values.recoveryDay < values.appearDate) {
            toast.warning(
                "Ngày phục hồi không được xảy ra trước ngày bắt đầu biến cố"
            );
            return;
        }

        if (values.dod != null && values.reportDate < values.dod) {
            toast.warning("Ngày báo cáo không được xảy ra trước ngày tử vong");
            return;
        }

        if (values.handlingDetails != null) {
            let checkHandleDate = values.handlingDetails.some(item => item.date < values.appearDate)
            let checkHandleDateReport = values.handlingDetails.some(item => item.date > values.reportDate)
            if (checkHandleDate) {
                toast.warning("Ngày xử trí không được xảy ra trước ngày bắt đầu biến cố");
                return;
            }
            if (checkHandleDateReport) {
                toast.warning("Ngày xử trí không được xảy ra sau ngày báo cáo");
                return;
            }
        }
        if (id) {
            const { expertComments, expertConclusions } = this.state.patient.patientIncidents.find(item => item.id === this.props.match.params.id);
            update({ ...obj, expertComments, expertConclusions }).then(() => {
                toast.success("Đã cập nhật thành công");
                history.push(ConstantList.ROOT_PATH + ConstPatient.urlPI + "list");
            });
        } else {
            addNew({ ...obj }).then(() => {
                toast.success("Đã thêm mới thành công");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
        }
    };

    getOnChangePatient = (patient) => {
        this.state.patient = {
            ...this.state.patient,
            ...patient,
        }
    };

    render() {
        let { t } = this.props;
        let {
            patient,
            listSuspectIncidentDrugDto,
            description,
            appearDate,
            recoveryDay,
            severityDead,
            severityLifeThreatening,
            severityHospitalizationOrExtensionOfHospitalStay,
            severityPermanentOrSeverelyBurdensome,
            severityChangeTBTreatmentRegimen,
            severityFetalMalformation,
            severityOther,
            severityInstrument,
            incidentHandlingStoppingDrug,
            incidentHandlingStopDrug,
            incidentHandlingReduceDose,
            incidentHandlingChangeTBMedicine,
            incidentHandlingSymptomaticTreatment,
            incidentHandlingOther,
            incidentHandlingDetails,
            handlingDetails,
            result,
            recoveryHaveSequelaeDetails,
            dayOfDeath,
            seriousLevel,
            patientIncidentLabtests,
            listCombinationDrugDto,
            doctorNote,
            reportBy,
            reporterPhoneNumber,
            reportDate,
            reporterEmail,
            reportType,
            reportSeq,
            reporterTitle,
            stillInExistence,
            hidden } = this.state;
        return (
            <>
                {this.state.didMountComplete && (
                    <PatientIncidentForm
                        initialValues={{
                            patient: patient ? patient : {},
                            displayName: patient?.displayName ? patient.displayName : null,
                            patientCode: patient?.patientCode ? patient.patientCode : null,
                            eTBCode: patient?.eTBCode ? patient.eTBCode : null,
                            birthDate: patient?.birthDate ? patient.birthDate : null,
                            gender: patient?.gender ? patient.gender : null,
                            height: patient?.height ? patient.height : null,
                            weight: patient?.weight ? patient.weight : null,
                            healthOrg: patient?.healthOrg ? patient?.healthOrg : null,
                            listSuspectIncidentDrugDto: listSuspectIncidentDrugDto
                                ? listSuspectIncidentDrugDto
                                : [],
                            description: description ? description : null,
                            appearDate: appearDate ? appearDate : null,
                            recoveryDay: recoveryDay ? recoveryDay : null,
                            severityDead: severityDead ? severityDead : null,
                            severityLifeThreatening: severityLifeThreatening
                                ? severityLifeThreatening
                                : null,
                            severityHospitalizationOrExtensionOfHospitalStay:
                                severityHospitalizationOrExtensionOfHospitalStay
                                    ? severityHospitalizationOrExtensionOfHospitalStay
                                    : null,
                            severityPermanentOrSeverelyBurdensome:
                                severityPermanentOrSeverelyBurdensome
                                    ? severityPermanentOrSeverelyBurdensome
                                    : null,
                            severityChangeTBTreatmentRegimen: severityChangeTBTreatmentRegimen
                                ? severityChangeTBTreatmentRegimen
                                : null,
                            severityFetalMalformation: severityFetalMalformation
                                ? severityFetalMalformation
                                : null,
                            severityOther: severityOther ? severityOther : null,
                            severityInstrument: severityInstrument
                                ? severityInstrument
                                : null,
                            seriousLevel: seriousLevel ? seriousLevel : null,
                            incidentHandlingStoppingDrug: incidentHandlingStoppingDrug
                                ? incidentHandlingStoppingDrug
                                : null,
                            incidentHandlingStopDrug: incidentHandlingStopDrug
                                ? incidentHandlingStopDrug
                                : null,
                            incidentHandlingReduceDose: incidentHandlingReduceDose
                                ? incidentHandlingReduceDose
                                : null,
                            incidentHandlingChangeTBMedicine: incidentHandlingChangeTBMedicine
                                ? incidentHandlingChangeTBMedicine
                                : null,
                            incidentHandlingSymptomaticTreatment:
                                incidentHandlingSymptomaticTreatment
                                    ? incidentHandlingSymptomaticTreatment
                                    : null,
                            incidentHandlingOther: incidentHandlingOther
                                ? incidentHandlingOther
                                : null,
                            incidentHandlingDetails: incidentHandlingDetails
                                ? incidentHandlingDetails
                                : null,
                            result: result ? result : null,
                            recoveryHaveSequelaeDetails: recoveryHaveSequelaeDetails
                                ? recoveryHaveSequelaeDetails
                                : null,
                            dayOfDeath: dayOfDeath ? dayOfDeath : null,
                            dod: dayOfDeath ? dayOfDeath : null,
                            patientIncidentLabtests: patientIncidentLabtests
                                ? patientIncidentLabtests
                                : [],
                            listCombinationDrugDto: listCombinationDrugDto
                                ? listCombinationDrugDto
                                : [],
                            doctorNote: doctorNote ? doctorNote : null,
                            reportBy: reportBy ? reportBy : null,
                            reporterPhoneNumber: reporterPhoneNumber
                                ? reporterPhoneNumber
                                : null,
                            reportDate: reportDate ? reportDate : null,
                            reporterEmail: reporterEmail ? reporterEmail : null,
                            reportType: reportType ? reportType : null,
                            reportSeq: reportSeq ? reportSeq : null,
                            reporterTitle: reporterTitle ? reporterTitle : null,
                            stillInExistence: stillInExistence ? stillInExistence : null,
                            handlingDetails: handlingDetails ? handlingDetails : null,
                        }}
                        handleClose={this.handleClose}
                        handleSubmit={this.handleFormSubmit}
                        pageIndex={this.state.pageIndex}
                        pageSize={this.state.pageSize}
                        history={this.props.history}
                        id={this.props.match.params.id}
                        idPatient={this.props.match.params.idPatient}
                        listDrugs={this.state.listDrugs}
                        listLabTest={this.state.listLabTest}
                        patient={this.state.patient}
                        readOnly={this.state.readOnly}
                        isAddNew={this.state.isAddNew}
                        hidden={hidden}
                        getOnChangePatient={(patient) => this.getOnChangePatient(patient)}
                    />
                )}
            </>
        );
    }
}

export default Create;
