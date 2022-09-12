import { Button, TextField, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default class DengueFilter extends Component {
  state = {
    fromQuarter: null,
    toQuarter: null,
    fromYear: null,
    toYear: null,
    checkQuarterFrom: false,
    checkYearFrom: false,
  };

  clearFilter = () => {
    this.setState(
      {
        fromQuarter: null,
        toQuarter: null,
        fromYear: null,
        toYear: null,
      },
      () => this.props.handleFilter(this.state)
    );
  };

  componentDidMount() {}

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("checkQuarterFrom");
  }

  handleSelect = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  onHandleFilter = () => {
    const { fromQuarter, toQuarter, fromYear, toYear } = this.state;
    if (fromYear > toYear) {
      this.setState({ checkYearFrom: true, checkQuarterFrom: false });
    } else if (fromYear === toYear && toQuarter < fromQuarter) {
      this.setState({ checkQuarterFrom: true, checkYearFrom: false });
    } else {
      this.setState({ checkQuarterFrom: false, checkYearFrom: false });
      this.props.handleFilter(this.state);
    }
  };

  render() {
    const {
      fromQuarter,
      toQuarter,
      fromYear,
      toYear,
      checkQuarterFrom,
      checkYearFrom,
      required,
    } = this.state;
    const { t } = this.props;

    return (
      <ValidatorForm
        ref="form"
        className="filter-containers"
        onSubmit={() => this.onHandleFilter()}
      >
        <Grid container spacing={2}>
          <Grid item md={3} sm={6} xs={12}>
            <Autocomplete
              options={["1", "2", "3", "4"]}
              getOptionLabel={(option) => option}
              onChange={(event, value) =>
                this.handleSelect(value, "fromQuarter")
              }
              value={fromQuarter}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  label={<span>{t("Lọc từ quý")}</span>}
                />
              )}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                openTo="year"
                views={["year"]}
                autoOk
                variant="inline"
                label={t("Lọc từ năm")}
                inputVariant="outlined"
                size="small"
                InputAdornmentProps={{ position: "end" }}
                value={fromYear}
                onChange={(event, date) => this.handleSelect(date, "fromYear")}
                disableFuture={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Autocomplete
              options={["1", "2", "3", "4"]}
              getOptionLabel={(option) => option}
              onChange={(event, value) => this.handleSelect(value, "toQuarter")}
              value={toQuarter}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  label={<span>{t("Lọc đến quý")}</span>}
                  error={checkQuarterFrom}
                  helperText={
                    <span>
                      {checkQuarterFrom == true
                        ? "Lọc đến quý thong thể nhỏ hơn lọc từ quý trong cùng năm"
                        : ""}
                    </span>
                  }
                />
              )}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                openTo="year"
                views={["year"]}
                autoOk
                variant="inline"
                label={t("Lọc đến năm")}
                inputVariant="outlined"
                size="small"
                InputAdornmentProps={{ position: "end" }}
                error={checkYearFrom}
                helperText={
                  <span style={{ color: "red" }}>
                    {checkYearFrom == true
                      ? "Lọc đến năm không thể nhỏ hơn lọc từ năm"
                      : ""}
                  </span>
                }
                value={toYear}
                onChange={(event, date) => this.handleSelect(date, "toYear")}
                disableFuture={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="default"
              className="ml-12"
              type="button"
              onClick={this.clearFilter}
            >
              {t("general.button.reset")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="ml-12"
              type="submit"
            >
              {t("general.button.search")}
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}
