import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from '@emotion/css';
import DstnChart from "../../../Layouts/Components/Private/Home/DstnChart/DstnChart";
import CoMessage from "../../../Layouts/Components/Private/Home/CoMessage/CoMessage";
import UnitHistory from "../../../Layouts/Components/Private/Home/UnitHistory/UnitHistory";
import CalendarCard from '../../../Layouts/Components/Private/Home/CalendarCard/CalendarCard';

const __css_optimizedCol = css(`
    margin-top: 15px;
    @media only screen and (min-width: 985px) {
        padding-right: 0;
    }
`);

const Home: any = (): any => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} className={__css_optimizedCol}>
                    <DstnChart/>
                </Col>
                <Col md={6} style={{marginTop: "15px"}}>
                    <CoMessage/>
                </Col>
            </Row>

            <Row>
                <Col md={6} className={__css_optimizedCol}>

                    <CalendarCard/>

                </Col>
                <Col md={6} style={{marginTop: "15px"}}>
                    <UnitHistory/>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default Home;