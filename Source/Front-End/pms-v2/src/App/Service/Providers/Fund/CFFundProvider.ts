import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface ICFFundsFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
    Status: 'All' | 'Ongoing' | 'Upcoming' | 'Completed',
}

interface ICFFundData {
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

export class CFFundProvider {
    public async GetCFFunds(CFFundsFetcherParams: Partial<ICFFundsFetcherParams>) {
        const {RowsPerPage, PageNumber, Status} = CFFundsFetcherParams;
        return await axios.get(Config.API_ROOT + `/cf_funds?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetCFFund(CFFundId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/cf_fund/${CFFundId}`,
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

    public async GetProjectCFFundParentItems() {
        return await axios.get(Config.API_ROOT + `/getProjectCFFundParentItems`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveCFFund(CFFundData: ICFFundData) {
        const formData: any = new FormData();

        for (let key in CFFundData) {
            formData.append(key, CFFundData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_cf_fund', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteCFFund(CFFundId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_cf_fund?id=${CFFundId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}