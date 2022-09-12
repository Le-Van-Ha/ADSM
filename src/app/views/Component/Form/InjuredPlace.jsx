import React, { useEffect } from "react";
import {
  FormControlLabel,
  FormLabel,
  Checkbox,
  Grid,
  FormHelperText,
} from "@material-ui/core";
export default function InjuredPlace(props) {
  const { formik, disabled } = props;
  const [lungDamage, setLungDamage] = React.useState(
    formik.values.lungDamage ? formik.values.lungDamage : false
  );
  const [outOfLungDamage, setOutOfLungDamage] = React.useState(
    formik.values.outOfLungDamage ? formik.values.outOfLungDamage : false
  );
  const [bothDamage, setBothDamage] = React.useState(
    formik.values.bothDamage ? formik.values.bothDamage : false
  );
  const [unknown, setUnknown] = React.useState(
    formik.values.unknown ? formik.values.unknown : false
  );

  const handleChange = (source) => {
    if (source === "lungDamage") {
      if (lungDamage == false) {
        setOutOfLungDamage(false);
        setBothDamage(false);
        setUnknown(false);
      }
      setLungDamage(!lungDamage);
    }
    if (source === "outOfLungDamage") {
      if (outOfLungDamage == false) {
        setLungDamage(false);
        setBothDamage(false);
        setUnknown(false);
      }
      setOutOfLungDamage(!outOfLungDamage);
    }
    if (source === "bothDamage") {
      if (bothDamage == false) {
        setLungDamage(false);
        setOutOfLungDamage(false);
        setUnknown(false);
      }
      setBothDamage(!bothDamage);
    }
    if (source === "unknown") {
      if (unknown == false) {
        setLungDamage(false);
        setOutOfLungDamage(false);
        setBothDamage(false);
      }
      setUnknown(!unknown);
    }
  };

  useEffect(() => {
    formik.values.lungDamage = lungDamage;
    formik.values.outOfLungDamage = outOfLungDamage;
    formik.values.bothDamage = bothDamage;
    formik.values.unknown = unknown;
  }, [lungDamage, outOfLungDamage, bothDamage, unknown]);

  useEffect(() => {
    setLungDamage(formik.values.lungDamage);
    setOutOfLungDamage(formik.values.outOfLungDamage);
    setBothDamage(formik.values.bothDamage);
    setUnknown(formik.values.unknown);
  }, []);

  return (
    <>
      <Grid container md={12} sm={12} xs={12}>
        <FormLabel className="mt-16">Vị trí tổn thương: </FormLabel>
        <FormControlLabel
          className="ml-8"
          value={lungDamage ? lungDamage : false}
          name="lungDamage"
          onChange={() => {
            handleChange("lungDamage");
          }}
          control={<Checkbox checked={lungDamage} />}
          label="Phổi"
          disabled={disabled ? disabled : false}
        />
        <FormControlLabel
          value={outOfLungDamage ? outOfLungDamage : false}
          name="outOfLungDamage"
          onChange={() => {
            handleChange("outOfLungDamage");
          }}
          control={<Checkbox checked={outOfLungDamage} />}
          label="Ngoài phổi"
          disabled={disabled ? disabled : false}
        />
        <FormControlLabel
          value={bothDamage ? bothDamage : false}
          name="bothDamage"
          onChange={() => {
            handleChange("bothDamage");
          }}
          control={<Checkbox checked={bothDamage} />}
          label="Cả hai"
          disabled={disabled ? disabled : false}
        />
        <FormControlLabel
          value={unknown ? unknown : false}
          name="unknown"
          onChange={() => {
            handleChange("unknown");
          }}
          control={<Checkbox checked={unknown} />}
          label="Không rõ"
          disabled={disabled ? disabled : false}
        />
      </Grid>
      <Grid container md={12} sm={12} xs={12}>
        {formik.touched["lungDamage"] && formik.errors["damagePosition"] && (
          <FormHelperText error>
            {formik.errors["damagePosition"]}
          </FormHelperText>
        )}
      </Grid>
    </>
  );
}
