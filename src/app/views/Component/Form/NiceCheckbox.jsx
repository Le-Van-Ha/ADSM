import React, { useEffect } from 'react';
import { Field } from "formik";
import {
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { FormatColorReset } from '@material-ui/icons';
export default function NiceCheckbox(props) {
    const {
        formik,
        disabled,
        field,
        label,
        isCollapse,
        collapseNode,
        collapseIndex,

    } = props;

    const [check, setCheck] = React.useState(formik.values[field] ? formik.values[field] : false);
    let obj = formik.values[collapseNode];

    const handleChange = () => {
        if (isCollapse == true) {
            if (obj == null) {
                obj = []
            }

            if (collapseIndex != null) {
                obj[collapseIndex][field] = !check;
            } else {
                obj[field] = !check;
            }
        }
        setCheck(!check);
    }

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                obj[collapseIndex][field] = check;
            } else {
                obj[field] = check;
            }

        } else {
            formik.values[field] = check;
        }
    }, [check]);

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                setCheck(obj[collapseIndex][field]);
            } else {
                setCheck(obj[field]);
            }

        } else {
            setCheck(formik.values[field]);
        }
    }, []);

    return (
        <>
            <FormControlLabel
                value={check ? check : false}
                // className="mb-16"
                name={field}
                onChange={() => { handleChange() }}
                control={<Checkbox checked={check} />}
                label={label}
                disabled={disabled ? disabled : false}
            />
        </>
    );
}