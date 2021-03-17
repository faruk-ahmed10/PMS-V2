import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IContractorsFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IContractorData {
    contractor_id: number | string,
    name: string,
    email: string,
    user_type_id: number | string,
    user_role_id: number | string,
    owner_name: string,
    it: string,
    owner_nid: string,
    license: any,
    phone: string | number,
    tin: string,
    address: string,
    status: string,

    [key: string]: string | number,
}

export class ContractorProvider {
    public async GetContractors(ContractorsFetcherParams: Partial<IContractorsFetcherParams>) {
        const {RowsPerPage, PageNumber} = ContractorsFetcherParams;
        return await axios.get(Config.API_ROOT + `/contractors?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetContractorsNoLimit() {
        return await axios.get(Config.API_ROOT + `/getContractorsNoLimit`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetContractor(ContractorId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/contractor/${ContractorId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetUserRoles() {
        return await axios.get(Config.API_ROOT + `/getUserRoles`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetUserTypes() {
        return await axios.get(Config.API_ROOT + `/getUserTypes`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveContractor(ContractorData: IContractorData) {
        const formData: any = new FormData();

        for (let key in ContractorData) {
            formData.append(key, ContractorData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_contractor', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteContractor(ContractorId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_contractor?id=${ContractorId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}