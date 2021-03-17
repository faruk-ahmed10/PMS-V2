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
        color:#5d4ede;
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

// const __css_projectInfoArea = css(`
//     margin-top: 15px;
// `);

// const __css_projectHistoryButtons = css(`
//     background-color: #fff;
//     border: 1px solid rgba(0,0,0,.125);
//     padding: 15px;
//     margin-top:15px;
//     text-align: center;
//     ul {
//         list-style: none;
//     }
//     ul li{
//         background: #f5f6f8;
//         margin-top: 15px;
//         border-radius: 5px;
//     }
//     li:hover {
//         background: #5d4edd;
//         transition: 0.5s;
//         a{
//             color: white;
//         }
//     }
//     a:hover,
//     a:focus {
//         text-decoration: none;
//     }
//     ul li a{
//         display: inline-block;
//         color: #5d4edd;
//         font-family: poppinsSemiBold;
//         padding: 10px 35px;
//     }

//     @media only screen and (max-width: 984px) {
//         padding: 21px;
//         ul li a{
//             padding: 10px 0px;
//         }
//     }
//     @media only screen and (min-width: 984px) {
//         padding: 15px;
//         ul li a{
//             padding: 10px 25px;
//         }
//     }
// `);


// const __css_tableBorder = css(`
//     border-collapse: collapse;
//     background: #fff;
//     th {
//         background: #fffaee;
//     }
//     th,td {
//         border-bottom: 1px solid #f5f6f8;
//         border-right: 1px solid #f5f6f8;
//         padding:12px;
//         padding-left: 15px;
//         font-weight:bold;
//     }
//     th, td:last-child{
//         border-right: none;
//     }
//     td:nth-first-child(1)
//     {
//         border-bottom: none;
//     }

//     td:last-child{

//         padding: 0px 60px 0px 20px;
//     } 
// `);

// const __css_logo1 = css(`
//     width:200px;
//     height:235px;

//     @media only screen and (max-width: 984px) {
//         left: 10px;
//         width: 40px;
//     }
// `);

// const __css_projectName = css(`
//     background : #f5f6f8;
//     text-align: center;
//     margin-top: 15px;
//     p span{
//         font-size: 22px;
//         font-family: "Myriad Pro";
//         color: rgb(92, 77, 220);
//         line-height: 1.2;
//         text-align: center;
//     }
//     p{
//     padding: 9px 0px;
//     font-family: '';
//     font-weight: 700;
//     font-size: 22px;
//     }
// `);


// const __css_heads = css (`
//  width:60% !important

// `)

// const __css_projectAreaMap = css(`
//     background: #fff;
//     padding: 25px;
//     margin-top: 15px;    
//     h3{
//         font-size: 22px;
//         color: rgb(93, 78, 221);
//         font-weight: bold;
//         line-height: 1.2;
//     }
//     img{
//         width: 100%;
//         height: auto;
//     }
// `);


class OfficerView extends Component {
    public state: any;
    private readonly officer_id: number;
    private readonly officer_rank: string;

    constructor(props: any) {
        super(props);
        this.officer_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);
        this.officer_rank = typeof props.match.params.rank === 'undefined' ? 'Officer' : props.match.params.rank;

        this.state = {
            ba_no: '',
            name: '',
            rank: '',
            appointment: '',
            dob: '',
            education_qualification_army: '',
            education_qualification_civil: '',
            district: '',
            punishment: '',
            army_level_course: '',
            marital_status: '',
            date_of_commission: '',
            blood_group: '',
            trade: '',
            bma_long_course: '',
            photo: '',
            email: '',
            phone: '',
            unit: '',
            brif: '',
            join_date: '',
            leave_date: '',
            position: '',
            type: '',

            __uid: Math.random().toString(16).slice(2),
        }

