import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IUnitHistoryData {
    bangla_date: string,
    title: string,
    description: string | any,
    image: string | any,

    [key: string]: any,
}

export class UnitHistoryProvider {

    public async GetUnitHistory() {
        return await axios.get(Config.API_ROOT + `/getUnitHistorys`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }


    public async UpdateUnitHistory(IUnitHistoryData: IUnitHistoryData) {
        const formData: any = new FormData();

        for (let key in IUnitHistoryData) {
            formData.append(key, IUnitHistoryData[key]);
        }

        return await axios.post(Config.API_ROOT + '/update_unit_history', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }
}