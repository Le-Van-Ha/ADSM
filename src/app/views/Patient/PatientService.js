import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/patient";
const API_PATH_DRUG = ConstantList.API_ENPOINT + "/api/drug";
const API_PATH_INCIDENT = ConstantList.API_ENPOINT + "/api/patientIncident";
const API_PATH_DRUG_PATIENT = ConstantList.API_ENPOINT + '/api/drug-patient'


export const searchByPage = (searchObject) => {
    var url = API_PATH + "/searchByDto";
    return axios.post(url, searchObject);
};

export const getDrugByPatient = (id) => {
    var url = API_PATH_DRUG_PATIENT + "/searchByPatientId/" + id;
    return axios.post(url);
};

export const getById = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const getByIdAndType = (id, type) => {
    let url = API_PATH + "/" + id + "/" + type;
    return axios.get(url);
};

export const deleteItem = (id) => {
    let url = API_PATH + "/" + id;
    return axios.delete(url);
};

export const addNew = (obj) => {
    let url = API_PATH;
    return axios.post(url, obj);
};

export const update = (obj) => {
    let url = API_PATH + "/" + obj.id;
    return axios.put(url, obj);
};

export const checkCode = (id, code) => {
    const config = { id: id, patientCode: code };
    var url = API_PATH + "/checkCode";
    return axios.post(url, config);
};

export const checkETBCode = (id, eTBcode) => {
    const config = { id: id, eTBCode: eTBcode };
    var url = API_PATH + "/checkETBCode";
    return axios.post(url, config);
};
//-----------------------Thuốc(drug)----------------------
export const searchByPageDrug = (searchObject) => {
    var url = API_PATH_DRUG + "/searchByDto";
    return axios.post(url, searchObject);
};

export const checkAppearDate = (id) => {
    var url = API_PATH_INCIDENT + "/checkMaxIncident/" + id;
    return axios.get(url);
};