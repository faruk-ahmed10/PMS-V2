import React from 'react';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/DstnChart/DstnChart.css';
import ProjectMap from '../../../../../Static/Images/Home/DstnChart/ProjectMap.jpg';
import axios from "axios";
import {APP} from "../../../../../App/Init/AppProvider";
import {withRouter} from 'react-router-dom';

const __css_card = css(`
    min-height: 488px;
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_cardTitle = css(`
    padding: 20px 25px 0 25px;
    text-align: center;
    text-transform: uppercase;
    font-family: poppinsSemiBold;
    font-size: 21px;
    color: #000000;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px;
        width: 85%;
    }
`);

const __css_cardBody = css(`
    padding: 0;
`);

const __css_cardText = css(`
    padding: 0 25px 20px 25px;
    @media only screen and (max-width: 984px) {
        padding: 0 15px 15px 15px;
    }
`);

const __cssProjectMap = css(`
    width: 100%;
`);


class DstnChart extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            DstnChart: {},
        };

        this.GetDstnChartData = this.GetDstnChartData.bind(this);
    }

    protected GetDstnChartData(): void {
        axios.get(APP.CONFIG.API_ROOT + '/dstn_chart', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}: any) => {
            if (data.success) {
                if (typeof data.data !== 'undefined' && data.data !== null) {
                    this.setState({
                        DstnChart: data.data,
                    });
                }
            } else {
                alert(data.message);
            }
        }).catch((error: any) => {
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

    public componentDidMount(): void {
        this.GetDstnChartData();
    }

    public render(): any {
        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <Card.Body className={__css_cardBody}>
                        <Card.Title className={__css_cardTitle}>Dstn Chart</Card.Title>
                        <Card.Text className={__css_cardText}>
                            {typeof this.state.DstnChart.image !== 'undefined' && this.state.DstnChart.image !== '' && this.state.DstnChart.image !== null && (
                                <img src={APP.CONFIG.CDN_ROOT + '/' + this.state.DstnChart.image} alt={"Dstn Map"}
                                     className={__cssProjectMap}/>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(DstnChart);
