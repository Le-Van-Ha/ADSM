import React, { useEffect } from "react";
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import NiceTextField from "./NiceTextField";

export default function ClassifyPatient(props) {
  const { formik, disabled, field } = props;

  const [check, setCheck] = React.useState(formik.values[field]);
  const [openTextField, setOpenTextField] = React.useState(-1);

  useEffect(() => {
    formik.values[field] = check;
    if (check == "OTHER") {
      setOpenTextField(1);
      formik.values.oldOrg = null;
    } else if (check == "ans4") {
      setOpenTextField(2);
      formik.values.otherClassify = null;
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
      <FormLabel>Phân loại bệnh nhân: </FormLabel>
      <RadioGroup
        aria-label="classify"
        name="classify"
        value={check}
        onChange={(e) => setCheck(e.target.value)}
      >
        <Grid container md={12} sm={12} xs={12}>
          <Grid item md={6} sm={6} xs={6}>
            <FormControlLabel
              value="ans1"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Mắc mới"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <FormControlLabel
              value="ans3"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Thất bại phác đồ lao trước đó"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <FormControlLabel
              value="ans2"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Tái phát"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <FormControlLabel
              value="ans5"
              disabled={disabled ? disabled : false}
              control={<Radio />}
              label="Điều trị lại sau bỏ trị"
            />
          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            xs={6}
            spacing={2}
            style={{ display: "inline-flex" }}
          >
            <Grid item md={4} sm={4} xs={4}>
              <FormControlLabel
                value="ans4"
                disabled={disabled ? disabled : false}
                control={<Radio />}
                label="Chuyển đến"
              />
            </Grid>
            {openTextField === 2 && (
              <Grid item md={6} sm={6} xs={6}>
                <NiceTextField
                  formik={formik}
                  field="oldOrg"
                  size="small"
                  label={"Cơ sở cũ"}
                  variant="outlined"
                  disabled={disabled ? disabled : false}
                />
              </Grid>
            )}
          </Grid>
          <Grid item md={6} sm={6} xs={6} style={{ display: "inline-flex" }}>
            <Grid item md={3} sm={3} xs={3}>
              <FormControlLabel
                value="OTHER"
                control={<Radio />}
                disabled={disabled ? disabled : false}
                label="Khác"
              />
            </Grid>
            {openTextField === 1 && (
              <Grid item md={7} sm={7} xs={7}>
                <NiceTextField
                  formik={formik}
                  field="otherClassify"
                  size="small"
                  label={"Cụ thể"}
                  variant="outlined"
                  disabled={disabled ? disabled : false}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </RadioGroup>
      <Grid container md={12} sm={12} xs={12}>
        {formik.touched[field] && formik.errors[field] && (
          <FormHelperText error>{formik.errors[field]}</FormHelperText>
        )}
      </Grid>
    </>
  );
}
