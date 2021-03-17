import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IUnitFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IUnitData {
    unit_id: number | string,
    name: string,

    [key: string]: string | number,
}

export class UnitProvider {
    public async GetUnits(IUnitFetcherParams: Partial<IUnitFetcherParams>) {
        const {RowsPerPage, PageNumber} = IUnitFetcherParams;
        return await axios.get(Config.API_ROOT + `/units?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetUnit(UnitId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/unit/${UnitId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveUnit(UnitData: IUnitData) {
        const formData: any = new FormData();

        for (let key in UnitData) {
            formData.append(key, UnitData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_unit', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteUnit(UnitId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_unit?id=${UnitId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}