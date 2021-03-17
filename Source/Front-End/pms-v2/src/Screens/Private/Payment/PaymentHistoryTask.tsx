import React from 'react';
import {css} from "@emotion/css";
import {APP} from "../../../App/Init/AppProvider";
import {Link, withRouter} from 'react-router-dom';


const __css_BlncChartHeading = css(`
    
    h3{
        font-family: '';
        font-weight: bold;
        text-align: center;
        font-size: 22px;
    }
    span{
        font-size: 21px;
        font-family: "Myriad Pro";
        color: rgb(92, 77, 220);
    }
    @media only screen and (max-width: 984px) {
        h3{
            font-size: 15px;
            margin-top: 20px;
        }
    }
    
`);

const __css_ChartTitle = css(`
    font-size: 18px;
    font-family: "Poppins";
    background: #5c4ddc;
    width: 403px;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    p{
        padding: 7px 0px;
        
    }
    @media only screen and (max-width: 984px) {
        font-size: 14px;
        width: 350px;
    }
`);

const __css_BlncChart = css(`
    margin-top: 45px;
    width: 100%;
    text-align: center;
    background: #ffffff;
    border-collapse: collapse;

    tr:nth-child(3){
        background: #f6f7fb;
    }

    th{
        font-size: 14px;
        background:  #78a2ff;
        padding: 10px 15px;
        color: #ffffff
        
    }
    th,td{
        border: 1px solid #d4d7dd;
    }
    td{
        font-size: 12px;
    }
    
`);

const __css_ChartMiddleHead = css(`
    & td {
        background: #dfe9ff;
        padding: 7px;
        font-size: 14px;
    }
`);


const __css_TableWrap = css(`
    overflow-x: auto;
`);

const __css_BackBtn = css(`
    text-align: right;
    margin: 56px 0px 0px 0px;;
    padding-bottom: 20px;
    color: white;
    cursor: pointer;
    a{
        background: #5d4edd;
        color: #fff;
        border-radius: 2px;
        padding: 7px 15px;
        font-size: 14px;
    }
    a:hover,
    a:focus {
        text-decoration: none;
        box-shadow: 0px 6px 42.84px 8.16px rgba(0, 0, 0, 0.1);
    }

`);

const __section_name = css(`
    & td {
        color:black !important;
        background:#DFE9FF;
        font-weight: bold;
    }
`);

class PaymentHistoryTask extends React.Component<any, any> {

    public state: any;
    private task_id: any;

    constructor(props: any) {
        super(props);

        this.task_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            PaymentHistoryTask: [],

        };

        this.GetPaymentHistoryTask = this.GetPaymentHistoryTask.bind(this);
    }


    protected GetPaymentHistoryTask(): any {
        new APP.SERVICES.BILL().GetPaymentHistoryTask(this.task_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    PaymentHistoryTask: responseData,
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
        this.GetPaymentHistoryTask();
    }

    render(): any {
        const {PaymentHistoryTask} = this.state;

        return (
            <React.Fragment>
                <div className={__css_BlncChartHeading}>

                    <div className={__css_ChartTitle}>
                        <p>Payment History</p>
                    </div>
                </div>

                <div className={__css_TableWrap}>
                    <table className={__css_BlncChart}>
                        <thead>
                        <tr>
                            <th>Ser No</th>
                            <th>Submit Date</th>
                            <th>Unit Rate</th>
                            <th>Contract Qty</th>
                            <th>Completed Qty</th>
                            <th>Left Over Amount</th>
                            <th>Progress</th>
                            <th>Received Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            PaymentHistoryTask.map((payment: any, index: number) => (

                                <tr>
                                    <td>{index + 1}</td>
                                    {/*<td>*/}
                                    {/*    <Link to={APP.ROUTES.PRIVATE.PAYMENT_HISTORY_TASK + '/' + payment.task_id} title={"View"}>{payment.task_name}</Link>*/}
                                    {/*  </td>*/}
                                    <td>{payment.submit_date}</td>
                                    <td>{payment.unit_rate}</td>
                                    <td>{payment.contract_qty}</td>
                                    <td>{payment.completed_qty}</td>
                                    <td>{payment.left_over_amount}</td>
                                    <td>{payment.progress}</td>
                                    <td>{payment.received_amount}</td>
                                </tr>

                            ))

                        }
                        </tbody>
                    </table>
                </div>
                <div className={__css_BackBtn}>
                    <a onClick={() => this.props.history.goBack()}>Back</a>
                </div>
            </React.Fragment>
        );
    }
}


export default withRouter(PaymentHistoryTask);
