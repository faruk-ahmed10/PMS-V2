import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import mapArea from "../../../Static/Images/ProjectDetails/project-Information.png";
import {APP} from "../../../App/Init/AppProvider";
import Officer from "../../../Static/Images/Officers/officer.png";

const __css_GlobalContainer = css(`
    ul {
        margin: 0;
        padding: 0;
    }
    background: #ffffff;
`);

const __css_OfficerInfoAreaWrap = css(`

`);

const __css_OfficerInfoArea = css(`
    display: flex;
    justify-content: space-between;

`);

const __css_OfficerInfoTextWrap = css(`
    padding: 25px 0px 50px 55px;
    @media only screen and (max-width: 984px) {
        padding: 25px 0px 40px 55px;
    }
`);
const __css_OfficerInfoTable = css(`
    td,th {
        padding-bottom: 30px;
    }
    th {
        font-family: "poppins";
        font-weight: 600;
    }
    td {
        font-family: "poppins";
        font-weight: 600;
    }
`);

const __css_OfficerDescription = css(`
    h6 {
        font-family: "Poppins";
        color: rgb(44, 46, 47);
        font-weight: 600;
    }
    p{
        font-family: "Poppins";
        color: rgb(44, 46, 47);
    }
`);
const __css_OfficerEducation = css(`
    h6 {
        font-family: "Poppins";
        color: rgb(44, 46, 47);
        font-weight: 600;
    }
    p{
        font-family: "Poppins";
        color: rgb(44, 46, 47);
    }
`);
const __css_OfficerContributions = css(`
    h6 {
        font-family: "Poppins";
        color: rgb(44, 46, 47);
        font-weight: 600;
    }
    p{
        font-family: "Poppins";
        color: rgb(44, 46, 47);
    }
`);
const __css_OfficerAffiliated = css(`
    h6 {
        font-family: "Poppins";
        color: rgb(44, 46, 47);
        font-weight: 600;
    }
    p{
        font-family: "Poppins";
        color: rgb(44, 46, 47);
    }
`);
const __css_OfficerTimeline = css(`
    h6 {
        font-family: "Poppins";
        color: rgb(44, 46, 47);
        font-weight: 600;
    }
    p{
        font-family: "Poppins";
        color: rgb(44, 46, 47);
    }
`);
const __css_OfficerImage = css(`
    padding-right: 45px;
    width:285px;
    height:285px;
    img {
        width: 100%;
        height: auto;
        border-radius: 20px;
    }
`);

const __css_OfficerBtn = css(`
    text-align: right;
    padding: 0px 20px 15px 0px;
    button{
        background: #6485ff;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-family: "Poppins";
        padding: 9px 42px;
        outline: 0;
        i {
            margin-right: 10px;
        }
        
    }

`);


const __css_projectInfo = css(`
    padding: 10px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 30%;
    text-align: center;
    border-bottom-right-radius: 50px;
    margin-top: 15px;
    @media only screen and (max-width: 984px) {
        width: 80%;
        font-size: 17px;
    }
`);

class NoticeView extends Component {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            notice_id: typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id),
            title: '',
            description: '',
            publish_date: '',
            file: '',
            status: '',
        }
    }


    protected getNotices(): void {
        new APP.SERVICES.NOTICES().GetNotice(this.state.notice_id).then(({data}) => {

            const responseData = data.data;

            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    title: responseData.title,
                    description: responseData.description,
                    publish_date: responseData.publish_date,
                    file: responseData.file,
                    status: responseData.status,
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

    public componentDidMount(): void {
        this.getNotices();
    }

    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (nextProps.match.params.id) {
            this.setState({
                notice_id: nextProps.match.params.id,
            }, () => {
                this.getNotices();
            });
        }
    }

    render(): any {
        return (
            <div className={__css_GlobalContainer}>
                <div className={__css_projectInfo}>Notice Details</div>
                <div className={__css_OfficerInfoAreaWrap}>
                    <div className={__css_OfficerInfoArea}>
                        <div className={__css_OfficerInfoTextWrap}>
                            <div className={__css_OfficerInfoTable}>
                                <table>
                                    <tr>
                                        <th>Notice Title</th>
                                        <td>: {this.state.title} </td>
                                    </tr>

                                    <tr>
                                        <th>Publish Date</th>
                                        <td>: {this.state.publish_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>: {this.state.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Attachment</th>
                                        <td>:
                                            &nbsp;<a href={APP.CONFIG.CDN_ROOT + '/' + this.state.file}
                                               target={"_blank"}>Download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Satus</th>
                                        <td>: {this.state.status}</td>
                                    </tr>

                                </table>
                            </div>

                        </div>
                    </div>
                    <div className={__css_OfficerBtn}>
                        <button onClick={() => window.print()}><i className={"fa fa-print"}></i>Print</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default NoticeView;
