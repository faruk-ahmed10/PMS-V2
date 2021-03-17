import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/QuickLinks/QuickLinks.css';
import {Nav} from "react-bootstrap";
import {APP} from "../../../../../App/Init/AppProvider";

const __css_card = css(`
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_cardBody = css(`
    padding: 15px 30px 15px 30px;
`);

const navLinkActive = css(`
    color: #ffb600 !important;
    &:hover {color: #ffffff !important}
`);

const navLink = css(`
    color: #ffffff !important;
    font-family: poppinsLight;
    padding-left: 15px !important;
    padding-right: 15px !important;
    &:hover {color: #ffb600 !important}
`);

const __css_ItemButton = css(`
    margin-top: 15px;
    padding: 10px 30px;
    border-radius: 5px;
    background: rgb(233, 244, 255);
    font-family: poppinsSemiBold;
    text-align: center;
    color:#000;
    
    &:hover {
        background: #5d4edd;
        color: #ffffff;
        cursor: pointer;
    }
`);

function QuickLinks(): any {

    return (

        <React.Fragment>
            <Card className={__css_card}>
                <Card.Body className={__css_cardBody}>
                    <Card.Text>
                        <div>
                            <Nav.Link className={__css_ItemButton} as={Link} to={APP.ROUTES.PRIVATE.USERS+ '/officer'}>
                                OFFICER'S List
                            </Nav.Link>
                        </div>
                        <div>
                            <Nav.Link className={__css_ItemButton} as={Link} to={APP.ROUTES.PRIVATE.USERS + '/jco'}>
                                JCO's List
                            </Nav.Link>
                        </div>
                        <div>
                            <Nav.Link className={__css_ItemButton} as={Link} to={APP.ROUTES.PRIVATE.USERS + '/or'}>
                                OR's List
                            </Nav.Link>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default withRouter(QuickLinks);
