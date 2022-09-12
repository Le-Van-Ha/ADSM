import React, { useEffect } from "react";
import { TextField, FormControl } from "@material-ui/core";
export default function NiceTextField(props) {
    const {
        formik,
        field,
        label,
        valuePatient,
        variant,
        required,
        size,
        classes,
        disabled,
        type,
        isCollapse,
        collapseNode,
        collapseIndex,
        align,
        multiline,
        rows,
        isAddNew,
    } = props;

    const [value, setValue] = React.useState(formik.values[field]);
    let obj = collapseNode ? formik.values[collapseNode] : null;

    const handleChange = (event) => {
        if (isCollapse == true) {
            if (obj == null) {
                obj = [];
            }

            if (collapseIndex != null) {
                obj[collapseIndex][field] = event.target.value;
            } else {
                obj[field] = event.target.value;
            }
        }
        setValue(event.target.value);
    };

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                setValue(obj[collapseIndex][field]);
            } else {
                setValue(obj[field]);
            }
        } else {
            if (!isAddNew) {
                return;
            }
            setValue(formik.values[field]);
        }
    }, [formik.values[field]]);


    useEffect(() => {
        if (isAddNew || (isAddNew === undefined)) {
            return;
        }
        if (valuePatient) {
            setValue(valuePatient[field]);
        } else {
            setValue(null);
        }
    }, [valuePatient ? valuePatient[field] : null]);

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                obj[collapseIndex][field] = value;
            } else {
                obj[field] = value;
            }
        } else {
            formik.setFieldValue(field, value);
        }
    }, [value]);


    return (
        <TextField
            disabled={disabled ? disabled : false}
            fullWidth
            type={type ? type : "text"}
            classes={classes}
            id={field}
            size={size}
            name={field}
            label={label}
            variant={variant}
            value={value ? value : ""}
            onChange={(event) => handleChange(event)}
            required={required ? required : false}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            InputProps={{
                style: { textAlign: align ? align : "left" },
                inputProps: { min: 0 },
            }}
            multiline={multiline ? multiline : false}
            rows={rows ? rows : null}
            {...props}
        />
    );
}
