import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import mapArea from "../../../Static/Images/ProjectDetails/project-Information.png";
import {APP} from "../../../App/Init/AppProvider";
import FontAwesome from "react-fontawesome";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ContractorList from "../Contractors/ContractorList";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link, withRouter} from 'react-router-dom';

const __css_GlobalContainer = css(`
    ul {
        margin: 0;
        padding: 0;
    }
`);

const __css_projectInfo = css(`
    padding: 10px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    background: #5d4ede;
    color: #ffffff;
    width: 40%;
    text-align: center;
    border-top-right-radius: 50px;
    margin-top: 15px;
    @media only screen and (max-width: 984px) {
        width: 80%;
        font-size: 17px;
    }
`);

const __css_projectInfoArea = css(`
    margin-top: 15px;
`);

const __css_projectHistoryButtons = css(`
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    padding: 45px;
    margin-top:15px;
    text-align: center;
    ul {
        list-style: none;
    }
    ul li{
        background: #f5f6f8;
        margin-top: 15px;
        border-radius: 5px;
        cursor: pointer;
        color: #5d4edd;
    }
    li:hover {
        background: #5d4edd;
        transition: 0.5s;
        a{
            color: white;
        }
    }
    a:hover,
    a:focus {
        text-decoration: none;
    }
    ul li a{
        display: inline-block;
        color: #5d4edd;
        font-family: poppinsSemiBold;
        padding: 10px 35px;
    }

    @media only screen and (max-width: 984px) {
        padding: 21px;
        ul li a{
            padding: 10px 0px;
        }
    }
    @media only screen and (min-width: 984px) {
        padding: 45px;
        ul li a{
            padding: 10px 25px;
        }
    }
`);


const __css_tableBorder = css(`
    border-collapse: collapse;
    background: #fff;
    width:100%;
    th {
        background: #fffaee;
    }
    th,td {
        border-bottom: 1px solid #f5f6f8;
        border-right: 1px solid #f5f6f8;
        padding: 8px;
        padding-left: 15px;
    }
    th, td:last-child{
        border-right: none;
    }
    td:nth-first-child(1)
    {
        border-bottom: none;
    }
    td:first-child{
        width: 50%;
        // padding-left: 15px;
    }
    td:last-child{
        width: 180px;
        padding: 0px 60px 0px 20px;
    } 
`);

const __css_projectName = css(`
    background : #f5f6f8;
    text-align: center;
    margin-top: 15px;
    p span{
        font-size: 22px;
        font-family: "Myriad Pro";
        color: rgb(92, 77, 220);
        line-height: 1.2;
        text-align: center;
    }
    p{
    padding: 9px 0px;
    font-family: '';
    font-weight: 700;
    font-size: 22px;
    }
`);


const __css_projectAreaMap = css(`
    background: #fff;
    padding: 25px;
    margin-top: 15px;    
    h3{
        font-size: 22px;
        color: rgb(93, 78, 221);
        font-weight: bold;
        line-height: 1.2;
    }
    img{
        width: 100%;
        height: auto;
    }
`);

const __css_table_po_pd = css(`
    border: 1px solid #a6a6a6;
    border-collapse: collapse;
    width: 100%;
    
    & td, th {
        border: 1px solid #a6a6a6;
    }
    
    & th {
        width: 200px;
    }
`);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ContractorListDialog = ({open, data, onClose}: { open: boolean, data: Array<any>, onClose(): void }) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dev Partners/Contractors
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                <ContractorList ReceiverMode={true} ReceiverData={data}/>
            </div>
        </Dialog>
    );
};

const ProjectHistoryDialog = ({open, data, onClose}: { open: boolean, data: string, onClose(): void }) => {
    const classes = useStyles();
    return (
        <Dialog fullWidth={true} open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Project History
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                {data}
            </div>
        </Dialog>
    );
};


