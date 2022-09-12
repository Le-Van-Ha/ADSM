import React, { useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import "./InputPopup.scss";
import { useTranslation } from "react-i18next";
import SelectParentPopup from "./SelectParentPopup";
import { searchByPage } from "../../HealthOrg/HealthOrgService";
export default function InputPopup(props) {
    const { t } = useTranslation();
    const {
        formik,
        field,
        size,
        required,
        variant,
        label,
        valuePatient,
        disabled,
        classes,
        manager,
        screening,
        confirmation,
        treatment,
        checking,
        tree,
        isAddNew,
    } = props;

    const [openPopup, handleOpenPopup] = React.useState(false);
    const [selectedItem, handleSelectItem] = React.useState(formik.values[field]);

    const handleSelect = (item) => {
        handleOpenPopup(false);
        handleSelectItem(item);
    };

    useEffect(() => {
        if (formik.values[field] == null) {
            let searchObject = {};
            searchObject.pageIndex = 0;
            searchObject.pageSize = 1;
            searchByPage(searchObject).then(({ data }) => {
                handleSelectItem([...data.content][0]);
                formik.setFieldValue(field, [...data.content][0]);
            });
        } 
        
    }, [formik.values[field]]);

    
    useEffect(() => {
        if (isAddNew || (isAddNew === undefined)) {
            return;
        }
        if (valuePatient) {
            handleSelectItem(valuePatient[field]);
        } else {
            formik.values[field] = null;
        }
    }, [valuePatient ? valuePatient[field] : null]);


    useEffect(() => {
        formik.values[field] = selectedItem;
    }, [selectedItem]);

    

    useEffect(() => {
        handleSelectItem(formik.values[field]);
        formik.setFieldValue(field, selectedItem);
    }, [formik.values, field, selectedItem]);

    return (
        <div className="input-popup-container">
            <TextField
                fullWidth
                classes={classes}
                id={field}
                size={size}
                name={field}
                label={label}
                value={selectedItem ? (selectedItem.name ? selectedItem.name : "") : ""}
                onChange={formik.handleChange}
                variant={variant}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                disabled={disabled ? disabled : false}
            />
            {!disabled && (
                <Button
                    size="small"
                    className="btn btn-primary-d"
                    style={{ float: "right" }}
                    variant="contained"
                    onClick={() => handleOpenPopup(true)}
                >
                    {t("general.button.select")}
                </Button>
            )}
            {openPopup && (
                <SelectParentPopup
                    open={openPopup}
                    handleSelect={handleSelect}
                    selectedItem={selectedItem ? selectedItem : {}}
                    handleClose={() => handleOpenPopup(false)}
                    t={t}
                    manager={manager ? manager : false}
                    screening={screening ? screening : false}
                    confirmation={confirmation ? confirmation : false}
                    treatment={treatment ? treatment : false}
                    checking={checking ? checking : false}
                    tree={tree ? tree : false}
                />
            )}
        </div>
    );
}
