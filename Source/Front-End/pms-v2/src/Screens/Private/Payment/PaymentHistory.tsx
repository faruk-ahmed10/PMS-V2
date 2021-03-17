import React from 'react';
import {css} from "@emotion/css";
import {APP} from "../../../App/Init/AppProvider";
import {Link, withRouter} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from "../../../Layouts/Components/Global/Select/Select";


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

const __select_form = css(`
    select{
     padding:10px 0px;
     margin-bottom:0px;
    }
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
const __css_SearchBtn = css(`
   
    cursor: pointer;
    background: #5d4edd;
    color: #fff;
    padding:6px 25px; 
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

class PaymentHistory extends React.Component<any, any> {

    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            PaymentHistory: [],
            ProjectList: [],
            ContractorList: [],
            ProjectId: '',
            ContractorId: '',
            ProjectData: null,
            __uid: Math.random().toString(16).slice(2),
        };

        this.GetPaymentHistory = this.GetPaymentHistory.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.getContractors = this.getContractors.bind(this);
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


    protected getContractors(): void {
        new APP.SERVICES.FUND().GetContractors().then(({data}) => {

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

    protected GetPaymentHistory(): any {

        if (this.state.ContractorId === 0 || this.state.ProjectId === 0) {
            new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                show: true,
                style: {fontSize: 12},
                title: "Required",
                message: "Project and Contrator is required!",
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
        // this.GetPaymentHistory();
        this.getProjects();
        this.getContractors();
    }

    render(): any {
        const {PaymentHistory} = this.state;

        return (
            <React.Fragment>
                <div id={this.state.__uid}>
                    <div className={__css_BlncChartHeading}>

                        <div className={__css_ChartTitle}>
                            <p>Payment History</p>
                        </div>
                    </div>
                    <Row className={"pt-5"}>
                        <Col md={4} className={__select_form}>
                            <Select options={this.state.ProjectList}
                                    defaultValue={""}
                                    label={"Project"}
                                    name={"project"}
                                    value={this.state.ProjectId}
                                    onChange={(e) => {
                                        this.setState({ProjectId: e.target.value});
                                    }}/>
                        </Col>
                        <Col md={4} className={__select_form}>
                            <Select options={this.state.ContractorList}
                                    defaultValue={""}
                                    label={"Contractors / Dev Partners"}
                                    name={"contractor"}
                                    value={this.state.ContractorId}
                                    onChange={(e) => {
                                        this.setState({
                                            ContractorId: e.target.value
                                        });
                                    }}/>
                        </Col>
                        <Col md={4}>
                            <button className={__css_SearchBtn} onClick={this.GetPaymentHistory}>Search</button>
                        </Col>
                    </Row>
                    <div className={__css_TableWrap}>
                        <table className={__css_BlncChart}>
                            <thead>
                            <tr>
                                <th>Ser No</th>
                                <th>Task Name</th>
                                <th>Contractor Name</th>
                                <th>Contract Amount</th>
                                <th>Received Amount</th>
                                <th>Due Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                PaymentHistory.map((payment: any, index: number) => (

                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={APP.ROUTES.PRIVATE.PAYMENT_HISTORY_TASK + '/' + payment.task_id}
                                                  title={"View"}>{payment.parent_task.description}</Link>
                                        </td>
                                        <td>{payment.contractor.user.name}</td>
                                        <td>{payment.parent_task.total_price}</td>
                                        <td>{payment.received_amount}</td>
                                        <td>{Number(payment.parent_task.total_price - payment.received_amount).toFixed(2)}</td>
                                    </tr>

                                ))

                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={__css_BackBtn}>
                        <a onClick={() => this.props.history.goBack()}>Back</a>
                        <Link
                            to={APP.ROUTES.PRIVATE.PAYMENT_HISTORY_REPORT_PRINTABLE + "?project_id=" + this.state.ProjectId + "&contractor_id=" + this.state.ContractorId}
                            target={"_blank"} className={"ml-2"}>Print</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default withRouter(PaymentHistory);
