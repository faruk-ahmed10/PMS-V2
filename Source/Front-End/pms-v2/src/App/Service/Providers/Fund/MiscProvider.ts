import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IMiscsFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
    Status: 'All' | 'Ongoing' | 'Upcoming' | 'Completed',
}

interface IMiscData {
    fund_id: number | string,
    economic_code: string,
    economic_sub_code: string,
    project_id: number | string,
    selected_contractors: any,
    parent_item_id: number | string,
    unit_id: number | string,
    item_head_id: number | string,
    section_id: number | string,
    supplier_id: number | string,
    description: string,
    qty: number,
    start_date: string | any,
    end_date: string | any,
    unit_rate: string | number,
    total_price: string | number,
    attachment: any,
    status: string,
    remarks: string,

    [key: string]: string | number,
}

export class MiscProvider {
    public async GetMiscs(MiscsFetcherParams: Partial<IMiscsFetcherParams>) {
        const {RowsPerPage, PageNumber, Status} = MiscsFetcherParams;
        return await axios.get(Config.API_ROOT + `/misc?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetMisc(MiscId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/misc/${MiscId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProjects() {
        return await axios.get(Config.API_ROOT + `/getProjects`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetSections() {
        return await axios.get(Config.API_ROOT + `/getSections`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetItemHeads() {
        return await axios.get(Config.API_ROOT + `/getItemHeads`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetUnits() {
        return await axios.get(Config.API_ROOT + `/getUnits`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetContractors() {
        return await axios.get(Config.API_ROOT + `/getContractors`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetSuppliers() {
        return await axios.get(Config.API_ROOT + `/getSuppliers`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProjectMiscParentItems() {
        return await axios.get(Config.API_ROOT + `/getProjectMiscParentItems`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveMisc(MiscData: IMiscData) {
        const formData: any = new FormData();

        for (let key in MiscData) {
            formData.append(key, MiscData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_misc', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteMisc(MiscId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_misc?id=${MiscId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}