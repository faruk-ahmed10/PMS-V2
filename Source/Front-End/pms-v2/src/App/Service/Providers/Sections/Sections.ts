import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface ISectionFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface ISectionData {
    section_id: number | string,
    name: string,

    [key: string]: string | number,
}

export class SectionProvider {
    public async GetSections(ISectionFetcherParams: Partial<ISectionFetcherParams>) {
        const {RowsPerPage, PageNumber} = ISectionFetcherParams;
        return await axios.get(Config.API_ROOT + `/section?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetSection(SectionId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/section/${SectionId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveUnit(SectionData: ISectionData) {
        const formData: any = new FormData();

        for (let key in SectionData) {
            formData.append(key, SectionData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_section', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteSection(SectionId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_section?id=${SectionId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }


}