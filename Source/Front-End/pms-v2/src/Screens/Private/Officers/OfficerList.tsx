import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {css} from "@emotion/css";
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../App/Init/AppProvider';
import Button from 'react-bootstrap/Button'
import FontAwesome from "react-fontawesome";
import Nav from "react-bootstrap/Nav";


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


const __css_CreateContractorBtn = css(`
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

class Officers extends React.Component<any, any> {
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

            Officers: [],
            SelectedStatus: 'All',

            SelectedOfficerIdForDeleteAction: 0,

            OfficerRank: typeof props.match.params.rank !== 'undefined' ? props.match.params.rank : '',
        };

        this.handleGetOfficer = this.handleGetOfficer.bind(this);
        this.handleDeleteOfficer = this.handleDeleteOfficer.bind(this);
        this.handleControlPaginator = this.handleControlPaginator.bind(this);
        this.handleShowDeleteWarning = this.handleShowDeleteWarning.bind(this);
        this.handleChangeSelectedStatus = this.handleChangeSelectedStatus.bind(this);
    }

    protected handleControlPaginator() {
        if (this.state.CurrentPage < 1 || this.state.CurrentPage > this.state.TotalPages) {
            this.setState({
                CurrentPage: 1,
            }, () => {
                this.handleGetOfficer();
            });

            return;
        }

        this.handleGetOfficer();
    }



    protected handleGetOfficer() {
        new APP.SERVICES.OFFICERS().GetOfficers({
            Rank: this.state.OfficerRank,
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
                        Officers: responseData.ListData,
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

    protected handleChangeSelectedStatus(status: 'All' | 'Present' | 'Previous') {
        this.setState({
            SelectedStatus: status,
        }, () => {
            this.handleControlPaginator();
        });
    }

    protected handleDeleteOfficer() {
        new APP.SERVICES.OFFICERS().DeleteOfficer(this.state.SelectedOfficerIdForDeleteAction).then(({data}) => {
            if (data.success) {
                this.handleGetOfficer();
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

    protected handleShowDeleteWarning(id: number = 0) {
        const self = this;
        this.setState({
            SelectedOfficerIdForDeleteAction: id,
        }, () => {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Are you sure",
                message: "Your contractor will be deleted!",
                showCancel: true,
                cancelBtnText: "Cancel",
                confirmBtnText: "Delete",
                focusCancelBtn: true,
                alertType: "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    self.handleDeleteOfficer();
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                },
                onCancel(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });
        });
    }

    public componentDidMount(): void {
        this.handleGetOfficer();

        //Scroll to the top of the document
        window.scrollTo(0, 0);
        document.title = APP.FUNCTIONS.CAPITALIZE(this.props.match.params.rank)+" List";
    }


    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if(nextProps.match.params.rank) {
            this.setState({
                OfficerRank: nextProps.match.params.rank,
            });
        }
    }

    public render(): any {        
        return (
            <React.Fragment>
                <div style={{marginTop: 15}}>
                    <Row>
                        <Col md={8}>
                            <h4>{APP.FUNCTIONS.CAPITALIZE(this.props.match.params.rank)}'s List</h4>
                        </Col>
                        <Col md={4}>
                            <div style={{textAlign: "right"}}>
                                <Link to={APP.ROUTES.PRIVATE.CREATE_USER+ '/'+ this.props.match.params.rank}>
                                    <button className={__css_CreateContractorBtn}>Create {APP.FUNCTIONS.CAPITALIZE(this.props.match.params.rank)}</button>

                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <div style={{background: '#ffffff', padding: 5}}>
                        <Nav variant="tabs" className={__css_navTab}>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('All')}>
                                <Nav.Link active={this.state.SelectedStatus === 'All'}>All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('Present')}>
                                <Nav.Link active={this.state.SelectedStatus === 'Present'}>Present</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => this.handleChangeSelectedStatus('Previous')}>
                                <Nav.Link active={this.state.SelectedStatus === 'Previous'}>Previous</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Rank</th>
                                <th>Photo</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Join Date</th>
                                <th>Leave Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.Officers.map((Officer: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><Link to={APP.ROUTES.PRIVATE.VIEW_OFFICER + '/' + Officer.id+ '/'+ this.props.match.params.rank}>{Officer.name}</Link></td>
                                    <td>{Officer.rank?Officer.rank.name:''}</td>
                                    <td>
                                        <img src={Officer.photo} alt=""/>
                                    </td>
                                    <td>{Officer.email}</td>
                                    <td>{Officer.phone}</td>
                                    <td>{Officer.join_date}</td>
                                    <td>{Officer.leave_date}</td>
                                    <td>{Officer.status}</td>
                                    <td>
                                        <Link to={APP.ROUTES.PRIVATE.VIEW_OFFICER + '/' + Officer.id+ '/'+ this.props.match.params.rank} title={"View"}><FontAwesome
                                            name={"eye"} className={"grid-action-button grid-action-edit"}/></Link>
                                        <Link to={APP.ROUTES.PRIVATE.EDIT_OFFICER + '/' + Officer.id+ '/'+ this.props.match.params.rank}><FontAwesome
                                            name={"edit"} className={"grid-action-button grid-action-edit"}/></Link>
                                        <FontAwesome name={"trash"}
                                                     className={"grid-action-button grid-action-delete"}
                                                     onClick={() => this.handleShowDeleteWarning(Officer.id)}/>
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
            </React.Fragment>
        );
    }
}

export default withRouter(Officers);