import React, {useEffect} from 'react';
import {
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Grid,
  } from "@material-ui/core";
import NiceTextField from './NiceTextField';

export default function PatientIncidentSelectTypeReport(props) {
    const {
        formik,
        field,
        disabled,
    } = props;

    const [check, setCheck] = React.useState(formik.values[field]);
    const [openTextField, setOpenTextField] = React.useState(-1);

    useEffect(() => {
        formik.values[field] = check
        if(check == "Bổ sung") {
            setOpenTextField(1);
        } else {
            setOpenTextField(-1);
            formik.values.reportSeq = null;
        }
    }, [check]);

    useEffect(() => {
        setCheck(formik.values[field])
    }, [field, formik.values]);

    return (
        <>
            <RadioGroup aria-label={field} name={field} value={check} onChange={(e) => setCheck(e.target.value)}>
                <Grid container md={12} sm={12} xs={12} style={{alignItems: "center"}}>
                    <Grid item md={3} sm={3} xs={3}>
                        <FormLabel disabled={disabled ? disabled : false}>Dạng báo cáo: </FormLabel>
                    </Grid>
                    <Grid item md={3} sm={3} xs={3}>
                        <FormControlLabel value="Lần đầu" control={<Radio />} label="Lần đầu" disabled={disabled ? disabled : false} />
                    </Grid>
                    <Grid item md={6} sm={6} xs={6} spacing={2} style={{display: "inline-flex"}}>
                        <Grid item md={5} sm={5} xs={5}>
                            <FormControlLabel value="Bổ sung" control={<Radio />} label="Bổ sung" disabled={disabled ? disabled : false}/>
                        </Grid>
                        {
                            openTextField === 1 && 
                            <Grid item md={7} sm={7} xs={7}>
                                <NiceTextField 
                                    formik={formik}
                                    field="reportSeq"
                                    size="small"
                                    label={"Lần thứ"}
                                    variant="outlined"
                                    type="number"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </RadioGroup>
        </>
    );
}