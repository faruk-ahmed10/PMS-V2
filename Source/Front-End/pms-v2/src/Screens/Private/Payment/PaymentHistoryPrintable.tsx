import React from 'react';
import {APP} from "../../../App/Init/AppProvider";
import {css} from "@emotion/css";
import {withRouter} from 'react-router-dom';
import index from "react-calendar";

const __css_Table = css(`
    width: 100%;
    border: 1px solid #000000;
    border-collapse: collapse;
    
    & th, td {
        border: 1px solid #000000;
        padding: 3px;
        font-size: 13px;
    }
    
    & .center {
        text-align: center;
    }
    
    & .right {
        text-align: right;
    }
`);

class PaymentHistoryPrintable extends React.Component<any, any> {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            PaymentHistory: [],
            ProjectId: APP.FUNCTIONS.GET_PARAM('project_id'),
            ContractorId: APP.FUNCTIONS.GET_PARAM('contractor_id'),
            ProjectData: null,
        };
    }

    protected GetPaymentHistory(): any {
        if (this.state.ContractorId === 0 || this.state.ProjectId === 0) {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Required",
                message: "Project and Contractor is required!",
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

        new APP.SERVICES.BILL().GetPaymentHistory(this.state.ProjectId, this.state.ContractorId).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    PaymentHistory: responseData.payment_history,
                    ProjectData: responseData.project,
                }, () => {
                    window.print();
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

    public componentDidMount(): void {
        this.GetPaymentHistory();
    }

    render(): any {
        const {PaymentHistory} = this.state;

        return (
            <React.Fragment>
                <div style={{textAlign: "center"}}>
                    <b style={{textDecoration: "underline", fontSize: 19}}>Payment History</b>
                </div>
                <div style={{fontWeight: "bold", marginBottom: 10}}>
                    <u>Project Name:</u> {this.state.ProjectData !== null ? this.state.ProjectData.name : ''}
                </div>
                <table className={__css_Table}>
                    <thead>
                    <tr>
                        <th className={"center"}>Ser</th>
                        <th className={"center"}>Task Name</th>
                        <th className={"center"}>Contractor Name</th>
                        <th className={"center"}>Contract Amount</th>
                        <th className={"center"}>Received Amount</th>
                        <th className={"center"}>Due Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {PaymentHistory.map((PMT: any, index: number) => (
                        <tr key={index}>
                            <td className={"center"}>{index}</td>
                            <td>{PMT.parent_task.description}</td>
                            <td>{PMT.contractor.user.name}</td>
                            <td className={"right"}>{PMT.parent_task.total_price}</td>
                            <td className={"right"}>{PMT.received_amount}</td>
                            <td className={"right"}>{Number(PMT.parent_task.total_price - PMT.received_amount).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default withRouter(PaymentHistoryPrintable);
