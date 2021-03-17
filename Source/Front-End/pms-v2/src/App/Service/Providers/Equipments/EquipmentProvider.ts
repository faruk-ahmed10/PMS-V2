import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IEquipmentFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IEquipmentData {
    equipment_id: number | string,
    Name: string,
    ProjectID: number,
    QTY: number,
    UnitID: number,
    BANo: number | string,
    CategoryID: number,
    PresentCondition: string,
    Location:string,
    PurchaseDate:any,
    ReceiveDate:any,
    Document:any,
    Description:number | string,

    [key: string]: string | number,
}

export class EquipmentProvider {
    public async GetEquipments(IEquipmentFetcherParams: Partial<IEquipmentFetcherParams>) {
        const {RowsPerPage, PageNumber} = IEquipmentFetcherParams;
        return await axios.get(Config.API_ROOT + `/equipments?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetEquipment(EquId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/equipment/${EquId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetProject() {
        return await axios.get(Config.API_ROOT + `/getProjects`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetUnit() {
        return await axios.get(Config.API_ROOT + `/getUnits`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetCategory() {
        return await axios.get(Config.API_ROOT + `/getEquipCategory`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveEquipment(EquData: IEquipmentData) {
        const formData: any = new FormData();

        for (let key in EquData) {
            formData.append(key, EquData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_equipment', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteEquipment(EquId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_equipment?id=${EquId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}