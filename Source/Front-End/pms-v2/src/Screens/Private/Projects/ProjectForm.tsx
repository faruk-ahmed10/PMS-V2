import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../Layouts/Components/Global/TextField/TextField";
import DatePickerTextField from "../../../Layouts/Components/Global/DatePickerTextField/DatePickerTextField";
import {APP} from "../../../App/Init/AppProvider";
import Select from "../../../Layouts/Components/Global/Select/Select";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";

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

const __css_SaveProjectBtn = css(`
    padding: 4px 10px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);


class ProjectForm extends React.Component<any, any> {
    public state: any;
    private readonly project_id: number;

    public constructor(props: any) {
        super(props);

        this.project_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            NotFoundException: false,

            OfficerList: [],

            Name: '',
            History: '',
            ExecutingAgency: '',
            Location: '',
            Type: '',
            Length: '',
            MainComponents: '',
            ProjectAreaMap: '',
            StartDate: new Date(),
            EndDate: new Date(),
            EstimatedCost: '',
            Duration: '',
            RDPP: '',
            RDPP2: '',
            MOU: '',
            SponsoringMinistry: '',
            SourceOfFound: '',
            Attachment: '',
            Status: '',
            POId: 0,
            PDId: 0,

            EditMode: this.project_id > 0,
        };

        this.getOfficers = this.getOfficers.bind(this);
        this.getProjectData = this.getProjectData.bind(this);
        this.handleSubmitProject = this.handleSubmitProject.bind(this);
    }

    protected getOfficers(): void {
        new APP.SERVICES.OFFICERS().GetOfficersNoLimit().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                const options = [{label: '-- Select Officer --', value: ''}].concat(responseData.map((Officer: any, index: number) => {
                    return {value: Officer.id, label: Officer.name}
                }));

                this.setState({
                    OfficerList: options,
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

    protected getProjectData(): void {
        new APP.SERVICES.PROJECT().GetProject(this.project_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    Name: responseData.name,
                    History: responseData.description,
                    ExecutingAgency: responseData.executing_agency,
                    Location: responseData.location,
                    Type: responseData.type,
                    Length: responseData.length,
                    MainComponents: responseData.main_components,
                    StartDate: APP.FUNCTIONS.CONVERT_MYSQL_DATE(responseData.start_date),
                    EndDate: APP.FUNCTIONS.CONVERT_MYSQL_DATE(responseData.end_date),
                    EstimatedCost: responseData.estimated_cost,
                    Duration: responseData.duration,
                    RDPP: responseData.rdpp,
                    RDPP2: responseData.rdpp_2,
                    MOU: responseData.mou,
                    SponsoringMinistry: responseData.sponsor_ministry,
                    SourceOfFound: responseData.source_of_found,
                    Status: responseData.status,
                    POId: responseData.po_id,
                    PDId: responseData.pd_id,
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

    protected handleSubmitProject(): void {
        new APP.SERVICES.PROJECT().SaveProject({
            project_id: this.project_id,
            name: this.state.Name,
            history: this.state.History,
            executing_agency: this.state.ExecutingAgency,
            location: this.state.Location,
            type: this.state.Type,
            length: this.state.Length,
            main_components: this.state.MainComponents,
            project_area_map: this.state.ProjectAreaMap,
            start_date: APP.FUNCTIONS.CONVERT_DATE(this.state.StartDate, 'yyyy-mm-dd'),
            end_date: APP.FUNCTIONS.CONVERT_DATE(this.state.EndDate, 'yyyy-mm-dd'),
            estimated_cost: this.state.EstimatedCost,
            duration: this.state.Duration,
            rdpp: this.state.RDPP,
            rdpp_2: this.state.RDPP2,
            mou: this.state.MOU,
            sponsor_ministry: this.state.SponsoringMinistry,
            source_of_found: this.state.SourceOfFound,
            attachment: this.state.Attachment,
            status: this.state.Status,
            po_id: this.state.POId,
            pd_id: this.state.PDId,
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

    public componentDidMount(): void {
        this.getOfficers();

        if(this.state.EditMode) {
            this.getProjectData();
        }
    }

    public render(): any {
        if(this.state.NotFoundException) {
            return <FourZeroFour />
        }

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_cardTitle}>
                        <div className={"title"}>
                            PROJECT {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Project Name"}
                                               name={"project_name"} value={this.state.Name}
                                               type={"text"}
                                               onChange={e => this.setState({Name: e.target.value})}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Project History"}
                                               name={"project_history"}
                                               value={this.state.History}
                                               type={"textarea"}
                                               onChange={e => this.setState({History: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Executing Agency"}
                                               name={"executing_agency"}
                                               value={this.state.ExecutingAgency}
                                               type={"text"}
                                               onChange={e => this.setState({ExecutingAgency: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Location"}
                                               name={"location"}
                                               value={this.state.Location}
                                               type={"text"}
                                               onChange={e => this.setState({Location: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Type"}
                                               name={"type"}
                                               value={this.state.Type}
                                               type={"text"}
                                               onChange={e => this.setState({Type: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Length"}
                                               name={"length"}
                                               value={this.state.Length}
                                               type={"text"}
                                               onChange={e => this.setState({Length: e.target.value})}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"MainComponents"}
                                               name={"main_components"}
                                               value={this.state.MainComponents}
                                               type={"textarea"}
                                               onChange={e => this.setState({MainComponents: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <DatePickerTextField label={"Start Date"}
                                                         name={"start_date"}
                                                         value={this.state.StartDate}
                                                         onChange={date => this.setState({
                                                             StartDate: date,
                                                         })}/>
                                </Col>
                                <Col md={6}>
                                    <DatePickerTextField label={"End Date"}
                                                         name={"end_date"}
                                                         value={this.state.EndDate}
                                                         onChange={date => this.setState({
                                                             EndDate: date,
                                                         })}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Estimated Cost"}
                                               name={"estimated_cost"} value={this.state.EstimatedCost}
                                               type={"text"}
                                               onChange={e => this.setState({EstimatedCost: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Project Duration"}
                                               name={"project_duration"} value={this.state.Duration}
                                               type={"text"}
                                               onChange={e => this.setState({Duration: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"RDPP"}
                                               name={"rdpp"} value={this.state.RDPP}
                                               type={"text"}
                                               onChange={e => this.setState({RDPP: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"2nd RDPP"}
                                               name={"rdpp2"} value={this.state.RDPP2}
                                               type={"text"}
                                               onChange={e => this.setState({RDPP2: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"MOU"}
                                               name={"mou"} value={this.state.MOU}
                                               type={"text"}
                                               onChange={e => this.setState({MOU: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Sponsoring Ministry"}
                                               name={"sponsoring_ministry"} value={this.state.SponsoringMinistry}
                                               type={"text"}
                                               onChange={e => this.setState({SponsoringMinistry: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Source Of Found"}
                                               name={"source_of_found"} value={this.state.SourceOfFound}
                                               type={"text"}
                                               onChange={e => this.setState({SourceOfFound: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <Select
                                        options={this.state.OfficerList}
                                        defaultValue={""}
                                        label={"PO"}
                                        name={"po"}
                                        value={this.state.POId}
                                        onChange={(e) => {
                                            this.setState({POId: e.target.value});
                                        }}/>
                                </Col>
                                <Col md={6}>
                                    <Select
                                        options={this.state.OfficerList}
                                        defaultValue={""}
                                        label={"PD"}
                                        name={"pd"}
                                        value={this.state.PDId}
                                        onChange={(e) => {
                                            this.setState({PDId: e.target.value});
                                        }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Project Area Map"}
                                               labelIconNode={null}
                                               name={"project_area_map"}
                                               type={"file"}
                                               onChange={e => this.setState({ProjectAreaMap: e.target.files[0]})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Choose your attachments"}
                                               labelIconNode={null}
                                               name={"attachments"}
                                               type={"file"}
                                               onChange={e => this.setState({Attachment: e.target.files[0]})}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={[
                                        {value: '', label: 'Select Status'},
                                        {value: 'Active', label: 'Active'},
                                        /*{value: 'Inactive', label: 'Inactive'},
                                        {value: 'Deleted', label: 'Deleted'},
                                        {value: 'Not Started', label: 'Not Started'},*/
                                        {value: 'Ongoing', label: 'Ongoing'},
                                        {value: 'On Hold', label: 'On Hold'},
                                        {value: 'Cancelled', label: 'Cancelled'},
                                        {value: 'Completed', label: 'Completed'},
                                        {value: 'Upcoming', label: 'Upcoming'},
                                        {value: 'Maintenance', label: 'Maintenance'},
                                    ]}
                                            defaultValue={""}
                                            label={"Status"}
                                            name={"status"}
                                            value={this.state.Status}
                                            onChange={(e) => {
                                                this.setState({Status: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveProjectBtn} onClick={this.handleSubmitProject}>Submit
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

export default withRouter(ProjectForm);