const ProjectPODialog = ({open, data, onClose}: { open: boolean, data: any, onClose(): void }) => {
    const classes = useStyles();
    return (
        <Dialog fullWidth={true} open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        PO
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                <table className={__css_table_po_pd}>
                    <tr>
                        <th>Name</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.name}</td>
                        <td rowSpan={3} style={{textAlign: "center"}}>
                            {typeof data.po !== 'undefined' && data.po !== null ?
                                <img src={APP.CONFIG.CDN_ROOT + '/' + data.po.photo} style={{width: "100px"}}/> : ''}
                        </td>
                    </tr>
                    <tr>
                        <th>BA No</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.ba_no}</td>
                    </tr>
                    <tr>
                        <th>Rank</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.rank !== null && data.po.rank.name}</td>
                    </tr>
                    <tr>
                        <th>Appointment</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.appointment}</td>
                    </tr>
                    <tr>
                        <th>Join Date</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.join_date}</td>
                    </tr>
                    <tr>
                        <th>Leave Date</th>
                        <td>{typeof data.po !== 'undefined' && data.po !== null && data.po.leave_date}</td>
                    </tr>
                </table>
            </div>
        </Dialog>
    );
};
const ProjectPDDialog = ({open, data, onClose}: { open: boolean, data: any, onClose(): void }) => {
    const classes = useStyles();
    return (
        <Dialog fullWidth={true} open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        PD
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{padding: 10}}>
                <table className={__css_table_po_pd}>
                    <tr>
                        <th>Name</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.name}</td>
                        <td rowSpan={3} style={{textAlign: "center"}}>
                            {typeof data.pd !== 'undefined' && data.pd !== null ?
                                <img src={APP.CONFIG.CDN_ROOT + '/' + data.pd.photo} style={{width: "100px"}}/> : ''}
                        </td>
                    </tr>
                    <tr>
                        <th>BA No</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.ba_no}</td>
                    </tr>
                    <tr>
                        <th>Rank</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.rank !== null && data.pd.rank.name}</td>
                    </tr>
                    <tr>
                        <th>Appointment</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.appointment}</td>
                    </tr>
                    <tr>
                        <th>Join Date</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.join_date}</td>
                    </tr>
                    <tr>
                        <th>Leave Date</th>
                        <td>{typeof data.pd !== 'undefined' && data.pd !== null && data.pd.leave_date}</td>
                    </tr>

                </table>
            </div>
        </Dialog>
    );
};

class ProjectDetails extends React.Component<any> {
    public state: any;
    private readonly project_id: number;

    constructor(props: any) {
        super(props);

        this.project_id = typeof props.match.params.id === 'undefined' ? 0 : Number(props.match.params.id);

        this.state = {
            ActiveProject: this.props.ActiveProject,
            SessionsRange: [],
            ProjectDetails: {},

            shouldGetProjectDetails: true,
            ProjectHistoryDialogOpen: false,
            ProjectHistoryDialogData: '',
            ContractorListDialogOpen: false,
            ContractorListData: [],

            ProjectPODialogOpen: false,
            ProjectPDDialogOpen: false,
        };

        this.getProjectDetails = this.getProjectDetails.bind(this);
    }


