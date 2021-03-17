import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {css} from "@emotion/css";
import {Link, withRouter} from 'react-router-dom';
import {APP} from '../../../../App/Init/AppProvider';
import Button from "react-bootstrap/Button";
import FontAwesome from "react-fontawesome";

css(`
    font-size: 12px;
    
    & th {
        border-top: 0;
    }
    & th.center {
        text-align: center;
    }
    & td {
        padding: 0 5px;
        vertical-align: middle;
    }
    
    & td:first-child {
        text-align: center;
    }
    
    & td.center {
        text-align: center;
    }
    
    & td.right {
        text-align: right;
    }
`);
const __css_galleryCard = css(`
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    outline: 0;
    font-size: 12px;
    margin-bottom: 10px;
    background: #ffffff;
    
    & img {
        width: 100%;
        border-radius: 3px;
    }
    
    & .gallery_title {
        font-size: 15px;
        padding: 10px;
        padding-top: 0;
    }
    
    & .project_name {
        font-size: 17px;
        font-weight: bold;
        padding: 10px;
    }
`);


const __css_paginator_input = css(`
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    width: 60px;
    text-align: center;
    outline: 0;
    font-size: 12px;
    padding: 4px;
    margin-right: 10px;
`);

const __css_paginator_select = css(`
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    width: 100px;
    text-align: center;
    outline: 0;
    font-size: 12px;
    padding: 5px;
    margin-right: 10px;
`);

const __css_paginator_total_pages = css(`
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
`);


