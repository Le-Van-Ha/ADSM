import React, { useEffect } from 'react';
import {
    makeStyles,
    TextField,
    FormControl
} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CollectionsOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    }
}));


export default function NiceAutocomplete(props) {
    // const classes = useStyles();
    const {
        formik,
        field,
        label,
        options,
        variant,
        multiple,
        required,
        size,
        displayData,
        disabled,
        classes,
        isCollapse,//Nếu field cần set giá trị thuộc một object con của formik.value (formik.values.object.field) thì truyền isCollapse = true
        collapseNode,//tên của object cha của field
        collapseIndex//nếu collapseNode là một list thì truyền thêm index, không truyền index nếu như collapseNode không phải là một list
    } = props;

    const [value, setValue] = React.useState(formik.values[field]);
    //init value 

    let obj = formik.values[collapseNode];
    //tạo obj

    const handleChange = (event, value) => {
        if (isCollapse == true) { 
            if (obj == null) {
                obj = []   //xóa dữ liệu thì object thành null
            }
            if (collapseIndex != null) {
                obj[collapseIndex][field] = value;//nếu collapseNode là list
            } else {
                obj[field] = value;//nếu collapseNode không là list
            }
        }
        setValue(value)
    }

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                setValue(obj[collapseIndex][field])
            } else {
                setValue(obj[field])
            }

        } else {
            setValue(formik.values[field])
        }
        
    }, []);

    useEffect(() => {
        if (isCollapse == true) {
            if (collapseIndex != null) {
                obj[collapseIndex][field] = value
            } else {
                obj[field] = value
            }

        } else {
            formik.values[field] = value
        }
    }, [value]);

    return ( //NiceAutoComplete sẽ set một obj vào formik, nếu chỉ muốn set field vào formik thì đọc những dòng đã được comment 
        <Autocomplete
            classes={classes}
            multiple={multiple ? multiple : false}
            disabled={disabled ? disabled : false}
            value={value ? value : null}
            id={field}
            name={field}
            onChange={(event, value) => {
                // formik.setFieldValue(field, value);
                handleChange(event, value);
            }}
            options={options}
            // options={options.map(option => option[idData ? idData : "code"])}

            getOptionLabel={(option) => option[displayData ? displayData : "name"] ? option[displayData ? displayData : "name"] : ""}
            // getOptionLabel={(optionId) =>
            //     options.filter(option => option[idData ? idData : "id"] === optionId)[0]?.[displayData ? displayData : "name"]
            // }
            getOptionSelected={(option, value) => option.id === value.id}

            filterSelectedOptions
            renderInput={params => (
                <TextField
                    {...params}
                    required={required ? required : false}
                    size={size}
                    variant={variant}
                    label={label}
                    error={formik.touched[field] && Boolean(formik.errors[field])} //validate
                    helperText={formik.touched[field] && formik.errors[field]} //validate
                />
            )}
        />
    );

}