import React from 'react';
import {APP} from '../../../App/Init/AppProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import {withRouter} from 'react-router-dom';


const __css_GlobalContainer = css(`
    ul {
        margin: 0;
        padding: 0;
    }
`);

const __css_FundContainerPosition = css(`
    display: flex;
    justify-content: center;
`);

const __css_FundsContainer = css(`
    position: relative;
    margin-top: 100px;
    background: #ffffff;
    text-align: center;
    width: 75%;
    p{
        // text-align: center;
        border-bottom: 1px solid #e5e5e5;
        padding: 20px 0px;
        font-size: 18px;
        color: rgb(123, 123, 123);
        font-weight: bold;
        margin-bottom: 0px;
    }
     @media only screen and (max-width: 984px) {
         width: 100%;
     }
    // @media only screen and (min-width: 984px) {
    //     width: 75%;
    // }
    
`);

const __css_FundList = css(`
    padding: 50px 120px 0px 110px;
    text-align: left;
    ul {
        list-style: none;
    }
    ul li{
        border-radius: 5px;
        box-shadow: 0px 6px 42.84px 8.16px rgba(173, 164, 252, 0.25);
        margin: 15px auto;
    }
    li:hover {
        transition: 0.5s;
        a{
            color: white;
        }
    }
    button:hover,
    button:focus {
        background: #5d4edd;
        color: #ffffff;
        text-decoration: none;
    }
    ul li button{
        outline: 0;
        background: #fdfdfe;
        border-radius: 5px;
        font-size: 17px;
        display: inline-block;
        color: #616161;
        // font-family: poppinsRegular;
        padding: 8px 35px;
        font-weight: 400;
        border: 0;
        width: 100%;
    }

    @media only screen and (max-width: 984px) {
        
    }
    @media only screen and (min-width: 984px) {
        
    }
`);

const __css_BackBtn = css(`
    text-align: right;
    margin: 80px 20px 0px 0px;
    padding-bottom: 20px;
    a{
        background: #5d4edd;
        color: #fff;
        border-radius: 2px;
        padding: 7px 15px;
        font-size: 14px;
    }
    a:hover,
    a:focus {
        text-decoration: none;
        box-shadow: 0px 6px 42.84px 8.16px rgba(0, 0, 0, 0.1);
    }
`)
const __css_HoverFund = css(`
    position: absolute;
    top: 125px;
    right: -90px;
    width: 250px;
    height: 300px;
    background: #ffffff;
    border-bottom-right-radius: 50px;
    box-shadow: 0px 6px 42.84px 8.16px rgba(92, 77, 221, 0.1);
    p{
        background: #d9ffe0;
        text-align: center;
        padding: 15px 0px;
        margin-bottom: 35px;
    }
    ul {
        list-style: none;
    }
    ul li{
        margin: 15px 0px 0px 30px;   
        position: relative;
    }
    
    ul li a {
        cursor: pointer;
        font-size: 15px;
        font-family: "Poppins";
        color: rgb(97, 97, 97);
    }
    a:hover,
    a:focus {
        text-decoration: none;
        color: #5c4ddd;
        ::before { 
            content: "";
            background: #5c4ddd;
            position: absolute;
            top: 10px;
            width: 14px;
            height: 3px;
            left: -30px;
        }

    
`);


