import React from 'react';
import {withRouter} from 'react-router-dom';
import {css} from '@emotion/css';
import Marquee from "../../../Global/Marquee/Marquee";
import '../../../../../Static/Styles/Home/MarqueeNotice/MarqueeNotice.css';
import axios from "axios";
import {APP} from "../../../../../App/Init/AppProvider";

const __css_marqueeNoticeContainer = css(`
    width: 100%;
    border-collapse: collapse;
    
    & td:first-child {
        font-family: poppinsBold;
        font-size: 20px;
        background: #a51107;
        color: #ffffff;
        padding: 5px 20px;
        border-right: 1px solid #ffffff;
        
        @media only screen and (max-width: 984px) {
            font-size: 15px;
            padding: 5px 10px;
        }
    }
    
    & td:last-child {
        width: 100%;
        font-family: poppinsBold;
        font-size: 18px;
        background: #5d4edd;
        color: #ffffff;
        padding: 5px;
        position: relative;
        
        @media only screen and (max-width: 984px) {
            font-size: 15px;
        }
    }
`);

const __css_marqueeElement = css(`
    display: inline-block;
    color: #ffffff;
    text-decoration: none !important;
    margin-right: 30px;
    
    &:hover {
        color: #262626;
    }
`)

class MarqueeNotice extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            NoticeList: [],
        };
    }


    protected GetFeaturedNotices(): void {
        axios.get(APP.CONFIG.API_ROOT + '/notices/list?sort=desc&featured=false', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}: any) => {
            if (data.success) {
                this.setState({
                    NoticeList: data.data,
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
        this.GetFeaturedNotices();
    }

    public render(): any {
        return (
            <table className={__css_marqueeNoticeContainer}>
                <tbody>
                <tr>
                    <td>
                        Notice
                    </td>
                    <td>
                        <Marquee speed={20} content={
                            <React.Fragment>
                                {this.state.NoticeList.map((Notice: any, index: number) => {
                                    return (
                                        <a key={index} href={"#"} className={__css_marqueeElement}>***{Notice.title}***</a>
                                    )
                                })}
                            </React.Fragment>
                        } style={{position: "absolute", top: 4, left: 0, right: 0, bottom: 0}}/>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default withRouter(MarqueeNotice);
