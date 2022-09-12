import React, { useEffect } from "react";
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Grid,
} from "@material-ui/core";
import NiceTextField from "app/views/Component/Form/NiceTextField";
import NiceDatePicker from "app/views/Component/Form/NiceDatePicker";

export default function ResultPatientIncident(props) {
  const { t, formik, disabled, field } = props;

  const [check, setCheck] = React.useState(formik.values[field]);
  const [openTextField, setOpenTextField] = React.useState(-1);

  useEffect(() => {
    formik.values[field] = check;
    if (check == "result4") {
      setOpenTextField(2);
      formik.values.recoveryHaveSequelaeDetails = null;
    } else if (check == "result5") {
      setOpenTextField(1);
      formik.values.dayOfDeath = null;
    } else {
      setOpenTextField(-1);
      formik.values.oldOrg = null;
      formik.values.otherClassify = null;
    }
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
          <Grid item md={6} sm={6} xs={12} spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                value="result3"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Hồi phục không có di chứng"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                value="result2"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Đang hồi phục"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                value="result1"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Chưa hồi phục"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value="UNKNOWN"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Không rõ"
              />
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12} spacing={2} className="px-8">
            <Grid item xs={12}>
              <FormControlLabel
                value="result4"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Hồi phục có di chứng"
              />
            </Grid>
            {openTextField === 2 && (
              <Grid item xs={12}>
                <NiceTextField
                  formik={formik}
                  field="recoveryHaveSequelaeDetails"
                  size="small"
                  label={"Cụ thể"}
                  variant="outlined"
                  disabled={disabled ? disabled : false}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControlLabel
                value="result5"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Tử vong"
              />
            </Grid>
            {openTextField === 1 && (
              <Grid item xs={12}>
                <NiceDatePicker
                  formik={formik}
                  label="Ngày tử vong"
                  format={"dd/MM/yyyy"}
                  field="dod"
                  size="small"
                  inputVariant="outlined"
                  disableFuture={true}
                  maxDateMessage={t("general.maxDateMessage")}
                  invalidDateMessage={t("general.invalidDateMessage")}
                  disabled={disabled ? disabled : false}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </RadioGroup>
    </>
  );
}
