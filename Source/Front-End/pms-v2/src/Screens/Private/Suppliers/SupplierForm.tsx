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

const __css_SaveSupplierBtn = css(`
    padding: 4px 10px;
    background: #224c60;
    color: #ffffff;
    border: 0;
    color: #ffffff;
    
    &: hover {
        opacity: 0.8;
    }
`);


class SupplierForm extends React.Component<any, any> {
    public state: any;
    private readonly supplier_id: number;

    public constructor(props: any) {
        super(props);

        this.supplier_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            NotFoundException: false,

            UserRoleList: [],
            UserTypeList: [],

            Name: '',
            Email: '',
            UserTypeId: 0,
            UserRoleId: 0,
            OwnerName: '',
            IT: '',
            OwnerNid: '',
            License: '',
            Phone: '',
            Tin: '',
            Address: '',
            Status: '',

            EditMode: this.supplier_id > 0,
        };

        this.getSupplierData = this.getSupplierData.bind(this);
        this.getUserRoleList = this.getUserRoleList.bind(this);
        this.getUserTypeList = this.getUserTypeList.bind(this);
        this.handleSubmitSupplier = this.handleSubmitSupplier.bind(this);
    }

    protected getSupplierData(): void {
        new APP.SERVICES.SUPPLIER().GetSupplier(this.supplier_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    Name: responseData.user.name,
                    Email: responseData.user.email,
                    UserTypeId: responseData.user.user_type_id,
                    UserRoleId: responseData.user.role_id,
                    OwnerName: responseData.owner_name,
                    IT: responseData.it,
                    OwnerNid: responseData.owner_nid,
                    License: responseData.license,
                    Phone: responseData.phone,
                    Tin: responseData.tin,
                    Address: responseData.address,
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

    protected getUserRoleList(): void {
        new APP.SERVICES.SUPPLIER().GetUserRoles().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    UserRoleList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected getUserTypeList(): void {
        new APP.SERVICES.SUPPLIER().GetUserTypes().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    UserTypeList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected handleSubmitSupplier(): void {
        new APP.SERVICES.SUPPLIER().SaveSupplier({
            supplier_id: this.supplier_id,
            name: this.state.Name,
            email: this.state.Email,
            user_type_id: this.state.UserTypeId,
            user_role_id: this.state.UserRoleId,
            owner_name: this.state.OwnerName,
            it: this.state.IT,
            owner_nid: this.state.OwnerNid,
            license: this.state.License,
            phone: this.state.Phone,
            tin: this.state.Tin,
            address: this.state.Address,
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

    public componentDidMount(): void {
        this.getUserRoleList();
        this.getUserTypeList();

        if(this.state.EditMode) {
            this.getSupplierData();
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
                            SUPPLIER {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Supplier Name"}
                                               name={"supplier_name"} value={this.state.Name}
                                               type={"text"}
                                               onChange={e => this.setState({Name: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Supplier Email"}
                                               name={"supplier_email"} value={this.state.Email}
                                               type={"text"}
                                               onChange={e => this.setState({Email: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Owner Name"}
                                               name={"owner_name"} value={this.state.OwnerName}
                                               type={"text"}
                                               onChange={e => this.setState({OwnerName: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"IT"}
                                               name={"it"} value={this.state.IT}
                                               type={"text"}
                                               onChange={e => this.setState({IT: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Owner NID"}
                                               name={"owner_nid"} value={this.state.OwnerNid}
                                               type={"text"}
                                               onChange={e => this.setState({OwnerNid: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"License"}
                                               name={"license"} value={this.state.License}
                                               type={"text"}
                                               onChange={e => this.setState({License: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Phone"}
                                               name={"phone"} value={this.state.Phone}
                                               type={"text"}
                                               onChange={e => this.setState({Phone: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Tin"}
                                               name={"tin"} value={this.state.Tin}
                                               type={"text"}
                                               onChange={e => this.setState({Tin: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Address"}
                                               name={"address"} value={this.state.Address}
                                               type={"text"}
                                               onChange={e => this.setState({Address: e.target.value})}/>
                                </Col>

                                <Col md={6}>
                                    <Select options={[
                                        {value: '', label: 'Select Status'},
                                        {value: 'Active', label: 'Active'},
                                        {value: 'Inactive', label: 'Inactive'},
                                        {value: 'Inactive', label: 'Banned'},
                                        {value: 'Deleted', label: 'Deleted'},
                                        {value: 'Not Started', label: 'Pending'},
                                    ]}
                                            defaultValue={""}
                                            label={"Status"}
                                            name={"status"}
                                            value={this.state.Status}
                                            onChange={(e) => {
                                                this.setState({Status: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.UserTypeList}
                                            defaultValue={""}
                                            label={"User Type"}
                                            name={"user_type"}
                                            value={this.state.UserTypeId}
                                            onChange={(e) => {
                                                this.setState({UserTypeId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={6}>
                                    <Select options={this.state.UserRoleList}
                                            defaultValue={""}
                                            label={"User Role"}
                                            name={"user_role"}
                                            value={this.state.UserRoleId}
                                            onChange={(e) => {
                                                this.setState({UserRoleId: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Choose your license"}
                                               labelIconNode={null}
                                               name={"license"}
                                               type={"file"}
                                               onChange={e => this.setState({License: e.target.files[0]})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveSupplierBtn}
                                            onClick={this.handleSubmitSupplier}>Submit
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

export default withRouter(SupplierForm);