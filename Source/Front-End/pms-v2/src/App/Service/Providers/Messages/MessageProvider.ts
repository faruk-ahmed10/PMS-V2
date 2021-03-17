import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";

interface IMessageFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
}

interface IMessageData {
    message_id: number | string,
    officer_id: number | string,
    message_title: number | string,
    message: number | string,
    image: any,

    [key: string]: string | number,
}

export class MessageProvider {
    public async GetMessages(MessagesFetcherParams: Partial<IMessageFetcherParams>) {
        const {RowsPerPage, PageNumber} = MessagesFetcherParams;
        return await axios.get(Config.API_ROOT + `/messages?RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetMessage(MessageId: Required<number>) {
        return await axios.get(Config.API_ROOT + `/message/${MessageId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetOfficer() {
        return await axios.get(Config.API_ROOT + `/officers/list`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveMessage(MessageData: IMessageData) {
        const formData: any = new FormData();

        for (let key in MessageData) {
            formData.append(key, MessageData[key]);
        }

        return await axios.post(Config.API_ROOT + '/save_message', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteMessage(MessageId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_message?id=${MessageId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}