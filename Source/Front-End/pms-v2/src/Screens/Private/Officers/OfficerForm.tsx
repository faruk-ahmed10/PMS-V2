import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../Layouts/Components/Global/TextField/TextField";
import {APP} from "../../../App/Init/AppProvider";
import Select from "../../../Layouts/Components/Global/Select/Select";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";
import DatePickerTextField from "../../../Layouts/Components/Global/DatePickerTextField/DatePickerTextField";

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

const __css_SaveContractorBtn = css(`
    padding: 4px 10px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);


class OfficerForm extends React.Component<any, any> {
    public state: any;
    private readonly officer_id: number;

    public constructor(props: any) {
        super(props);

        this.officer_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            Educations: [],
            NotFoundException: false,
            Name: '',
            DisplayName: '',
            Rank: '',
            Photo: '',
            Email: '',
            Phone: '',
            JoinDate: new Date(),
            LeaveDate: '',
            Message: '',
            Position: '',
            Unit: '',
            BaNo: '',
            Appointment: '',
            BriefDescription: '',
            session: [],
            board: [],
            institute: [],
            exam_type: [],
            Status: '',
            RankList: '',
            bma_long_course: '',
            education_qualification_army: '',
            education_qualification_civil: '',
            army_level_course: '',
            district: '',
            punishment: '',
            marital_status: '',
            date_of_commission: '',
            blood_group: '',
            dob: '',
            trade: '',
            rank_id: 0,

            EditMode: this.officer_id > 0,
        };

        this.getOfficerData = this.getOfficerData.bind(this);
        this.addRow = this.addRow.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmitOfficer = this.handleSubmitOfficer.bind(this);
    }

    protected addRow() {
        this.setState({
            Educations: [...this.state.Educations, '']
        })
    }

    protected getOfficerData(): void {
        new APP.SERVICES.OFFICERS().GetOfficer(this.officer_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    Name: responseData.name,
                    DisplayName: responseData.display_name,
                    rank_id: responseData.rank ? responseData.rank.id : '',
                    Rank: responseData.rank ? responseData.rank.name : '',
                    bma_long_course: responseData.bma_long_course,
                    education_qualification_civil: responseData.education_qualification_civil,
                    education_qualification_army: responseData.education_qualification_army,
                    army_level_course: responseData.army_level_course,
                    punishment: responseData.punishment,
                    district: responseData.district,
                    marital_status: responseData.marital_status,
                    date_of_commission: responseData.date_of_commission,
                    blood_group: responseData.blood_group,
                    dob: responseData.dob,
                    trade: responseData.trade,
                    Photo: responseData.photo,
                    Email: responseData.email,
                    Phone: responseData.phone,
                    Unit: responseData.unit,
                    BriefDescription: responseData.brif,
                    JoinDate: responseData.join_date,
                    LeaveDate: responseData.leave_date,
                    Message: responseData.message,
                    Position: responseData.position,
                    Status: responseData.status,
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

    protected handleSubmitOfficer(): void {
        new APP.SERVICES.OFFICERS().SaveOfficer({

            officer_id: this.officer_id,
            name: this.state.Name,
            display_name: this.state.DisplayName,
            rank: this.state.rank,
            type: this.props.match.params.rank,
            bma_long_course: this.state.bma_long_course,
            army_level_course: this.state.army_level_course,
            education_qualification_army: this.state.education_qualification_army,
            education_qualification_civil: this.state.education_qualification_civil,
            punishment: this.state.punishment,
            district: this.state.district,
            marital_status: this.state.marital_status,
            blood_group: this.state.blood_group,
            dob: APP.FUNCTIONS.CONVERT_DATE(this.state.dob, 'yyyy-mm-dd'),
            trade: this.state.trade,
            photo: this.state.Photo,
            email: this.state.Email,
            phone: this.state.Phone,
            unit: this.state.Unit,
            brif: this.state.BriefDescription,
            date_of_commission: APP.FUNCTIONS.CONVERT_DATE(this.state.date_of_commission, 'yyyy-mm-dd'),
            join_date: APP.FUNCTIONS.CONVERT_DATE(this.state.JoinDate, 'yyyy-mm-dd'),
            leave_date: this.state.LeaveDate ? APP.FUNCTIONS.CONVERT_DATE(this.state.LeaveDate, 'yyyy-mm-dd') : '',
            message: this.state.Message,
            position: this.state.Position,
            ba_no: this.state.BaNo,
            appointment: this.state.Appointment,
            status: this.state.Status,
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

    // handleChange(e:any){
    //     this.setState({
    //         // Computed property names
    //         // keys of the objects are computed dynamically
    //         [e.target.name] : e.target.value
    //     })
    //
    // }

    public componentDidMount(): void {
        if (this.state.EditMode) {
            this.getOfficerData();
        }
    }

    public render(): any {

        const officer = [
            {label: '--Select Rank--', value: 0},
            {label: 'Lt Col', value: 1},
            {label: 'Maj', value: 2},
            {label: 'Capt', value: 3},
            {label: 'Lt', value: 4},
            {label: '2Lt', value: 5}
        ]
        const jco = [
            {label: '--Select Rank--', value: 0},
            {label: 'MWO', value: 6},
            {label: 'SWO', value: 7},
            {label: 'WO', value: 8}
        ]
        const or = [
            {label: '--Select Rank--', value: 0},
            {label: 'Sgt', value: 9},
            {label: 'Cpl', value: 10},
            {label: 'Lcpl', value: 11},
            {label: 'Snk', value: 12}
        ]
        let RankList: any = this.props.match.params.rank == 'officer' ? officer :
            this.props.match.params.rank == 'jco' ? jco :
                this.props.match.params.rank == 'or' ? or : ''

        console.log(this.state.rank_id);


        if (this.state.NotFoundException) {
            return <FourZeroFour/>;
        }

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_cardTitle}>
                        <div className={"title"}>
                            {APP.FUNCTIONS.CAPITALIZE(this.props.match.params.rank)} {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Number"}
                                               name={"ba_no"} value={this.state.BaNo}
                                               type={"text"}
                                               onChange={e => this.setState({BaNo: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Select options={RankList}
                                            defaultValue={this.state.rank_id}
                                            label={"Rank"}
                                            name={"rank"}
                                            value={this.state.rank}
                                            onChange={(e) => {
                                                this.setState({rank: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Name"}
                                               name={"name"} value={this.state.Name}
                                               type={"text"}
                                               onChange={e => this.setState({Name: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Appointment"}
                                               name={"appointment"} value={this.state.Appointment}
                                               type={"text"}
                                               onChange={e => this.setState({Appointment: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Display Name"}
                                               name={"display_name"} value={this.state.DisplayName}
                                               type={"text"}
                                               onChange={e => this.setState({DisplayName: e.target.value})}
                                    />
                                </Col>

                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Email"}
                                               name={"email"} value={this.state.Email}
                                               type={"text"}
                                               onChange={e => this.setState({Email: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Phone"}
                                               name={"phone"} value={this.state.Phone}
                                               type={"text"}
                                               onChange={e => this.setState({Phone: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Unit"}
                                               name={"unit"} value={this.state.Unit}
                                               type={"text"}
                                               onChange={e => this.setState({Unit: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <DatePickerTextField label={"Date of Birth"}
                                                         name={"dob"}
                                                         value={this.state.dob}
                                                         onChange={date => this.setState({
                                                             dob: date,
                                                         })}/>
                                </Col>
                                <Col md={6}>
                                    <DatePickerTextField label={"Join Date"}
                                                         name={"join_date"}
                                                         value={this.state.JoinDate}
                                                         onChange={date => this.setState({
                                                             JoinDate: date,
                                                         })}/>
                                </Col>
                                {
                                    this.props.match.params.rank == 'officer' ?

                                        <Col md={6}>
                                            <DatePickerTextField label={"Date of Commission"}
                                                                 name={"date_of_commission"}
                                                                 value={this.state.date_of_commission}
                                                                 onChange={date => this.setState({
                                                                     date_of_commission: date,
                                                                 })}/>
                                        </Col>
                                        : ''
                                }
                                <Col md={6}>
                                    <DatePickerTextField label={"Leave Date"}
                                                         name={"leave_date"}
                                                         value={this.state.LeaveDate}
                                                         onChange={date => this.setState({
                                                             LeaveDate: date,
                                                         })}
                                    />
                                </Col>
                                {
                                    this.props.match.params.rank == 'officer' ?
                                        <Col md={6}>
                                            <TextField defaultValue={""}
                                                       label={"Brief"}
                                                       name={"brif"} value={this.state.BriefDescription}
                                                       type={"text"}
                                                       onChange={e => this.setState({BriefDescription: e.target.value})}
                                            />
                                        </Col>
                                        : ''
                                }
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Marital Status"}
                                               name={"marital_status"} value={this.state.marital_status}
                                               type={"text"}
                                               onChange={e => this.setState({marital_status: e.target.value})}
                                    />
                                </Col>

                                {
                                    this.props.match.params.rank == 'officer' ?
                                        <Col md={6}>
                                            <TextField defaultValue={""}
                                                       label={"Message"}
                                                       name={"message"} value={this.state.Message}
                                                       type={"text"}
                                                       onChange={e => this.setState({Message: e.target.value})}
                                            />
                                        </Col>
                                        : ''
                                }

                                {/* <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Position"}
                                               name={"position"} value={this.state.Position}
                                               type={"text"}
                                               onChange={e => this.setState({Position: e.target.value})}
                                    />
                                </Col> */}

                                {
                                    this.props.match.params.rank == 'officer' ?
                                        <Col md={6}>
                                            <TextField defaultValue={""}
                                                       label={"BMA Long Course"}
                                                       name={"bma_long_course"} value={this.state.bma_long_course}
                                                       type={"text"}
                                                       onChange={e => this.setState({bma_long_course: e.target.value})}
                                            />
                                        </Col>
                                        : ''
                                }
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Army Level Course"}
                                               name={"army_level_course"} value={this.state.army_level_course}
                                               type={"textarea"}
                                               onChange={e => this.setState({army_level_course: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Education Qualification Army"}
                                               name={"education_qualification_army"}
                                               value={this.state.education_qualification_army}
                                               type={"textarea"}
                                               onChange={e => this.setState({education_qualification_army: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Education Qualification Civil"}
                                               name={"education_qualification_civil"}
                                               value={this.state.education_qualification_civil}
                                               type={"textarea"}
                                               onChange={e => this.setState({education_qualification_civil: e.target.value})}
                                    />
                                </Col>
                                {
                                    this.props.match.params.rank != 'officer' ?

                                        (<>
                                            <Col md={6}>
                                                <TextField defaultValue={""}
                                                           label={"Punishment"}
                                                           name={"punishment"} value={this.state.punishment}
                                                           type={"textarea"}
                                                           onChange={e => this.setState({punishment: e.target.value})}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <TextField defaultValue={""}
                                                           label={"District"}
                                                           name={"district"} value={this.state.district}
                                                           type={"text"}
                                                           onChange={e => this.setState({district: e.target.value})}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <TextField defaultValue={""}
                                                           label={"Trade"}
                                                           name={"trade"} value={this.state.trade}
                                                           type={"text"}
                                                           onChange={e => this.setState({trade: e.target.value})}
                                                />
                                            </Col>
                                        </>)
                                        : ""
                                }
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Blood Group"}
                                               name={"blood_group"} value={this.state.blood_group}
                                               type={"text"}
                                               onChange={e => this.setState({blood_group: e.target.value})}
                                    />
                                </Col>


                                <Col md={6}>
                                    <Select options={[
                                        {value: '', label: '--Select Status--'},
                                        {value: 'Present', label: 'Present'},
                                        {value: 'Previous', label: 'Previous'},
                                    ]}
                                            defaultValue={""}
                                            label={"Status"}
                                            name={"status"}
                                            value={this.state.Status}
                                            onChange={(e) => {
                                                this.setState({Status: e.target.value});
                                            }}
                                    />
                                </Col>

                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Choose your Photo"}
                                               labelIconNode={null}
                                               name={"photo"}
                                               type={"file"}
                                               onChange={e => this.setState({Photo: e.target.files[0]})}
                                    />
                                </Col>

                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitOfficer}>Submit
                                    </button>
                                </Col>

                            </Row>
                            {/*<Row>*/}
                            {/*    <Col md={6}><b>Education Qualification</b></Col>*/}
                            {/*    <Col md={6} style={{textAlign: "right"}}>*/}
                            {/*        <a onClick={this.addRow} className={"btn btn-info"}>+</a>*/}
                            {/*    </Col>*/}
                            {/*    <Col md={12}>*/}
                            {/*        <table className={"table"}>*/}
                            {/*            <thead>*/}
                            {/*                <th>Exam Type</th>*/}
                            {/*                <th>Session</th>*/}
                            {/*                <th>Institute</th>*/}
                            {/*                <th>Board</th>*/}
                            {/*            </thead>*/}
                            {/*            <tbody>*/}
                            {/*            {*/}
                            {/*                this.state.Educations.map((item: any, i: string | number | null | undefined) => {*/}
                            {/*                    return (*/}
                            {/*                        <tr key={i} >*/}
                            {/*                            <td>*/}
                            {/*                                <TextField defaultValue={""}*/}
                            {/*                                           label={"Exam Type"}*/}
                            {/*                                           name={"exam_type"}*/}
                            {/*                                           value={this.state.ExamType}*/}
                            {/*                                           type={"text"}*/}
                            {/*                                           onChange={this.handleChange}*/}
                            {/*                                />*/}
                            {/*                            </td>*/}
                            {/*                            <td>*/}
                            {/*                                <TextField defaultValue={""}*/}
                            {/*                                           label={"Session"}*/}
                            {/*                                           name={"session"}*/}
                            {/*                                           value={this.state.Session}*/}
                            {/*                                           type={"text"}*/}
                            {/*                                           onChange={this.handleChange}*/}
                            {/*                                />*/}
                            {/*                            </td>*/}
                            {/*                            <td>*/}
                            {/*                                <TextField defaultValue={""}*/}
                            {/*                                           label={"Institute"}*/}
                            {/*                                           name={"institute"}*/}
                            {/*                                           value={this.state.Institute}*/}
                            {/*                                           type={"text"}*/}
                            {/*                                           onChange={this.handleChange}*/}
                            {/*                                />*/}
                            {/*                            </td>*/}
                            {/*                            <td>*/}
                            {/*                                <TextField defaultValue={""}*/}
                            {/*                                           label={"Board"}*/}
                            {/*                                           name={"board"}*/}
                            {/*                                           value={this.state.Board}*/}
                            {/*                                           type={"text"}*/}
                            {/*                                           onChange={this.handleChange}*/}
                            {/*                                />*/}
                            {/*                            </td>*/}
                            {/*                        </tr>*/}
                            {/*                    )*/}
                            {/*                })*/}
                            {/*            }*/}
                            {/*            </tbody>*/}
                            {/*        </table>*/}
                            {/*    </Col>*/}
                            {/*   */}
                            {/*</Row>*/}


                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(OfficerForm);