        this.handlePrintArea = this.handlePrintArea.bind(this);
    }


    protected getSettings(): void {
        new APP.SERVICES.OFFICERS().GetOfficer(this.officer_id).then(({data}) => {

            const responseData = data.data;

            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ba_no: responseData.ba_no,
                    name: responseData.name,
                    rank: responseData.rank ? responseData.rank.name : '',
                    appointment: responseData.appointment,
                    trade: responseData.trade,
                    dob: responseData.dob,
                    education_qualification_army: responseData.education_qualification_army,
                    army_level_course: responseData.army_level_course,
                    education_qualification_civil: responseData.education_qualification_civil,
                    district: responseData.district,
                    punishment: responseData.punishment,
                    marital_status: responseData.marital_status,
                    date_of_commission: responseData.date_of_commission,
                    blood_group: responseData.blood_group,
                    bma_long_course: responseData.bma_long_course,
                    type: responseData.type,
                    photo: responseData.photo,
                    email: responseData.email,
                    phone: responseData.phone,
                    unit: responseData.unit,
                    brif: responseData.brif,
                    join_date: responseData.join_date,
                    leave_date: responseData.leave_date,
                    position: responseData.position,
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

    handlePrintArea() {
        const printContents = $('#' + this.state.__uid).html();
        if (printContents !== null) {
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }

    public componentDidMount(): void {
        this.getSettings();
    }

    render(): any {

        return (
            <div className={__css_GlobalContainer} id={this.state.__uid}>
                <div className={__css_projectInfo}>{APP.FUNCTIONS.CAPITALIZE(this.officer_rank)} Information</div>
                <div className={__css_OfficerInfoAreaWrap}>
                    <div className={__css_OfficerInfoArea}>
                        <div className={__css_OfficerInfoTextWrap}>
                            <div className={__css_OfficerInfoTable}>
                                <table>
                                    <tr>
                                        <th>{this.state.type == 'OFFICER' ? "BA No" : "Army No"}</th>
                                        <td>:</td>
                                        <td>{this.state.ba_no}</td>
                                    </tr>
                                    <tr>
                                        <th>Rank</th>
                                        <td>:</td>
                                        <td>{this.state.rank}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>:</td>
                                        <td>{this.state.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Appointment</th>
                                        <td>:</td>
                                        <td>{this.state.appointment}</td>
                                    </tr>
                                    {(this.state.type == 'OFFICER') &&
                                    <tr>
                                        <th>BMA Long Course</th>
                                        <td>:</td>
                                        <td>
                                                <pre style={{
                                                    border: 0,
                                                    fontFamily: "arial",
                                                    fontSize: "1rem"
                                                }}>{this.state.bma_long_course}</pre>
                                        </td>
                                    </tr>
                                    }
                                    <tr>
                                        <th>Date of Birth</th>
                                        <td>:</td>
                                        <td>{this.state.dob}</td>
                                    </tr>
                                    {this.state.type !== 'JCO' && this.state.type !== 'OR' && (
                                        <tr>
                                            <th>Date of Commission</th>
                                            <td>:</td>
                                            <td>{this.state.date_of_commission}</td>
                                        </tr>
                                    )}

                                    {(this.state.type === 'JCO' || this.state.type === 'OR') && (
                                        <tr>
                                            <th>Trade</th>
                                            <td>:</td>
                                            <td>{this.state.trade}</td>
                                        </tr>
                                    )}

                                    <tr>
                                        <th>Blood Group</th>
                                        <td>:</td>
                                        <td>{this.state.blood_group}</td>
                                    </tr>

                                    <tr>
                                        <th>Join Date</th>
                                        <td>:</td>
                                        <td>{this.state.join_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Leave Date</th>
                                        <td>:</td>
                                        <td>{this.state.leave_date} </td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>:</td>
                                        <td>{this.state.email} </td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>:</td>
                                        <td>{this.state.phone} </td>
                                    </tr>
                                    <tr>
                                        <th>Marital Status</th>
                                        <td>:</td>
                                        <td>{this.state.marital_status} </td>
                                    </tr>
                                    {this.state.type == 'OFFICER' ?
                                        ""
                                        :
                                        <tr>
                                            <th>District</th>
                                            <td>:</td>
                                            <td>{this.state.district} </td>
                                        </tr>
                                    }
                                    {this.state.type == 'OFFICER' ?
                                        ""
                                        :
                                        <tr>
                                            <th>Punishment</th>
                                            <td>:</td>
                                            <td>
                                                <pre style={{
                                                    border: 0,
                                                    fontFamily: "arial",
                                                    fontSize: "1rem"
                                                }}>{this.state.punishment}</pre>
                                            </td>
                                        </tr>
                                    }

                                    <tr>
                                        <th>Education Qualification Army</th>
                                        <td>:</td>
                                        <td>
                                            <pre style={{
                                                border: 0,
                                                fontFamily: "arial",
                                                fontSize: "1rem"
                                            }}>{this.state.education_qualification_army}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Education Qualification Civil</th>
                                        <td>:</td>
                                        <td>
                                            <pre style={{
                                                border: 0,
                                                fontFamily: "arial",
                                                fontSize: "1rem"
                                            }}>{this.state.education_qualification_civil}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Army Level Course</th>
                                        <td>:</td>
                                        <td>
                                            <pre style={{
                                                border: 0,
                                                fontFamily: "arial",
                                                fontSize: "1rem"
                                            }}>{this.state.army_level_course}</pre>
                                        </td>
                                    </tr>

                                    {/* <tr>
                                        <th>Unit</th>
                                        <td>:   {this.state.unit}</td>
                                    </tr> */}

                                    {/*<tr>*/}
                                    {/*    <th>Appointment</th>*/}
                                    {/*    <td>:   {this.state.rank} {this.state.unit}</td>*/}
                                    {/*</tr>*/}
                                </table>
                            </div>
                            {/*<div className={__css_OfficerDescription}>*/}
                            {/*    <h6>Brief Description:</h6>*/}
                            {/*    <p>*{this.state.brif}</p>*/}
                            {/*</div>*/}
                            {/*<div className={__css_OfficerEducation}>*/}
                            {/*    <h6>Education :</h6>*/}
                            {/*    <p> 1. 1997-1998 Cumilla Cadet College (SSC)<br/>*/}
                            {/*        2.1999-2000 Cumilla Cadet College (HSC)<br/>*/}
                            {/*        3. 2001-2002 National University (BMA, Bhatiary) (BSc)<br/>*/}
                            {/*        4. 2010-2014 Military Institution of Science and Technology (MIST) (BSc)<br/>*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                            {/*<div className={__css_OfficerContributions}>*/}
                            {/*    <h6>Contributions:</h6>*/}
                            {/*    <p></p>*/}
                            {/*</div>*/}

                            {/*<div className={__css_OfficerAffiliated}>*/}
                            {/*    <h6>Affiliated Project:</h6>*/}
                            {/*    <p></p>*/}
                            {/*</div>*/}
                            {/*<div className={__css_OfficerTimeline}>*/}
                            {/*    <h6>Timeline:</h6>*/}
                            {/*    <p></p>*/}
                            {/*</div>*/}
                        </div>
                        <div className={__css_OfficerImage}>
                            <img src={APP.CONFIG.CDN_ROOT + '/' + this.state.photo} alt={"Profile Image"}/>
                        </div>
                    </div>
                    <div className={__css_OfficerBtn}>
                        <button onClick={this.handlePrintArea}><i className={"fa fa-print"}></i>Print</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default OfficerView;
