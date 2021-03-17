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


class MessageForm extends React.Component<any, any> {
    public state: any;
    private readonly message_id: number;

    public constructor(props: any) {
        super(props);

        this.message_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            OfficerList:[],
            NotFoundException: false,
            OfficerId: 0,
            MessageTitle: '',
            Message:'',
            Image: '',

            EditMode: this.message_id > 0,
        };

        this.getMessageData = this.getMessageData.bind(this);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    }

    protected getMessageData(): void {
        new APP.SERVICES.MESSAGE().GetMessage(this.message_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    OfficerId: responseData.officer_id,
                    MessageTitle: responseData.message_title,
                    Message: responseData.message,
                    Image: responseData.image,
                });
            }

        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            }else {
                APP.EXCEPTIONS.DefaultException(error);
            }
        })
    }




    protected getOfficerList(): void {
        new APP.SERVICES.MESSAGE().GetOfficer().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    OfficerList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData.officers, 'name', 'id'),
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

    protected handleSubmitMessage(): void {
        new APP.SERVICES.MESSAGE().SaveMessage({

            message_id: this.message_id,
            officer_id: this.state.OfficerId,
            message_title: this.state.MessageTitle,
            message: this.state.Message,
            image: this.state.Image,
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
        this.getOfficerList();

        if(this.state.EditMode) {
            this.getMessageData();
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
                            MESSAGE {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <Select options={this.state.OfficerList}
                                            defaultValue={""}
                                            label={"Officer Type"}
                                            name={"officer_id"}
                                            value={this.state.OfficerId}
                                            onChange={(e) => {
                                                this.setState({OfficerId: e.target.value});
                                            }}/>
                                </Col>

                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Message Title"}
                                               name={"message_title"} value={this.state.MessageTitle}
                                               type={"text"}
                                               onChange={e => this.setState({MessageTitle: e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Message"}
                                               name={"message"} value={this.state.Message}
                                               type={"text"}
                                               onChange={e => this.setState({Message: e.target.value})}/>
                                </Col>


                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Choose Image"}
                                               labelIconNode={null}
                                               name={"image"}
                                               type={"file"}
                                               onChange={e => this.setState({Image: e.target.files[0]})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitMessage}>Submit
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

export default withRouter(MessageForm);