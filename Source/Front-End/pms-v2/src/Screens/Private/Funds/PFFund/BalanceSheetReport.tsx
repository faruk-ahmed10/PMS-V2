import React from 'react';
import {css} from "@emotion/css";
import FontAwesome from 'react-fontawesome';
import { APP } from '../../../../App/Init/AppProvider';
import { Link, withRouter } from 'react-router-dom';

const __css_GlobalContainer = css(`
    p {
        margin: 0;
    }
`);

const __css_blncSheetArea = css(`
    position: relative;
    background: #ffffff;
    width: 52%;
    padding: 50px 0;
    margin: 0 auto;
    margin-top: 85px;
    @media only screen and (max-width: 1024px) {
        width: 70%;
     }
    @media only screen and (max-width: 984px) {
       width: 100%;
    }
`)

const __css_blncSheetHeading = css(`
    background: #f5f6fc;
    border-top: 1px solid #dce1ff;
    width: 395px;
    height: 60px;
    top: 65px;
    left: 0;
    right: 0;
    margin: auto;
    padding: 15px 30px;
    p{
        text-align: center;
        font-size: 18px;
        font-family: 'poppins';
        
    }
    @media only screen and (max-width: 984px) {
        width: 300px;
     }
`);

const __css_YearArea = css(`

    display: flex;
    justify-content: center;
    top: 203px;
    left: 0;
    right: 0;
    margin: auto; 
    margin-bottom: 5px; 
    a{
        background: #5d4edf;
        outline: 0;
        border: navajowhite;
        color: #ffffff;
        padding: 9px 24px;
    }
    @media only screen and (max-width: 984px) {
        padding: 0px 12px;
     }
`);

const __css_Year = css(`
    position: relative;
    margin-right: 30px;
    background: #fffde1;
    padding: 7px 30px;
    
    p {
        font-size: 18px;
        margin-left: 13px;
    }
    ::before {
        position: absolute;
        content: "";
        height: 100%;
        width: 11px;
        background: #fff000;
        top: 0;
        left: 0;
    }
    @media only screen and (max-width: 984px) {
        padding: 0px 0px;
        margin-right: 15px;
        p {
            font-size: 13px;
        }
    }
`);
const __css_DateStart = css(`
    padding: 7px 30px;
    background: #f8f9ff;
    margin-right: 30px;
    border-width: 0.25px;
    border-color: #ebecf0;
    border-style: solid;
    p{
        font-size: 18px;
    }
    @media only screen and (max-width: 984px) {
        margin-right: 15px; 
    }
`);
const __css_DateEnd = css(`
    padding: 7px 30px;
    background: #f8f9ff;
    margin-right: 30px;
    border-width: 0.25px;
    border-color: #ebecf0;
    border-style: solid;
    p{
        font-size: 18px;
    }
    @media only screen and (max-width: 984px) {
        margin-right: 15px; 
    }
`);

const __css_BackBtn = css(`
    text-align: right;
    margin: 56px 51px 0px 0px;;
    padding-bottom: 20px;
    color: white;
    cursor: pointer;
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

const __css_YearAreaBox = css(`margin-top: 15px`);

const BalanceSheetReport = (props:any): any => {
       const sessions = APP.FUNCTIONS.GET_SESSION_YEARS();

    return (
        <div className={__css_GlobalContainer}>
           <div className={__css_blncSheetArea}>
               <div className={__css_blncSheetHeading}>
                   <p>Project Fund Update Balance Sheet</p>
               </div>
               <div className={__css_YearAreaBox}>
               {
                    sessions.map((data, i) => (
                        <div key={i} className={__css_YearArea}>
                            <div className={__css_Year}>
                                    <p>Session:</p>
                            </div>
                            <div className={__css_DateStart}>
                                    <p>Jun 1, {data.startYear}</p>
                            </div>
                            <div className={__css_DateEnd}>
                                    <p>May 31, {data.endYear}</p>
                            </div>
                            <Link to={APP.ROUTES.PRIVATE.PF_BALANCE_SHEET_SESSION_REPORT}>
                                <FontAwesome name="far fa-long-arrow-right" />
                            </Link>
                        </div>
                    ))
               }
               <div className={__css_BackBtn}>
                    <a onClick={()=> props.history.goBack()}>Back</a>
                </div>
               </div>

           </div>
        </div>

    );
};


export default withRouter(BalanceSheetReport);
