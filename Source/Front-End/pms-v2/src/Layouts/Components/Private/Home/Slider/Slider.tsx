import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/HomeSlider/HomeSlider.css';
import SliderImg001 from '../../../../../Static/Images/Home/HomeSlider/SliderImg001.jpg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {APP} from "../../../../../App/Init/AppProvider";

const __css_carousel = css(`
    height: inherit;
    
    @media only screen and (min-width: 1350px) {
        height: 596px;
    }
`);
const __css_carouselItem = css(`
    @media only screen and (min-width: 1350px) {
        height: 596px;
    }
`);

const __css_carouselCaptionContainer = css(`
    position: relative;
    height: 51px;
    
    @media only screen and (max-width: 984px) {
        height: 30px;
        margin-bottom: -100px;
    }
`);

const __css_carouselCaption = css(`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #efae21;
    color: #000000;
    opacity: 80%;
    
    @media only screen and (max-width: 984px) {
        height: auto;
    }
`);

const __css_carouselCaptionText = css(`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 20px;
    color: #000000;
    font-family: poppinsMedium;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media only screen and (max-width: 984px) {
        font-size: 13px;
    }
`);

const __css_controllerButton = css(`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #ffffff;
    color: #777777;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media only screen and (max-width: 984px) {
        width: 30px;
        height: 30px;
    }
`);

const __css_controllerButtonIcon = css(`
    font-size: 55px !important;
    
    @media only screen and (max-width: 984px) {
        font-size: 30px !important;
    }
`);

const ControllerIcon = ({type}: Readonly<Required<{ type: 'next' | 'prev' }>>): any => (
    <span className={__css_controllerButton}>
        {type === 'next' ? <ChevronRightIcon className={__css_controllerButtonIcon}/> :
            <ChevronLeftIcon className={__css_controllerButtonIcon}/>}
    </span>
)

class Slider extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            Sliders: [],
        };

        this.GetSliders = this.GetSliders.bind(this);
    }

    protected GetSliders(): void {
        axios.get(APP.CONFIG.API_ROOT + '/gallery/list?sort=desc&featured=true', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}: any) => {
            if (data.success) {
                this.setState({
                    Sliders: data.data,
                });
            } else {
                alert(data.message);
            }
        }).catch((error: any) => {
            if(error.response) {
                if(error.response.status === 403) {
                    APP.EXCEPTIONS.ForbiddenException(this.props);
                }
            } else {
                new APP.SERVICES.CORE.ALERT_DIALOG().Show({
                    show: true,
                    style: {fontSize: 12},
                    title: "Error",
                    message: "Error occurred! " + error,
                    showCancel: false,
                    confirmBtnText: "Okay",
                    alertType:"danger",
                    btnSize: "10",
                    onConfirm(): void | boolean {
                        new APP.SERVICES.CORE.ALERT_DIALOG().Show({show: false});
                    }
                });
            }
        });
    }


    public componentDidMount(): void {
        this.GetSliders();
    }

    public render(): any {
        return (
            <React.Fragment>
                <Carousel indicators={false} nextIcon={<ControllerIcon type={"next"}/>}
                          prevIcon={<ControllerIcon type={"prev"}/>} className={__css_carousel}>
                    {this.state.Sliders.map((Slider: any, index: number) => {
                        return (
                            <Carousel.Item className={__css_carouselItem}>
                                <img
                                    className="d-block w-100"
                                    src={APP.CONFIG.CDN_ROOT + '/' + Slider.image}
                                    alt="Photo"
                                />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </React.Fragment>
        );
    }
}

export default withRouter(Slider);