    protected getProjectDetails(): any {

        if (!this.state.shouldGetProjectDetails) {
            return false;
        }

        new APP.SERVICES.PROJECT().GetProjectDetails(this.project_id).then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined' && responseData !== null) {
                this.setState({
                    ProjectDetails: responseData,
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
        this.setState({shouldGetProjectDetails: false});

    }

    public componentDidMount(): void {
        this.getProjectDetails();
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.ActiveProject !== this.props.ActiveProject) {
            this.setState({
                ActiveProject: this.props.ActiveProject,
                shouldGetProjectDetails: true,
            }, () => {
                this.getProjectDetails();
            });
        }
    }

    render(): any {

        const {ProjectDetails} = this.state
        return (
            <React.Fragment>
                <div className={__css_GlobalContainer}>
                    <div className={__css_projectName}>
                        <p><span>Project Name:</span> {this.props.ActiveProject.name}</p>
                    </div>
                    {!this.props.printMode && (
                        <div className={__css_projectInfo}>Project Information</div>
                    )}
                    <Row>
                        <Col md={!this.props.printMode ? 9 : 12}>
                            <div className={__css_projectInfoArea}>

                                <table className={__css_tableBorder}>
                                    <thead>
                                    <tr>
                                        <td>Sponsoring Ministry/Division:</td>
                                        <td>{ProjectDetails.sponsor_ministry}</td>
                                    </tr>
                                    <tr>
                                        <td>Executing Agency:</td>
                                        <td>{ProjectDetails.executing_agency}</td>
                                    </tr>
                                    <tr>
                                        <td>Location of the Project:</td>
                                        <td>{ProjectDetails.location}</td>
                                    </tr>
                                    <tr>
                                        <td>Type of Project:</td>
                                        <td>{ProjectDetails.type}</td>
                                    </tr>
                                    <tr>
                                        <td>Project Length:</td>
                                        <td>{ProjectDetails.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Source of Fund:</td>
                                        <td>{ProjectDetails.source_of_found}</td>
                                    </tr>
                                    {/* <tr>
                                    <td>Duration (DPP):</td>
                                    <td>{ProjectDetails.duration}</td>
                                </tr> */}
                                    <tr>
                                        <td>Estimated Cost:</td>
                                        <td>{ProjectDetails.estimated_cost}</td>
                                    </tr>
                                    <tr>
                                        <td>RDPP:</td>
                                        <td>{ProjectDetails.rdpp}</td>
                                    </tr>
                                    <tr>
                                        <td>2nd RDPP:</td>
                                        <td>{ProjectDetails.rdpp_2}</td>
                                    </tr>
                                    <tr>
                                        <td>MOU:</td>
                                        <td>{ProjectDetails.mou}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Commencement:</td>
                                        <td>{ProjectDetails.start_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Completion:</td>
                                        <td>{ProjectDetails.end_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Main Components:</td>
                                        <td>
                                            <pre style={{
                                                border: 0,
                                                fontFamily: "arial",
                                                fontSize: "1rem"
                                            }}>{ProjectDetails.main_components}</pre>
                                        </td>
                                    </tr>

                                    {/* <tr>
                                    <td>Received Tk:</td>
                                    <td>{ProjectDetails.received_amount}</td>
                                </tr> */}
                                    {/* <tr>
                                    <td>Financial Progress:</td>
                                    <td>{ProjectDetails.financial_progress}%</td>
                                </tr>
                                <tr>
                                    <td>Physical Progress:</td>
                                    <td>{ProjectDetails.physical_progress}%</td>
                                </tr> */}
                                    <tr>
                                        <td>Unit Files:</td>
                                        <td>
                                            {
                                                ProjectDetails.attachment ? (
                                                    <a href={APP.CONFIG.CDN_ROOT + '/' + ProjectDetails.attachment}
                                                       target={"__blank"}>
                                                        <FontAwesome name={"file"}
                                                                     style={{color: "blue", cursor: "pointer"}}/>
                                                    </a>) : ''
                                            }
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </Col>
                        {!this.props.printMode && (
                            <Col md={3}>
                                <div className={__css_projectHistoryButtons}>
                                    <ul>
                                        <li onClick={() => this.setState({ProjectPDDialogOpen: true})}><a>PD</a></li>
                                        <li onClick={() => this.setState({ProjectPODialogOpen: true})}><a>PO</a></li>
                                        <li onClick={() => this.setState({
                                            ProjectHistoryDialogOpen: true,
                                            ProjectHistoryDialogData: ProjectDetails.description,
                                        })}><a>Project History</a></li>
                                        <li>
                                            <a href="#" onClick={() => {
                                                if (typeof ProjectDetails.contractors !== 'undefined' && ProjectDetails.contractors !== null) {
                                                    this.setState({
                                                        ContractorListDialogOpen: true,
                                                        ContractorListData: ProjectDetails.contractors,
                                                    });
                                                }
                                            }}>Contractor List</a></li>
                                    </ul>
                                </div>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div id="chart_div"/>
                        </Col>
                        <Col md={6}/>
                    </Row>
                    {!this.props.printMode && (
                        <Row>
                            <Col md={7}>
                                <div className={__css_projectAreaMap}>
                                    <h3>Project area map</h3>
                                    <img src={APP.CONFIG.CDN_ROOT + '/' + ProjectDetails.project_area_map} alt=""/>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>

                {!this.props.printMode && (
                    <React.Fragment>
                        <Link to={APP.ROUTES.PRIVATE.PROJECT_DETAILS_PRINTABLE_REPORT + '/' + 1} target={"__blank"}>
                            <button>Print</button>
                        </Link>


                        <ProjectHistoryDialog open={this.state.ProjectHistoryDialogOpen} onClose={() => this.setState({
                            ProjectHistoryDialogOpen: false,
                            ProjectHistoryDialogData: '',
                        })} data={this.state.ProjectHistoryDialogData}/>

                        <ProjectPDDialog open={this.state.ProjectPDDialogOpen} onClose={() => this.setState({
                            ProjectPDDialogOpen: false,
                        })} data={this.state.ProjectDetails}/>

                        <ProjectPODialog open={this.state.ProjectPODialogOpen} onClose={() => this.setState({
                            ProjectPODialogOpen: false,
                        })} data={this.state.ProjectDetails}/>

                        <ContractorListDialog open={this.state.ContractorListDialogOpen} onClose={() => this.setState({
                            ContractorListDialogOpen: false,
                            ContractorListData: []
                        })} data={this.state.ContractorListData}/>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default APP.GLOBAL.DATA.WITH_STORE((state: any) => {
    return {
        ActiveProject: state.SWITCH_PROJECT,
        SelectedSession: state.SESSION_FILTER,
    }
})(withRouter(ProjectDetails));
