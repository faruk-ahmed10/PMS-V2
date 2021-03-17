import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import TextField from "../../../../Layouts/Components/Global/TextField/TextField";
import {APP} from "../../../../App/Init/AppProvider";
import {withRouter} from 'react-router-dom';
import FourZeroFour from "../../../../Layouts/Components/Private/FourZeroFour/FourZeroFour";
import Select from "../../../../Layouts/Components/Global/Select/Select";

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


class GalleryForm extends React.Component<any, any> {
    public state: any;
    private readonly gallery_id: number;

    public constructor(props: any) {
        super(props);

        this.gallery_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            ProjectList: [],
            NotFoundException: false,
            ProjectID: 0,
            ArchiveHeadID: 0,
            GalleryTitle: '',
            Description: '',
            Image: '',
            Featured: '',

            EditMode: this.gallery_id > 0,
        };

        this.getGalleryData = this.getGalleryData.bind(this);
        this.getProjectList = this.getProjectList.bind(this);
        this.getArchiveHeadList = this.getArchiveHeadList.bind(this);
        this.handleSubmitGallery = this.handleSubmitGallery.bind(this);
    }

    protected getGalleryData(): void {
        new APP.SERVICES.GALLERYS().GetGallery(this.gallery_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    GalleryTitle: responseData.title,
                    ProjectID: responseData.project_id,
                    ArchiveHeadID: responseData.archive_head_id,
                    Description: responseData.description,
                    Image: responseData.image,
                    Featured: Number(responseData.is_featured) === 1,
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
        new APP.SERVICES.GALLERYS().GetProject().then(({data}) => {

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

    protected getArchiveHeadList(): void {
        new APP.SERVICES.ARCHIVE_HEADS().GetArchiveHeadsNoLimit().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    ArchiveHeadList: APP.FUNCTIONS.DROPDOWN_OBJECT_MAKER(responseData, 'name', 'id'),
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

    protected handleSubmitGallery(): void {
        new APP.SERVICES.GALLERYS().SaveGallery({
            gallery_id: this.gallery_id,
            GalleryTitle: this.state.GalleryTitle,
            ProjectID: this.state.ProjectID,
            ArchiveHeadID: this.state.ArchiveHeadID,
            Description: this.state.Description,
            Image: this.state.Image,
            Featured: this.state.Featured ? 1 : 0,
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
        this.getArchiveHeadList();
        if (this.state.EditMode) {
            this.getGalleryData();
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
                            GALLERY {this.state.EditMode ? "EDIT" : "CREATE"}

                            <span className={__css_BackBtn} onClick={() => this.props.history.goBack()}>Back</span>
                        </div>
                    </div>

                    <Card.Body className={__css_cardBody}>
                        <Card.Text className={__css_cardText}>
                            <Row>
                                <Col md={6}>
                                    <TextField defaultValue={""}
                                               label={"Gallery Title"}
                                               name={"title"} value={this.state.GalleryTitle}
                                               type={"text"}
                                               onChange={e => this.setState({GalleryTitle: e.target.value})}/>
                                </Col>

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
                                    <Select options={this.state.ArchiveHeadList}
                                            defaultValue={""}
                                            label={"Select Archive Head"}
                                            name={"archive_head_id"}
                                            value={this.state.ArchiveHeadID}
                                            onChange={(e) => {
                                                this.setState({ArchiveHeadID: e.target.value});
                                            }}/>
                                </Col>
                                <Col md={10}>
                                    <TextField defaultValue={""}
                                               label={"Choose Gallery Image"}
                                               labelIconNode={null}
                                               name={"image"}
                                               type={"file"}
                                               onChange={e => this.setState({Image: e.target.files[0]})}/>
                                </Col>

                                <Col md={2}>
                                    <input
                                        type={"checkbox"}
                                        name={"featured"}
                                        checked={this.state.Featured}
                                        onChange={e => this.setState((state: any) => ({
                                            Featured: !state.Featured
                                        }))}
                                    /> <b>Is Featured?</b>

                                </Col>


                                <Col md={12}>
                                    <TextField defaultValue={""}
                                               label={"Gallery Description"}
                                               name={"description"} value={this.state.Description}
                                               type={"textarea"}
                                               onChange={e => this.setState({Description: e.target.value})}/>
                                </Col>
                                <Col md={12} style={{textAlign: "right"}}>
                                    <button className={__css_SaveContractorBtn}
                                            onClick={this.handleSubmitGallery}>Submit
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

export default withRouter(GalleryForm);