const Data: any = [
    {
        name: "Project Fund",
        menu: [
            {
                label: "Update Balance Sheet",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'PF',
                Action: 'BS',
                Title: 'Project Fund Update Balance Sheet',
            },
            {
                label: "Received Voucher (RV)",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'PF',
                Action: 'RV',
                Title: 'Received Voucher (RV)',
            },
            {label: "Payment Voucher (PV)", link: APP.ROUTES.PRIVATE.PF_PAYMENT_VOUCHER},
            {label: "BOQ & WK Order", link: APP.ROUTES.PRIVATE.PF_BOQ_WK_ORDER},
            {label: "Ongoing Assignments", link: APP.ROUTES.PRIVATE.PF_ONGOING_ASSIGNMENTS},
        ],
    },
    {
        name: "CF Fund",
        menu: [
            {
                label: "Update Balance Sheet",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'CF',
                Action: 'BS',
                Title: 'CF Fund Update Balance Sheet',
            },
            {
                label: "Received Voucher (RV)",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'CF',
                Action: 'RV',
                Title: 'Received Voucher (RV)',
            },
            {label: "Payment Voucher (PV)", link: APP.ROUTES.PRIVATE.CF_PAYMENT_VOUCHER},
            {label: "BOQ & WK Order", link: APP.ROUTES.PRIVATE.CF_BOQ_WK_ORDER},
            {label: "Ongoing Assignments", link: APP.ROUTES.PRIVATE.CF_ONGOING_ASSIGNMENTS},
        ],
    },
    {
        name: "Misc Fund",
        menu: [
            {
                label: "Update Balance Sheet",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'MISC',
                Action: 'BS',
                Title: 'Misc Fund Update Balance Sheet',
            },
            {
                label: "Received Voucher (RV)",
                link: APP.ROUTES.PRIVATE.FUND_SESSION_FILTER,
                FundName: 'MISC',
                Action: 'RV',
                Title: 'Received Voucher (RV)',
            },
            {label: "Payment Voucher (PV)", link: APP.ROUTES.PRIVATE.MISC_PAYMENT_VOUCHER},
            {label: "BOQ & WK Order", link: APP.ROUTES.PRIVATE.MISC_BOQ_WK_ORDER},
            {label: "Ongoing Assignments", link: APP.ROUTES.PRIVATE.MISC_ONGOING_ASSIGNMENTS},
        ],
    },
    // {
    //     name: "Archive",
    //     menu: [
    //         {label: "Update Balance Sheet", link: ""},
    //         {label: "Received Voucher (RV)", link: ""},
    //         {label: "Payment Voucher (PV)", link: ""},
    //         {label: "BOQ & WK Order", link: ""},
    //         {label: "Ongoing Assignments", link: ""},
    //     ],
    // },
    // {
    //     name: "Reports & Return Fund",
    //     menu: [
    //         {label: "Update Balance Sheet", link: ""},
    //         {label: "Received Voucher (RV)", link: ""},
    //         {label: "Payment Voucher (PV)", link: ""},
    //         {label: "BOQ & WK Order", link: ""},
    //         {label: "Ongoing Assignments", link: ""},
    //     ],
    // },
];


const FundReport = (props: any): any => {

    const [fundPopupOpen, setFundPopupOpen] = React.useState(false);
    const [popupDataIndex, setPopupDataIndex] = React.useState(0);

    const handleSetPopupData = (index: number) => {
        setFundPopupOpen(!fundPopupOpen);
        setPopupDataIndex(index);
    };

    return (
        <div className={__css_GlobalContainer}>
            <Row>
                <Col md={3} />
                <Col md={6} className={__css_FundContainerPosition}>
                    <div className={__css_FundsContainer}>
                        <p>All funds</p>
                        <div className={__css_FundList}>
                            <ul>
                                {Data.map((data: any, index: number) => (
                                    <li key={index}>
                                        <button onClick={() => handleSetPopupData(index)}>{data.name}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={__css_BackBtn}>
                            <a href="">Back</a>
                        </div>
                    </div>

                    {fundPopupOpen && (
                        <div className={__css_HoverFund}>
                            <p>{Data[popupDataIndex].name}</p>
                            <ul>
                                {Data[popupDataIndex].menu.map((menu: any, index: number) => (
                                    <li key={index}><a onClick={() => {
                                        new APP.SERVICES.SESSION_FILTER().setSessionFilter({
                                            FundName: menu.FundName,
                                            Action: menu.Action,
                                            Title: menu.Title,
                                        });
                                        props.history.push(menu.link);
                                    }}>{menu.label}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Col>
                <Col md={3} />
            </Row>


        </div>

    );
};


export default withRouter(FundReport);
