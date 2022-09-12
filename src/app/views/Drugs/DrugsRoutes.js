import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const DrugsTable = EgretLoadable({
    loader: () =>
        import ("./DrugsTable")
});

const ViewComponent = withTranslation()(DrugsTable);

const drugsRoutes = [{
    path: ConstantList.ROOT_PATH + "drugs",
    exact: true,
    component: ViewComponent
}];

export default drugsRoutes;