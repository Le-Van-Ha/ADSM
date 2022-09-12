import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/patientIncident";
const API_PATH_ORG = ConstantList.API_ENPOINT + "/api/userOrganization";
const API_PATH_REPORT = `${ConstantList.API_ENPOINT}/api/drug-incident/`;

export const downloadPdf = (id) => {
    var url = `${API_PATH_REPORT}/patient-incident/${id}`;

    return axios({
        method: "get",
        url: url,
        responseType: "blob",
    });
};

export const searchByPage = (searchObject) => {
    var url = API_PATH_REPORT + "searchByDto";
    return axios.post(url, searchObject);
};
export const searchByOrganization = (searchObject) => {
    var url = API_PATH_ORG + "/search-by-user-org";
    return axios.post(url, searchObject);
};

export const getById = (id) => {
    let url = API_PATH + "/" + id;
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
    const config = { params: { id: id, code: code } };
    var url = API_PATH + "/checkCode";
    return axios.get(url, config);
};

export const getAdverseDrug = (searchObject) => {
    var url = API_PATH_REPORT + "information";
    return axios.post(url, searchObject);
};

export const getAdverseDrugById = (id) => {
    var url = API_PATH_REPORT + id;
    return axios.get(url);
};

export const sendAdverseDrug = (searchObject) => {
    var url = API_PATH_REPORT;
    return axios.post(url, searchObject);
};
