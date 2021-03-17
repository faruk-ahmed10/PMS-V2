import React from 'react';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import '../../../../../Static/Styles/Home/UnitHistory/UnitHistory.css';
import axios from "axios";
import {APP} from "../../../../../App/Init/AppProvider";
import {withRouter} from 'react-router-dom';
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "react-bootstrap/Button";

// import HistoryImg from '../../../../../Static/Images/Home/UnitHistory/History.jpg';

const __css_card = css(`
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
    text-align: center;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px 13px 0 13px;
        width: 100%;
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


const __css_UnitHistoryThumbnail = css(`
    /*width: 100%;*/
    height: 300px;
    margin-top: 15px;
    border-radius: 5px;
`);

const __css_highlightedDate = css(`
    margin: 20px;
    padding: 8px;
    background: #e03052;
    color: #ffffff;
     opacity: 0.8;
     text-align: center;
     font-weight: normal;
`);

const __css_Title = css(`
    margin: 20px;
    padding: 8px;
    opacity: 0.8;
    text-align: center;
    font-weight: normal;
    font-size: 20px;
    font-weight: bold;
`);


const ReadMoreDialog = ({open, onClose, ReadMoreDescriptionText}: any): any => {
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

                <DialogContent>
                    <DialogContentText>
                        {ReadMoreDescriptionText}
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



class UnitHistory extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            UnitHistory: {},
            ReadMoreDialogOpen: false,
            ReadMoreDescriptionText:'',
        };

        this.GetUnitHistory = this.GetUnitHistory.bind(this);
    }



    protected GetUnitHistory(): void {
        axios.get(APP.CONFIG.API_ROOT + '/unit_history', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}: any) => {
            if (data.success) {
                if(typeof data.data !== 'undefined' && data.data !== null) {
                    this.setState({
                        UnitHistory: data.data,
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
        this.GetUnitHistory();
    }

    public render(): any {

        return (
            <React.Fragment>
                <Card className={__css_card}>
                    <Card.Body className={__css_cardBody}>
                        <Card.Title className={__css_cardTitle1} >
                            <div style={{color: "#5d4ede", cursor: "pointer"}} onClick={() => this.setState({
                                ReadMoreDialogOpen: true,
                                ReadMoreDescriptionText: this.state.UnitHistory.description,
                            })}>Unit History</div></Card.Title>
                        <Card.Text className={__css_cardText}>
                            <div style={{textAlign: "center"}}>

                                <img src={APP.CONFIG.CDN_ROOT + '/' + this.state.UnitHistory.image} alt={"Unit History"}

                                     className={__css_UnitHistoryThumbnail}/>
                                {/*<img src={HistoryImg} alt={"Unit History"}*/}
                            </div>
                            {typeof this.state.UnitHistory.bangla_date !== 'undefined' && this.state.UnitHistory.bangla_date !== '' && (
                                <div className={__css_highlightedDate}>
                                    {this.state.UnitHistory.bangla_date}
                                </div>
                            )}
                            {typeof this.state.UnitHistory.title !== 'undefined' && this.state.UnitHistory.title !== '' && (
                                <div className={__css_Title}>
                                    {this.state.UnitHistory.title}

                                </div>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <ReadMoreDialog open={this.state.ReadMoreDialogOpen} onClose={() => this.setState({
                    ReadMoreDialogOpen: false,
                    ReadMoreDescriptionText: '',
                })}  ReadMoreDescriptionText={this.state.ReadMoreDescriptionText}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(UnitHistory);