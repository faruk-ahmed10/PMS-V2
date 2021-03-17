import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../../Layouts/Components/Global/TextField/TextField";
import {APP} from "../../../../App/Init/AppProvider";
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


class EquipmentCategoryForm extends React.Component<any, any> {
    public state: any;
    private readonly equcat_id: number;

    public constructor(props: any) {
        super(props);

        this.equcat_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            NotFoundException: false,
            Name: '',

            EditMode: this.equcat_id > 0,
        };

        this.getEquCateData = this.getEquCateData.bind(this);
        this.handleSubmitEquCate = this.handleSubmitEquCate.bind(this);
    }

    protected getEquCateData(): void {
        new APP.SERVICES.EQUIPMENT_CATEGORY().GetEquCate(this.equcat_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    Name: responseData.name,
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

    protected handleSubmitEquCate(): void {
        new APP.SERVICES.EQUIPMENT_CATEGORY().SaveEquCate({

            equcat_id: this.equcat_id,
            name: this.state.Name,
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
        if(this.state.EditMode) {
            this.getEquCateData();
        }
    }

    public render(): any {

        if(this.state.NotFoundException) {
            return <FourZeroFour/>;
        }

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_cardTitle}>
                        <div className={"title"}>
                            EQUIPMENT CATEGORY {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Category Name"}
                                               name={"name"} value={this.state.Name}
                                               type={"text"}
                                               onChange={e => this.setState({Name: e.target.value})}
                                    />
                                </Col>


                                <Col md={6} style={{textAlign: "left"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitEquCate}>Submit
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

export default withRouter(EquipmentCategoryForm);