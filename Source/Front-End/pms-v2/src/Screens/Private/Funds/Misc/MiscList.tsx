import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {css} from "@emotion/css";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../../App/Init/AppProvider';
import Button from 'react-bootstrap/Button'
import FontAwesome from "react-fontawesome";
import Nav from 'react-bootstrap/Nav';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ContractorList from "../../Contractors/ContractorList";

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


const __css_CreateMiscBtn = css(`
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

const ContractorListDialog = ({open, data, onClose} : {open: boolean, data: Array<any>, onClose(): void}) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dev/Partners
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                <ContractorList ReceiverMode={true} ReceiverData={data} />
            </div>
        </Dialog>
    );
};

class MiscList extends React.Component<any, any> {
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

            MiscList: [],
            SelectedStatus: 'All',

            SelectedMiscIdForDeleteAction: 0,

            ContractorListDialogOpen: false,
            ContractorListData: [],
        };

        this.handleGetMiscs = this.handleGetMiscs.bind(this);
        this.handleDeleteMisc = this.handleDeleteMisc.bind(this);
        this.handleControlPaginator = this.handleControlPaginator.bind(this);
        this.handleChangeSelectedStatus = this.handleChangeSelectedStatus.bind(this);
        this.handleShowDeleteWarning = this.handleShowDeleteWarning.bind(this);
    }

    protected handleControlPaginator() {
        if (this.state.CurrentPage < 1 || this.state.CurrentPage > this.state.TotalPages) {
            this.setState({
                CurrentPage: 1,
            }, () => {
                this.handleGetMiscs();
            });

            return;
        }

        this.handleGetMiscs();
    }

    protected handleGetMiscs() {
        new APP.SERVICES.MISC().GetMiscs({
            RowsPerPage: this.state.RowsPerPage,
            PageNumber: this.state.CurrentPage,
            Status: this.state.SelectedStatus,
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
                        MiscList: responseData.ListData,
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

    protected handleDeleteMisc() {
        new APP.SERVICES.MISC().DeleteMisc(this.state.SelectedMiscIdForDeleteAction).then(({data}) => {
            if (data.success) {
                this.handleGetMiscs();
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
            SelectedMiscIdForDeleteAction: id,
        }, () => {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Are you sure",
                message: "Your MISC FUND will be deleted!",
                showCancel: true,
                cancelBtnText: "Cancel",
                confirmBtnText: "Delete",
                focusCancelBtn: true,
                alertType: "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    self.handleDeleteMisc();
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                },
                onCancel(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });
        });
    }

    public componentDidMount(): void {
        this.handleGetMiscs();

        //Scroll to the top of the document
        window.scrollTo(0, 0);
        document.title = "MISC FUND List";
    }

    public render(): any {
        return (
            <React.Fragment>
                <div style={{marginTop: 15}}>
                    <Row>
                        <Col md={8}>
                            <h4>MISC FUND List</h4>
                        </Col>
                        <Col md={4}>
                            <div style={{textAlign: "right"}}>
                                <Link to={APP.ROUTES.PRIVATE.CREATE_MISC}>
                                    <button className={__css_CreateMiscBtn}>Create MISC FUND</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <div style={{background: '#ffffff', padding: 5}}>
                        {/* <Nav variant="tabs" className={__css_navTab}>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('All')}>
                                <Nav.Link active={this.state.SelectedStatus === 'All'}>All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('Ongoing')}>
                                <Nav.Link active={this.state.SelectedStatus === 'Ongoing'}>Ongoing</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('Upcoming')}>
                                <Nav.Link active={this.state.SelectedStatus === 'Upcoming'}>Upcoming</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('Completed')}>
                                <Nav.Link active={this.state.SelectedStatus === 'Completed'}>Completed</Nav.Link>
                            </Nav.Item>
                        </Nav> */}
                        <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Economic Code</th>
                                <th>Economic Sub Code</th>
                                <th>Section</th>
                                <th>Item Head</th>
                                <th>Parent Item</th>
                                <th>Description</th>
                                <th>Project Name</th>
                                <th>Dev/Partners</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Qty</th>
                                <th>Progress</th>
                                <th>Amount</th>
                                <th>Attachment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.MiscList.map((Misc: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Misc.economic_code}</td>
                                    <td>{Misc.economic_sub_code}</td>
                                    <td>{Misc.section.name}</td>
                                    <td>{Misc.item_head.name}</td>
                                    <td>{Misc.parent_item !== null && typeof Misc.parent_item !== 'undefined' && typeof Misc.parent_item.description !== 'undefined' ? Misc.parent_item.description : ''}</td>
                                    <td>{Misc.description}</td>
                                    <td>{Misc.project.name}</td>
                                    <td className={"center"}>
                                        <FontAwesome name={"eye"} onClick={() => {
                                            if(typeof Misc.contractors !== 'undefined' && Misc.contractors !== null) {
                                                this.setState({
                                                    ContractorListDialogOpen: true,
                                                    ContractorListData: Misc.contractors,
                                                });
                                            }
                                        }} style={{color: "blue", cursor: "pointer"}}/>
                                    </td>
                                    <td>{APP.FUNCTIONS.CONVERT_DATE(APP.FUNCTIONS.CONVERT_MYSQL_DATE(Misc.start_date), 'dd-mm-yyyy')}</td>
                                    <td>{APP.FUNCTIONS.CONVERT_DATE(APP.FUNCTIONS.CONVERT_MYSQL_DATE(Misc.end_date), 'dd-mm-yyyy')}</td>
                                    <td className={"center"}>{Misc.qty}</td>
                                    <td className={"center"}>{Misc.progress}</td>
                                    <td className={"center"}>{Misc.amount}</td>
                                    <td className={"center"}>
                                        {
                                            Misc.attachment ? (
                                                <a href={APP.CONFIG.CDN_ROOT + '/' + Misc.attachment}
                                                   target={"__blank"}>
                                                    <FontAwesome name={"file"}
                                                                 style={{color: "blue", cursor: "pointer"}}/>
                                                </a>) : ''
                                        }

                                    </td>
                                    <td>{Misc.status}</td>
                                    <td>
                                        <Link to={APP.ROUTES.PRIVATE.EDIT_MISC + '/' + Misc.id}><FontAwesome
                                            name={"edit"} className={"grid-action-button grid-action-edit"}/></Link>
                                        <FontAwesome name={"trash"}
                                                     className={"grid-action-button grid-action-delete"}
                                                     onClick={() => this.handleShowDeleteWarning(Misc.id)}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

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
                                <input type={"text"} className={__css_paginator_input} value={this.state.CurrentPage}
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

                            <Button variant="secondary" size="sm" style={{fontSize: 11, marginLeft: 5, marginRight: 5}}
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
                </div>

                <ContractorListDialog open={this.state.ContractorListDialogOpen} onClose={() => this.setState({ContractorListDialogOpen: false, ContractorListData: []})} data={this.state.ContractorListData} />
            </React.Fragment>
        );
    }
}

export default withRouter(MiscList);