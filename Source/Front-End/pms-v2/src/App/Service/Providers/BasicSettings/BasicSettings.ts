import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IBasicSettingsData {
    site_title: string,
    site_sub_title: string,
    header_banner: string | any,
    logo1: string | any,
    logo2: string | any,
    copyright: string,

    [key: string]: any,
}

export class BasicSettingsProvider {

    public async GetBasicSettings() {
        return await axios.get(Config.API_ROOT + `/getBasicSettings`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }


    public async UpdateBasicSettings(BasicSettingsData: IBasicSettingsData) {
        const formData: any = new FormData();

        for (let key in BasicSettingsData) {
            formData.append(key, BasicSettingsData[key]);
        }

        return await axios.post(Config.API_ROOT + '/update_basic_settings', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }
}