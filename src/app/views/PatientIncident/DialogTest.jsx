import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { searchByPage as searchAllPatient } from "../Patient/PatientService";

export default class DialogTest extends React.Component {
  state = {
    text: "",
    listPatientIncident: [],
  };

  selectPatientIncident = (patient) => {
    if (patient != null && patient.displayName != null) {
      this.setState({ patient: patient, text: patient.displayName }, () => {
        this.props.onChangePatient(patient);
      });
    } else {
      this.setState({ patient: null, text: null });
      this.props.onChangePatient(patient);
    }
  };

  getAllPatientIncident = () => {
    let searchObject = { pageIndex: 0, pageSize: 10000000 };
    searchAllPatient(searchObject).then(({ data }) => {
      this.setState({ listPatientIncident: [...data.content] });
    });
  };

  componentDidMount() {
    this.getAllPatientIncident();
  }

  render() {
    let { listPatientIncident } = this.state;
    let { field, label, valuePatient } = this.props;
    return (
      <Autocomplete
        options={listPatientIncident ? listPatientIncident : []}
        value={valuePatient ? valuePatient : null}
        getOptionLabel={(option) =>
          field === "name" ? option?.displayName : option?.eTBCode
        }
        onChange={(event, value) => this.selectPatientIncident(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={<span>{label}</span>}
            size="small"
            variant="outlined"
          />
        )}
        {...this.props}
      />
    );
  }
}
