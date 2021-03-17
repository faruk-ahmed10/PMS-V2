import React from 'react';
import {APP} from "../../../App/Init/AppProvider";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";
import Table from "react-bootstrap/Table";
import Select from "../../../Layouts/Components/Global/Select/Select";
import TextField from "../../../Layouts/Components/Global/TextField/TextField";
import DatePickerTextField from "../../../Layouts/Components/Global/DatePickerTextField/DatePickerTextField";

const __css_Table = css(`
    font-size: 12px;
    
    & th.center {
        text-align: center;
    }
    & td, th {
        padding: 6px 5px;
        vertical-align: middle;
    }
    
    & td.center {
        text-align: center;
    }
    
    & td.right, th.right {
        text-align: right;
    }
`);

const __css_card = css(`
    margin-top: 15px;
    min-height: 488px;
    padding: 30px 80px 30px 80px;
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
        padding: 30px 30px 30px 30px;
    }
`);

const __css_cardTitle = css(`
    padding: 20px 0px 0 0px;
    margin-bottom: 5px;
    font-family: poppinsSemiBold;
    font-size: 21px;    color: #5d4ede;
    border-bottom: 1px solid #224c60;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 0 0 0 0;
        width: 100%;
    }
`);

const __css_cardBody = css(`
    padding: 0;
    margin-top: 20px;
`);

const __css_cardText = css(`
    padding: 0 0 20px 0;
    @media only screen and (max-width: 984px) {
        padding: 0 0 0 0;
    }
`);

const __css_BackBtn = css(`
    float: right;
    padding: 2px 6px;
    font-size: 13px;
    background: #224c60;
    color: #ffffff;
    cursor: pointer;
    
    &: hover {
        opacity: 0.8;
    }
`);

