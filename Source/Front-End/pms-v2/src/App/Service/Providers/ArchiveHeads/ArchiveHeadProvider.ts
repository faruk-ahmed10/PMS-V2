import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IArchiveHeadFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IArchiveHeadData {
    head_id: number | string,
    name: string,

    [key: string]: string | number,
}

export class ArchiveHeadProvider {
    public async GetArchiveHeads(IArchiveHeadFetcherParams: Partial<IArchiveHeadFetcherParams>) {
        const {RowsPerPage, PageNumber} = IArchiveHeadFetcherParams;
        return await axios.get(Config.API_ROOT + `/archive-heads?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }
    public async GetArchiveHeadsNoLimit() {
        return await axios.get(Config.API_ROOT + `/getArchHeads`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetArchiveHead(ArchiveHeadId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/archive-head/${ArchiveHeadId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveHead(ArchiveHeadData: IArchiveHeadData) {
        const formData: any = new FormData();

        for (let key in ArchiveHeadData) {
            formData.append(key, ArchiveHeadData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_head', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteArchiveHead(ArchiveHeadId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_head?id=${ArchiveHeadId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}