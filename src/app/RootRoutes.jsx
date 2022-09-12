import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import administrativeUnitRoutes from "./views/AdministrativeUnit/AdministrativeUnitRoutes";
import UserRoutes from "./views/User/UserRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";
import MenuRoutes from "./views/Menus/MenuRoutes";
import Organization from "./views/Organization/OrganizationRoutes";
import HealthOrgRoutes from "./views/HealthOrg/HealthOrgRoutes";
import EthnicityRoutes from "./views/Ethnicity/EthnicityRoutes";
import PatientRoutes from "./views/Patient/PatientRoutes";
import DrugsRoutes from "./views/Drugs/DrugsRoutes";
import LabTestRoutes from "./views/LabTest/LabTestRoutes";
import PatientIncidentRoutes from "./views/PatientIncident/PatientIncidentRoutes";
import AdverseDrugReportRoutes from "./views/Report/AdverseDrugReportRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...administrativeUnitRoutes,
  ...UserRoutes,
  ...roleRoutes,
  ...MenuRoutes,
  ...Organization,
  ...HealthOrgRoutes,
  ...EthnicityRoutes,
  ...PatientRoutes,
  ...DrugsRoutes,
  ...LabTestRoutes,
  ...AdverseDrugReportRoutes,
  ...PatientIncidentRoutes,
  ...errorRoute,
];

export default routes;
