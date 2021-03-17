import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import mapArea from "../../../Static/Images/ProjectDetails/project-Information.png";
import {APP} from "../../../App/Init/AppProvider";
import Officer from "../../../Static/Images/Officers/officer.png";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import FontAwesome from "react-fontawesome";

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


const __css_contractorInfo = css(`
    padding: 10px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 55%;
    border-bottom-right-radius: 50px;
    margin-top: 15px;
    @media only screen and (max-width: 984px) {
        width: 80%;
        font-size: 17px;
    }
`);

const __css_contractorInfo1 = css(`
    padding: 10px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 80%;
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


const __css_table = css(`
    border-collapse: collapse;
    background: #fff;
    th {
        background: #fffaee;
    }
    th,td {
        border-bottom: 1px solid #f5f6f8;
        border-right: 1px solid #f5f6f8;
        padding:12px;
        padding-left: 15px;
        font-weight:bold;
    }
    th, td:last-child{
        border-right: none;
    }
    td:nth-first-child(1)
    {
        border-bottom: none;
    }

    td:last-child{

        padding: 0px 60px 0px 20px;
    }
`);

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


class ContractorView extends Component {
    public state: any;
    private readonly contractor_id: number;
    constructor(props: any) {
        super(props);
        this.contractor_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            owner_name: '',
            phone: '',
            tin: '',
            address: '',
            __uid: Math.random().toString(16).slice(2),
        }

        this.handlePrintArea = this.handlePrintArea.bind(this);
    }


    protected getSettings(): void {
        new APP.SERVICES.CONTRACTOR().GetContractor(this.contractor_id).then(({data}) => {

            const responseData = data.data;

            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    owner_name: responseData.owner_name,
                    phone: responseData.phone,
                    tin: responseData.tin,
                    address: responseData.address,
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
        if(printContents !== null) {
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
                <Row>
                    <Col md={4}>
                        <div className={__css_contractorInfo1}>Contractor Information</div>
                        <div className={__css_OfficerInfoAreaWrap}>
                            <div className={__css_OfficerInfoArea}>
                                <div className={__css_OfficerInfoTextWrap}>
                                    <div className={__css_OfficerInfoTable}>
                                        <table>
                                            <tr>
                                                <th>Owner Name</th>
                                                <td>:   {this.state.owner_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>:   {this.state.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>TIN</th>
                                                <td>:   {this.state.tin}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>:   {this.state.address}</td>
                                            </tr>

                                        </table>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </Col>
                    <Col md={8}>
                        <div className={__css_contractorInfo}>Contractor Work List</div>
                        <div style={{background: '#ffffff', padding: 5}}>
                            <Table striped bordered hover className={__css_table} responsive={true} size={"sm"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Work Name</th>
                                    <th>Project Name</th>
                                    <th>Contract Amount</th>
                                    <th>Receive Amount</th>
                                    <th>Left Over Amount</th>
                                    <th>Bills</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Demo Work</td>
                                        <td>Demo Project</td>
                                        <td>504605</td>
                                        <td>304305</td>
                                        <td>200000</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Demo Work</td>
                                        <td>Demo Project</td>
                                        <td>504605</td>
                                        <td>304305</td>
                                        <td>200000</td>
                                        <td>5</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                    <div className={__css_OfficerBtn}>
                        <button onClick={this.handlePrintArea}><i className={"fa fa-print"}></i>Print</button>
                    </div>

            </div>
        );
    }
}


export default ContractorView;
