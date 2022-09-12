import React, { Component } from "react";
import { Dialog, Button, Grid, DialogActions } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
export default class AdverseDrugReportPrint extends Component {
  state = { item: null };

  handleFormSubmit = () => {
    let content = document.getElementById("div_contents");
    let print = document.getElementById("ifm-content-stop-print").contentWindow;
    print.document.open();
    print.document.write(content.innerHTML);
    print.document.close();
    print.focus();
    print.print();
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.escFunction, false);
  };

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.handleClose();
    }
  };

  render() {
    let { open, t, item } = this.props;

    let data = (
      item.patientIncidentReports != null ? item.patientIncidentReports : []
    ).concat(
      item.inferiorityPatientIncidentReports != null
        ? item.inferiorityPatientIncidentReports
        : []
    );

    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth
      >
        <iframe
          id="ifm-content-stop-print"
          style={{
            height: "0px",
            width: "0px",
            position: "absolute",
            print: { size: "auto", margin: "0mm" },
          }}
        ></iframe>
        <div
          className="validator-form-scroll-dialog"
          style={{
            minHeight: `${900 + (data.length > 0 ? data.length * 25 : 0)}px`,
          }}
        >
          <DialogContent id="div_contents">
            <Grid>
              <div>
                <meta
                  httpEquiv="Content-Type"
                  content="text/html; charset=UTF-8"
                />
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n<!--\nspan.cls_002 {font-family: Times, serif;font-size: 12.1px;color: rgb(0, 0, 0);font-weight: bold;font-style: normal;text-decoration: none;}\ndiv.cls_002 {font-family: Times, serif;font-size: 12.1px;color: rgb(0, 0, 0);font-weight: bold;font-style: normal;text-decoration: none;}\nspan.cls_003 {font-family: Times, serif;font-size: 14.1px;color: rgb(0, 0, 0);font-weight: normal;font-style: normal;text-decoration: none;}\ndiv.cls_003 {font-family: Times, serif;font-size: 14.1px;color: rgb(0, 0, 0);font-weight: normal;font-style: normal;text-decoration: none;}\nspan.cls_004 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: normal;font-style: normal;text-decoration: none;}\ndiv.cls_004 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: normal;font-style: normal;text-decoration: none;}\nspan.cls_006 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: bold;font-style: normal;text-decoration: none;}\ndiv.cls_006 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: bold;font-style: normal;text-decoration: none;}\nspan.cls_007 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: bold;font-style: italic;text-decoration: none;}\ndiv.cls_007 {font-family: Times, serif;font-size: 13px;color: rgb(0, 0, 0);font-weight: bold;font-style: italic;text-decoration: none;}\n-->\n",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-306px",
                    top: "50px",
                    width: "612px",
                    height: `${
                      729 + (data.length > 0 ? data.length * 25 : 0)
                    }px`,
                    borderStyle: "outset",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "71.16px",
                    }}
                    className="cls_002"
                  >
                    <span className="cls_002">
                      CHƯƠNG TRÌNH CHỐNG LAO QUỐC GIA
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "173.54px",
                      top: "97.10px",
                    }}
                    className="cls_003"
                  >
                    <span className="cls_003">
                      BÁO CÁO BIẾN CỐ BẤT LỢI CỦA THUỐC
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "98.54px",
                      top: "125.54px",
                    }}
                    className="cls_003"
                  >
                    <span className="cls_003">
                      TRONG QUÁ TRÌNH ĐIỀU TRỊ BỆNH NHÂN LAO KHÁNG THUỐC
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "154.22px",
                    }}
                    className="cls_004"
                  >
                    <span className="cls_004">
                      1. Tên đơn vị:
                      {item.userOrganization.user != null
                        ? item.userOrganization.user.username
                        : "……………………………………………………………………………"}
                      .
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "176.66px",
                    }}
                    className="cls_004"
                  >
                    <span className="cls_004">
                      2. Ngày hoàn thiện báo cáo:
                      <span style={{ marginLeft: "5px" }}>
                        {moment(item.date).format("DD/MM/yyyy")}
                      </span>
                      <span style={{ marginLeft: "65px", marginRight: "35px" }}>
                        Kỳ báo cáo quý:
                        <span style={{ marginLeft: "5px" }}>
                          {item.quarters}
                        </span>
                      </span>
                      Năm:{item.yearReport}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "198.98px",
                    }}
                    className="cls_004"
                  >
                    <span className="cls_004">
                      3. Người thực hiện báo cáo:
                      {item.executorName != null ? (
                        <span
                          style={{ marginLeft: "5px", marginRight: "31px" }}
                        >
                          {item.executorName}
                        </span>
                      ) : (
                        "…………………………"
                      )}
                      Số điện thoại:
                      <span style={{ marginLeft: "5px" }}>
                        {item.phoneNumber != null
                          ? item.phoneNumber
                          : "……………………"}
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "231.50px",
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">
                      Phần 1: Số lượng báo cáo mẫu 1 và mẫu 2 của hoạt động
                      aDSM:
                    </span>
                  </div>
                  <table
                    style={{
                      position: "absolute",
                      left: "105.54px",
                      top: "259.13px",
                      border: "1px solid #000",
                      width: "430px",
                      borderCollapse: "collapse",
                    }}
                    className="cls_004"
                  >
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">Tổng số NB RR/MDR -TB</span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.totalSampleReport != null
                            ? item.totalSampleReport
                            : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          Số lượng báo cáo mẫu 1 đã gửi đi
                        </span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.numberOfsampleReport1 != null
                            ? item.numberOfsampleReport1
                            : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          Số lượng báo cáo mẫu 2 đã gửi đi
                        </span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.numberOfsampleReport2 != null
                            ? item.numberOfsampleReport2
                            : 0}
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "345.17px",
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">
                      Phần 2: Biến cố bất lợi được ghi nhận trong quá trunh điều
                      trị bệnh nhân:
                    </span>
                  </div>
                  <table
                    style={{
                      position: "absolute",
                      left: "105.54px",
                      top: "368.09px",
                      border: "1px solid #000",
                      width: "430px",
                      borderCollapse: "collapse",
                    }}
                    className="cls_004"
                  >
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">Tổng số biến cố bất lợi</span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.totalPatienIncident != null
                            ? item.totalPatienIncident
                            : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          Số lượng biến cố nghiêm trọng (nhập viện/kéo dài thời
                          gian nằm viện, gây tàn tật/dị tật, đe dọa tính mạng,
                          tử vong)
                        </span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.numberOfSeriousIncident != null
                            ? item.numberOfSeriousIncident
                            : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "80%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          Số lượng biến cố được xử trí liên quan đến thay đổi
                          phác đồ lao
                        </span>
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #000",
                          width: "20%",
                          paddingLeft: "5px",
                        }}
                      >
                        <span className="cls_004">
                          {item.numberOfHandledIncident != null
                            ? item.numberOfHandledIncident
                            : 0}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <div
                    style={{
                      position: "absolute",
                      left: "72.02px",
                      top: "481.75px",
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">
                      Phần 3: Xử trí trong quá trunh điều trị khi xảy ra các
                      biến cố (nếu có):
                    </span>
                  </div>
                  <table
                    style={{
                      position: "absolute",
                      left: "105.54px",
                      top: "504.67px",
                      border: "1px solid #000",
                      width: "430px",
                      borderCollapse: "collapse",
                    }}
                    className="cls_004"
                  >
                    <tr>
                      <th
                        style={{
                          borderRight: "1px solid #000",
                          borderBottom: "1px solid #000",
                          width: "50%",
                        }}
                      >
                        <span className="cls_004">Mô tả biến cố</span>
                      </th>
                      <th
                        style={{
                          borderBottom: "1px solid #000",
                          width: "50%",
                        }}
                      >
                        <span className="cls_007">Biện pháp xử trí</span>
                      </th>
                    </tr>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr>
                          <td
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              width: "50%",
                              paddingLeft: "5px",
                              height: "25px",
                            }}
                          >
                            <span className="cls_004">{item.description}</span>
                          </td>
                          <td
                            style={{
                              borderBottom: "1px solid #000",
                              width: "50%",
                              paddingLeft: "5px",
                              height: "25px",
                            }}
                          >
                            <span className="cls_004">
                              {item.incidentHandlingDetails}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          style={{
                            height: "25px",
                            borderRight: "1px solid #000",
                            borderBottom: "1px solid #000",
                          }}
                        ></td>
                        <td
                          style={{
                            height: "25px",
                          }}
                        ></td>
                      </tr>
                    )}
                  </table>
                  <div
                    style={{
                      position: "absolute",
                      left: "136.94px",
                      top: `${
                        619.42 + (data.length > 0 ? data.length * 25 : 0)
                      }px`,
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">Người làm báo cáo</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "371.23px",
                      top: `${
                        619.42 + (data.length > 0 ? data.length * 25 : 0)
                      }px`,
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">Thủ trưởng đơn vị</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "372.31px",
                      top: `${
                        639.58 + (data.length > 0 ? data.length * 25 : 0)
                      }px`,
                    }}
                    className="cls_006"
                  >
                    <span className="cls_006">(Kí tên, đóng dấu)</span>
                  </div>
                </div>
              </div>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className="mr-12"
                onClick={() => this.props.handleClose()}
              >
                {t("Huỷ")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-16"
                onClick={() => this.handleFormSubmit()}
              >
                {t("In")}
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}
