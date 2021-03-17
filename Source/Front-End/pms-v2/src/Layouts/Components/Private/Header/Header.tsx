import React, {Component} from 'react';
import {css} from '@emotion/css';
import NavigationBar from "./NavigationBar";
import '../../../../Static/Styles/Header/Header.css';
import HeaderBackgroundImage from '../../../../Static/Images/Header/background.jpg';
import Logo1 from '../../../../Static/Images/Header/logo001.png';
import Logo2 from '../../../../Static/Images/Header/logo002.png';
import SearchBar from "./Search";
import {APP} from "../../../../App/Init/AppProvider";

const __css_headerContainer = css(`
    background-image: -moz-linear-gradient( 0deg, rgb(255,255,255) 0%, rgb(149,144,185) 10%, rgb(42,33,114) 53%, rgb(149,144,185) 80%, rgb(255,255,255) 100%) !important;
    background-image: -webkit-linear-gradient( 0deg, rgb(255,255,255) 0%, rgb(149,144,185) 10%, rgb(42,33,114) 53%, rgb(149,144,185) 80%, rgb(255,255,255) 100%) !important;
    background-image: -ms-linear-gradient( 0deg, rgb(255,255,255) 0%, rgb(149,144,185) 10%, rgb(42,33,114) 53%, rgb(149,144,185) 80%, rgb(255,255,255) 100%) !important;
    position: relative;
    width: 100%;
    height: 177px;
    z-index: 58;
    overflow: hidden;
    @media only screen and (max-width: 984px) {
        height: 120px;
    }
`);

const __css_brandContainer = css(`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`);

const __css_logo1 = css(`
    position: absolute;
    top: 10px;
    left: 140px;
    
    @media only screen and (max-width: 984px) {
        left: 10px;
        width: 40px;
    }
`);

const __css_logo2 = css(`
    position: absolute;
    top: 10px;
    right: 140px;
    
    @media only screen and (max-width: 984px) {
        right: 10px;
        width: 40px;
    }
`);

const __css_brandTitle1 = css(`
    font-family: poppinsSemiBold;
    font-size: 24pt;
    color: #ffae00;
    margin-top: 30px;
    text-align: center;
    
    @media only screen and (max-width: 984px) {
        font-size: 10px;
    }
`);

const __css_brandTitle2 = css(`
    font-family: poppinsSemiBold;
    font-size: 24pt;
    color: #ffffff;
    margin-top: 0;
    text-align: center;
    
    @media only screen and (max-width: 984px) {
        font-size: 10px;
    }
`);

const __css_searchBarContainer = css(`
    margin-left: 80px;
    margin-right: 80px;
    text-align: left;
    
    @media only screen and (max-width: 984px) {
        margin: 0;
        text-align: center;
    }
`);

class Header extends Component {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            SearchValue: '',
            site_title: '',
            site_sub_title: '',
            header_banner: '',
            logo1: '',
            logo2: '',
            copyright: '',
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
                <div className={__css_headerContainer}>
                    <img src={HeaderBackgroundImage} alt={"Logo"} className={css(`width: 100%`)}/>

                    <img src={APP.CONFIG.CDN_ROOT+'/'+this.state.logo1} alt={"Logo"} className={__css_logo1}/>

                    <img src={APP.CONFIG.CDN_ROOT+'/'+this.state.logo2} alt={"Logo"} className={__css_logo2}/>

                    <div className={__css_brandContainer}>
                        <div className={__css_brandTitle1}>
                            {this.state.site_title}
                        </div>
                        <div className={__css_brandTitle2}>
                            {this.state.site_sub_title}
                        </div>

                        <div className={__css_searchBarContainer}>
                            <SearchBar value={this.state.SearchValue}
                                       onChange={(e: any) => this.setState({SearchValue: e.target.value})}
                                       onSubmit={() => {
                                       }}/>
                        </div>
                    </div>
                </div>
                <NavigationBar/>
            </React.Fragment>
        );
    }
}

export default Header;
