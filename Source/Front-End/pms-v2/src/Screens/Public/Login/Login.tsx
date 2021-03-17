import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from '@emotion/css';
import LeftCover from "../../../Layouts/Components/Public/Login/LeftCover/LeftCover";
import Form from "../../../Layouts/Components/Public/Login/Form/Form";

const __css_LeftCoverSection = css(`
    background-image: -moz-linear-gradient( -49deg, rgb(63,187,254) 0%, rgb(165,65,255) 100%);
    background-image: -webkit-linear-gradient( -49deg, rgb(63,187,254) 0%, rgb(165,65,255) 100%);
    background-image: -ms-linear-gradient( -49deg, rgb(63,187,254) 0%, rgb(165,65,255) 100%);
    height: 100vh;
    margin: 0;
    padding: 0;
    
    @media only screen and (max-width: 984px) {
        display: none;
    }
`);

const __css_RightSection = css(`
    background: #ffffff;
    height: 100vh;
    margin: 0;
    padding: 0;
`);

const Login = (): any => {
    return (
        <React.Fragment>
            <Container fluid style={{padding: 0}}>
                <Row style={{margin: 0}}>
                    <Col md={6} className={__css_LeftCoverSection}>
                        <LeftCover />
                    </Col>
                    <Col md={6} className={__css_RightSection}>
                        <Form />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Login;
