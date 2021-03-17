import React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {css} from '@emotion/css';
import '../../../../Static/Styles/Header/NavigationBar.css';
import {Link, withRouter} from "react-router-dom";
import Logout from "../Logout/Logout";
import {APP} from "../../../../App/Init/AppProvider";
import FontAwesome from "react-fontawesome";
import SwitchProject from "../SwitchProject/SwitchProject";

const __css_responsiveNavContainer = css(`
    justify-content: center;
    align-items: center;
    width: 100%;
`);

const navLink = css(`
    color: #ffffff !important;
    font-family: poppinsLight;
    font-size: 14px;
    padding-left: 15px !important;
    padding-right: 15px !important;
    &:hover {color: #ffb600 !important}
`);
const navLinkActive = css(`
    color: #ffb600 !important;
    &:hover {color: #ffffff !important}
`);

const navOnly = css(`
    margin-left: 100px !important;
    margin-right: 100px !important;
    
    @media only screen and (max-width: 984px) {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
`);

const __css_dropdownContainer = css(`
    & a {
        color: #ffffff !important;
        font-size: 14px;
        padding-left: 15px !important;
        padding-right: 15px !important;
        &:hover {color: #ffb600 !important}
    }
    
    & .dropdown-menu {
        background: #0b024f;
    }
    
    & .dropdown-menu a {
        color: #ffffff !important;
        &:hover {color: #0b024f !important}
    }
`);

class NavigationBar extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            ShouldLogout: false,
            SwitchProjectOpen: false,
        };

        this.RouteMatched = this.RouteMatched.bind(this);
    }

    protected RouteMatched(RouteToMatch: string) {
        return APP.FUNCTIONS.REMOVE_ENDING_SLASH(this.props.location.pathname.toLowerCase()) === RouteToMatch.toLowerCase();
    };


    public render() {
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" style={{
                    background: "#060033",
                    padding: 0,
                    borderTop: '1px solid #ffae00',
                    boxShadow: "rgb(44, 37, 98) 0px 4px 10px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px"
                }} variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className={__css_responsiveNavContainer}>
                        <Nav className={navOnly}>
                            <Nav.Link as={Link} to={APP.ROUTES.PRIVATE.DASHBOARD}
                                      className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.DASHBOARD) ? navLinkActive : '')}>Home</Nav.Link>
                            <Nav.Link as={Link} to={APP.ROUTES.PRIVATE.PROJECTS}
                                      className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.PROJECTS) ? navLinkActive : '')}>Project</Nav.Link>


                            <NavDropdown title="Dev/Partner" id="collasible-nav-dropdown"
                                         className={__css_dropdownContainer}>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.CONTRACTORS} className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.CONTRACTORS) ? navLinkActive : '')}>Manage Development Partner</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.ASSIGN_WORK} className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.ASSIGN_WORK) ? navLinkActive : '')}>Assign Development Partner</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"} className={navLink}>Progress & Remarks</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link
                                as={Link} to={APP.ROUTES.PRIVATE.SUPPLIERS}
                                className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.SUPPLIERS) ? navLinkActive : '')}>Supplier
                            </Nav.Link>
                            <Nav.Link as={Link} to={APP.ROUTES.PRIVATE.NOTICES}
                                      className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.NOTICES) ? navLinkActive : '')}>Notices</Nav.Link>

                            <Nav.Link as={Link} to={APP.ROUTES.PRIVATE.FUNDS}
                                      className={navLink + ' ' + (this.RouteMatched(APP.ROUTES.PRIVATE.FUNDS) ? navLinkActive : '')}>Funds</Nav.Link>

                            {/*<NavDropdown title="Funds Create" id="collasible-nav-dropdown"
                                         className={__css_dropdownContainer}>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.FUNDS} className={navLink}>Fund List</NavDropdown.Item>
                            </NavDropdown>*/}

                            <Nav.Link as={Link} to={APP.ROUTES.PRIVATE.FUND_REPORT} className={navLink}>Fund
                                Report</Nav.Link>

                            <NavDropdown title="Payments" id="collasible-nav-dropdown"
                                         className={__css_dropdownContainer}>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.BILLS} className={navLink}>Bill</NavDropdown.Item>
                                {/* <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.CF_FUND} className={navLink}>Bill
                                    Distribution</NavDropdown.Item> */}
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.PAYMENT_HISTORY} className={navLink}>Payment
                                    History</NavDropdown.Item>
                                {/* <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.FUND_REPORT} className={navLink}>Bills
                                    Summary</NavDropdown.Item> */}
                            </NavDropdown>

                            {/* <Nav.Link href="#pricing" className={navLink}>Reports</Nav.Link>
                            <Nav.Link href="#pricing" className={navLink}>Archive</Nav.Link>
                            <Nav.Link href="#pricing" className={navLink}>Performance</Nav.Link> */}

                            <NavDropdown title="Settings" id="collasible-nav-dropdown"
                                         className={__css_dropdownContainer}>

                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.BASIC_SETTINGS} className={navLink}>Basic
                                    Settings</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.UNIT_HISTORY} className={navLink}>Unit
                                    History</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.UNITS}
                                                  className={navLink}>Units</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.SECTIONS}
                                                  className={navLink}>Sections</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.MESSAGES}
                                                  className={navLink}>Message</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.DSTNS} className={navLink}>DSTN
                                    Chart</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.ITEM_HEADS} className={navLink}>Item
                                    Head</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.GALLERYS}
                                                  className={navLink}>Gallery</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.EQUIPMENT_CATEGORY}
                                                  className={navLink}>Equipment Category</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={APP.ROUTES.PRIVATE.ARCHIVE_HEADS}
                                                  className={navLink}>Archive Head</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className={navLink} onClick={() => this.setState({ShouldLogout: true})}>
                                Logout
                            </Nav.Link>


                            {/* Dropdown example */}
                            {/* <NavDropdown title="More" id="collasible-nav-dropdown" className={__css_dropdownContainer}>
                                <NavDropdown.Item href="#action/3.1" className={navLink}>Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" className={navLink}>Another
                                    action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" className={navLink}>Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4" className={navLink}>Separated
                                    link</NavDropdown.Item>

                            </NavDropdown>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>

                    <Nav className="ml-auto" style={{paddingRight: 10}}>
                        <Nav.Link className={navLink} style={{textAlign: "right"}}
                                  onClick={() => this.setState({SwitchProjectOpen: true,})}>
                            <FontAwesome name={"exchange"}/>
                        </Nav.Link>
                    </Nav>
                </Navbar>

                {this.state.ShouldLogout && (
                    <Logout/>
                )}

                <SwitchProject open={this.state.SwitchProjectOpen}
                               onSelect={() => this.setState({SwitchProjectOpen: false,})}
                               onClose={() => this.setState({SwitchProjectOpen: false,})}/>
            </React.Fragment>
        );
    }
}

export default withRouter(NavigationBar);
