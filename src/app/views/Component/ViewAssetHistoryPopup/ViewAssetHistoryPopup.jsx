import React, { Component } from 'react'
import {
    Dialog,
    Button,
    Grid,
    DialogActions
} from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import DialogContent from '@material-ui/core/DialogContent'
import ScrollableTabsButtonForce from './ScrollableTabsButtonForce'
import { historyOfAllocationTransfer, historyOfBrokenMessageAndRepair } from '../../Asset/AssetService'

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    )
}
class ViewAssetHistoryPopup extends Component {
    state = {
        allocationTransfer: [],
        maintainRequest: [],
        rokenMessageAndRepair: [],
        totalElements: 0,
        page: 0,
        rowsPerPage: 10000
    }

    componentWillMount() {
        this.updatePageData();
    }

    updatePageData = () => {
        let { item } = this.props;
        this.setState({ allocationTransfer: null, brokenMessageAndRepair: null })
        let searchAssetId = {}
        searchAssetId.id = item
        searchAssetId.pageIndex = this.state.page
        searchAssetId.pageSize = this.state.rowsPerPage
        historyOfAllocationTransfer(searchAssetId).then(data => {
            this.setState({
                allocationTransfer: data.data,
                totalElements: data.data.totalElements,
            })
        })

        historyOfBrokenMessageAndRepair(searchAssetId).then(data => {
            this.setState({
                brokenMessageAndRepair: data.data,
                totalElements: data.data.totalElements,
            })
        })
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage)
    }

    setRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
            this.updatePageData()
        })
    }

    componentDidMount() { }

    render() {
        let { open, t, i18n } = this.props

        return (
            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                maxWidth="lg"
                fullWidth={true}
                scroll={'paper'}
            >
                <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}
                    style={{
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column"
                    }} >
                    <DialogTitle style={{ cursor: 'move', }} id="draggable-dialog-title">
                        <span className="mb-20">{t('Asset.viewHistory')}</span>
                    </DialogTitle>
                    <DialogContent >
                        <Grid container spacing={1} className="">
                            <ScrollableTabsButtonForce
                                t={t}
                                i18n={i18n}
                                item={this.state}
                            />
                        </Grid>
                    </DialogContent>
                    <DialogActions >
                        <div className="flex flex-space-between flex-middle">
                            <Button
                                variant="contained"
                                className="mr-36"
                                color="secondary"
                                onClick={() => this.props.handleClose()}
                            >
                                {t('general.close')}
                            </Button>

                        </div>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        )
    }
}

export default ViewAssetHistoryPopup
