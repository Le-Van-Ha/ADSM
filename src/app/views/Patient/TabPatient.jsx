import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Person from "./Tab/Person";
import ClinicalStatus from "./Tab/ClinicalStatus";
import LabTest from "./Tab/LabTest";
import DrugHistory from "./Tab/DrugHistory";
import TBDrugs from "./Tab/TBDrugs";
import PatientIncident from "./Tab/PatientIncident";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabPatient(props) {
  const {
    id,
    formik,
    history,
    listLabTest,
    listDrug,
    disabled,
    selectedIndex,
    tab,
    setTab,
    isChecked,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    setTab(newValue);
  };

  return (
    <div className={classes.root} value={tab} index={0}>
      <AppBar position="static" color="#ffffff">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="THÔNG TIN CHUNG" {...a11yProps(0)} />
          <Tab label="TÌNH TRẠNG LÂM SÀNG" {...a11yProps(1)} />
          <Tab label="XN TRƯỚC ĐIỀU TRỊ LAO" {...a11yProps(2)} />
          <Tab label="THUỐC ĐIỀU TRỊ LAO" {...a11yProps(3)} />
          <Tab label="TIỀN SỬ DÙNG THUỐC" {...a11yProps(4)} />
          <Tab label="BIẾN CỐ LIÊN QUAN" {...a11yProps(5)} />
          {/* <Tab label={t('hiv_case.tab.arv_treatment')}  {...a11yProps(4)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0} color="#ffffff">
        <Person
          t={t}
          formik={formik}
          classes={classes}
          disabled={disabled ? disabled : false}
          //   isChecked={isChecked}
        />
      </TabPanel>
      <TabPanel value={tab} index={1} color="#ffffff">
        <ClinicalStatus
          t={t}
          formik={formik}
          classes={classes}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
      <TabPanel value={tab} index={2} color="#ffffff">
        <LabTest
          t={t}
          formik={formik}
          classes={classes}
          listLabTest={listLabTest}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
      <TabPanel value={tab} index={3} color="#ffffff">
        <TBDrugs
          t={t}
          formik={formik}
          classes={classes}
          listDrug={listDrug}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
      <TabPanel value={tab} index={4} color="#ffffff">
        <DrugHistory
          t={t}
          formik={formik}
          classes={classes}
          listDrug={listDrug}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
      <TabPanel value={tab} index={5} color="#ffffff">
        <PatientIncident
          t={t}
          formik={formik}
          classes={classes}
          id={id}
          history={history}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
    </div>
  );
}
