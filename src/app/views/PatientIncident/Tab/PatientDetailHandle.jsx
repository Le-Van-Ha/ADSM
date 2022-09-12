import React from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import AddIcon from "@material-ui/icons/Add";
import NiceActionButton from "../../Component/Table/NiceActionButton";
import "./DynamicTableStyles.css";
import viLocale from "date-fns/locale/vi";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function PatientDetailHandle(props) {
  const { t, formik, disabled } = props;
  const [handlingDetails, setHandlingDetails] = React.useState(
    formik.values.handlingDetails ?? []
  );

  const handleChangeTextField = (index, event, list, field) => {
    let listData = formik.values[list];
    if (listData == null) {
      listData = [];
    }
    listData[index][field] = event.target.value;
    formik.setFieldValue(list, listData);
  };

  const handleChangeDate = (index, date, list, field) => {
    let listData = formik.values[list];
    if (listData == null) {
      listData = [];
    }
    listData[index][field] = date;
    formik.setFieldValue(list, listData);
  };

  const handleAddRow = () => {
    let list = [];
    list = handlingDetails;
    list.push({ date: null, detail: null });

    setHandlingDetails(list);
    formik.setFieldValue("handlingDetails", handlingDetails);
  };
  const handleRemoveRow = (rowId) => {
    let list = [];
    list = handlingDetails;
    list.splice(rowId, 1);
    setHandlingDetails(list);
    formik.setFieldValue("handlingDetails", handlingDetails);
  };

  const columns = [
    {
      title: t("Ngày xử trí"),
      field: "date",
      align: "center",
      width: "100%",
      render: (rowData) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
          <KeyboardDatePicker
            fullWidth
            id="testDate"
            name="date"
            openTo="year"
            views={["year", "month", "date"]}
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            InputAdornmentProps={{ position: "end" }}
            onChange={(date) =>
              handleChangeDate(
                rowData.tableData.id,
                date,
                "handlingDetails",
                "date"
              )
            }
            value={rowData.date ? rowData.date : null}
            disableFuture={true}
            maxDateMessage={t("general.maxDateMessage")}
            invalidDateMessage={t("general.invalidDateMessage")}
            disabled={disabled ? disabled : false}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: t("Chi tiết xử trí"),
      field: "labName",
      align: "center",
      width: "100%",
      render: (rowData) => (
        <TextField
          value={rowData.detail}
          className="w-100"
          name="detail"
          onChange={(event) =>
            handleChangeTextField(
              rowData.tableData.id,
              event,
              "handlingDetails",
              "detail"
            )
          }
          type="text"
          variant="outlined"
          size="small"
          disabled={disabled ? disabled : false}
        />
      ),
    },
    {
      title: "",
      field: "custom",
      width: "10%",
      align: "center",
      render: (rowData) => (
        <NiceActionButton
          item={rowData}
          size="small"
          fontSize="small"
          color="error"
          icon="delete"
          title={t("general.button.delete")}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleRemoveRow(rowData.tableData.id);
            }
          }}
          disabled={disabled ? disabled : false}
        />
      ),
    },
  ];

  return (
    <Grid item md={12} className="dynamic-table">
      <Button
        className="mb-16 mr-16 btn btn-success d-inline-flex"
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          handleAddRow();
        }}
        disabled={disabled ? disabled : false}
      >
        {t("general.button.add")}
      </Button>
      <MaterialTable
        className="dynamic-table"
        data={formik.values.handlingDetails ?? []}
        columns={columns}
        options={{
          toolbar: false,
          selection: false,
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          tableLayout: "fixed",
          padding: "dense",
          border: "none",
          cellStyle: { border: "none" },
          headerStyle: {
            backgroundColor: "#2a80c8",
            color: "#fff",
          },
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 === 1 ? "rgb(237, 245, 251)" : "#FFF",
          }),
        }}
        components={{
          Toolbar: (props) => (
            <div style={{ textHeader: "center" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
          },
        }}
      />
    </Grid>
  );
}
