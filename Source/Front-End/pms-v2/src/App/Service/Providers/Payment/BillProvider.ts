import axios from "axios";
import {Config} from "../../../Config/Config";
import {AuthProvider} from "../Auth/AuthProvider";
import {JsonToFormData} from "../../../Functions/JsonToFormData";

interface IBillsFetcherParams {
    Type: 'PF' | 'CF',
    ProjectId: number | string,
    ContractorId: number | string,
    ParentTaskId: number | string,
    RowsPerPage: number,
    PageNumber: number,
}

interface IBillData {
    Type: 'PF' | 'CF',
    PFFundList: Array<any>,
    ContractorId: string | number,
    ParentTaskId: string | number,
    ProjectId: string | number,
    Attachment: string,
    Status: string,
    VatDeductionPercent: number | string,
    VatDeductionAmount: number,
    ITDeductionPercent: number | string,
    ITDeductionAmount: number,
    TotalDeductionPercent: number | string,
    TotalDeductionAmount: number,
    SecurityMoneyPercent: number | string,
    SecurityMoneyAmount: number,
    AdvanceReceivedAmount: number,
    NetPaidAmount: number,
    NetPayable: number,
    TotalAmount: number,
    IPCNumber: string,
    SubmitDate: string,
}

export class BillProvider {
    public static GenerateFundsArrayOfObjects(Funds: Array<any>) {
        const FundsArray: Array<{
            id: string | number,
            description: string | number,
            unit_id: string | number,
            unit_name: string,
            unit_rate: string | number,
            contract_qty: string | number,
            contract_amount: string | number,

            tmp_prev_completed_qty: number | string,
            prev_completed_qty: string | number,
            completed_qty: string | number,

            tmp_prev_left_over_amount: number | string,
            left_over_amount: number | string,

            progress: number | string,
            total_amount: number | string,
            Remarks: string,
        }> = [];
        for (let i = 0; i < Funds.length; i++) {
            FundsArray.push({
                id: Funds[i].id,
                description: Funds[i].description,
                unit_id: Number(Funds[i].unit.id),
                unit_name: Funds[i].unit.name,
                unit_rate: Number(Funds[i].unit_rate),
                contract_qty: Funds[i].qty,

                tmp_prev_completed_qty: Funds[i].contractors[0].pivot.completed_qty,
                prev_completed_qty: Funds[i].contractors[0].pivot.completed_qty,
                completed_qty: 0,

                contract_amount: Number(Funds[i].total_price),

                tmp_prev_left_over_amount: (Number(Funds[i].total_price) - (Number(Funds[i].unit_rate) * Number(Funds[i].contractors[0].pivot.completed_qty))),
                left_over_amount: (Number(Funds[i].total_price) - (Number(Funds[i].unit_rate) * Number(Funds[i].contractors[0].pivot.completed_qty))),

                progress: (0),
                total_amount: (0),
                Remarks: '',
            });
        }
        return FundsArray;
    }

    public async GetBills(BillsFetcherParams: Required<IBillsFetcherParams>) {
        const {Type, ProjectId, ContractorId, ParentTaskId, RowsPerPage, PageNumber} = BillsFetcherParams;
        return await axios.get(Config.API_ROOT + `/bill_list?type=${Type}&project_id=${ProjectId}&contractor_id=${ContractorId}&parent_task_id=${ParentTaskId}&RowsPerPage=${RowsPerPage}&PageNumber=${PageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetBill(BillId: number) {
        return await axios.get(Config.API_ROOT + `/bill?id=${BillId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetFunds(Type: 'PF' | 'CF', contractorId: string | number | null = 0, parentTaskId: string | number | null = 0, projectId: string | number | null = 0): Promise<any> {
        const route: string = `/getTasksNoLimit?fund_type=${Type}&project_id=${projectId}&contractor_id=${contractorId}&parent_task_id=${parentTaskId}`;
        return await axios.get(Config.API_ROOT + route,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetParentTasks(Type: 'PF' | 'CF' | 'MISC' | 'PF_EXPENSE' | 'CF_EXPENSE' | 'MISC_EXPENSE', contractorId: string | number, projectId: string | number | null = 0): Promise<any> {
        const route = `/getParentTasks?fund_type=${Type}&project_id=${projectId}&contractor_id=${contractorId}`;
        return await axios.get(Config.API_ROOT + route,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetPaymentHistory(project_id: number | string, contractor_id: number | string) {
        return await axios.get(Config.API_ROOT + `/getPaymentHistory?project_id=${project_id}&contractor_id=${contractor_id}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }

    public async GetPaymentHistoryTask(TaskId: number | string) {
        return await axios.get(Config.API_ROOT + `/getPaymentHistoryTask?task_id=${TaskId}`,
            {
                headers: {
                    Authorization: `Bearer ${new AuthProvider().getToken()}`,
                }
            });
    }


    public async SaveBill(BillData: IBillData): Promise<any> {
        const formData = JsonToFormData(BillData);

        return await axios.post(Config.API_ROOT + '/save_bill', formData, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }

    public async DeleteBill(BillId: number | string) {
        return await axios.delete(Config.API_ROOT + `/delete_bill?id=${BillId}`, {
            headers: {
                Authorization: `Bearer ${new AuthProvider().getToken()}`,
            }
        });
    }
}