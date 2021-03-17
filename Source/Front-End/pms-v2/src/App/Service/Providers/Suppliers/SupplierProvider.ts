import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface ISuppliersFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface ISupplierData {
    supplier_id: number | string,
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

export class SupplierProvider {
    public async GetSuppliers(SuppliersFetcherParams: Partial<ISuppliersFetcherParams>) {
        const {RowsPerPage, PageNumber} = SuppliersFetcherParams;
        return await axios.get(Config.API_ROOT + `/suppliers?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetSupplier(SupplierId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/supplier/${SupplierId}`,
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

    public async SaveSupplier(SupplierData: ISupplierData) {
        const formData: any = new FormData();

        for (let key in SupplierData) {
            formData.append(key, SupplierData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_supplier', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteSupplier(SupplierId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_supplier?id=${SupplierId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}