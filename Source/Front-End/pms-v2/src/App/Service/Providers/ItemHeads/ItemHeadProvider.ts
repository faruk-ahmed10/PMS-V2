import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IItemHeadFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IItemHeadData {
    item_head_id: number | string,
    name: string,

    [key: string]: string | number,
}

export class ItemHeadProvider {
    public async GetItemHeads(IItemHeadFetcherParams: Partial<IItemHeadFetcherParams>) {
        const {RowsPerPage, PageNumber} = IItemHeadFetcherParams;
        return await axios.get(Config.API_ROOT + `/item_heads?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetItemHead(ItemHeadId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/item_head/${ItemHeadId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveItemHead(ItemHeadData: IItemHeadData) {
        const formData: any = new FormData();

        for (let key in ItemHeadData) {
            formData.append(key, ItemHeadData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_item_head', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteItemHead(ItemHeadId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_item_head?id=${ItemHeadId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}