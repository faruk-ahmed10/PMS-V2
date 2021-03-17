import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IDstnFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IDstnData {
    dstn_id: number | string,
    project_id: number | string,
    image: any,
    [key: string]: string | number,
}

export class DstnProvider {
    public async GetDstns(IDstnFetcherParams: Partial<IDstnFetcherParams>) {
        const {RowsPerPage, PageNumber} = IDstnFetcherParams;
        return await axios.get(Config.API_ROOT + `/dstns?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetDstn(DstnId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/dstn/${DstnId}`,
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

    public async SaveDstn(DstnData: { image: string; Project_id: number; Dstn_id: number, [key: string]: any }) {
        const formData: any = new FormData();

        for (let key in DstnData) {
            formData.append(key, DstnData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_dstn', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteDstn(DstnId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_dstn?id=${DstnId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}