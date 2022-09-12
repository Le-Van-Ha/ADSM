import React, { useEffect } from "react";
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./InputPopup.scss";
import { useTranslation } from "react-i18next";
import SelectParentPopup from "./SelectParentPopup";

export default function InputPopup(props) {
  const { t } = useTranslation();
  const {
    formik,
    roles,
    field,
    size,
    required,
    variant,
    label,
    disabled,
    classes,
    manager,
    screening,
    confirmation,
    treatment,
    checking,
    tree,
    parentId,
    onSelectChange,
  } = props;

  const [openPopup, handleOpenPopup] = React.useState(false);
  const [selectedItem, handleSelectItem] = React.useState(formik.values[field]);

  const handleSelect = (item) => {
    handleOpenPopup(false);
    handleSelectItem(item);
    switch (item.level) {
      case 3:
        onSelectChange("province");
        break;
      case 4:
        onSelectChange("district");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    formik.values[field] = selectedItem;
  }, [selectedItem]);

  return (
    <div className="input-popup-container">
      <TextField
        disabled
        fullWidth
        classes={classes}
        id={field}
        size={size}
        name={field}
        label={label}
        value={selectedItem ? (selectedItem.name ? selectedItem.name : "") : ""}
        onChange={formik.handleChange}
        required={required ? required : false}
        variant={variant}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
      />
      <Button
        size="small"
        className="btn btn-primary-d"
        style={{ float: "right" }}
        variant="contained"
        onClick={() => handleOpenPopup(true)}
      >
        {t("general.button.select")}
      </Button>
      {openPopup && (
        <SelectParentPopup
          open={openPopup}
          handleSelect={handleSelect}
          selectedItem={selectedItem ? selectedItem : {}}
          handleClose={() => handleOpenPopup(false)}
          t={t}
          level={props.level ? props.level : null}
          manager={manager ? manager : false}
          screening={screening ? screening : false}
          confirmation={confirmation ? confirmation : false}
          treatment={treatment ? treatment : false}
          checking={checking ? checking : false}
          tree={tree ? tree : false}
          formik={formik}
          parentId={parentId}
        />
      )}
    </div>
  );
}
