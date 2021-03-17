import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {APP} from '../../../../App/Init/AppProvider';
import {withRouter} from 'react-router-dom';

class SwitchProject extends React.Component<any, any> {
    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {
            ProjectsData: [],
        }

        this.GetProjectsData = this.GetProjectsData.bind(this);
    }

    GetProjectsData() {
        new APP.SERVICES.PROJECT().GetProjectsNoLimit().then(({data}: any) => {
            const responseData = data.data;
            this.setState({
                ProjectsData: responseData,
            })
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

    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.open !== this.props.open) {
            this.GetProjectsData();
        }
    }

    render(): React.ReactChild {
        return (
            <Dialog fullWidth={true} onClose={this.props.onClose} open={this.props.open}>
                <DialogTitle>Switch Project</DialogTitle>
                <DialogContent>
                    <List>
                        {this.state.ProjectsData.map((Project: any, index: number) => (
                            <ListItem button key={index}
                                      selected={Number(this.props.ActiveProject.id) === Number(Project.id)}>
                                <ListItemText primary={Project.name} onClick={() => {
                                    new APP.SERVICES.SWITCH_PROJECT().setActiveProject(Project.id, Project.name);
                                    this.props.onClose();
                                }}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        );
    }
}

export default APP.GLOBAL.DATA.WITH_STORE((state: any) => {
    return {
        ActiveProject: state.SWITCH_PROJECT,
    }
})(withRouter(SwitchProject));