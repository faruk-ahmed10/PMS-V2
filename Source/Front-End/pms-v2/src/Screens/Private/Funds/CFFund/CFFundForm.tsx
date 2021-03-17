import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../../Layouts/Components/Global/TextField/TextField";
import DatePickerTextField from "../../../../Layouts/Components/Global/DatePickerTextField/DatePickerTextField";
import {APP} from "../../../../App/Init/AppProvider";
import Select from "../../../../Layouts/Components/Global/Select/Select";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";

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

class CFFundForm extends React.Component<any, any> {
    public state: any;
    private readonly cffund_id: number;

    public constructor(props: any) {
        super(props);

        this.cffund_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            NotFoundException: false,

            ProjectList: [],
            SectionList: [],
            ItemHeadList: [],
            UnitList: [],
            ParentItemList: [],
            ContractorList: [],
            SupplierList: [],

            ProjectId: 0,
            SectionId: 0,
            ItemHeadId: 0,
            ItemDescription: '',
            EconomicCode: '',
            EconomicSubCode: '',
            ParentItemId: 0,
            StartDate: new Date(),
            EndDate: new Date(),
            UnitId: 0,
            Qty: '',
            UnitRate: '',
            TotalPrice: '',
            SelectedContractors: [],
            SupplierId: 0,
            Status: '',
            Attachment: '',
            Remarks: '',

            EditMode: this.cffund_id > 0,
        };

        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.getCFFundData = this.getCFFundData.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.getSections = this.getSections.bind(this);
        this.getItemHeads = this.getItemHeads.bind(this);
        this.getUnits = this.getUnits.bind(this);
        this.getContractors = this.getContractors.bind(this);
        this.getSuppliers = this.getSuppliers.bind(this);
        this.getProjectCFFundParentItems = this.getProjectCFFundParentItems.bind(this);
        this.handleSubmitCFFund = this.handleSubmitCFFund.bind(this);
    }

    protected calculateTotalPrice(qty: number, unit_rate: number): void {
        const _qty = isNaN(Number(qty)) ? 0 : Number(qty);
        const _unit_rate = isNaN(Number(unit_rate)) ? 0 : Number(unit_rate);

        this.setState({
            TotalPrice: _qty * _unit_rate,
        });
    }

    protected getCFFundData(): void {
        new APP.SERVICES.CFFUND().GetCFFund(this.cffund_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ProjectId: responseData.project_id,
                    SectionId: responseData.section_id,
                    ItemHeadId: responseData.item_head_id,
                    ItemDescription: responseData.description,
                    EconomicCode: responseData.economic_code,
                    EconomicSubCode: responseData.economic_sub_code,
                    ParentItemId: responseData.parent_item_id,
                    StartDate: APP.FUNCTIONS.CONVERT_MYSQL_DATE(responseData.start_date),
                    EndDate: APP.FUNCTIONS.CONVERT_MYSQL_DATE(responseData.end_date),
                    UnitId: responseData.unit_id,
                    Qty: responseData.qty,
                    UnitRate: responseData.unit_rate,
                    TotalPrice: responseData.total_price,
                    SupplierId: responseData.supplier_id,
                    SelectedContractors: (typeof responseData.contractors !== 'undefined' && responseData.contractors !== null && responseData.contractors.length > 0) ? (
                        responseData.contractors.map((contractor: any, index: number) => {
                            return contractor.id;
                        })
                    ) : [],
                    Status: responseData.status,
                    Remarks: responseData.remarks,
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

    protected getProjects(): void {
        new APP.SERVICES.CFFUND().GetProjects().then(({data}) => {

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

    protected getSections(): void {
        new APP.SERVICES.CFFUND().GetSections().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    SectionList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getItemHeads(): void {
        new APP.SERVICES.CFFUND().GetItemHeads().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ItemHeadList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getUnits(): void {
        new APP.SERVICES.CFFUND().GetUnits().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
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
        })
    }

    protected getContractors(): void {
        new APP.SERVICES.FUND().GetContractorList().then(({data}) => {

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

    protected getSuppliers(): void {
        new APP.SERVICES.CFFUND().GetSuppliers().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    SupplierList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getProjectCFFundParentItems(): void {
        new APP.SERVICES.BILL().GetParentTasks('CF','','').then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ParentItemList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'description', 'id'),
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

    protected handleSubmitCFFund(): void {
        new APP.SERVICES.FUND().SaveFund({
            fund_id: this.cffund_id,
            fund_type: 'CF',
            attachment: this.state.Attachment,
            selected_contractors: this.state.SelectedContractors,
            description: this.state.ItemDescription,
            economic_code: this.state.EconomicCode,
            economic_sub_code: this.state.EconomicSubCode,
            item_head_id: this.state.ItemHeadId,
            parent_item_id: this.state.ParentItemId,
            unit_id: this.state.UnitId,
            project_id: this.state.ProjectId,
            qty: this.state.Qty,
            remarks: this.state.Remarks,
            section_id: this.state.SectionId,
            supplier_id: this.state.SupplierId,
            start_date: APP.FUNCTIONS.CONVERT_DATE(this.state.StartDate, 'yyyy-mm-dd'),
            end_date: APP.FUNCTIONS.CONVERT_DATE(this.state.EndDate, 'yyyy-mm-dd'),
            status: this.state.Status,
            unit_rate: this.state.UnitRate,
            total_price: this.state.TotalPrice,
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
        this.getProjects();
        this.getSections();
        this.getItemHeads();
        this.getUnits();
        this.getContractors();
        this.getSuppliers();
        this.getProjectCFFundParentItems();

        if (this.state.EditMode) {
            this.getCFFundData();
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
                            CF FUND {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <Select options={this.state.ProjectList}
                                            defaultValue={""}
                                            label={"Project"}
                                            name={"project"}
                                            value={this.state.ProjectId}
                                            onChange={(e) => {
                                                this.setState({ProjectId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.SectionList}
                                            defaultValue={""}
                                            label={"Section"}
                                            name={"section"}
                                            value={this.state.SectionId}
                                            onChange={(e) => {
                                                this.setState({SectionId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={12}>
                                    <Select options={this.state.ItemHeadList}
                                            defaultValue={""}
                                            label={"Item Head"}
                                            name={"item_head"}
                                            value={this.state.ItemHeadId}
                                            onChange={(e) => {
                                                this.setState({ItemHeadId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Item Description"}
                                               name={"item_description"} value={this.state.ItemDescription}
                                               type={"text"}
                                               onChange={e => this.setState({ItemDescription: e.target.value})}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Economic Code"}
                                               name={"economic_code"}
                                               value={this.state.EconomicCode}
                                               type={"text"}
                                               onChange={e => this.setState({EconomicCode: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Economic Sub Code"}
                                               name={"economic_sub_code"}
                                               value={this.state.EconomicSubCode}
                                               type={"text"}
                                               onChange={e => this.setState({EconomicSubCode: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.ParentItemList}
                                            defaultValue={""}
                                            label={"Parent Item"}
                                            name={"parent_item"}
                                            value={this.state.ParentItemId}
                                            onChange={(e) => {
                                                this.setState({ParentItemId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.UnitList}
                                            defaultValue={""}
                                            label={"Unit"}
                                            name={"unit_id"}
                                            value={this.state.UnitId}
                                            onChange={(e) => {
                                                this.setState({UnitId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Qty"}
                                               name={"qty"}
                                               value={this.state.Qty}
                                               type={"text"}
                                               onChange={e => {
                                                   const val = Number(e.target.value);
                                                   this.setState({Qty: e.target.value});
                                                   this.calculateTotalPrice(val, this.state.UnitRate);
                                               }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Unit Rate"}
                                               name={"unit_rate"}
                                               value={this.state.UnitRate}
                                               type={"text"}
                                               onChange={e => {
                                                   const val = Number(e.target.value);
                                                   this.setState({UnitRate: e.target.value});
                                                   this.calculateTotalPrice(this.state.Qty, val);
                                               }}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Total Price"}
                                               name={"total_price"}
                                               value={this.state.TotalPrice}
                                               type={"text"}/>
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
                                    <Select options={this.state.ContractorList}
                                            defaultValue={""}
                                            label={"Contractors / Dev Partners"}
                                            name={"project"}
                                            value={this.state.SelectedContractors}
                                            multiple={true}
                                            onChange={(e) => {
                                                this.setState({
                                                    SelectedContractors: [...e.target.selectedOptions].map(opt => opt.value),
                                                });
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.SupplierList}
                                            defaultValue={""}
                                            label={"Suppliers"}
                                            name={"supplier"}
                                            value={this.state.SupplierId}
                                            onChange={(e) => {
                                                this.setState({SupplierId: e.target.value});
                                            }}/>
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
                                        {value: 'Inactive', label: 'Inactive'},
                                        {value: 'Deleted', label: 'Deleted'},
                                        {value: 'Not Started', label: 'Not Started'},
                                        {value: 'In Progress', label: 'In Progress'},
                                        {value: 'On Hold', label: 'On Hold'},
                                        {value: 'Cancelled', label: 'Cancelled'},
                                        {value: 'Finished', label: 'Finished'},
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
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Remarks"}
                                               name={"remarks"}
                                               value={this.state.Remarks}
                                               type={"textarea"}
                                               onChange={e => this.setState({Remarks: e.target.value})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveCFFundBtn} onClick={this.handleSubmitCFFund}>Submit
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

export default withRouter(CFFundForm);