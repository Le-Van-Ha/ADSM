import {
    Grid,
    IconButton,
    Icon,
    Button,
    TablePagination,
    Tooltip,
} from '@material-ui/core'
import React from 'react'
import MaterialTable, {
    MTableToolbar,
} from 'material-table'
import { useTranslation } from 'react-i18next'
import {
    getAllByRoot,
    deleteItem,
    getItemById
} from './MenuService'
import MenuDialog from './MenuDialog'
import { Breadcrumb, ConfirmationDialog } from 'egret'
import { withStyles } from '@material-ui/core/styles'
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup'

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        position: "absolute",
        top: '-15px',
        left: '-30px',
        width: '80px'
    }
}))(Tooltip);

function MaterialButton(props) {
    const { t, i18n } = useTranslation()
    const item = props.item
    return (
        <div className="none_wrap">
            <LightTooltip title={t('general.button.editIcon')} placement="right-end" enterDelay={300} leaveDelay={200}>
                <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
                    <Icon fontSize="small" color="primary">edit</Icon>
                </IconButton>
            </LightTooltip>
            <LightTooltip title={t('general.button.deleteIcon')} placement="right-end" enterDelay={300} leaveDelay={200}>
                <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
                    <Icon fontSize="small" color="error">delete</Icon>
                </IconButton>
            </LightTooltip>
        </div>
    )
}
class Menu extends React.Component {
    state = {
        rowsPerPage: 5,
        page: 1,
        data: [],
        totalElements: 0,
        itemList: [],
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteAllDialog: false,
        keyword: '',
        shouldOpenNotificationPopup: false,
        Notification: ''
    }

    handleTextChange = (event) => {
        this.setState({ keyword: event.target.value })
    }

    handleKeyDownEnterSearch = (e) => {
        if (e.key === 'Enter') {
            this.search()
        }
    }
    componentDidMount = () => {
        this.updatePageData()
    }
    getListItemChild(item) {
        var result = [];
        var root = {};
        root.name = item.name;
        root.description = item.description;
        root.code = item.code;
        root.icon = item.icon;
        root.path = item.path;
        root.id = item.id;
        root.parentId = item.parentId;
        result.push(root);
        if (item.children) {
            item.children.forEach(child => {
                var childs = this.getListItemChild(child);
                result.push(...childs);
            });
        }
        return result;
    }
    updatePageData = () => {
        var searchObject = {}
        searchObject.keyword = ''
        searchObject.pageIndex = this.state.page + 1
        searchObject.pageSize = this.state.rowsPerPage
        getAllByRoot().then(({ data }) => {
            var itemList = [...data];
            var list = [];
            itemList.forEach(item => {
                var items = this.getListItemChild(item);
                list.push(...items);
            });
            this.setState({ itemList: list });
        })
    }
    setPage = (page) => {
        this.setState({ page }, function () {
            this.updatePageData()
        })
    }

    setRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 1 }, function () {
            this.updatePageData()
        })
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage)
    }

    handleOKEditClose = () => {
        this.setState(
            {
                shouldOpenEditorDialog: false,
                shouldOpenConfirmationDialog: false,
            },
            () => {
                this.updatePageData()
            }
        )
    }

    handleDelete = (id) => {
        this.setState({
            id,
            shouldOpenConfirmationDialog: true,
        })
    }
    handleDialogClose = () => {
        this.setState(
            {
                shouldOpenEditorDialog: false,
                shouldOpenConfirmationDialog: false,
                shouldOpenConfirmationDeleteAllDialog: false,
                shouldOpenNotificationPopup: false,
                data: [],
            },
            () => {
                this.updatePageData()
            }
        )
    }

    handleOKEditClose = () => {
        this.setState({
            shouldOpenEditorDialog: false,
            shouldOpenConfirmationDialog: false,
            shouldOpenConfirmationDeleteAllDialog: false,
        })
        this.setPage(0)
    }

    handleDelete = (id) => {
        this.setState({
            id,
            shouldOpenConfirmationDialog: true,
        })
    }

    handleConfirmationResponse = () => {
        if (this.state.itemList.length === 1 && this.state.page === 1) {
            let count = this.state.page - 1
            this.setState({
                page: count,
            })
        }
        deleteItem(this.state.id).then(() => {
            this.updatePageData();
            this.handleDialogClose()
        })
    }
    handleEditItem = (item) => {
        this.setState({
            item: item,
            shouldOpenEditorDialog: true,
        })

    }
    handleDeleteButtonClick = () => {
        if (
            typeof this.state.data === 'undefined' ||
            this.state.data.length === 0
        ) {
            this.setState({
                shouldOpenNotificationPopup: true,
                Notification: "general.button.noti_check_data"
            })
            // alert('Chưa chọn dữ liệu')
        } else {
            this.setState({ shouldOpenConfirmationDeleteAllDialog: true })
        }
    }
    handleDeleteAll = (event) => {
        this.handleDeleteList(this.state.data).then(() => {
            this.updatePageData()
            // this.handleDialogClose()
        })
    }

    render() {
        const { t, i18n } = this.props
        let { keyword, shouldOpenNotificationPopup } = this.state
        let TitlePage = t('menu.title')

        let columns = [
            {
                title: t('general.action'),
                field: 'custom',
                align: 'left',
                width: '150px',
                render: (rowData) => (
                    <MaterialButton
                        item={rowData}
                        onSelect={(rowData, method) => {
                            if (method === 0) {
                                getItemById(rowData.id).then(({ data }) => {
                                    if (data.parent === null) {
                                        data.parent = {}
                                    }
                                    this.setState({
                                        item: data,
                                        shouldOpenEditorDialog: true,
                                    })
                                })
                            } else if (method === 1) {
                                this.handleDelete(rowData.id)
                            } else {
                                alert('Call Selected Here:' + rowData.id)
                            }
                        }}
                    />
                ),
            },
            { title: t('general.menu.description'), field: 'description', align: 'left', width: '150' },
            { title: t('general.menu.name'), field: 'name', width: '150' },
            { title: t('general.menu.code'), field: 'code', align: 'left', width: '150' },

        ]
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: t('general.menu.title'), path: '/list/supplier' },
                            { name: t('general.menu.title') },
                        ]}
                    />
                </div>
                <Grid container spacing={2} justify="space-between">
                    <Grid item md={3} xs={12} >
                        <Button
                            className="align-bottom mr-16 mb-16"
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleEditItem(null)}
                        >
                            {t('general.button.add')}
                        </Button>
                        {/* <Button
              className="align-bottom mb-16"
              variant="contained"
              color="primary"
              onClick={this.handleDeleteButtonClick}
            >
              {t('general.delete')}
            </Button> */}

                        {this.state.shouldOpenConfirmationDeleteAllDialog && (
                            <ConfirmationDialog
                                open={this.state.shouldOpenConfirmationDeleteAllDialog}
                                onConfirmDialogClose={this.handleDialogClose}
                                onYesClick={this.handleDeleteAll}
                                text={t('general.button.deleteAllConfirm')}
                                cancel={t('general.button.cancel')}
                                agree={t('general.button.agree')}
                            />
                        )}
                        {/* <TextField
              label={t('Supplier.search')}
              className="mb-16 mr-10"
              style={{ width: '20%' }}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleTextChange}
              onKeyDown={this.handleKeyDownEnterSearch}
            />
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}
            >
              {t('general.search')}
            </Button> */}
                    </Grid>
                    {/* <Grid item md={6} sm={12} xs={12} >
            <FormControl fullWidth style={{marginTop:'6px'}}>
                <Input
                    className='search_box w-100'
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyDownEnterSearch}
                    placeholder={t("Supplier.search")}
                    id="search_box"
                    startAdornment={
                        <InputAdornment>
                             <Link> <SearchIcon 
                            onClick={() => this.search(keyword)}
                            style ={{position:"absolute",
                            top:"0",
                            right:"0"
                          }} /></Link>
                        </InputAdornment>
                    }
                />
            </FormControl>
          </Grid> */}
                    <Grid item xs={12}>
                        <div>
                            {this.state.shouldOpenEditorDialog && (
                                <MenuDialog
                                    t={t}
                                    i18n={i18n}
                                    handleClose={this.handleDialogClose}
                                    open={this.state.shouldOpenEditorDialog}
                                    handleOKEditClose={this.handleOKEditClose}
                                    item={this.state.item}
                                />
                            )}

                            {shouldOpenNotificationPopup && (
                                <NotificationPopup
                                    title={t('general.button.noti')}
                                    open={shouldOpenNotificationPopup}
                                    // onConfirmDialogClose={this.handleDialogClose}
                                    onYesClick={this.handleDialogClose}
                                    text={t(this.state.Notification)}
                                    agree={t('general.button.agree')}
                                />
                            )}

                            {this.state.shouldOpenConfirmationDialog && (
                                <ConfirmationDialog
                                    title={t('confirm_dialog.delete.title')}
                                    open={this.state.shouldOpenConfirmationDialog}
                                    onConfirmDialogClose={this.handleDialogClose}
                                    onYesClick={this.handleConfirmationResponse}
                                    text={t('confirm_dialog.delete.text')}
                                    agree={t('confirm_dialog.delete.agree')}
                                    cancel={t('confirm_dialog.delete.cancel')}
                                />
                            )}
                        </div>
                        <MaterialTable
                            data={this.state.itemList}
                            columns={columns}
                            //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                            parentChildData={(row, rows) => {
                                var list = rows.find((a) => a.id === row.parentId)
                                return list
                            }}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                                },
                                toolbar: {
                                    // nRowsSelected: '${t('general.selects')}',
                                    nRowsSelected: `${t('general.button.selects')}`
                                }
                            }}

                            options={{
                                selection: false,
                                actionsColumnIndex: -1,
                                paging: false,
                                search: false,
                                rowStyle: rowData => ({
                                    backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF',
                                }),
                                maxBodyHeight: '450px',
                                minBodyHeight: '370px',
                                headerStyle: {
                                    backgroundColor: '#358600',
                                    color: '#fff',
                                },
                                padding: 'dense',
                                toolbar: false,
                            }}
                            components={{
                                Toolbar: (props) => <MTableToolbar {...props} />,
                            }}
                            onSelectionChange={(rows) => {
                                this.setState({ data: rows })
                            }}
                        // actions={[
                        //   {
                        //     tooltip: 'Remove All Selected Users',
                        //     icon: 'delete',
                        //     onClick: (evt, data) => {
                        //       this.handleDeleteAll(data);
                        //       alert('You want to delete ' + data.length + ' rows');
                        //     }
                        //   },
                        // ]}
                        />
                        <TablePagination
                            align="left"
                            className="px-16"
                            rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
                            component="div"
                            labelRowsPerPage={t('general.rows_per_page')}
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
                            count={this.state.totalElements}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.setRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Menu
