import React, { useEffect } from "react";
import { FormControlLabel, RadioGroup, Radio, Grid } from "@material-ui/core";

export default function ClassifyPatientIncident(props) {
  const { formik, disabled, field } = props;
  const [check, setCheck] = React.useState(formik.values[field]);
  useEffect(() => {
    formik.values[field] = check;
  }, [check]);

  useEffect(() => {
    setCheck(formik.values[field]);
  }, [field, formik.values]);

  return (
    <>
      <RadioGroup
        aria-label="classify"
        name="classify"
        value={check}
        onChange={(e) => setCheck(e.target.value)}
      >
        <Grid container md={12} sm={12} xs={12}>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <FormControlLabel
              value="lv1"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Độ 1"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <FormControlLabel
              value="lv2"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Độ 2"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <FormControlLabel
              value="lv3"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Độ 3"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <FormControlLabel
              value="lv4"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Độ 4"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </>
  );
}
