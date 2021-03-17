import React from 'react';
import {APP} from "../../../../App/Init/AppProvider";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";
import Table from "react-bootstrap/Table";
import Select from "../../../../Layouts/Components/Global/Select/Select";

const __css_Table = css(`
    font-size: 12px;
    
    & th.center {
        text-align: center;
    }
    & td {
        padding: 0 5px;
        vertical-align: middle;
    }
    
    & td.center {
        text-align: center;
    }
    
    & td.right {
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

class BalanceSheetForm extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            NotFoundException: false,
            PFFundList: [],
            Session: '',
            project_id:'',
            SelectedFundType: '',
        };

        this.handleChangeFundsObject = this.handleChangeFundsObject.bind(this);
        this.generateFundsArrayOfObjects = this.generateFundsArrayOfObjects.bind(this);
        this.getProjectFunds = this.getProjectFunds.bind(this);
        this.handleSubmitBalanceSheet = this.handleSubmitBalanceSheet.bind(this);
        this.getProjects = this.getProjects.bind(this);
    }

    protected handleChangeFundsObject(index: number, key: string, value: any) {
        const PFFundList = this.state.PFFundList;
        PFFundList[index][key] = value;
        this.setState({PFFundList: PFFundList});
    }

    protected generateFundsArrayOfObjects(Funds: Array<any>) {
        const FundsArray: Array<{
            FundType: 'PF' | 'CF',
            id: string | number,
            ProjectId: string | number,
            SectionID: string | number,
            Name: string,
            EconomicCode: string,
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
                ProjectId: Funds[i].project.id,
                SectionID: Funds[i].section_id,
                Name: Funds[i].description,
                EconomicCode: Funds[i].economic_code,
                DPPAmount: Number(Funds[i].total_price),
                ReceivedAmount: '',
                ExpenditureUptoDate: '',
                Attachment: '',
                Remarks: '',
            });
        }
        return FundsArray;
    }

    protected getProjectFunds(projectId: string | number | null = 0): void {
        new APP.SERVICES.BALANCE_SHEET().GetTasks(this.state.SelectedFundType, projectId).then(({data}) => {

            const responseData = data.data;


            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    PFFundList: this.generateFundsArrayOfObjects(responseData),
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

    protected handleSubmitBalanceSheet(): void {
        new APP.SERVICES.BALANCE_SHEET().SaveBalanceSheet({
            Session: this.state.Session,
            FundList: this.state.PFFundList,
            FundType: this.state.SelectedFundType,
        }).then(({data}) => {
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

    public componentDidMount(): void {

        this.getProjects();

        if (this.state.EditMode) {

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
                            BALANCE SHEET {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={12}>
                                <Row>
                                    <Col md={4}>
                                        <Select
                                            options={[
                                                {label: '-- Select Type --', value: ''},
                                                {label: 'PF', value: 'PF'},
                                                {label: 'CF', value: 'CF'},
                                                {label: 'Misc', value: 'MISC'},
                                            ]}
                                            defaultValue={""}
                                            label={"Fund Type"}
                                            name={"fund_type"}
                                            value={this.state.SelectedFundType}
                                            onChange={(e) => {
                                                this.setState({SelectedFundType: e.target.value}, () => {
                                                    this.getProjectFunds(this.state.project_id);
                                                });
                                            }}/>
                                    </Col>
                                    <Col md={4}>
                                        <Select options={this.state.ProjectList}
                                                defaultValue={""}
                                                label={"Project"}
                                                name={"project"}
                                                value={this.state.project_id}
                                                onChange={(e) => {
                                                    this.setState({project_id: e.target.value},
                                                        () => {
                                                            if(Number(this.state.project_id) > 0) {
                                                                this.getProjectFunds(this.state.project_id);
                                                            } else {
                                                                this.setState({
                                                                    PFFundList: [],
                                                                });
                                                            }
                                                        });
                                                }}/>
                                    </Col>
                                    <Col md={4}>
                                        <Select
                                            options={APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(APP.FUNCTIONS.GET_SESSION_YEARS(), 'session', 'session')}
                                            defaultValue={""}
                                            label={"Session"}
                                            name={"session"}
                                            value={this.state.Session}
                                            onChange={(e) => this.setState({Session: e.target.value})}/>
                                    </Col>
                                </Row>

                                    <Table striped bordered hover className={__css_Table} responsive={true} size={"sm"}>
                                        <thead>
                                        <tr>
                                            <th>Name of Sub Head</th>
                                            <th>DPP Amount</th>
                                            <th>Received Amount</th>
                                            <th>Expenditure Up to Date</th>
                                            <th>Attachment</th>
                                            <th>Remarks</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.PFFundList.map((PFFund: any, index: number) => (
                                            <tr key={index}>
                                                <td>{PFFund.Name}</td>
                                                <td>{PFFund.DPPAmount}</td>
                                                <td>
                                                    <input type={"text"} className={__css_InputField}
                                                           value={PFFund.ReceivedAmount}
                                                           onChange={(e) => this.handleChangeFundsObject(index, 'ReceivedAmount', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input type={"text"} className={__css_InputField}
                                                           value={PFFund.ExpenditureUptoDate}
                                                           onChange={(e) => this.handleChangeFundsObject(index, 'ExpenditureUptoDate', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input type={"file"} className={__css_InputField}
                                                    onChange={(e) => {
                                                        if(e.target.files !== null) {
                                                            const file = e.target.files[0];
                                                            this.handleChangeFundsObject(index, 'Attachment', file);
                                                        }
                                                    }}
                                                />
                                                </td>
                                                <td>
                                                    <input type={"text"} className={__css_InputField}
                                                           value={PFFund.Remarks}
                                                           onChange={(e) => this.handleChangeFundsObject(index, 'Remarks', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveCFFundBtn} onClick={this.handleSubmitBalanceSheet}>Submit
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

export default withRouter(BalanceSheetForm);
