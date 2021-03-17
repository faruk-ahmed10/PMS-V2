import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {css} from "@emotion/css";
import {APP} from "../../../App/Init/AppProvider";

const __css_rptContainer = css(`
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 50px;
`);

const __css_rptTable = css(`
    margin-top: 40px;
    border: 1px solid #000000;
    width: 100%;
    font-size: 13px;
    
    & td, th {
        border: 1px solid #000000;
        padding: 5px;
    }
    
    & th {
        font-weight: bold;
    }
    
    & .center {
        text-align: center;
    }
    
    & .right {
        text-align: right;
    }
`);

const __css_rptHeading = css(`
    text-align: center;
    font-size: 18px;
    text-decoration: underline;
`);

const __css_btn = css(`
    padding: 4px 10px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);

class BillReport extends Component {
    public state: any;
    public props: any;
    public bill_id: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            __uid: Math.random().toString(16).slice(2),
            bill_id: props.match.params.id,

            invoice_no: "",
            project_id: "",
            contractor_id: "",
            parent_task_id: "",
            bill_type: "",
            total_amount: 0.00,
            vat_deduction_percent: 0.00,
            vat_deduction: 0.00,
            it_deduction_percent: 0.00,
            it_deduction: 0.00,
            total_deduction_percent: 0.00,
            total_deduction: 0.00,
            net_payable: 0.00,
            security_money_percent: 0.00,
            security_money: 0.00,
            advance_received: 0.00,
            net_paid: 0.00,
            contractor: null,
            ipc_number: '',
            status: "",
            attachment: "",
            submit_date: "",
            bill_details: [],
        };

        this.getBillData = this.getBillData.bind(this);
    }

    private getBillData(): void {
        new APP.SERVICES.BILL().GetBill(this.state.bill_id).then(({data}: any) => {
            if (data.success) {
                const responseData = data.data;
                this.setState({
                    ...responseData,
                })

            } else {
                alert(data.message);
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

    public componentDidMount(): void {
        this.getBillData();
    }

    render() {
        return (
            <React.Fragment>
                <div style={{marginTop: "15px"}}>
                    <div className={__css_rptContainer} id={this.state.__uid}>
                        <div className={__css_rptHeading}>
                            <b>OFFICIAL BIll</b> <br/>
                            <b>INTERIM PAYMENT CERTIFICATE (IPC/Bill Number) - {this.state.ipc_number}</b> <br/>
                            <b>{(this.state.contractor !== null && typeof this.state.contractor.user !== 'undefined') ? this.state.contractor.user.name : null}</b>
                        </div>
                        <table className={__css_rptTable}>
                            <thead>
                            <th>Ser</th>
                            <th>Short Description of Work</th>
                            <th>Unit</th>
                            <th className={"center"}>Qty</th>
                            <th className={"center"}>Rate</th>
                            <th className={"center"}>Amount</th>
                            <th>Rmk</th>
                            </thead>
                            <tbody>
                            {this.state.bill_details.map((BillDetail: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{BillDetail.task !== null ? BillDetail.task.description : ''}</td>
                                    <td>{BillDetail.unit !== null ? BillDetail.unit.name : ''}</td>
                                    <td className={"center"}>{BillDetail.completed_qty}</td>
                                    <td className={"right"}>{Number(BillDetail.unit_rate).toFixed(2)}</td>
                                    <td className={"right"}>{Number(BillDetail.total_amount).toFixed(2)}</td>
                                    <td>{BillDetail.remark}</td>
                                </tr>
                            ))}

                            <tr>
                                <th colSpan={5} className={"right"}>Total Summation of Bill =</th>
                                <th className={"right"}>{this.state.total_amount}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>{this.state.vat_deduction_percent} Vat Deducated =
                                </th>
                                <th className={"right"}>{this.state.vat_deduction}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>{this.state.it_deduction_percent} IT Deducated =
                                </th>
                                <th className={"right"}>{this.state.it_deduction}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>{this.state.total_deduction_percent} Total Vat & IT
                                    Deducated =
                                </th>
                                <th className={"right"}>{this.state.total_deduction}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>After Deducated Vat & IT =</th>
                                <th className={"right"}>{this.state.net_payable}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>{this.state.security_money_percent} Security Money
                                    Deducated =
                                </th>
                                <th className={"right"}>{this.state.security_money}</th>
                                <th/>
                            </tr>
                            <tr>
                                <th colSpan={5} className={"right"}>Net Payable Contractor Amount =</th>
                                <th className={"right"}>{this.state.net_paid}</th>
                                <th/>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{textAlign: "right", marginTop: 20}}>
                        <a target={"_blank"} href={APP.ROUTES.PRIVATE.BILL_REPORT_VIEW_PRINT + '/' + this.state.bill_id}
                           className={__css_btn}>
                            Print
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(BillReport);