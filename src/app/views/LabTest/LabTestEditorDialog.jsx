import React from "react";
import { Dialog, DialogTitle, Icon, IconButton } from "@material-ui/core";
import { checkCode, addNew, update } from "./LabTestService";
import { toast } from "react-toastify";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import LabTestForm from "./LabTestForm";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

class LabTestEditorDialog extends React.Component {
    state = {
        id: "",
        name: "",
        code: "",
        orderNumber: "",
        normalNumberResult: "",
        averageNumberResult: "",
        description: "",
        labTestUnitDto: null
    };

    handleFormSubmit = (values) => {
        let { t, handleClose } = this.props;
        let { id } = this.state;
        var obj = {};
        obj.id = id;
        obj.code = values.code;
        obj.name = values.name;
        obj.orderNumber = values.orderNumber;
        obj.description = values.description;
        obj.averageNumberResult = values.averageNumberResult;
        obj.normalNumberResult = values.normalNumberResult;
        obj.labTestUnitDto = values.labTestUnitDto;
        checkCode(id, values.code).then((result) => {
            if (result.data) {
                toast.warning(t("toast.duplicate_code"));
            } else {
                if (id) {
                    update(obj).then(() => {
                        handleClose();
                        toast.success(t("toast.update_success"));
                    });
                } else {
                    addNew(obj).then(() => {
                        handleClose();
                        toast.success(t("toast.add_success"));
                    });
                }
            }
        });
    };

    componentDidMount() {
        let item = this.props.item;
        if (item) {
            this.setState({ ...item });
        }
    }

    render() {
        let { open, handleClose, t, readOnly } = this.props;
        let {
            id,
            code,
            name,
            orderNumber,
            description,
            normalNumberResult,
            averageNumberResult,
            labTestUnitDto
        } = this.state;

        return (
            <Dialog
                className="dialog-container"
                open={open}
                PaperComponent={PaperComponent}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    className="dialog-header bgc-primary-d1"
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    <span className="mb-20 text-white">
                        {(id ? t("general.button.edit") : t("general.button.add")) + " x??t nghi???m"}</span>
                    <IconButton
                        style={{ position: "absolute", right: "10px", top: "10px" }}
                        onClick={() => handleClose()}
                    >
                        <Icon color="disabled" title={t("general.close")}>
                            close
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <LabTestForm
                    initialValues={{
                        code: code ? code : null,
                        name: name ? name : null,
                        orderNumber: orderNumber ? orderNumber : null,
                        description: description ? description : null,
                        normalNumberResult: normalNumberResult ? normalNumberResult : null,
                        averageNumberResult: averageNumberResult
                            ? averageNumberResult
                            : null,
                        labTestUnitDto: labTestUnitDto ? labTestUnitDto : null
                    }}
                    handleSubmit={this.handleFormSubmit}
                    handleClose={handleClose}
                    readOnly={readOnly}
                />
            </Dialog>
        );
    }
}

export default LabTestEditorDialog;
