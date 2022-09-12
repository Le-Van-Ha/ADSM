import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Breadcrumb } from "egret";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import MultiColumResults from "./charts/MultiColumResults";
import { getDashboardAnalytics } from "./DashboardService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import viLocale from "date-fns/locale/vi";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

class Dashboard1 extends Component {
  state = {
    typeOption: { type: 1, name: "Lọc theo tháng" },
    year: new Date(),
    typeOptions: [
      { type: 1, name: "Lọc theo tháng" },
      { type: 2, name: "Lọc theo quý" },
    ],
    listDashboard: [],
    series: null,
  };

  handleChangeDate = (date, name) => {
    this.setState({ [name]: date }, () => {
      // this.updatePageData();
    });
  };

  handleKeyDownEnterSearch = (e) => {
    if (e.key === "Enter") {
      this.updatePageData();
    }
  };

  changeSelected = (value, type) => {
    if (type === "area") {
      this.setState({ area: value }, () => {});
    }
    if (type === "province") {
      this.setState({ province: value }, () => {});
    }
    if (type === "facility") {
      this.setState({ facility: value }, () => {});
    }
  };

  updatePageData = () => {
    let month = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    let quarters = ["Quý 1", "Quý 2", "Quý 3", "Quý 4"];

    if (this.state.typeOption.type == 1) {
      this.setState({ categories: month });
    } else {
      this.setState({ categories: quarters });
    }

    let searchObj = {};
    searchObj.year = moment(this.state.year).format("yyyy");
    searchObj.filterType = this.state.typeOption.type;
    getDashboardAnalytics(searchObj).then(({ data }) => {
      let listDashboard = [...data];
      let totalPatient = [];
      let totalPatientIncident = [];
      let totalImportant = [];
      let totalPatientHasIncident = [];

      if (this.state.typeOption.type == 1) {
        listDashboard.forEach((element) => {
          totalPatient.push(element.totalPatient);
          totalPatientIncident.push({
            y: element.totalPatientIncident,
            percent: element.percentageIncidents.toFixed(2),
          });
          totalImportant.push(element.totalImportant);
          totalPatientHasIncident.push({
            y: element.totalPatientHasIncident,
            percent: element.percentagePatients.toFixed(2),
          });
        });
      } else {
        let totalPa = 0;
        let totalPaIn = 0;
        let totalPaIm = 0;
        let totalChan = 0;

        for (let index = 1; index <= 4; index++) {
          totalPa = 0;
          totalPaIn = 0;
          totalPaIm = 0;
          totalChan = 0;
          listDashboard.forEach((element) => {
            if (element.quarters == index) {
              totalPa += element.totalPatient;
              totalPaIn += element.totalPatientIncident;
              totalPaIm += element.totalImportant;
              totalChan += element.totalPatientHasIncident;
            }
          });
          totalPatient.push(totalPa);
          totalImportant.push(totalPaIm);
          totalPatientIncident.push({
            y: totalPaIn,
            percent: listDashboard[index - 1].percentageIncidents.toFixed(2),
          });
          totalPatientHasIncident.push({
            y: totalChan,
            percent: listDashboard[index - 1].percentagePatients.toFixed(2),
          });
        }
      }

      let series = [
        {
          name: "Số biến cố bất lợi",
          data: totalPatientIncident,
          color: "green",
          dataLabels: [
            {
              enabled: true,
              format: "{point.percent}",
              align: "center",
            },
          ],
        },
        {
          name: "Số biến cố bất lợi nghiêm trọng",
          data: totalImportant,
          color: "yellow",
        },
        {
          name: "Số bệnh nhân có mẫu ADSM 2",
          data: totalPatientHasIncident,
          color: "blue",
          dataLabels: [
            {
              enabled: true,
              format: "{point.percent}",
              align: "center",
            },
          ],
        },
        {
          name: "Số bệnh nhân có mẫu aDSM 1",
          data: totalPatient,
          color: "red",
        },
      ];
      this.setState({ series });
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  render() {
    const { t, i18n } = this.props;
    let TitlePage = t("Dashboard.dashboard");
    let { year, typeOptions, typeOption, categories, series } = this.state;
    return (
      <div className="analytics m-sm-30">
        <div className="mb-sm-30">
          <Helmet>
            <title>
              {TitlePage} | {t("web_site")}
            </title>
          </Helmet>
          <Breadcrumb routeSegments={[{ name: TitlePage }]} />
        </div>
        <Grid container spacing={2}>
          <Grid item md={2} sm={2} xs={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
              <KeyboardDatePicker
                fullWidth
                id="testDate"
                name="testDate"
                openTo="year"
                views={["year"]}
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="yyyy"
                size="small"
                label="Lọc theo năm"
                InputAdornmentProps={{ position: "end" }}
                onChange={(date) =>
                  this.setState(
                    { year: date, series: null, categories: null },
                    () => {
                      this.updatePageData();
                    }
                  )
                }
                value={year}
                disableFuture={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} sm={2} xs={2}>
            <Autocomplete
              disableClearable
              options={typeOptions ? typeOptions : []}
              value={typeOption ? typeOption : null}
              defaultValue={typeOptions[0]}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) =>
                this.setState(
                  { typeOption: value, series: null, categories: null },
                  () => {
                    this.updatePageData();
                  }
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<span>Lọc theo tháng hoặc quý</span>}
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} spacing={2}>
            {series &&
              series.length > 0 &&
              categories &&
              categories.length > 0 && (
                <MultiColumResults
                  t={t}
                  series={series}
                  categories={categories}
                />
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
