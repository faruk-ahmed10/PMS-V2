import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IArchiveFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IArchiveData {
    archive_id: number | string,
    Title: string,
    ProjectID: number,
    HeadID: number,
    Document:any,
    Description:number | string,

    [key: string]: string | number,
}

export class ArchiveProvider {
    public async GetArchives(IArchiveFetcherParams: Partial<IArchiveFetcherParams>) {
        const {RowsPerPage, PageNumber} = IArchiveFetcherParams;
        return await axios.get(Config.API_ROOT + `/archives?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetArchive(EquId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/archive/${EquId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProject() {
        return await axios.get(Config.API_ROOT + `/getProjects`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }


    public async GetHeads() {
        return await axios.get(Config.API_ROOT + `/getArchHeads`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveArchive(EquData: IArchiveData) {
        const formData: any = new FormData();

        for (let key in EquData) {
            formData.append(key, EquData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_archive', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteArchive(EquId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_archive?id=${EquId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}