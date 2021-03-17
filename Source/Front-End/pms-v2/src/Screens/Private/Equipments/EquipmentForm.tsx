import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../Layouts/Components/Global/TextField/TextField";
import {APP} from "../../../App/Init/AppProvider";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";
import Select from "../../../Layouts/Components/Global/Select/Select";
import {number} from "prop-types";
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


class EquipmentForm extends React.Component<any, any> {
    public state: any;
    private readonly equipment_id: number;

    public constructor(props: any) {
        super(props);

        this.equipment_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            UnitList: [],
            CategoryList: [],
            ProjectList: [],
            NotFoundException: false,
            ProjectID: '',
            Name: '',
            QTY: '',
            UnitID: '',
            BANo: '',
            CategoryID: '',
            PresentCondition: '',
            Location: '',
            PurchaseDate: '',
            ReceiveDate: '',
            Document: '',
            Description: '',

            EditMode: this.equipment_id > 0,
        };

        this.getEquipmentData = this.getEquipmentData.bind(this);
        this.handleSubmitEquipment = this.handleSubmitEquipment.bind(this);
    }

    protected getEquipmentData(): void {
        new APP.SERVICES.EQUIPMENTS().GetEquipment(this.equipment_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    Name: responseData.name,
                    ProjectID: responseData.project_id,
                    QTY: responseData.qty,
                    UnitID: responseData.unit_id,
                    BANo: responseData.ba_no,
                    CategoryID: responseData.category_id,
                    PresentCondition: responseData.present_condition,
                    Location: responseData.location,
                    PurchaseDate: responseData.purchase_date,
                    ReceiveDate: responseData.receive_date,
                    Document: responseData.document,
                    Description: responseData.description,
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

    protected getProjectList(): void {
        new APP.SERVICES.EQUIPMENTS().GetProject().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
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
        });
    }

    protected getUnitList(): void {
        new APP.SERVICES.EQUIPMENTS().GetUnit().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    UnitList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getCategoryList(): void {
        new APP.SERVICES.EQUIPMENTS().GetCategory().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    CategoryList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected handleSubmitEquipment(): void {
        new APP.SERVICES.EQUIPMENTS().SaveEquipment({

            equipment_id: this.equipment_id,
            Name: this.state.Name,
            ProjectID: this.state.ProjectID,
            QTY: this.state.QTY,
            UnitID: this.state.UnitID,
            BANo: this.state.BANo,
            CategoryID: this.state.CategoryID,
            PresentCondition: this.state.PresentCondition,
            Location: this.state.Location,
            PurchaseDate: APP.FUNCTIONS.CONVERT_DATE(this.state.PurchaseDate, 'yyyy-mm-dd'),
            ReceiveDate: APP.FUNCTIONS.CONVERT_DATE(this.state.ReceiveDate, 'yyyy-mm-dd'),
            Description: this.state.Description,
            Document: this.state.Document,
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
        this.getProjectList();
        this.getUnitList();
        this.getCategoryList();
        if (this.state.EditMode) {
            this.getEquipmentData();
        }
    }

    public render(): any {

        if (this.state.NotFoundException) {
            return <FourZeroFour/>;
        }

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_cardTitle}>
                        <div className={"title"}>
                            EQUIPMENT {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>

                                <Col md={6}>
                                    <Select options={this.state.ProjectList}
                                            defaultValue={""}
                                            label={"Select Project"}
                                            name={"project_id"}
                                            value={this.state.ProjectID}
                                            onChange={(e) => {
                                                this.setState({ProjectID: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Equipment Title"}
                                               name={"title"} value={this.state.Name}
                                               type={"text"}
                                               onChange={e => this.setState({Name: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"QTY"}
                                               name={"qty"} value={this.state.QTY}
                                               type={"text"}
                                               onChange={e => this.setState({QTY: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.UnitList}
                                            defaultValue={""}
                                            label={"Select Unit"}
                                            name={"unit_id"}
                                            value={this.state.UnitID}
                                            onChange={(e) => {
                                                this.setState({UnitID: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"BA No"}
                                               name={"ba_no"} value={this.state.BANo}
                                               type={"text"}
                                               onChange={e => this.setState({BANo: e.target.value})}/>
                                </Col>

                                <Col md={6}>
                                    <Select options={this.state.CategoryList}
                                            defaultValue={""}
                                            label={"Select Category"}
                                            name={"unit_id"}
                                            value={this.state.CategoryID}
                                            onChange={(e) => {
                                                this.setState({CategoryID: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Present Condition"}
                                               name={"present_condition"} value={this.state.PresentCondition}
                                               type={"text"}
                                               onChange={e => this.setState({PresentCondition: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Location"}
                                               name={"location"} value={this.state.Location}
                                               type={"text"}
                                               onChange={e => this.setState({Location: e.target.value})}/>
                                </Col>

                                <Col md={6}>
                                    <DatePickerTextField label={"Purchase Date"}
                                                         name={"purchase_date"}
                                                         value={this.state.PurchaseDate}
                                                         onChange={date => this.setState({
                                                             PurchaseDate: date,
                                                         })}
                                    />
                                </Col>

                                <Col md={6}>
                                    <DatePickerTextField label={"Receive Date"}
                                                         name={"receive_date"}
                                                         value={this.state.ReceiveDate}
                                                         onChange={date => this.setState({
                                                             ReceiveDate: date,
                                                         })}
                                    />
                                </Col>

                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Documents Upload"}
                                               labelIconNode={null}
                                               name={"document"}
                                               type={"file"}
                                               onChange={e => this.setState({Image: e.target.files[0]})}/>
                                </Col>


                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Equipment Description"}
                                               name={"description"} value={this.state.Description}
                                               type={"textarea"}
                                               onChange={e => this.setState({Description: e.target.value})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitEquipment}>Submit
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

export default withRouter(EquipmentForm);