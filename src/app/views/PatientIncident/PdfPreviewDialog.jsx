import {
  Icon,
  Button,
  DialogActions,
  Dialog,
  IconButton,
} from "@material-ui/core";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import BlockIcon from "@material-ui/icons/Block";
import GetAppIcon from "@material-ui/icons/GetApp";

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
class PdfPreviewDialog extends React.Component {
  state = {};

  render() {
    const { t, handleClose, open } = this.props;
    let { files } = this.state;

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
          <span className="mb-20 text-white">Biến cố bất lợi</span>
          <IconButton
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() => handleClose()}
          >
            <Icon color="disabled" title={t("general.button.close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        {/* <div className="dialog-body"> */}
        <DialogContent className="o-hidden">
          <object
            data={`${this.props.pdfUrl}#toolbar=0`}
            width="100%"
            height={600}
            type="application/pdf"
          />
        </DialogContent>
        {/* </div> */}
        <div className="dialog-footer">
          <DialogActions className="p-0">
            <div className="flex flex-space-between flex-middle">
              <Button
                startIcon={<GetAppIcon />}
                variant="contained"
                className="background-color-mariner mr-12 btn btn-secondary d-inline-flex"
                color="primary"
                download="Yếu Tố Bất Lợi.pdf"
                href={this.props.pdfUrl}
              >
                {t("general.button.download")}
              </Button>

              <Button
                startIcon={<BlockIcon />}
                variant="contained"
                className="mr-12 btn btn-secondary d-inline-flex"
                color="secondary"
                onClick={() => handleClose()}
              >
                {t("general.button.cancel")}
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}
export default PdfPreviewDialog;
