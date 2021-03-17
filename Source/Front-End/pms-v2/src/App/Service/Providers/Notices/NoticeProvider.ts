import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface INoticeFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface INoticeData {
    notice_id: number | string,
    title: string,
    description: number | string,
    publish_date: number | string,
    file: any,
    status: string,

    [key: string]: string | number,
}

export class NoticeProvider {
    public async GetNotices(NoticesFetcherParams: Partial<INoticeFetcherParams>) {
        const {RowsPerPage, PageNumber} = NoticesFetcherParams;
        return await axios.get(Config.API_ROOT + `/notices?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetNotice(NoticeId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/notice/${NoticeId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveNotice(NoticeData: INoticeData) {
        const formData: any = new FormData();

        for (let key in NoticeData) {
            formData.append(key, NoticeData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_notice', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteNotice(NoticeId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_notice?id=${NoticeId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}