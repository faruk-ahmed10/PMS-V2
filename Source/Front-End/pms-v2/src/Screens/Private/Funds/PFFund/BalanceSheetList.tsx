import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {css} from "@emotion/css";
import {createStyles, makeStyles, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../../App/Init/AppProvider';
import Button from 'react-bootstrap/Button'
import FontAwesome from "react-fontawesome";

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import ContractorList from "../../Contractors/ContractorList";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from "../../../../Layouts/Components/Global/TextField/TextField";

const __css_Table = css(`
    font-size: 12px;
    
    & th {
        border-top: 0;
    }
    & th.center {
        text-align: center;
    }
    & td {
        padding: 0 5px;
        vertical-align: middle;
    }
    
    & td:first-child {
        text-align: center;
    }
    
    & td.center {
        text-align: center;
    }
    
    & td.right {
        text-align: right;
    }
`);

const __css_paginator_input = css(`
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    width: 60px;
    text-align: center;
    outline: 0;
    font-size: 12px;
    padding: 4px;
    margin-right: 10px;
`);

const __css_paginator_select = css(`
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    width: 100px;
    text-align: center;
    outline: 0;
    font-size: 12px;
    padding: 5px;
    margin-right: 10px;
`);

const __css_paginator_total_pages = css(`
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
`);

const __css_navTab = css(`
    & .nav-item a.nav-link {
        color: #4d4d4d !important;
        font-size: 13px;
    }
    
    & .nav-item a.active {
        color: blue !important;
        font-weight: bold;
    }
`);


const __css_CreateFundBtn = css(`
    padding: 3px 6px;
    font-size: 13px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ContractorListDialog = ({open, data, onClose}: { open: boolean, data: Array<any>, onClose(): void }) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dev/Partners
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                <ContractorList ReceiverMode={true} ReceiverData={data}/>
            </div>
        </Dialog>
    );
};


const BalanceSheetFundEditDialog = ({open, onClose, data, onChangeData, onSubmit}: any) => {
    return (
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Edit Balance Sheet Data
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    type={"text"}
                    label={"Session"}
                    value={data.session}
                />
                <TextField
                    type={"text"}
                    label={"Sub Head Name"}
                    value={data.sub_head_name}
                />
                <TextField
                    type={"text"}
                    label={"Dpp Amount"}
                    value={data.dpp_amount}
                />
                <TextField
                    type={"text"}
                    label={"Received Amount"}
                    value={data.received_amount}
                    onChange={(e) => {
                        let _data = data;
                        data.received_amount = e.target.value;
                        onChangeData(_data);
                    }}
                />
                <TextField
                    type={"text"}
                    label={"Expenditure up to date"}
                    value={data.expenditure_up_to_date}
                    onChange={(e) => {
                        let _data = data;
                        data.expenditure_up_to_date = e.target.value;
                        onChangeData(_data);
                    }}
                />
                <TextField
                    type={"text"}
                    label={"Remarks"}
                    value={data.remarks}
                    onChange={(e) => {
                        let _data = data;
                        data.remarks = e.target.value;
                        onChangeData(_data);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

class __BalanceSheetScreen extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            RowsPerPage: 10,
            CurrentPage: 1,
            TotalPages: 0,
            PrevPage: 0,
            NextPage: 0,
            FirstPage: 0,
            LastPage: 0,

            BalanceSheetList: [],
            SelectedStatus: 'All',
            BillType: '',
            ProjectId: this.props.ProjectId,
            Session: this.props.Session,

            SelectedFundIdForDeleteAction: 0,

            ContractorListDialogOpen: false,
            ContractorListData: [],

            EditDialogOpen: false,
            EditDialogData: {
                id: 0,
                session: '',
                sub_head_name: '',
                dpp_amount: 0,
                received_amount: 0,
                expenditure_up_to_date: 0,
                remarks: '',
            }
        };

        this.getProjects = this.getProjects.bind(this);
        this.handleGetBalanceSheets = this.handleGetBalanceSheets.bind(this);
        this.handleDeleteFund = this.handleDeleteFund.bind(this);
        this.handleControlPaginator = this.handleControlPaginator.bind(this);
        this.handleChangeSelectedStatus = this.handleChangeSelectedStatus.bind(this);
        this.handleShowDeleteWarning = this.handleShowDeleteWarning.bind(this);
        this.handleSubmitBalanceSheetRow = this.handleSubmitBalanceSheetRow.bind(this);
    }

    protected handleControlPaginator() {
        if (this.state.CurrentPage < 1 || this.state.CurrentPage > this.state.TotalPages) {
            this.setState({
                CurrentPage: 1,
            }, () => {
                this.handleGetBalanceSheets();
            });

            return;
        }

        this.handleGetBalanceSheets();
    }

    protected getProjects(): void {
        new APP.SERVICES.FUND().GetProjects().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ProjectList: responseData,
                });
            }

        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            } else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        })
    }

    protected handleGetBalanceSheets() {
        this.setState({BalanceSheetList: []});

        new APP.SERVICES.BALANCE_SHEET().GetBalanceSheets({
            RowsPerPage: this.state.RowsPerPage,
            PageNumber: this.state.CurrentPage,
            type: this.props.BillType,
            Installment: this.props.Installment,
            ProjectId: this.state.ProjectId,
            Session: this.state.Session,
            PrintMode: this.props.PrintMode === true,
        }).then(({data}) => {

            if (typeof data.data !== 'undefined') {
                const responseData = data.data
                this.setState({
                    TotalPages: Number(responseData.TotalPages),
                    PrevPage: Number(responseData.PrevPage),
                    NextPage: Number(responseData.NextPage),
                    LastPage: Number(responseData.LastPage),
                });

                if (typeof responseData.ListData !== 'undefined') {
                    this.setState({
                        BalanceSheetList: responseData.ListData,
                    });
                }
            }

        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            } else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        });
    }

    protected handleDeleteFund() {
        new APP.SERVICES.BALANCE_SHEET().DeleteFund(this.state.SelectedFundIdForDeleteAction).then(({data}) => {
            if (data.success) {
                this.handleGetBalanceSheets();
            }

            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: data.success ? "Successful" : "Error",
                message: data.success ? "Deleted Successfully!" : data.message,
                showCancel: false,
                confirmBtnText: "Okay",
                alertType: data.success ? "success" : "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });


        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            } else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        });
    }

    protected handleChangeSelectedStatus(status: 'All' | 'Ongoing' | 'Upcoming' | 'Completed') {
        this.setState({
            SelectedStatus: status,
        }, () => {
            this.handleControlPaginator();
        });
    }

    protected handleShowDeleteWarning(id: number = 0) {
        const self = this;
        this.setState({
            SelectedFundIdForDeleteAction: id,
        }, () => {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Are you sure",
                message: "Your fund will be deleted!",
                showCancel: true,
                cancelBtnText: "Cancel",
                confirmBtnText: "Delete",
                focusCancelBtn: true,
                alertType: "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    self.handleDeleteFund();
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                },
                onCancel(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });
        });
    }


    protected handleSubmitBalanceSheetRow() {
        new APP.SERVICES.BALANCE_SHEET().SaveBalanceSheetRow(this.state.EditDialogData).then(({data}) => {
            if (data.success) {
                this.setState({EditDialogOpen: false});
                this.handleGetBalanceSheets();
            }

            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: data.success ? "Successful" : "Error",
                message: data.success ? "Saved Successfully!" : data.message,
                showCancel: false,
                confirmBtnText: "Okay",
                alertType: data.success ? "success" : "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });


        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            } else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        });
    }

    public componentDidMount(): void {
        //Scroll to the top of the document
        window.scrollTo(0, 0);
        document.title = "Fund List";

        this.getProjects();
        if (this.props.PrintMode === true) {
            this.handleGetBalanceSheets();
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.BillType !== this.props.BillType) {
            this.setState({BillType: this.props.BillType}, () => {
                this.handleGetBalanceSheets();
            });
        }

        if (Number(prevProps.ProjectId) !== Number(this.props.ProjectId)) {
            this.setState({
                ProjectId: this.props.ProjectId,
            }, () => {
                this.handleGetBalanceSheets();
            });
        }

        if (prevProps.Session !== this.props.Session) {
            this.setState({
                Session: this.props.Session,
            }, () => {
                this.handleGetBalanceSheets();
            });
        }
    }

    public render(): any {
        return (
            <React.Fragment>
                <div style={{background: '#ffffff', padding: 5}}>
                    &nbsp;&nbsp;
                    <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Session</th>
                            <th>Name of Sub Head</th>
                            <th>DPP Amount</th>
                            <th>Received Amount</th>
                            <th>Expenditure Up to Date</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.BalanceSheetList.map((Fund: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{Fund.id}</td>
                                        <td>{Fund.session}</td>
                                        <td>{(Fund.task_description !== null) ? Fund.task_description : ''}</td>
                                        <td>{Fund.dpp_amount}</td>
                                        <td>{Fund.amount}</td>
                                        <td>{Fund.expenditure_up_to_date}</td>
                                        <td>{Fund.remarks}</td>
                                        <td>
                                            <FontAwesome name={"edit"} className={"grid-action-button grid-action-edit"}
                                                         onClick={() => this.setState({
                                                             EditDialogOpen: true,
                                                             EditDialogData: {
                                                                 id: Fund.id,
                                                                 session: Fund.session,
                                                                 sub_head_name: (Fund.task_description !== null) ? Fund.task_description : '',
                                                                 dpp_amount: Fund.dpp_amount,
                                                                 received_amount: Fund.amount,
                                                                 expenditure_up_to_date: Fund.expenditure_up_to_date,
                                                                 remarks: Fund.remarks,
                                                             }
                                                         })}/>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </Table>
                </div>

                {this.props.PrintMode !== true && (
                    <React.Fragment>
                        <br/>
                        <Row>
                            <Col md={6} style={{textAlign: "left"}}>
                                <select className={__css_paginator_select} value={this.state.RowsPerPage}
                                        onChange={e => {
                                            this.setState({RowsPerPage: e.target.value}, () => {
                                                this.handleControlPaginator();
                                            });
                                        }}>
                                    <option value={5}>5 rows</option>
                                    <option value={10}>10 rows</option>
                                    <option value={20}>20 rows</option>
                                    <option value={25}>25 rows</option>
                                    <option value={50}>50 rows</option>
                                    <option value={100}>100 rows</option>
                                </select>

                                <div className={__css_paginator_total_pages}>
                                    <input type={"text"} className={__css_paginator_input}
                                           value={this.state.CurrentPage}
                                           onChange={e => {
                                               this.setState({CurrentPage: Number(e.target.value) >= 0 ? Number(e.target.value) : 1});
                                           }} onKeyDown={e => {
                                        if (e.keyCode === 13) {
                                            this.handleControlPaginator();
                                        }
                                    }}/>
                                    of <b>{this.state.TotalPages}</b>
                                </div>
                            </Col>

                            <Col md={6} style={{textAlign: "right"}}>
                                <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                        onClick={() => {
                                            this.setState({
                                                CurrentPage: 1,
                                            }, () => {
                                                this.handleControlPaginator();
                                            });
                                        }} disabled={this.state.CurrentPage === 1}>
                                    <FontAwesome name={"step-backward"}/>
                                </Button>

                                <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                        onClick={() => {
                                            this.setState((state: any) => ({
                                                CurrentPage: state.PrevPage,
                                            }), () => {
                                                this.handleControlPaginator();
                                            });
                                        }} disabled={this.state.CurrentPage === 1}>
                                    <FontAwesome name={"chevron-left"}/>
                                </Button>

                                <Button variant="secondary" size="sm"
                                        style={{fontSize: 11, marginLeft: 5, marginRight: 5}}
                                        onClick={() => {
                                            this.setState((state: any) => ({
                                                CurrentPage: state.NextPage,
                                            }), () => {
                                                this.handleControlPaginator();
                                            });
                                        }}
                                        disabled={this.state.CurrentPage >= this.state.TotalPages}>
                                    <FontAwesome name={"chevron-right"}/>
                                </Button>

                                <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                        onClick={() => {
                                            this.setState((state: any) => ({
                                                CurrentPage: state.LastPage,
                                            }), () => {
                                                this.handleControlPaginator();
                                            });
                                        }} disabled={this.state.CurrentPage >= this.state.TotalPages}>
                                    <FontAwesome name={"step-forward"}/>
                                </Button>
                            </Col>
                        </Row>
                        <ContractorListDialog open={this.state.ContractorListDialogOpen} onClose={() => this.setState({
                            ContractorListDialogOpen: false,
                            ContractorListData: []
                        })} data={this.state.ContractorListData}/>
                    </React.Fragment>
                )}

                <BalanceSheetFundEditDialog open={this.state.EditDialogOpen} onClose={() => this.setState({
                    EditDialogOpen: false,
                })} data={this.state.EditDialogData}
                                            onChangeData={(data: any) => this.setState({EditDialogData: data})} onSubmit={this.handleSubmitBalanceSheetRow}/>
            </React.Fragment>
        );
    }
}

const BalanceSheetScreen = withRouter(__BalanceSheetScreen);

class BalanceSheetList extends React.Component<any, any> {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            ProjectList: [],
            SelectedBillType: (this.props.printMode === true) ? APP.FUNCTIONS.GET_PARAM('bill_type') : '',
            SelectedProjectId: (this.props.printMode === true) ? APP.FUNCTIONS.GET_PARAM('project_id') : 0,
            SelectedSession: (this.props.printMode === true) ? APP.FUNCTIONS.GET_PARAM('session') : '',

            /*SelectedBillType: '',
            SelectedProjectId: 0,
            SelectedSession: '',*/

        };

        this.getProjects = this.getProjects.bind(this);
    }

    protected getProjects(): void {
        new APP.SERVICES.FUND().GetProjects().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ProjectList: responseData,
                });
            }

        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            } else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        })
    }

    componentDidMount(): void {
        if (this.props.printMode !== true) {
            this.getProjects();
        }
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <div style={{marginTop: 15}}>
                    {(this.props.printMode !== true) ? (
                        <React.Fragment>
                            <Row>
                                <Col md={8}>
                                    <h4>Balance Sheet List</h4>
                                </Col>
                                <Col md={4}>
                                    <div style={{textAlign: "right"}}>
                                        <Link to={APP.ROUTES.PRIVATE.FUNDS}>
                                            <button className={__css_CreateFundBtn}>Fund</button>
                                        </Link>
                                        &nbsp;
                                        <Link to={APP.ROUTES.PRIVATE.BALANCE_SHEET_CREATE}>
                                            <button className={__css_CreateFundBtn}>Create Balance Sheet</button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>

                            <select value={this.state.SelectedBillType}
                                    onChange={(e) => {
                                        this.setState({SelectedBillType: e.target.value});
                                    }}
                                    style={{width: 170, padding: 5, fontSize: 14}}>
                                <option value={""}>-- Select Bill Type--</option>
                                <option value={"PF"}>PF</option>
                                <option value={"CF"}>CF</option>
                                <option value={"MISC"}>Misc</option>
                            </select>
                            &nbsp;&nbsp;
                            <select value={this.state.SelectedProjectId}
                                    onChange={(e) => {
                                        this.setState({SelectedProjectId: e.target.value});
                                    }}
                                    style={{width: 170, padding: 5, fontSize: 14}}>
                                <option value={""}>-- Select Project --</option>
                                {this.state.ProjectList.map((Project: any, index: number) => (
                                    <option key={index} value={Project.id}>{Project.name}</option>
                                ))}
                            </select>
                            &nbsp;&nbsp;
                            <select value={this.state.SelectedSession}
                                    onChange={(e) => {
                                        this.setState({SelectedSession: e.target.value});
                                    }}
                                    style={{width: 170, padding: 5, fontSize: 14}}>
                                <option value={""}>-- Select Session --</option>
                                {APP.FUNCTIONS.GET_SESSION_YEARS().map((SY: any, index: number) => (
                                    <option key={index}
                                            value={SY.startYear + '-' + SY.endYear}>{SY.startYear + '-' + SY.endYear}</option>
                                ))}
                            </select>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h3 style={{textAlign: "center"}}>Balance Sheet List</h3>
                        </React.Fragment>
                    )}


                    <Row>
                        <Col md={3}>
                            <b>1st Installment</b>
                            <BalanceSheetScreen Installment={1} BillType={this.state.SelectedBillType}
                                                ProjectId={this.state.SelectedProjectId}
                                                Session={this.state.SelectedSession} PrintMode={this.props.printMode}/>
                        </Col>
                        <Col md={3}>
                            <b>2nd Installment</b>
                            <BalanceSheetScreen Installment={2} BillType={this.state.SelectedBillType}
                                                ProjectId={this.state.SelectedProjectId}
                                                Session={this.state.SelectedSession} PrintMode={this.props.printMode}/>
                        </Col>
                        <Col md={3}>
                            <b>3d Installment</b>
                            <BalanceSheetScreen Installment={3} BillType={this.state.SelectedBillType}
                                                ProjectId={this.state.SelectedProjectId}
                                                Session={this.state.SelectedSession} PrintMode={this.props.printMode}/>
                        </Col>
                        <Col md={3}>
                            <b>4th Installment</b>
                            <BalanceSheetScreen Installment={4} BillType={this.state.SelectedBillType}
                                                ProjectId={this.state.SelectedProjectId}
                                                Session={this.state.SelectedSession} PrintMode={this.props.printMode}/>
                        </Col>
                    </Row>

                    {this.props.printMode !== true && (
                        <div style={{textAlign: "right", marginTop: 50}}>
                            <Link
                                to={APP.ROUTES.PRIVATE.PF_BALANCE_SHEET_LIST_PRINTABLE + `?bill_type=${this.state.SelectedBillType}&session=${this.state.SelectedSession}&project_id=${this.state.SelectedProjectId}`}
                                target={"_blank"}>
                                <button>Print</button>
                            </Link>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(BalanceSheetList);
