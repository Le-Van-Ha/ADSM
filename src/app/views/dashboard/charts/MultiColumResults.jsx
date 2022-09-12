import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import moment from "moment";
import { getDashboardAnalytics } from "../DashboardService";

class MultiColumResults extends React.Component {
  constructor(props) {
    super(props);
    let { t } = this.props;
    this.state = {};
  }

  highChartsRender() {
    Highcharts.chart({
      chart: {
        type: "column",
        renderTo: "atmospheric-r",
      },
      title: {
        text: "Biểu đồ biến cố bất lợi được ghi nhận trong quá trình điều trị bệnh nhân",
        style: {
          fontSize: "15px",
          fontFamily: "Arial",
        },
      },
      credits: {
        enabled: true,
      },
      legend: {
        reversed: true,
      },
      xAxis: {
        categories: this.props.categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
        stackLabels: {
          style: {
            color: "black",
          },
          enabled: true,
          verticalAlign: "top",
        },
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {},
      series: this.props.series.map((element) => {
        let data = element.data.map((item) => {
          return item.y
            ? {
                y: item.y,
                percent: item.percent > 0 ? item.percent + "%" : "",
              }
            : item > 0
            ? item
            : "";
        });
        return { ...element, data: data };
      }),
    });
  }

  updatePageData = () => {
    let searchObj = {};
    searchObj.year = moment(this.state.year).format("yyyy");
    searchObj.filterType = this.state.typeOption.type;
    getDashboardAnalytics(searchObj).then(({ data }) => {
      let listDoashboard = [...data];
      let totalPatient = [];
      let totalPatientIncident = [];
      let totalImportant = [];
      let totalChange = [];
      listDoashboard.forEach((element) => {
        totalPatient.push(element.totalPatient);
        totalPatientIncident.push(element.totalPatientIncident);
        totalImportant.push(element.totalImportant);
        totalChange.push(element.totalChange);
      });

      let series = [
        {
          name: "Số bệnh nhân có mẫu aDSM 1",
          data: totalPatient,
          color: "red",
        },
        {
          name: "Số bệnh nhân có mẫu ADSM 2",
          data: totalPatientIncident,
          color: "blue",
        },
        {
          name: "Số biến cố bất lợi",
          data: totalImportant,
          color: "green",
        },
      ];
      this.highChartsRender(series);
    });
  };

  componentDidMount() {
    let { listDoashboard } = this.props;
    this.highChartsRender();
  }

  render() {
    return <div id="atmospheric-r"></div>;
  }
}
export default MultiColumResults;