class GalleryGrid extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            RowsPerPage: 10,
            CurrentPage: 1,
            TotalPages: 0,
            PrevPage: 0,
            NextPage: 0,
            FirstPage: 0,
            LastPage: 0,

            ProjectList: [],
            ArchiveHeadList: [],
            GalleryList: [],

            SelectedProjectId: 0,
            SelectedArchiveHeadID: 0,
        };

        this.handleGetGallery = this.handleGetGallery.bind(this);
    }


    protected handleGetProjects() {
        new APP.SERVICES.PROJECT().GetProjectsNoLimit().then(({data}) => {

            if (data.success) {
                if (typeof data.data !== 'undefined') {
                    const responseData = data.data
                    this.setState({ProjectList: responseData});
                }
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

    protected getArchiveHeadList(): void {
        new APP.SERVICES.ARCHIVE_HEADS().GetArchiveHeadsNoLimit().then(({data}) => {

            const responseData = data.data;
            if (typeof responseData !== 'undefined') {
                this.setState({
                    ArchiveHeadList: responseData,
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

    protected handleControlPaginator() {
        if (this.state.CurrentPage < 1 || this.state.CurrentPage > this.state.TotalPages) {
            this.setState({
                CurrentPage: 1,
            }, () => {
                this.handleGetGallery();
            });

            return;
        }

        this.handleGetGallery();
    }

    protected handleGetGallery() {
        new APP.SERVICES.GALLERYS().GetGallerys({
            RowsPerPage: this.state.RowsPerPage,
            PageNumber: this.state.CurrentPage,
            ProjectId: this.state.SelectedProjectId,
            ArchiveHeadID: this.state.SelectedArchiveHeadID,
        }).then(({data}) => {

            if (typeof data.data !== 'undefined') {
                const responseData = data.data;

                this.setState({
                    TotalPages: Number(responseData.TotalPages),
                    PrevPage: Number(responseData.PrevPage),
                    NextPage: Number(responseData.NextPage),
                    LastPage: Number(responseData.LastPage),
                    GalleryList: responseData.ListData,
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
        this.handleGetGallery();
        this.handleGetProjects();
        this.getArchiveHeadList();

        //Scroll to the top of the document
        window.scrollTo(0, 0);
        document.title = "Gallery List";
    }

    public render(): any {
        return (
            <React.Fragment>
                <div style={{marginTop: 15}}>

                    <button onClick={() => this.setState({SelectedProjectId: 0, SelectedArchiveHeadID: 0,}, () => {
                        this.handleGetGallery();
                    })} style={{marginRight: 10}}>All</button>

                    {this.state.ArchiveHeadList.map((ArchiveHead: any, index: number) => (
                        <button onClick={() => this.setState({SelectedArchiveHeadID: 0}, () => {
                            this.setState({
                                SelectedArchiveHeadID: ArchiveHead.id,
                            }, () => {
                                this.handleGetGallery();
                            });
                        })} key={index} style={{marginRight: 10}}>{ArchiveHead.name}</button>
                    ))}

                    <br />
                    <br />

                    <div>
                        <select value={this.state.SelectedProjectId} style={{width: 300, padding: 5, marginBottom: 10}} onChange={(e) => this.setState({SelectedProjectId: e.target.value}, () => {
                            this.handleGetGallery();
                        })}>
                            <option value={0}>-- Select Project</option>
                            {this.state.ProjectList.map((Project: any, index: number) => (
                                <option value={Project.id} key={index}>{Project.name}</option>
                            ))}
                        </select>
                    </div>

                    <Row>
                        {this.state.GalleryList.map((Gallery: any, index: number) => (
                            <Col md={4}>
                                <div className={__css_galleryCard}>
                                    <img
                                        src={APP.CONFIG.CDN_ROOT + '/' + Gallery.image}
                                        alt={""}/>

                                    <div className={'project_name'}>{Gallery.title}</div>
                                    <div className={'gallery_title'}>{Gallery.description}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>





                    <Row>
                        <Col md={6} style={{textAlign: "left"}}>
                            <select className={__css_paginator_select} value={this.state.RowsPerPage}
                                    onChange={e => {
                                        this.setState({RowsPerPage: e.target.value}, () => {
                                            this.handleControlPaginator();
                                        });
                                    }}>
                                <option value={5}>5 rows</option>
                                <option value={10}>10 rows</option>
                                <option value={20}>20 rows</option>
                                <option value={25}>25 rows</option>
                                <option value={50}>50 rows</option>
                                <option value={100}>100 rows</option>
                            </select>

                            <div className={__css_paginator_total_pages}>
                                <input type={"text"} className={__css_paginator_input} value={this.state.CurrentPage}
                                       onChange={e => {
                                           this.setState({CurrentPage: Number(e.target.value) >= 0 ? Number(e.target.value) : 1});
                                       }} onKeyDown={e => {
                                    if (e.keyCode === 13) {
                                        this.handleControlPaginator();
                                    }
                                }}/>
                                of <b>{this.state.TotalPages}</b>
                            </div>
                        </Col>

                        <Col md={6} style={{textAlign: "right"}}>
                            <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                    onClick={() => {
                                        this.setState({
                                            CurrentPage: 1,
                                        }, () => {
                                            this.handleControlPaginator();
                                        });
                                    }} disabled={this.state.CurrentPage === 1}>
                                <FontAwesome name={"step-backward"}/>
                            </Button>

                            <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                    onClick={() => {
                                        this.setState((state: any) => ({
                                            CurrentPage: state.PrevPage,
                                        }), () => {
                                            this.handleControlPaginator();
                                        });
                                    }} disabled={this.state.CurrentPage === 1}>
                                <FontAwesome name={"chevron-left"}/>
                            </Button>

                            <Button variant="secondary" size="sm" style={{fontSize: 11, marginLeft: 5, marginRight: 5}}
                                    onClick={() => {
                                        this.setState((state: any) => ({
                                            CurrentPage: state.NextPage,
                                        }), () => {
                                            this.handleControlPaginator();
                                        });
                                    }}
                                    disabled={this.state.CurrentPage >= this.state.TotalPages}>
                                <FontAwesome name={"chevron-right"}/>
                            </Button>

                            <Button variant="secondary" size="sm" style={{fontSize: 11, marginRight: 5}}
                                    onClick={() => {
                                        this.setState((state: any) => ({
                                            CurrentPage: state.LastPage,
                                        }), () => {
                                            this.handleControlPaginator();
                                        });
                                    }} disabled={this.state.CurrentPage >= this.state.TotalPages}>
                                <FontAwesome name={"step-forward"}/>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(GalleryGrid);