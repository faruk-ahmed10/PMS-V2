import React, {Component} from 'react';
import Logo from '../../../../../Static/Images/Login/Logo.png';
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Public/Login/LeftCover.css';
import {APP} from "../../../../../App/Init/AppProvider";
import { withRouter } from 'react-router-dom';

const __css_container = css(`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
`);

const __css_slogan = css(`
    display: inline-block;
    margin-top: 10px;
    border-radius: 20px;
    display: flex:
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5px 15px;
    background: #c9c9fe;
    font-size: 22px;
    font-weight: bold;
`);

const __css_title = css(`
    margin-top: 20px;
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
    width: 400px;
    font-family: poppinsSemiBold;
`);

const __css_line = css(`
    height: 1px;
    background: rgb(255, 255, 255);
    opacity: 0.302;
    margin-top: 50px;
`);

class LeftCover extends Component<any,any> {

    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            site_title: '',
            site_sub_title: '',
            header_banner: '',
            logo1: '',
            logo2: '',
            copyright: '',
            slogan:'',
        }
    }

    protected getSettings(): void {
        new APP.SERVICES.BASIC_SETTINGS().GetBasicSettings().then(({data}) => {

            const responseData = data.data;

            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    site_title: responseData.site_title,
                    site_sub_title: responseData.site_sub_title,
                    header_banner: responseData.header_banner,
                    logo1: responseData.logo1,
                    logo2: responseData.logo2,
                    copyright: responseData.copyright,
                    slogan:responseData.slogan,
                });
            }

        }).catch((error) => {
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
        this.getSettings();
    }
    render(): any {
        return (
            <React.Fragment>
                <div className={__css_container}>
                    <div>
                        <div>
                            <img src={APP.CONFIG.CDN_ROOT+'/'+this.state.logo1} alt={"Logo"}/>
                        </div>

                        <div className={__css_slogan}>
                            <div>{this.state.slogan}</div>
                        </div>

                        <div className={__css_title}>
                            {this.state.site_title}
                        </div>

                        <div className={__css_line}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(LeftCover);
