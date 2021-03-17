import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {css} from "@emotion/css";
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../App/Init/AppProvider';
import Button from 'react-bootstrap/Button'
import FontAwesome from "react-fontawesome";


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


const __css_CreateBillBtn = css(`
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

class BillList extends React.Component<any, any> {
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

            SelectedBillType: 'PF',

            ProjectList: [],
            SelectedProjectId: 0,

            ContractorList: [],
            SelectedContractorId: 0,

            ParentTaskList: [],
            SelectedParentTaskId: 0,

            BillList: [],

            SelectedSupplierIdForDeleteAction: 0,
        };

        this.handleGetBillList = this.handleGetBillList.bind(this);
        this.handleDeleteBill = this.handleDeleteBill.bind(this);
        this.handleControlPaginator = this.handleControlPaginator.bind(this);
        this.handleShowDeleteWarning = this.handleShowDeleteWarning.bind(this);
    }

    protected handleControlPaginator() {
        if (this.state.CurrentPage < 1 || this.state.CurrentPage > this.state.TotalPages) {
            this.setState({
                CurrentPage: 1,
            }, () => {
                this.handleGetBillList();
            });

            return;
        }

        this.handleGetBillList();
    }

    protected handleGetProjectList() {
        new APP.SERVICES.PROJECT().GetProjectsNoLimit().then(({data}) => {

            if (typeof data.data !== 'undefined') {
                const responseData = data.data
                this.setState({ProjectList: responseData});
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

    protected handleGetContractorList() {
        new APP.SERVICES.CONTRACTOR().GetContractorsNoLimit().then(({data}) => {

            if (typeof data.data !== 'undefined') {
                const responseData = data.data;
                this.setState({ContractorList: responseData});
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

    protected handleGetParentTasks(): void {
        new APP.SERVICES.BILL().GetParentTasks(this.state.SelectedBillType, this.state.SelectedContractorId, this.state.SelectedProjectId).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ParentTaskList: responseData,
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

    protected handleGetBillList() {
        new APP.SERVICES.BILL().GetBills({
            Type: this.state.SelectedBillType,
            ProjectId: this.state.SelectedProjectId,
            ContractorId: this.state.SelectedContractorId,
            ParentTaskId: this.state.SelectedParentTaskId,
            RowsPerPage: this.state.RowsPerPage,
            PageNumber: this.state.CurrentPage,
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
                        BillList: responseData.ListData,
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

    protected handleDeleteBill() {
        new APP.SERVICES.BILL().DeleteBill(this.state.SelectedSupplierIdForDeleteAction).then(({data}) => {
            if (data.success) {
                this.handleGetBillList();
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
            SelectedSupplierIdForDeleteAction: id,
        }, () => {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Are you sure",
                message: "Your bill will be deleted!",
                showCancel: true,
                cancelBtnText: "Cancel",
                confirmBtnText: "Delete",
                focusCancelBtn: true,
                alertType: "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    self.handleDeleteBill();
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                },
                onCancel(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });
        });
    }

    public componentDidMount(): void {
        this.handleGetProjectList();
        this.handleGetContractorList();
        this.handleGetBillList();

        //Scroll to the top of the document
        window.scrollTo(0, 0);
        document.title = "Bill List";
    }

    public render(): any {
        return (
            <React.Fragment>
                <div style={{marginTop: 15}}>
                    <Row>
                        <Col md={8}>
                            <h4>Bill List</h4>
                        </Col>
                        <Col md={4}>
                            <div style={{textAlign: "right"}}>
                                <Link to={APP.ROUTES.PRIVATE.CREATE_BILL}>
                                    <button className={__css_CreateBillBtn}>Create Bill</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>

                    <select value={this.state.SelectedBillType}
                            onChange={(e) => {
                                this.setState({SelectedBillType: e.target.value}, () => {
                                    this.handleGetBillList();
                                });
                            }}
                            style={{width: 170, padding: 5, fontSize: 14}}>
                        <option value={""}>-- Select Bill Type--</option>
                        <option value={"PF_EXPENSE"}>PF</option>
                        <option value={"CF_EXPENSE"}>CF</option>
                        <option value={"MISC_EXPENSE"}>Misc</option>
                    </select>

                    &nbsp;

                    <select value={this.state.SelectedProjectId}
                            onChange={(e) => {
                                this.setState({SelectedProjectId: e.target.value}, () => {
                                    this.handleGetBillList();
                                });
                            }}
                            style={{width: 170, padding: 5, fontSize: 14}}>
                        <option value={""}>-- Select Project --</option>
                        {this.state.ProjectList.map((Project: any, index: number) => (
                            <option key={index} value={Project.id}>{Project.name}</option>
                        ))}
                    </select>

                    &nbsp;

                    <select value={this.state.SelectedContractorId}
                            onChange={(e) => {
                                this.setState({SelectedContractorId: e.target.value}, () => {
                                    this.handleGetParentTasks();
                                    this.handleGetBillList();
                                });
                            }}
                            style={{width: 170, padding: 5, fontSize: 14}}>
                        <option value={""}>-- Select Contractor --</option>
                        {this.state.ContractorList.map((Contractor: any, index: number) => (
                            <option key={index} value={Contractor.id}>{Contractor.name}</option>
                        ))}
                    </select>

                    &nbsp;

                    <select value={this.state.SelectedParentTaskId}
                            onChange={(e) => {
                                this.setState({SelectedParentTaskId: e.target.value}, () => {
                                    this.handleGetBillList();
                                });
                            }}
                            style={{width: 170, padding: 5, fontSize: 14}}>
                        <option value={""}>-- Select Parent Task --</option>
                        {this.state.ParentTaskList.map((ParentTask: any, index: number) => (
                            <option key={index} value={ParentTask.id}>{ParentTask.description}</option>
                        ))}
                    </select>

                    <br/>
                    <br/>

                    <div style={{background: '#ffffff', padding: 3}}>
                        <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Invoice Number</th>
                                <th>Project Name</th>
                                <th>Contractor Name</th>
                                <th>Total Amount</th>
                                <th>Vat Deduction</th>
                                <th className={"center"}>IT Deduction</th>
                                <th>Vat+IT Deduction</th>
                                <th>Deduction Net Payable</th>
                                <th>Security Money</th>
                                <th>Advance Received</th>
                                <th>Net Paid</th>
                                <th>Attachment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.BillList.map((Bill: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Bill.invoice_no}</td>
                                    <td>{Bill.project.name}</td>
                                    <td>{Bill.contractor.user.name}</td>
                                    <td className={"center"}>{Bill.total_amount}</td>
                                    <td className={"center"}>{Bill.vat_deduction}</td>
                                    <td className={"center"}>{Bill.it_deduction}</td>
                                    <td className={"center"}>{Bill.total_deduction}</td>
                                    <td className={"center"}>{Bill.net_payable}</td>
                                    <td className={"center"}>{Bill.security_money}</td>
                                    <td className={"center"}>{Bill.advance_received}</td>
                                    <td className={"center"}>{Bill.net_paid}</td>
                                    <td className={"center"}>
                                        {
                                            Bill.attachment ? <a href={APP.CONFIG.CDN_ROOT + '/' + Bill.attachment}
                                                                 target={"__blank"}>
                                                <FontAwesome name={"file"} style={{color: "blue", cursor: "pointer"}}/>
                                            </a> : ''
                                        }

                                    </td>
                                    <td>{Bill.status}</td>
                                    <td>
                                        <Link to={APP.ROUTES.PRIVATE.BILL_REPORT_VIEW + '/' + Bill.id}>
                                            <FontAwesome name={"eye"}
                                                         className={"grid-action-button grid-action-edit"}/>
                                        </Link>
                                        <Link to={APP.ROUTES.PRIVATE.EDIT_BILL + '/' + Bill.id}>
                                            <FontAwesome name={"edit"}
                                                         className={"grid-action-button grid-action-edit"}/>
                                        </Link>
                                        <FontAwesome name={"trash"}
                                                     className={"grid-action-button grid-action-delete"}
                                                     onClick={() => this.handleShowDeleteWarning(Bill.id)}/>
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

export default withRouter(BillList);
