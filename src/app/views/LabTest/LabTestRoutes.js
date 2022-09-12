import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const LabTestTable = EgretLoadable({
    loader: () =>
        import ("./LabTestTable")
});
const ViewComponent = withTranslation()(LabTestTable);

const LabTestRoutes = [{
    path: ConstantList.ROOT_PATH + "lab-test",
    exact: true,
    component: ViewComponent
}];

export default LabTestRoutes;