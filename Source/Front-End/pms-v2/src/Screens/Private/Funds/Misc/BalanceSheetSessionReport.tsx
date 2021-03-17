import React from 'react';
import {css} from "@emotion/css";
import {APP} from "../../../../App/Init/AppProvider";
import { BalanceSheetProvider } from '../../../../App/Service/Providers/Fund/BalanceSheetProvider';


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
        color:white !important;
        background:gray;
    }
`);

class BalanceSheetSessionReport extends React.Component<{
    ActiveProject: any,
    SelectedSession: any,
    history: Readonly<any>
}, {
    ActiveProject: any,
    SessionsRange: Array<any>,
    shouldGetMISCFUNDBalanceSheet: boolean,
    BalanceSheetList: Array<any>
}> {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            ActiveProject: this.props.ActiveProject,
            SessionsRange: [],
            PFFundList: [],
            BalanceSheetList: [],

            shouldGetMISCFUNDBalanceSheet: true,
            __uid: Math.random().toString(16).slice(2),
        };

        this.generateFundsArrayOfObjects = this.generateFundsArrayOfObjects.bind(this);
        this.GetMISCFUNDBalanceSheet = this.GetMISCFUNDBalanceSheet.bind(this);
        this.handlePrintArea = this.handlePrintArea.bind(this);
    }

    protected generateSessionsRange(): void {
        const tmpSessionsRange = [];

        const CurrentSessions: Array<{ startYear: number | string }> = APP.FUNCTIONS.GET_SESSION_YEARS(),
            SelectedSession: { StartYear: string | number, EndYear: string | number } = this.props.SelectedSession;

        for (let i = 0; i < CurrentSessions.length; i++) {
            if (Number(CurrentSessions[i].startYear <= Number(SelectedSession.StartYear))) {
                tmpSessionsRange.push(CurrentSessions[i]);
            }
        }

        this.setState({SessionsRange: tmpSessionsRange});
    }

    handlePrintArea() {
        const printContents = $('#' + this.state.__uid).html();
        if(printContents !== null) {
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }

    protected generateFundsArrayOfObjects(Funds: Array<any>) {
        const FundsArray: Array<{
            FundType: 'PF' | 'CF',
            id: string | number,
            description: string | number,
            unit: any,
            unit_rate: string | number,
            qty: string | number,
            total_price: string | number,
            DPPAmount: number | string,
            ReceivedAmount: number | string,
            ExpenditureUptoDate: number | string,
            Attachment: string,
            Remarks: string,
        }> = [];
        for (let i = 0; i < Funds.length; i++) {
            FundsArray.push({
                FundType: 'PF',
                id: Funds[i].id,
                description: Funds[i].description,
                unit: Funds[i].unit.name,
                unit_rate: Funds[i].unit_rate,
                qty: Funds[i].qty,
                total_price: Funds[i].total_price,
                DPPAmount: Number(Funds[i].total_price),
                ReceivedAmount: '',
                ExpenditureUptoDate: '',
                Attachment: '',
                Remarks: '',
            });
        }
        return FundsArray;
    }

    protected GetMISCFUNDBalanceSheet(): any {

        if(!this.state.shouldGetMISCFUNDBalanceSheet){
            return false;
        }

        new APP.SERVICES.BALANCE_SHEET().GetMISCFundBalanceSheet(this.props.ActiveProject.id,this.props.SelectedSession.StartYear,this.props.SelectedSession.EndYear).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    BalanceSheetList: responseData,
                    // PFFundList: this.generateFundsArrayOfObjects(responseData),
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
        this.setState({shouldGetMISCFUNDBalanceSheet:false});
        
    }

    public componentDidMount(): void {
        this.generateSessionsRange();
        this.GetMISCFUNDBalanceSheet();
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.ActiveProject !== this.props.ActiveProject) {
            this.setState({
                ActiveProject: this.props.ActiveProject,
                shouldGetMISCFUNDBalanceSheet: true,
            }, () => {
                this.generateSessionsRange();
                this.GetMISCFUNDBalanceSheet();
            });
        }
    }

    render(): any {
        const { BalanceSheetList } = this.state;
        let self = this;
        let subTotalDpp = 0;
        // console.log(Object.keys(BalanceSheetList));

        
        
        // let balanceSheet = Object.keys(BalanceSheetList).map(function(key:any, value:any) {
        //     var section  = Object.keys(BalanceSheetList[key]).map(function(key1:any, value1:any) {
        //         Object.keys(BalanceSheetList[key][key1]).map(function(key2:any, value2:any) {
        //             console.log(BalanceSheetList[key][key1][key2]);
        //         })
        //     });
           
           
             
        
        // });
        
        
        return (
            <div id={this.state.__uid}>
                <div className={__css_BlncChartHeading}>
                    <h3><span>Project Name:</span> {this.state.ActiveProject.name}</h3>
                    <div className={__css_ChartTitle}>
                        <p>Misc Fund Balance Sheet Year Wise</p>
                    </div>
                </div>

                <div className={__css_TableWrap}>
                    <table className={__css_BlncChart}>
                        <thead>
                        <tr>
                            <th>Ser No</th>
                            <th>Name of Sub Head</th>
                            <th>DPP Amount</th>
                            <th colSpan={(2 + this.state.SessionsRange.length)}>So far Received Amount</th>
                            <th>Total Expenditure</th>
                            <th>Misc Fund Current Bal</th>
                            <th>Remark</th>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            {this.state.SessionsRange.map((session: {
                                session: string,
                                startYear: string | number,
                                endYear: string | number,
                            }, index: number) => (
                                <td key={index}>Fund<br/> Received {session.session}</td>
                            ))}
                            <td>Total <br/>Received</td>
                            <td>DPP<br/> Rest Amount</td>
                            <td>TOTAL <br/> Expenditure</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* <tr>
                            <td>(a)</td>
                            <td>(b)</td>
                            <td>(c)</td>
                            <td>(d)</td>
                            <td>(g = d+e+f)</td>
                            <td>(h = c-g)</td>
                            <td>(i)</td>
                            <td>(l = i+j+k)</td>
                            <td>(m = g-l)</td>
                            <td>(n)</td>
                        </tr> */}


                        {
                            
                            Object.keys(BalanceSheetList).map(function(key:any, value:any) {
                                
                                let totalDpp = 0; 
                                return Object.keys(BalanceSheetList[key]).map(function(key1:any, value1:any) {
                                    let data  = BalanceSheetList[key];
                                    let total_received_amount = 0;
                                    let total_expenditure_up_to_date = 0;

                                    
                                    
                                    if(data[key1].id!==''){
                                        totalDpp += Number(data[key1].dpp);
                                        
                                        
                                        return (

                                        <tr>
                                            <td>{data[key1].id}</td>
                                            <td>{data[key1].name}</td>
                                            <td>{data[key1].dpp}</td>
                                            {Object.keys(data[key1].received_amount).map(function(key2:any, value2:any) {
                                                total_received_amount += data[key1].received_amount[key2];
                                                return(<td>{data[key1].received_amount[key2]}</td>)

                                            })}
                                            <td>{total_received_amount}</td>
                                            <td>{Number(data[key1].dpp)-Number(total_received_amount)}</td>

                                            {Object.keys(data[key1].expenditure_up_to_date).map(function(key2:any, value2:any) {
                                                total_expenditure_up_to_date += data[key1].expenditure_up_to_date[key2];

                                            })}
                                            <td>{total_expenditure_up_to_date}</td>
                                            <td>{(Number(data[key1].dpp)-Number(total_received_amount))-Number(total_expenditure_up_to_date)}</td>
                                            <td>{data[key1].remarks}</td>
                                            
                                        </tr>
                                        )
                                    }else{
                                        subTotalDpp += totalDpp;
                                        return (
                                            <tr className={__section_name}>
                                                <td></td>
                                                <td>{data[key1].section_name}</td>
                                                <td>{totalDpp}</td>
                                                {
                                                    self.state.SessionsRange.map((session: {
                                                        session: string,
                                                        startYear: string | number,
                                                        endYear: string | number,
                                                    }, index: number) => (
                                                        <td key={index}></td>
                                                    ))
                                                }
                                                <td></td>
                                                <td></td>
                                               
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
                                        )
                                    } 
                                    }); 
                                
                            
                            })
                        }
                        <tr>
                            <td></td>
                            <td>Sub Total</td>
                            <td>{subTotalDpp}</td>
                            {
                                self.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}></td>
                                ))
                            }
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Bank Profit ©</td>
                            <td></td>
                            {
                                self.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}></td>
                                ))
                            }
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                        <tr className={__section_name}>
                            <td></td>
                            <td>Grand Total</td>
                            <td>{subTotalDpp+(2*subTotalDpp*.01)}</td>
                            {
                                self.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}></td>
                                ))
                            }
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                       
                        </thead>
                    </table>
                </div>
                <div className={__css_BackBtn}>
                    <a onClick={() => this.props.history.goBack()}>Back</a>
                    <a onClick={this.handlePrintArea} className={"ml-2"}>Print</a>
                </div>
            </div>
        );
    }
}


export default APP.GLOBAL.DATA.WITH_STORE((state: any) => {
    return {
        ActiveProject: state.SWITCH_PROJECT,
        SelectedSession: state.SESSION_FILTER,
    }
})(BalanceSheetSessionReport);
