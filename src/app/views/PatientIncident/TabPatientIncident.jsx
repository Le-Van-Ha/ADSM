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
import PatientIncident from "./Tab/PatientIncident";
import SuspectIncidentDrug from "./Tab/SuspectIncidentDrug";

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
  const { id, formik, listDrugs, listLabTest, disabled } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} value={value} index={0}>
      <AppBar position="static" color="#ffffff">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label=" THÔNG TIN VỀ BIẾN CỐ BẤT LỢI " {...a11yProps(0)} />
          <Tab
            label="THÔNG TIN VỀ THUỐC NGHI NGỜ GÂY BIẾN CỐ"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} color="#ffffff">
        <PatientIncident
          t={t}
          formik={formik}
          classes={classes}
          listLabTest={listLabTest}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
      <TabPanel value={value} index={1} color="#ffffff">
        <SuspectIncidentDrug
          t={t}
          formik={formik}
          classes={classes}
          listDrugs={listDrugs}
          disabled={disabled ? disabled : false}
        />
      </TabPanel>
    </div>
  );
}
