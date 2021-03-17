import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IEquCateFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IEquCateData {
    equcat_id: number | string,
    name: string,

    [key: string]: string | number,
}

export class EquipmentCategoryProvider {
    public async GetEquCates(IEquCateFetcherParams: Partial<IEquCateFetcherParams>) {
        const {RowsPerPage, PageNumber} = IEquCateFetcherParams;
        return await axios.get(Config.API_ROOT + `/equipmentCategorys?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetEquCate(CatId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/equipmentCategory/${CatId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveEquCate(CatData: IEquCateData) {
        const formData: any = new FormData();

        for (let key in CatData) {
            formData.append(key, CatData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_category', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteCate(CatId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_category?id=${CatId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}