const __css_SaveCFFundBtn = css(`
    padding: 4px 10px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);

const __css_InputField = css(`
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #a6a6a6;
    padding: 2px;
    background: #ffffff;
    color: #262626;
    outline: 0;
    
    &: focus {
        border: 1px solid blue;
    }
`);

class BillForm extends React.Component<any, any> {
    public state: any;
    private readonly bill_id: number;

    public constructor(props: any) {
        super(props);

        this.bill_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            NotFoundException: false,

            PFFundList: [],
            ProjectList: [],
            ContractorList: [],
            ParentTaskList: [],

            BillType: '',
            ContractorId: 0,
            ParentTaskId: 0,
            ProjectId: 0,

            Attachment: '',
            Status: '',

            VatDeductionPercent: 7.5,
            VatDeductionAmount: 0,

            ITDeductionPercent: 5,
            ITDeductionAmount: 0,

            TotalDeductionPercent: 5,
            TotalDeductionAmount: 0,

            SecurityMoneyPercent: 5,
            SecurityMoneyAmount: 0,

            AdvanceReceivedAmount: 0,
            NetPaidAmount: 0,

            NetPayable: 0,

            IPCNumber: '',

            TotalAmount: 0,
            SubmitDate: new Date(),

            EditMode: this.bill_id > 0,
        };

        this.handleChangeFundsObject = this.handleChangeFundsObject.bind(this);
        this.getProjectFunds = this.getProjectFunds.bind(this);
        this.handleSubmitBill = this.handleSubmitBill.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.getContractors = this.getContractors.bind(this);

        this.updateBillAmounts = this.updateBillAmounts.bind(this);
    }

    protected handleChangeFundsObject(index: number, key: string, value: any) {
        const PFFundList = this.state.PFFundList;
        PFFundList[index][key] = value;
        this.setState({PFFundList: PFFundList});
    }

    protected handleSubmitBill(): any {
        if (this.state.SubmitDate === '') {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Required",
                message: "Submit date is required!",
                showCancel: false,
                confirmBtnText: "Okay",
                alertType: "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                }
            });
            return false;
        }

        new APP.SERVICES.BILL().SaveBill({
            Type: this.state.BillType,
            PFFundList: this.state.PFFundList,
            ContractorId: this.state.ContractorId,
            ParentTaskId: this.state.ParentTaskId,
            ProjectId: this.state.ProjectId,
            Attachment: this.state.Attachment,
            Status: this.state.Status,
            VatDeductionPercent: this.state.VatDeductionPercent,
            VatDeductionAmount: this.state.VatDeductionAmount,
            ITDeductionPercent: this.state.ITDeductionPercent,
            ITDeductionAmount: this.state.ITDeductionAmount,
            TotalDeductionPercent: this.state.TotalDeductionPercent,
            TotalDeductionAmount: this.state.TotalDeductionAmount,
            SecurityMoneyPercent: this.state.SecurityMoneyPercent,
            SecurityMoneyAmount: this.state.SecurityMoneyAmount,
            AdvanceReceivedAmount: this.state.AdvanceReceivedAmount,
            NetPaidAmount: this.state.NetPaidAmount,
            NetPayable: this.state.NetPayable,
            TotalAmount: this.state.TotalAmount,
            IPCNumber: this.state.IPCNumber,
            SubmitDate: this.state.SubmitDate,
        }).then(({data}) => {
            const self = this;
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: data.success ? "Successful" : "Error",
                message: data.message,
                showCancel: false,
                confirmBtnText: "Okay",
                alertType: data.success ? "success" : "danger",
                btnSize: "10",
                onConfirm(): void | boolean {
                    new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                    self.props.history.replace(APP.ROUTES.BILLS);
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

    protected getProjects(): void {
        new APP.SERVICES.FUND().GetProjects().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ProjectList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getContractors(projectId: number | string | null): void {
        new APP.SERVICES.FUND().GetContractors(projectId).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ContractorList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getParentTasks(contractorId: string | number, projectId: string | number | null = 0): void {
        new APP.SERVICES.BILL().GetParentTasks(this.state.BillType, contractorId, projectId).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ParentTaskList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'description', 'id'),
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

    protected getProjectFunds(contractorId: string | number, parentTaskId: string | number | null = 0, projectId: string | number | null = 0): void {
        new APP.SERVICES.BILL().GetFunds(this.state.BillType, contractorId, parentTaskId, projectId).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    PFFundList: APP.SERVICES.BILL.GenerateFundsArrayOfObjects(responseData),
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
        });
    }

    protected updateFundsArrayOfObjects(index: number, keyName: string, value: any): void {
        const __prevArray = this.state.PFFundList;

        __prevArray[index][keyName] = value;
        this.setState({
            PFFundList: __prevArray
        }, () => {
            this.updateBillAmounts();
        });
    }


    protected updateBillAmounts(): void {
        let TotalAmount = 0,
            VatDeductionAmount = 0,
            ITDeductionAmount = 0,
            TotalDeductionPercent = 0,
            TotalDeductionAmount = 0,
            NetPayable = 0,
            SecurityMoneyAmount = 0,
            NetPaidAmount = 0;
        for (let i = 0; i < this.state.PFFundList.length; i++) {
            TotalAmount += Number(this.state.PFFundList[i].total_amount);
        }

        VatDeductionAmount = (TotalAmount / 100) * Number(this.state.VatDeductionPercent);
        ITDeductionAmount = (TotalAmount / 100) * Number(this.state.ITDeductionPercent);
        TotalDeductionPercent = Number(this.state.VatDeductionPercent) + Number(this.state.ITDeductionPercent);
        TotalDeductionAmount = VatDeductionAmount + ITDeductionAmount;
        NetPayable = TotalAmount - TotalDeductionAmount;
        SecurityMoneyAmount = (NetPayable / 100) * Number(this.state.SecurityMoneyPercent);

        NetPaidAmount = (NetPayable - (SecurityMoneyAmount + Number(this.state.AdvanceReceivedAmount)));

        this.setState({
            TotalAmount,
            VatDeductionAmount,
            ITDeductionAmount,
            TotalDeductionPercent,
            TotalDeductionAmount,
            NetPayable,
            SecurityMoneyAmount,
            NetPaidAmount,
        });
    }

    public componentDidMount(): void {
        this.getProjects();
        if(this.state.EditMode) {

        }
    }

    public render(): any {
        if (this.state.NotFoundException) {
            return <FourZeroFour/>
        }

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_cardTitle}>
                        <div className={"title"}>
                            BILL {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={3}>
                                    <Select
                                        options={[
                                        {label: '-- Select Type --', value: ''},
                                        {label: 'PF', value: 'PF_EXPENSE'},
                                        {label: 'CF', value: 'CF_EXPENSE'},
                                        {label: 'Misc', value: 'MISC_EXPENSE'},
                                    ]}
                                            defaultValue={""}
                                            label={"Bill Type"}
                                            name={"bill_type"}
                                            value={this.state.BillType}
                                            onChange={(e) => {
                                                this.setState({BillType: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={3}>
                                    <Select options={this.state.ProjectList}
                                            defaultValue={""}
                                            label={"Project"}
                                            name={"project"}
                                            value={this.state.ProjectId}
                                            onChange={(e) => {
                                                this.setState({ProjectId: e.target.value}, () => {
                                                    if (Number(this.state.ProjectId) > 0) {
                                                        this.getContractors(this.state.ProjectId);
                                                    } else {
                                                        this.setState({
                                                            PFFundList: [],
                                                        });
                                                    }
                                                });
                                            }}/>
                                </Col>
                                <Col md={3}>
                                    <Select options={this.state.ContractorList}
                                            defaultValue={""}
                                            label={"Dev Partners"}
                                            name={"contractor"}
                                            value={this.state.ContractorId}
                                            onChange={(e) => {
                                                this.setState({
                                                    ContractorId: e.target.value
                                                }, () => {
                                                    // if (Number(this.state.ContractorId) > 0) {
                                                        this.getParentTasks(this.state.ContractorId, this.state.ProjectId);
                                                    // } else {
                                                    //     this.setState({
                                                    //         PFFundList: [],
                                                    //     });
                                                    // }
                                                });
                                            }}/>
                                </Col>
                                <Col md={3}>
                                    <Select options={this.state.ParentTaskList}
                                            defaultValue={""}
                                            label={"Parent Task"}
                                            name={"parent_task"}
                                            value={this.state.ParentTaskId}
                                            onChange={(e) => {
                                                this.setState({
                                                    ParentTaskId: e.target.value,
                                                }, () => {
                                                    this.getProjectFunds(this.state.ContractorId, this.state.ParentTaskId, this.state.ProjectId);
                                                });
                                            }}/>
                                </Col>
                                <Col md={12}>


                                    <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Description of Wk</th>
                                            <th>Unit</th>
                                            <th>Unit Price</th>
                                            <th>Contract Qty</th>
                                            <th>Completed Qty</th>
                                            <th>Contract Amount</th>
                                            <th>Left over Amount</th>
                                            <th>Progress(%)</th>
                                            <th>Total Amount</th>
                                            <th>Remarks</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.PFFundList.map((PFFund: any, index: number) => (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{PFFund.description}</td>
                                                <td>{PFFund.unit_name}</td>
                                                <td className={"right"}>{Number(PFFund.unit_rate).toFixed(2)}</td>
                                                <td>{PFFund.contract_qty}</td>
                                                <td>
                                                    <table style={{
                                                        padding: 0,
                                                        margin: 0,
                                                        background: 'transparent',
                                                        width: "100%"
                                                    }}>
                                                        <tbody>
                                                        <tr style={{background: 'transparent', border: 0,}}>
                                                            <td style={{
                                                                padding: 0,
                                                                margin: 0,
                                                                background: 'transparent',
                                                                textAlign: "center",
                                                                fontWeight: "bold",
                                                                border: 0,
                                                                cursor: "pointer",
                                                                color: Number(PFFund.tmp_prev_completed_qty) !== Number(PFFund.prev_completed_qty) ? "blue" : "black",
                                                            }} title={"Previous Completed Qty"}>
                                                                ({PFFund.prev_completed_qty})
                                                            </td>
                                                            <td style={{
                                                                padding: "0 10px",
                                                                margin: 0,
                                                                background: 'transparent',
                                                                border: 0
                                                            }}>
                                                                <input type={"text"} className={__css_InputField}
                                                                       style={{width: '100%'}}
                                                                       placeholder={"Completed Quantity"}
                                                                       value={PFFund.completed_qty}
                                                                       onChange={(e) => {
                                                                           let completed_qty: any = Number(e.target.value);
                                                                           if (!isNaN(completed_qty) && !(completed_qty < 0) && (Number(PFFund.tmp_prev_completed_qty) + completed_qty) <= (Number(PFFund.contract_qty))) {
                                                                               this.updateFundsArrayOfObjects(index, 'completed_qty', e.target.value);
                                                                               this.updateFundsArrayOfObjects(index, 'prev_completed_qty', Number(PFFund.tmp_prev_completed_qty) + Number(e.target.value));
                                                                               this.updateFundsArrayOfObjects(index, 'progress', ((100 / Number(PFFund.contract_qty)) * Number(e.target.value)).toFixed(2));

                                                                               this.updateFundsArrayOfObjects(index, 'total_amount', ((Number(PFFund.unit_rate)) * Number(e.target.value)).toFixed(2));

                                                                               this.updateFundsArrayOfObjects(index, 'left_over_amount', (Number(PFFund.contract_amount) - (Number(PFFund.unit_rate) * Number((Number(PFFund.tmp_prev_completed_qty) + completed_qty)))).toFixed(2));
                                                                           }

                                                                           if (completed_qty === 0 || completed_qty.toString() === '') {
                                                                               this.updateFundsArrayOfObjects(index, 'prev_completed_qty', Number(PFFund.tmp_prev_completed_qty));
                                                                               this.updateFundsArrayOfObjects(index, 'left_over_amount', Number(PFFund.tmp_prev_left_over_amount));
                                                                           }
                                                                       }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td className={"right"}>{Number(PFFund.contract_amount).toFixed(2)}</td>
                                                <td className={"right"} style={{color: Number(PFFund.tmp_prev_left_over_amount) !== Number(PFFund.left_over_amount) ? "blue" : "black",}}>
                                                    {Number(PFFund.left_over_amount).toFixed(2)}
                                                </td>
                                                <td className={"right"}>
                                                    {Number(PFFund.progress).toFixed(2)}%
                                                </td>
                                                <td className={"right"}>
                                                    {Number(PFFund.total_amount).toFixed(2)}
                                                </td>

                                                <td>
                                                    <input type={"text"} className={__css_InputField}
                                                           value={PFFund.Remarks}
                                                           onChange={(e) => this.handleChangeFundsObject(index, 'Remarks', e.target.value)}
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <th colSpan={9} className={"right"}>Total Amount=</th>
                                            <th className={"right"}>{this.state.TotalAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>
                                                <input style={{width: 30}}
                                                       value={this.state.VatDeductionPercent}
                                                       onChange={(e: any) => {
                                                           if (Number(e.target.value) >= 0) {
                                                               this.setState({VatDeductionPercent: e.target.value}, () => {
                                                                   this.updateBillAmounts();
                                                               });
                                                           }
                                                       }}/> % &nbsp;&nbsp;
                                                VAT Deduction=
                                            </th>
                                            <th className={"right"}>{this.state.VatDeductionAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>
                                                <input style={{width: 30}}
                                                       value={this.state.ITDeductionPercent}
                                                       onChange={(e: any) => {
                                                           if (Number(e.target.value) >= 0) {
                                                               this.setState({ITDeductionPercent: e.target.value}, () => {
                                                                   this.updateBillAmounts();
                                                               });
                                                           }
                                                       }}/> % &nbsp;&nbsp;
                                                IT Deduction=
                                            </th>
                                            <th className={"right"}>{this.state.ITDeductionAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>VAT+IT
                                                ({this.state.TotalDeductionPercent}%) Total Deduction=
                                            </th>
                                            <th className={"right"}>{this.state.TotalDeductionAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>Deduction (VAT+IT) Net Payable=</th>
                                            <th className={"right"}>{this.state.NetPayable.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>Deduction
                                                &nbsp;&nbsp;
                                                <input style={{width: 30}}
                                                       value={this.state.SecurityMoneyPercent}
                                                       onChange={(e: any) => {
                                                           if (Number(e.target.value) >= 0) {
                                                               this.setState({SecurityMoneyPercent: e.target.value}, () => {
                                                                   this.updateBillAmounts();
                                                               });
                                                           }
                                                       }}/> % &nbsp;&nbsp;
                                                Security Money=
                                            </th>
                                            <th className={"right"}>{this.state.SecurityMoneyAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>Deduction of Advance Receive=</th>
                                            <th className={"right"}>
                                                <input style={{width: "100%", textAlign: "right"}}
                                                       value={this.state.AdvanceReceivedAmount}
                                                       onChange={(e: any) => {
                                                           if (Number(e.target.value) >= 0) {
                                                               this.setState({AdvanceReceivedAmount: e.target.value}, () => {
                                                                   this.updateBillAmounts();
                                                               });
                                                           }
                                                       }}/>
                                            </th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th colSpan={9} className={"right"}>Dev Partnets/Contractors Net Paid=</th>
                                            <th className={"right"}>{this.state.NetPaidAmount.toFixed(2)}</th>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>

                                <Col md={3}>
                                    <TextField defaultValue={""}
                                               label={"Attachment"}
                                               labelIconNode={null}
                                               name={"attachment"}
                                               type={"file"}
                                               onChange={e => this.setState({Attachment: e.target.files[0]})}/>
                                </Col>

                                <Col md={3}>
                                    <Select options={[
                                        {value: 'Paid', label: 'Paid'},
                                        {value: 'Unpaid', label: 'Unpaid'},
                                        {value: 'Due', label: 'Due'},
                                    ]}
                                            defaultValue={""}
                                            label={"Status"}
                                            name={"status"}
                                            value={this.state.Status}
                                            onChange={(e) => {
                                                this.setState({Status: e.target.value});
                                            }}/>
                                </Col>

                                <Col md={3}>
                                    <TextField defaultValue={""}
                                               label={"IPC/Bill Number"}
                                               labelIconNode={null}
                                               name={"IPCNumber"}
                                               type={"text"}
                                               onChange={e => this.setState({IPCNumber: e.target.value})}/>
                                </Col>

                                <Col md={3}>
                                    <DatePickerTextField label={"Submit Date"}
                                                         name={"submit_date"}
                                                         value={this.state.SubmitDate}
                                                         onChange={date => this.setState({
                                                             SubmitDate: date,
                                                         })}/>
                                </Col>

                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveCFFundBtn}
                                            onClick={this.handleSubmitBill}>Submit
                                    </button>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(BillForm);
