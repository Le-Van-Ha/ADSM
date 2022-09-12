import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const url = "patient/";

const PatientTable = EgretLoadable({
    loader: () =>
        import ("./PatientTable")
});
const ViewComponentPatientTable = withTranslation()(PatientTable);

//const ViewComponentListTab = withTranslation()(List);
const Create = EgretLoadable({
    loader: () =>
        import ("./Create")
});
const ViewComponentCreate = withTranslation()(Create);
const PatientRoutes = [
    {
        path: ConstantList.ROOT_PATH + url + "list",
        exact: true,
        component: ViewComponentPatientTable
    },
    // {
    //     path: ConstantList.ROOT_PATH + url + "list/(tabIndex)?/:tabIndex?/(pageIndex)?/:pageIndex?/(pageSize)?/:pageSize?",
    //     exact: true,
    //     component: ViewComponentPatientTable
    // },
    {
        path: ConstantList.ROOT_PATH + url + "create",
        exact: true,
        component: ViewComponentCreate
    },
    {
        path: ConstantList.ROOT_PATH + url + "create/(id)?/:id?/(page)?/:page?/(pageSize)?/:pageSize?",
        exact: true,
        component: ViewComponentCreate
    }
];


export default PatientRoutes;