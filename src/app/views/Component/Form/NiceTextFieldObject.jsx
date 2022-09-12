import React, { useEffect } from 'react'
import {
    TextField,
    FormControl
} from '@material-ui/core';
export default function NiceTextField(props) {
    const {
        formik,
        field,
        label,
        variant,
        required,
        size,
        classes,
        disabled,
        type,
        nameObj
    } = props;

    const [value, setValue] = React.useState(formik.values[nameObj] ? (formik.values[nameObj][field] ? formik.values[nameObj][field] : null) : null);

    useEffect(() => {
        if (nameObj) {
            if (formik.values[nameObj]) {
                const p = formik.values[nameObj];
                p[field] = {};
                if (field) {
                    p[field] = value;
                    formik.setFieldValue(nameObj, p)
                }
            } else {
                const p = {}
                p[field] = {}
                if (field) {
                    p[field] = value;
                    formik.setFieldValue(nameObj, p)
                }
            }
        }
    }, [value]);

    useEffect(() => {
        if (formik.values[nameObj] && formik.values[nameObj][field]) {
            setValue(formik.values[nameObj][field])
        }
    }, [field, formik.values]);

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
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required={required ? required : false}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            disabled={ disabled ? disabled: false}
        />

    )

}