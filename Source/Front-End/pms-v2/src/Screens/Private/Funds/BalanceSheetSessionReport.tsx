import React from 'react';
import {css} from "@emotion/css";
import {APP} from "../../../App/Init/AppProvider";
import {Link, withRouter} from "react-router-dom";


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

class BalanceSheetSessionReport extends React.Component<{
    ActiveProject: any,
    SelectedSession: any,
    history: Readonly<any>,
    hideActionBtns: boolean | undefined,
    fundType: 'PF' | 'CF' | 'MiSC' | '',
}, {
    ActiveProject: any,
    SessionsRange: Array<any>,
    shouldGetPFFundBalanceSheet: boolean,
    BalanceSheetList: Array<any>,
    DppSubTotal: any,
    PriseContigency: any,
    PhysicalContigency: any,
    GrandTotal: any,
    FirstReceivedSubTotal: any,
    SecondReceivedSubTotal: any,
    ThirdReceivedSubTotal: any,
    FourthReceivedSubTotal: any,
    FifthReceivedSubTotal: any,
    TotalReceivedSubTotal: any,

    FirstExpenditureSubTotal: any,
    SecondExpenditureSubTotal: any,
    ThirdExpenditureSubTotal: any,
    FourthExpenditureSubTotal: any,
    FifthExpenditureSubTotal: any,
    TotalExpenditureSubTotal: any,
    TotalCurrentBalanceSubtotal: any,
    TotalDueBalanceSubtotal: any,
    GrandTotalDueAmount: any,
}> {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            ActiveProject: this.props.ActiveProject,
            SessionsRange: [],
            PFFundList: [],
            BalanceSheetList: [],
            SubTotal: 0,
            PriseContigency: 0,
            PhysicalContigency: 0,
            GrandTotal: 0,

            FirstReceivedSubTotal: 0,
            SecondReceivedSubTotal: 0,
            ThirdReceivedSubTotal: 0,
            FourthReceivedSubTotal: 0,
            FifthReceivedSubTotal: 0,
            TotalReceivedSubTotal: 0,

            FirstExpenditureSubTotal: 0,
            SecondExpenditureSubTotal: 0,
            ThirdExpenditureSubTotal: 0,
            FourthExpenditureSubTotal: 0,
            FifthExpenditureSubTotal: 0,
            TotalExpenditureSubTotal: 0,

            TotalCurrentBalanceSubtotal: 0,
            TotalDueBalanceSubtotal: 0,
            GrandTotalDueAmount: 0,

            shouldGetPFFundBalanceSheet: true,
            __uid: Math.random().toString(16).slice(2),
        };

        this.generateFundsArrayOfObjects = this.generateFundsArrayOfObjects.bind(this);
        this.getPFFundBalanceSheet = this.getPFFundBalanceSheet.bind(this);
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

    protected getPFFundBalanceSheet(): any {

        if (!this.state.shouldGetPFFundBalanceSheet) {
            return false;
        }

        new APP.SERVICES.BALANCE_SHEET().GetFundBalanceSheet(this.props.fundType, this.props.ActiveProject.id, this.props.SelectedSession.StartYear, this.props.SelectedSession.EndYear).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    BalanceSheetList: responseData.BalanceSheetList,
                    DppSubTotal: responseData.DppSubTotal,
                    PriseContigency: responseData.PriseContigency,
                    PhysicalContigency: responseData.PhysicalContigency,
                    GrandTotal: responseData.GrandTotal,

                    FirstReceivedSubTotal: responseData.FirstReceivedSubTotal,
                    SecondReceivedSubTotal: responseData.SecondReceivedSubTotal,
                    ThirdReceivedSubTotal: responseData.ThirdReceivedSubTotal,
                    FourthReceivedSubTotal: responseData.FourthReceivedSubTotal,
                    FifthReceivedSubTotal: responseData.FifthReceivedSubTotal,
                    TotalReceivedSubTotal: responseData.TotalReceivedSubTotal,

                    FirstExpenditureSubTotal: responseData.FirstExpenditureSubTotal,
                    SecondExpenditureSubTotal: responseData.SecondExpenditureSubTotal,
                    ThirdExpenditureSubTotal: responseData.ThirdExpenditureSubTotal,
                    FourthExpenditureSubTotal: responseData.FourthExpenditureSubTotal,
                    FifthExpenditureSubTotal: responseData.FifthExpenditureSubTotal,
                    TotalExpenditureSubTotal: responseData.TotalExpenditureSubTotal,

                    TotalCurrentBalanceSubtotal: responseData.TotalCurrentBalanceSubtotal,
                    TotalDueBalanceSubtotal: responseData.TotalDueBalanceSubtotal,
                    GrandTotalDueAmount: responseData.GrandTotalDueAmount,
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
        this.setState({shouldGetPFFundBalanceSheet: false});

    }

    public componentDidMount(): void {
        this.generateSessionsRange();
        this.getPFFundBalanceSheet();
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.ActiveProject.id !== this.props.ActiveProject.id) {
            this.setState({
                ActiveProject: this.props.ActiveProject,
                shouldGetPFFundBalanceSheet: true,
            }, () => {
                this.generateSessionsRange();
                this.getPFFundBalanceSheet();
            });
        }
    }

    render(): any {
        return (
            <div id={this.state.__uid}>
                <div className={__css_BlncChartHeading}>
                    <h3><span>Project Name:</span> {this.state.ActiveProject.name}</h3>
                    <div className={__css_ChartTitle}>
                        <p>{this.props.fundType} Fund Balance Sheet Year Wise</p>
                    </div>
                </div>

                <div className={__css_TableWrap}>
                    <table className={__css_BlncChart}>
                        <thead>
                        <tr>
                            <th>Ser No</th>
                            <th>Name of Sub Head</th>
                            <th>DPP Amount</th>
                            <th colSpan={(1 + this.state.SessionsRange.length)}>Account details of {this.props.fundType} Fund</th>
                            <th colSpan={(1 + this.state.SessionsRange.length)}>Expenditure of {this.props.fundType} Fund</th>
                            <th>{this.props.fundType} Fund Current Bal</th>
                            <th>Due Amount</th>
                            <th>Remark</th>
                        </tr>

                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            {this.state.SessionsRange.map((session: {
                                session: string,
                                startYear: string | number,
                                endYear: string | number,
                            }, index: number) => (
                                <td key={index}>Fund<br/> Received {session.session}</td>
                            ))}
                            <td>Total <br/>Received</td>
                            {this.state.SessionsRange.map((session: {
                                session: string,
                                startYear: string | number,
                                endYear: string | number,
                            }, index: number) => (
                                <td key={index}>{session.session}</td>
                            ))}
                            <td>TOTAL <br/> Expenditure</td>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.BalanceSheetList.map((BalanceSheetList: any) => (
                            <React.Fragment>
                                {BalanceSheetList.tasks.data.map((BalanceSheet: any, index: number) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{BalanceSheet.description}</td>
                                        <td>{BalanceSheet.dpp_amount}</td>
                                        {this.state.SessionsRange.map((Session: any, i: number) => (
                                            <React.Fragment key={i}>
                                                {i === 0 && (
                                                    <td>{BalanceSheet.FirstReceived}</td>
                                                )}

                                                {i === 1 && (
                                                    <td>{BalanceSheet.SecondReceived}</td>
                                                )}

                                                {i === 2 && (
                                                    <td>{BalanceSheet.ThirdReceived}</td>
                                                )}

                                                {i === 3 && (
                                                    <td>{BalanceSheet.FourthReceived}</td>
                                                )}

                                                {i === 4 && (
                                                    <td>{BalanceSheet.FifthReceived}</td>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        <td>{BalanceSheet.total_received}</td>


                                        {this.state.SessionsRange.map((Session: any, i: number) => (
                                            <React.Fragment key={i}>
                                                {i === 0 && (
                                                    <td>{BalanceSheet.FirstExpenditure}</td>
                                                )}

                                                {i === 1 && (
                                                    <td>{BalanceSheet.SecondExpenditure}</td>
                                                )}

                                                {i === 2 && (
                                                    <td>{BalanceSheet.ThirdExpenditure}</td>
                                                )}

                                                {i === 3 && (
                                                    <td>{BalanceSheet.FourthExpenditure}</td>
                                                )}

                                                {i === 4 && (
                                                    <td>{BalanceSheet.FifthExpenditure}</td>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        <td>{BalanceSheet.total_expenditure}</td>

                                        <td>{BalanceSheet.current_bal}</td>
                                        <td>{BalanceSheet.due_amount}</td>
                                        <td>{BalanceSheet.remarks}</td>
                                    </tr>
                                ))}

                                <tr className={__section_name}>
                                    <td/>
                                    <td>{BalanceSheetList.section.name}</td>
                                    <td>{BalanceSheetList.tasks.TotalDppAmount}</td>
                                    {this.state.SessionsRange.map((Session: any, i: number) => (
                                        <React.Fragment key={i}>
                                            {i === 0 && (
                                                <td>{BalanceSheetList.tasks.TotalFirstReceived}</td>
                                            )}

                                            {i === 1 && (
                                                <td>{BalanceSheetList.tasks.TotalSecondReceived}</td>
                                            )}

                                            {i === 2 && (
                                                <td>{BalanceSheetList.tasks.TotalThirdReceived}</td>
                                            )}

                                            {i === 3 && (
                                                <td>{BalanceSheetList.tasks.TotalFourthReceived}</td>
                                            )}

                                            {i === 4 && (
                                                <td>{BalanceSheetList.tasks.TotalFifthReceived}</td>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <td>{BalanceSheetList.tasks.TotalReceived}</td>


                                    {this.state.SessionsRange.map((Session: any, i: number) => (
                                        <React.Fragment key={i}>
                                            {i === 0 && (
                                                <td>{BalanceSheetList.tasks.TotalFirstExpenditure}</td>
                                            )}

                                            {i === 1 && (
                                                <td>{BalanceSheetList.tasks.TotalSecondExpenditure}</td>
                                            )}

                                            {i === 2 && (
                                                <td>{BalanceSheetList.tasks.TotalThirdExpenditure}</td>
                                            )}

                                            {i === 3 && (
                                                <td>{BalanceSheetList.tasks.TotalFourthExpenditure}</td>
                                            )}

                                            {i === 4 && (
                                                <td>{BalanceSheetList.tasks.TotalFifthExpenditure}</td>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <td>{BalanceSheetList.tasks.TotalExpenditure}</td>

                                    <td>{BalanceSheetList.tasks.TotalCurrentBalance}</td>
                                    <td>{BalanceSheetList.tasks.TotalDueBalance}</td>
                                    <td/>
                                </tr>
                            </React.Fragment>
                        ))}

                        <tr>
                            <td/>
                            <td>Subtotal</td>
                            <td>{this.state.DppSubTotal}</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, i: number) => (
                                    <React.Fragment key={i}>
                                        {i === 0 && (
                                            <td>{this.state.FirstReceivedSubTotal}</td>
                                        )}

                                        {i === 1 && (
                                            <td>{this.state.SecondReceivedSubTotal}</td>
                                        )}

                                        {i === 2 && (
                                            <td>{this.state.ThirdReceivedSubTotal}</td>
                                        )}

                                        {i === 3 && (
                                            <td>{this.state.FourthReceivedSubTotal}</td>
                                        )}

                                        {i === 4 && (
                                            <td>{this.state.FifthReceivedSubTotal}</td>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                            <td>{this.state.TotalReceivedSubTotal}</td>

                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, i: number) => (
                                    <React.Fragment key={i}>
                                        {i === 0 && (
                                            <td>{this.state.FirstExpenditureSubTotal}</td>
                                        )}

                                        {i === 1 && (
                                            <td>{this.state.SecondExpenditureSubTotal}</td>
                                        )}

                                        {i === 2 && (
                                            <td>{this.state.ThirdExpenditureSubTotal}</td>
                                        )}

                                        {i === 3 && (
                                            <td>{this.state.FourthExpenditureSubTotal}</td>
                                        )}

                                        {i === 4 && (
                                            <td>{this.state.FifthExpenditureSubTotal}</td>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                            <td>{this.state.TotalExpenditureSubTotal}</td>

                            <td>{this.state.TotalCurrentBalanceSubtotal}</td>
                            <td>{this.state.TotalDueBalanceSubtotal}</td>
                            <td/>
                        </tr>

                        <tr>
                            <td/>
                            <td>Prise Contigency (1%)</td>
                            <td>{this.state.PriseContigency}</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}>0</td>
                                ))
                            }
                            <td>0</td>
                            <td>0</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, i: number) => (
                                    <React.Fragment key={i}>
                                        <td>0</td>
                                    </React.Fragment>
                                ))
                            }
                            <td>0</td>
                            <td>{this.state.PriseContigency}</td>
                            <td/>
                        </tr>

                        <tr>
                            <td/>
                            <td>Physical Contigency (1%)</td>
                            <td>{this.state.PhysicalContigency}</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}>0</td>
                                ))
                            }
                            <td>0</td>
                            <td>0</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, index: number) => (
                                    <td key={index}>0</td>
                                ))
                            }
                            <td>0</td>
                            <td>{this.state.PhysicalContigency}</td>
                            <td/>
                        </tr>

                        <tr className={__section_name}>
                            <td/>
                            <td>Grand Total</td>
                            <td>{this.state.GrandTotal}</td>
                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, i: number) => (
                                    <React.Fragment key={i}>
                                        {i === 0 && (
                                            <td>{this.state.FirstReceivedSubTotal}</td>
                                        )}

                                        {i === 1 && (
                                            <td>{this.state.SecondReceivedSubTotal}</td>
                                        )}

                                        {i === 2 && (
                                            <td>{this.state.ThirdReceivedSubTotal}</td>
                                        )}

                                        {i === 3 && (
                                            <td>{this.state.FourthReceivedSubTotal}</td>
                                        )}

                                        {i === 4 && (
                                            <td>{this.state.FifthReceivedSubTotal}</td>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                            <td>{this.state.TotalReceivedSubTotal}</td>

                            {
                                this.state.SessionsRange.map((session: {
                                    session: string,
                                    startYear: string | number,
                                    endYear: string | number,
                                }, i: number) => (
                                    <React.Fragment key={i}>
                                        {i === 0 && (
                                            <td>{this.state.FirstExpenditureSubTotal}</td>
                                        )}

                                        {i === 1 && (
                                            <td>{this.state.SecondExpenditureSubTotal}</td>
                                        )}

                                        {i === 2 && (
                                            <td>{this.state.ThirdExpenditureSubTotal}</td>
                                        )}

                                        {i === 3 && (
                                            <td>{this.state.FourthExpenditureSubTotal}</td>
                                        )}

                                        {i === 4 && (
                                            <td>{this.state.FifthExpenditureSubTotal}</td>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                            <td>{this.state.TotalExpenditureSubTotal}</td>

                            <td>{this.state.TotalCurrentBalanceSubtotal}</td>
                            <td>{this.state.GrandTotalDueAmount}</td>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {(typeof this.props.hideActionBtns === 'undefined' || !this.props.hideActionBtns) && (
                    <div className={__css_BackBtn}>
                        <a onClick={() => this.props.history.goBack()}>Back</a>
                        <Link to={this.props.fundType === 'PF' ? APP.ROUTES.PRIVATE.PF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE : this.props.fundType === 'CF' ? APP.ROUTES.PRIVATE.CF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE: APP.ROUTES.PRIVATE.MISC_BALANCE_SHEET_SESSION_REPORT_PRINTABLE} target={"_blank"}
                              className={"ml-2"}>Print</Link>
                    </div>
                )}
            </div>
        );
    }
}


export default APP.GLOBAL.DATA.WITH_STORE((state: any) => {
    return {
        ActiveProject: state.SWITCH_PROJECT,
        SelectedSession: state.SESSION_FILTER,
    }
})(withRouter(BalanceSheetSessionReport));
