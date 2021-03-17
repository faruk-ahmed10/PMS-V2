import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IFundsFetcherParams {
    FundType: 'PF' | 'CF' | 'MISC' | 'PF_EXPENSE' | 'CF_EXPENSE' | 'MISC_EXPENSE',
    ProjectId: number | string | null | undefined,
    ContractorId: number | string | null | undefined,
    RowsPerPage: number,
    PageNumber: number,
    Status: 'All' | 'Ongoing' | 'Upcoming' | 'Completed',
}

interface IFundData {
    fund_id: number | string,
    fund_type: string,
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

export class FundProvider {
    public async GetFunds(FundsFetcherParams: Partial<IFundsFetcherParams>) {
        const {RowsPerPage, PageNumber, Status} = FundsFetcherParams;
        return await axios.get(Config.API_ROOT + `/funds?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetTasks(FundsFetcherParams: Partial<IFundsFetcherParams>) {
        const {FundType, ProjectId, ContractorId, RowsPerPage, PageNumber, Status} = FundsFetcherParams;
        return await axios.get(Config.API_ROOT + `/funds?fund_type=${FundType}&project_id=${ProjectId}&contractor_id=${typeof ContractorId === 'undefined' ? '' : ContractorId}&&RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&Status=${Status}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetFund(FundId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/fund/${FundId}`,
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

    public async GetContractors(projectId: number | string | null = 0) {
        return await axios.get(Config.API_ROOT + `/getContractors?project_id=${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }
    public async GetContractorList(projectId: number | string | null = 0) {
        return await axios.get(Config.API_ROOT + `/getContractorList?project_id=${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetParentTasks() {
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

    public async GetProjectFundParentItems() {
        return await axios.get(Config.API_ROOT + `/getProjectFundParentItems`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveFund(FundData: IFundData) {
        const formData: any = new FormData();

        for (let key in FundData) {
            formData.append(key, FundData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_task', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteFund(FundId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_fund?id=${FundId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}
