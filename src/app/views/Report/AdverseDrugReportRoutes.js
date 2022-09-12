import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const AdverseDrugReport = EgretLoadable({
  loader: () => import("./AdverseDrugReport"),
});
const AdverseDrugTable = EgretLoadable({
  loader: () => import("./AdverseDrugTable"),
});
const AdverseDrugTableView = withTranslation()(AdverseDrugTable);

const AdverseDrugReportView = withTranslation()(AdverseDrugReport);

const AdverseDrugReportRoutes = [
  {
    path: ConstantList.ROOT_PATH + "adverse_drug_table",
    exact: true,
    component: AdverseDrugTableView,
  },
  {
    path: ConstantList.ROOT_PATH + "adverse_drug_report",
    exact: true,
    component: AdverseDrugReportView,
  },
  {
    path: ConstantList.ROOT_PATH + "adverse_drug_report/:id",
    exact: true,
    component: AdverseDrugReportView,
  },
];

export default AdverseDrugReportRoutes;
