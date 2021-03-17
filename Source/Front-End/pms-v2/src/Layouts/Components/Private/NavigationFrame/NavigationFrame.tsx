import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../Header/Header';
import Slider from '../Home/Slider/Slider';
import {css} from '@emotion/css';
import MarqueeNotice from '../Home/MarqueeNotice/MarqueeNotice';
import NoticeBox from "../Home/NoticeBox/NoticeBox";
import QuickLaunch from "../Home/QuickLaunch/QuickLaunch";
import QuickLinks from "../Home/QuickLinks/QuickLinks";
import {APP} from '../../../../App/Init/AppProvider';
import {withRouter} from 'react-router-dom';

const __css_Container1 = css(`
    // padding: 15px;
    padding-top:15px;
    @media only screen and (max-width: 984px) {
        padding: 0;
    }
`);

const __css_Container2 = css(`
    margin-bottom: 15px;
    margin-top: 0;
`);

const __css_optimizedCol = css(`
    margin-top: 15px;
    @media only screen and (min-width: 985px) {
        padding-right: 0;
    }
`);


const NavigationFrame = (props: any) => {
    const {children, hideLeftContainer, withSlider, withNotice, withQuickLaunch, withNoticeBox, withOfficersPanel}: { children: any, hideLeftContainer: boolean, withSlider: boolean, withNotice: boolean, withQuickLaunch: boolean, withNoticeBox: boolean, withOfficersPanel: boolean, props: any } = props;

    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        if (!isLoaded && Number(new APP.SERVICES.SWITCH_PROJECT().getActiveProjectId().id) <= 0) {
            new APP.SERVICES.PROJECT().GetProject(1).then(({data}) => {

                const responseData = data.data;
                if(typeof responseData !== 'undefined' ! && responseData !== null) {
                    new APP.SERVICES.SWITCH_PROJECT().setActiveProject(responseData.id, responseData.name);
                }

                setIsLoaded(true);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 403) {
                        APP.EXCEPTIONS.ForbiddenException(props);
                    } else {
                        APP.EXCEPTIONS.DefaultException(error);
                    }
                } else {
                    APP.EXCEPTIONS.DefaultException(error);
                }
            });
        }
    });

    return (
        <React.Fragment>
            <Header/>
            <div className={__css_Container1}>
                {withSlider && (
                    <Slider/>
                )}
                {withNotice && (
                    <MarqueeNotice/>
                )}
            </div>

            <div className={__css_Container2}>
                <Container fluid>
                    <Row>
                        {!hideLeftContainer ? (
                            <Col md={3} className={__css_optimizedCol}>
                                {!withQuickLaunch && (
                                    <Row>
                                        <Col md={12}>
                                            <QuickLaunch/>
                                        </Col>
                                    </Row>
                                )}
                                {!withNoticeBox && (
                                    <Row>
                                        <Col md={12} style={{marginTop: 15}}>
                                            <NoticeBox/>
                                        </Col>
                                    </Row>
                                )}
                                {!withOfficersPanel && (
                                    <Row>
                                        <Col md={12} style={{marginTop: 15}}>
                                            <QuickLinks/>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        ): <></>}
                        <Col md={!hideLeftContainer ? 9 : 12}>
                            {children}

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(NavigationFrame);
