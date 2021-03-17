import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IProjectsFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
    Status: 'All' | 'Ongoing' | 'Upcoming' | 'Completed',
}

interface IProjectData {
    project_id: number | string,
    name: string,
    history: string,
    executing_agency: string,
    location: string,
    type: string,
    length: string,
    main_components: string,
    project_area_map: string,
    start_date: any,
    end_date: string | any,
    estimated_cost: string | number,
    duration: string,
    rdpp: string,
    rdpp_2: string,
    mou: string,
    sponsor_ministry: string,
    source_of_found: string,
    attachment: any,
    status: string,
    po_id: string | number,
    pd_id: string | number,

    [key: string]: string | number,
}

export class ProjectProvider {
    public async GetProjects(ProjectsFetcherParams: Partial<IProjectsFetcherParams>) {
        const {RowsPerPage, PageNumber, Status} = ProjectsFetcherParams;
        return await axios.get(Config.API_ROOT + `/projects?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProjectsNoLimit() {
        return await axios.get(Config.API_ROOT + `/getProjects`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProjectDetails(ProjectId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/getProjectDetails/${ProjectId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProject(ProjectId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/project/${ProjectId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveProject(ProjectData: IProjectData) {
        const formData: any = new FormData();

        for (let key in ProjectData) {
            formData.append(key, ProjectData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_project', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteProject(ProjectId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_project?id=${ProjectId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}