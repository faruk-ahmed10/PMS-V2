import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/CoMessage/CoMessage.css';
import CommanderImage from '../../../../../Static/Images/Home/CoMessage/CommanderImage.jpg';
import axios from "axios";
import {APP} from "../../../../../App/Init/AppProvider";
import {Link, withRouter} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



const __css_card = css(`
    position:L relative;
    min-height: 488px;
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_cardTitle1 = css(`
    padding: 20px 25px 0 25px;
    margin-bottom: 5px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    color: #5d4ede;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px 13px 0 13px;
        width: 85%;
    }
`);

const __css_cardTitle2 = css(`
    padding: 0 25px 0 25px;
    font-family: poppinsLight;
    font-size: 19px;
    color: #6b6b6b;
    
    @media only screen and (max-width: 984px) {
        font-size: 14px;
        padding: 0 13px 0 13px;
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

const __cssMessage = css(`
    font-family: poppinsLight;
    color: #6b6b6b;
    text-align: justify;
    
    @media only screen and (max-width: 984px) {
        font-size: 14px;
    }
`);

const __cssMessageBoxImage = css(`
    text-align: right;
    
    & img {
        display: inline-block;
        width: 100%;
        margin-top: 5px;
    }
    
    @media only screen and (max-width: 984px) {
        margin-top: 10px;
        text-align: center;
    }
`);

const __css_previousCOListContainer = css(`
    position: absolute;
    bottom: 25px;
    margin-top: 20px;
    
    @media only screen and (max-width: 984px) {
        position: inherit;
        bottom: inherit;
        text-align: center;
    }
`);

const __css_previousCOListButton = css(`
    background: #5d4ede !important;
    
    &:hover {
        opacity: 0.9;
    }
`);

const __css_previousOfficerItem = css(`
    font-family: poppinsLight;
    color: blue;
    text-decoration: none;
`);



const __css_TightWrappedImage = css(`
    float: right;
    padding: 5px 0 5px 10px;
    
    & img {
        width: 180px;
    }
    
    @media only screen and (max-width: 984px) {
        float: inherit;
        padding: inherit;
        
        & img {
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
    }
`);




const ReadMoreDialog = ({open, onClose, TitleText, DescriptionText}: any): any => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{TitleText}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {DescriptionText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};




class CoMessage extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            OfficersData: {},
            PreviousOfficersData: [],
            PreviousOfficersListOpen: false,

            ReadMoreDialogOpen: false,
            ReadMoreTitleText: '',
            ReadMoreDescriptionText: '',
        };

        this.GetOfficersData = this.GetOfficersData.bind(this);
    }

    protected GetOfficersData(): void {
        axios.get(APP.CONFIG.API_ROOT + '/officers/list?offset=1&sort=desc&sort_key=position', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}: any) => {
            if (data.success) {
                if(typeof data.data.officers[0] !== 'undefined' && data.data.officers[0] !== null) {
                    this.setState({
                        OfficersData: data.data.officers[0],
                        PreviousOfficersData: data.data.previous_officers,
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
        this.GetOfficersData();
    }

    public render(): any {
        const Message = (typeof this.state.OfficersData.messages !== 'undefined' && this.state.OfficersData.messages.length > 0) ? this.state.OfficersData.messages[0] : {
            message_title: '',
            message: '',
            image: '',
        };


        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <Card.Body className={__css_cardBody}>
                        <Card.Title className={__css_cardTitle1}>{Message.message_title}</Card.Title>
                        <Card.Title className={__css_cardTitle2}>{this.state.OfficersData.display_name}</Card.Title>
                        <Card.Text className={__css_cardText}>

                            <div>
                                <div className={__css_TightWrappedImage}>
                                    <img alt={"Officer Image"}
                                         src={APP.CONFIG.CDN_ROOT + '/' + this.state.OfficersData.photo}/>
                                </div>
                                <div className={__cssMessage}>
                                    {Message.short_message}
                                    <div style={{color: "blue", cursor: "pointer"}} onClick={() => this.setState({
                                        ReadMoreDialogOpen: true,
                                        ReadMoreTitleText: Message.message_title,
                                        ReadMoreDescriptionText: Message.message,
                                    })}>Read more</div>
                                </div>
                            </div>

                            {this.state.PreviousOfficersData.length > 0 && this.state.PreviousOfficersListOpen && (
                                <div className={__css_previousCOListContainer}>
                                    <ol>
                                        {this.state.PreviousOfficersData.map((Officer: any, index: number) => (
                                            <li>
                                                <Link key={index} to={""} className={__css_previousOfficerItem}>{Officer.name} - {Officer.leave_date}</Link>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {this.state.PreviousOfficersData.length > 0 && !this.state.PreviousOfficersListOpen && (
                                <div className={__css_previousCOListContainer}>
                                    <Button size="sm" className={__css_previousCOListButton}
                                            onClick={() => this.setState({PreviousOfficersListOpen: true})}>Previous CO
                                        List</Button>
                                </div>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>


                <ReadMoreDialog open={this.state.ReadMoreDialogOpen} onClose={() => this.setState({
                    ReadMoreDialogOpen: false,
                    ReadMoreTitleText: '',
                    ReadMoreDescriptionText: '',
                })} TitleText={this.state.ReadMoreTitleText} DescriptionText={this.state.ReadMoreDescriptionText}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(CoMessage);