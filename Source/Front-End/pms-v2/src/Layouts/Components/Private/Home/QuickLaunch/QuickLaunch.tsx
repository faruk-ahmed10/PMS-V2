import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../../../App/Init/AppProvider';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/QuickLaunch/QuickLaunch.css';

const __css_card = css(`
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_titleBox = css(`
    padding: 11px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 80%;
    text-align: center;
    border-bottom-right-radius: 50px;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px;
        width: 85%;
    }
`);

const __css_cardBody = css(`
    padding: 15px 30px 15px 30px;
`);

const __css_ItemButton = css(`
    margin-top: 15px;
    padding: 10px 30px;
    border-radius: 5px;
    background: rgb(233, 244, 255);
    font-family: poppinsSemiBold;
    text-align: center;
    color: #000000;
    
    &:hover {
        background: #5d4edd;
        color: #ffffff;
        cursor: pointer;
    }
`);

function QuickLaunch(): any {
    return (
        <React.Fragment>
            <Card className={__css_card}>
                <div className={__css_titleBox}>
                    Quick Launch
                </div>
                <Card.Body className={__css_cardBody}>
                    <Card.Text>
                        <Link to={APP.ROUTES.PRIVATE.PROJECTS}>
                            <div className={__css_ItemButton}>View Project</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.CONTRACTORS}>
                            <div className={__css_ItemButton}>View Dev Partner</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.SUPPLIERS}>
                        <div className={__css_ItemButton}>View Suppliers</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.ARCHIVES}>
                            <div className={__css_ItemButton}>View Archive</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.EQUIPMENTS}>
                            <div className={__css_ItemButton}>View Equipment</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.GALLERY_GRID}>
                            <div className={__css_ItemButton}>View Gallery</div>
                        </Link>
                        {/*<Link to={APP.ROUTES.PRIVATE.FUND_REPORT}>
                            <div className={__css_ItemButton}>View Funds</div>
                        </Link>
                        <Link to={APP.ROUTES.PRIVATE.FUND_REPORT}>
                            <div className={__css_ItemButton}>Reports & Return Fund</div>
                        </Link> */}
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default withRouter(QuickLaunch);
