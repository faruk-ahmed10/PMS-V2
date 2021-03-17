import axios from 'axios';
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";
import {JsonToFormData} from "../../../Functions/JsonToFormData";


interface IBalanceSheetsFetcherParams {
    RowsPerPage: number,
    PageNumber: number,
    type: 'PF' | 'CF' | "Misc",
    Installment: number,
    ProjectId: number | string,
    Session: string,
    PrintMode: boolean,
}

interface IBalanceSheetData {
    Session: string,
    FundList: any,
    FundType: any,


    [key: string]: string | number,
}

export class BalanceSheetProvider {
    public async GetBalanceSheets(FundsFetcherParams: Partial<IBalanceSheetsFetcherParams>): Promise<any> {
        const {type, Installment, ProjectId, Session, RowsPerPage, PageNumber, PrintMode} = FundsFetcherParams;
        return await axios.get(Config.API_ROOT + `/get_balance_sheet_list?Installment=${Installment}&FundType=${type}&ProjectId=${ProjectId}&Session=${Session}&RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}&PrintMode=${PrintMode === true ? 1 : 0}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetTasks(fund_type: any, project_id: string | number | null): Promise<any> {
        return await axios.get(Config.API_ROOT + `/getTasksList?fund_type=${fund_type}&project_id=${project_id}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetFundBalanceSheet(fundType: any, projectId: string | number, starDate: string, endDate: string): Promise<any> {
        return await axios.get(Config.API_ROOT + `/get_fund_balance_sheet?fund_type=${fundType}&project_id=${projectId}&start_date=${starDate}&end_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetPFFundBalanceSheet(projectId: string | number, starDate: string, endDate: string): Promise<any> {
        return await axios.get(Config.API_ROOT + `/get_pf_fund_balance_sheet?project_id=${projectId}&start_date=${starDate}&end_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetCFFundBalanceSheet(projectId: string | number, starDate: string, endDate: string): Promise<any> {
        return await axios.get(Config.API_ROOT + `/get_cf_fund_balance_sheet?project_id=${projectId}&start_date=${starDate}&end_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetMISCFundBalanceSheet(projectId: string | number, starDate: string, endDate: string): Promise<any> {
        return await axios.get(Config.API_ROOT + `/get_misc_fund_balance_sheet?project_id=${projectId}&start_date=${starDate}&end_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetCFFunds() {
        return await axios.get(Config.API_ROOT + `/getCFFundsForBalanceSheet`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async SaveBalanceSheet(FundData: IBalanceSheetData) {

        const formData = JsonToFormData(FundData);

        return await axios.post(Config.API_ROOT + '/save_balance_sheet', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async SaveBalanceSheetRow(Data: {
        id: number | string,
        session: string,
        sub_head_name: string,
        dpp_amount: any,
        received_amount: any,
        expenditure_up_to_date: any,
        remarks: string,
    }) {

        const formData = JsonToFormData(Data);

        return await axios.post(Config.API_ROOT + '/save_balance_sheet_row', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
    }

    public async DeleteFund(FundId: number | string): Promise<any> {
        return await axios.delete(Config.API_ROOT + `/delete_fund?id=${FundId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}
