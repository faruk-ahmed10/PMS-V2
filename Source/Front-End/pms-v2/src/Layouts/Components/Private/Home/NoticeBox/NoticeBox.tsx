import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/NoticeBox/NoticeBox.css';
import axios from "axios";
import {APP} from "../../../../../App/Init/AppProvider";

const __css_card = css(`

    min-height: 400px;

    min-height: 388px;
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_titleBox = css(`
    padding: 11px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 80%;
    text-align: center;
    border-bottom-right-radius: 50px;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px;
        width: 85%;
    }
`);

const __css_listItem = css(`
    font-family: poppinsSemiBold;
    font-size: 18px;
    padding: 5px 0 5px 0;
    margin-top: 10px;
    
    @media only screen and (max-width: 984px) {
        font-size: 14px;
    }
`);

const __css_cardBody = css(`
    padding: 15px 0 15px 0;
`);

class NoticeBox extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            NoticeList: [],
        }
    }

    protected GetNotices(): void {
        axios.get(APP.CONFIG.API_ROOT + '/notices/list?sort=desc&offset=6', {
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
        this.GetNotices();
    }


    public render(): any {
        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <div className={__css_titleBox}>
                        Notice Board
                    </div>
                    <Card.Body className={__css_cardBody}>
                        <Card.Text>
                            <ul>
                                {this.state.NoticeList.map((Notice: any, index: number) => {
                                    return (
                                        <li key={index} className={__css_listItem}>
                                            <Link to={APP.ROUTES.PRIVATE.VIEW_NOTICE + '/' + Notice.id}>{Notice.title}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(NoticeBox);
