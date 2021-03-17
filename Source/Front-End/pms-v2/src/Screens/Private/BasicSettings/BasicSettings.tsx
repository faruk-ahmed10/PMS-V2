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


class BasicSettingsForm extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            NotFoundException: false,
            SiteTitle: '',
            SiteSubTitle: '',
            HeaderBanner: '',
            Logo1: '',
            Logo2: '',
            Copyright: '',
            Slogan:'',
        };

        this.getBasicSettingsData = this.getBasicSettingsData.bind(this);
        this.handleSubmitBasicSettings = this.handleSubmitBasicSettings.bind(this);
    }

    protected getBasicSettingsData(): void {
        new APP.SERVICES.BASIC_SETTINGS().GetBasicSettings().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    SiteTitle: responseData.site_title,
                    SiteSubTitle: responseData.site_sub_title,
                    Copyright: responseData.copyright,
                    Slogan:responseData.slogan,
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

    protected handleSubmitBasicSettings(): void {
        new APP.SERVICES.BASIC_SETTINGS().UpdateBasicSettings({
            site_title: this.state.SiteTitle,
            site_sub_title: this.state.SiteSubTitle,
            header_banner: this.state.HeaderBanner,
            logo1: this.state.Logo1,
            logo2: this.state.Logo2,
            copyright: this.state.Copyright,
            slogan: this.state.Slogan,
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
        this.getBasicSettingsData();
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
                            BASIC SETTINGS

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Site Title"}
                                               name={"site_title"} value={this.state.SiteTitle }
                                               type={"text"}
                                               onChange={e => this.setState({SiteTitle : e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Site Sub Title"}
                                               name={"site_sub_title"} value={this.state.SiteSubTitle }
                                               type={"text"}
                                               onChange={e => this.setState({SiteSubTitle : e.target.value})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Header Banner Image"}
                                               name={"header_banner"} value={this.state.HeaderBanner }
                                               type={"file"}
                                               onChange={e => this.setState({HeaderBanner : e.target.files[0]})}/>
                                </Col>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Logo 1"}
                                               name={"logo1"} value={this.state.Logo1}
                                               type={"file"}
                                               onChange={e => this.setState({Logo1: e.target.files[0]})}/>
                                </Col>

                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Logo 2"}
                                               name={"logo2"} value={this.state.Logo2}
                                               type={"file"}
                                               onChange={e => this.setState({Logo2: e.target.files[0]})}/>
                                </Col>

                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Copyright"}
                                               name={"copyright"} value={this.state.Copyright}
                                               type={"text"}
                                               onChange={e => this.setState({Copyright: e.target.value})}/>
                                </Col>
                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Slogan"}
                                               name={"copyright"} value={this.state.Slogan}
                                               type={"text"}
                                               onChange={e => this.setState({Slogan: e.target.value})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitBasicSettings}>Submit
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

export default withRouter(BasicSettingsForm);