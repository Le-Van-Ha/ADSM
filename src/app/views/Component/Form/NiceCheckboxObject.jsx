import React, { useEffect } from 'react';
import { Field } from "formik";
import {
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
export default function NiceCheckbox(props) {
    const {
        formik,
        disabled,
        field,
        label,
        nameObj
    } = props;

    const [check, setCheck] = React.useState(formik.values[nameObj] ? (formik.values[nameObj][field] ? formik.values[nameObj][field] : false) : false);
    useEffect(() => {
        if (nameObj) {

            if (formik.values[nameObj]) {
                const p = formik.values[nameObj];
                p[field] = {};
                if (field) {
                    p[field] = check;
                    formik.setFieldValue(nameObj, p)
                }
            } else {
                const p = {}
                p[field] = {}

                if (field) {
                    p[field] = check;
                    formik.setFieldValue(nameObj, p)
                }
            }
        }
        if (formik.values[nameObj] && formik.values[nameObj][field]) {
            formik.values[nameObj][field] = check;
        }
    }, [check]);
    useEffect(() => {
        if (formik.values[nameObj] && formik.values[nameObj][field]) {
            setCheck(formik.values[nameObj][field])
        }

    }, [field, formik.values]);
    return (
        <>
            <FormControlLabel
                value={check}
                // className="mb-16"
                name={field}
                onChange={() => {
                    setCheck(!check)
                }}
                control={<Checkbox checked={check} />}
                label={label}
                disabled={disabled ? disabled : false}
            />
        </>
    );
}