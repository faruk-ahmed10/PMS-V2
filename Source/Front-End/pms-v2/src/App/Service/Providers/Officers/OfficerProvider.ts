import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";
import {JsonToFormData} from "../../../Functions/JsonToFormData";

interface IOfficerFetcherParams {
    Rank: string,
    RowsPerPage: number,
    PageNumber: number,
    Status: 'All' | 'Present' | 'Previous',
}

interface IOfficerData {
    officer_id: number | string,
    name: string,
    display_name:string,
    rank:string,
    email:string,
    phone:string,
    unit:string,
    brif:string,
    join_date:string,
    leave_date:string,
    message:string,
    position:string,
    ba_no:number,
    appointment:string,
    photo: any,
    status: string,

    [key: string]: string | number,
}

export class OfficerProvider {
    public async GetOfficers(OfficersFetcherParams: Partial<IOfficerFetcherParams>) {
        const {Rank, RowsPerPage, PageNumber,Status} = OfficersFetcherParams;
        return await axios.get(Config.API_ROOT + `/officers?Rank=${Rank}&RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetOfficersNoLimit() {
        return await axios.get(Config.API_ROOT + `/officers_no_limit`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetOfficer(OfficerId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/officer/${OfficerId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveOfficer(OfficerData: IOfficerData) {
        /*const formData: any = new FormData();

        for (let key in OfficerData) {
            formData.append(key, OfficerData[key]);
        }*/

        const formData = JsonToFormData(OfficerData);

        return await axios.post(Config.API_ROOT + '/save_officer', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteOfficer(OfficerId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_officer?id=${OfficerId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}