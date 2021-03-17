<?php

namespace App\Http\Controllers\Payment;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\BillDetail;
use App\Models\Project;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $Type = (string)$request->input('type');
        $ProjectId = (int)$request->input('project_id');
        $ContractorId = (int)$request->input('contractor_id');
        $ParentTaskId = (int)$request->input('parent_task_id');
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');


        try {

            $bills = Bill::where('id', '!=', 0);

            if ($Type !== '') {
                $bills->where('bill_type', '=', $Type);
            }

            if ($ProjectId !== 0) {
                $bills->where('project_id', '=', $ProjectId);
            }

            if ($ContractorId !== 0) {
                $bills->where('contractor_id', '=', $ContractorId);
            }

            if ($ParentTaskId !== 0) {
                $bills->where('parent_task_id', '=', $ParentTaskId);
            }

            $TotalRows = $bills->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $bills = $bills->with('contractor')->with('project')->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Bill list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $bills,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'SupplierController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getBill(Request $request)
    {
        try {
            $bill = Bill::where('id', '=', $request->id);
            if ($bill->exists()) {
                $bill = $bill->with('bill_details')->with('contractor')->first();

                return CommonHelper::Response(true, "Bill data fetched successfully!", null, $bill);
            }

            return CommonHelper::Response(false, "Bill Not Found!", "NOT_FOUND", null);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'PaymentController', 'getBill', null);
        }
    }

    public function getPaymentHistory(Request $request)
    {
        try {
            $project_id = $request->project_id;
            $contractor_id = $request->contractor_id;

            $project = Project::where('id', $project_id)->first();

            // $payments = DB::select("SELECT *
            // FROM (
            //         select BD.`task_id`,
            //                 TSK.`description`                             as `task_name`,
            //                 sum(contract_amount)                          as contract_amount,
            //                 (sum(BD.total_amount))                        as received_amount,
            //                 (sum(contract_amount) - sum(BD.total_amount)) as due_amount
            //         from `bills` B
            //                 inner join `bill_details` BD on B.`id` = BD.`bill_id`
            //                 inner join `tasks` TSK on BD.`task_id` = TSK.`id`
            //         where B.`project_id` = $project_id
            //         and `contractor_id` = $contractor_id
            //         and B.`deleted_at` is null
            //         group by `task_id`
            //     ) AS DATA
            // WHERE DATA.received_amount <> 0");
            $payments = Bill::with('project', 'parentTask', 'contractor')->select('project_id', 'parent_task_id', 'contractor_id', DB::raw('sum(total_amount) as received_amount'))
                ->when($contractor_id, function ($q) use ($contractor_id) {
                    return $q->where('contractor_id', $contractor_id);
                })
                ->where('project_id', $project_id)->groupBy('parent_task_id')->get();
            return CommonHelper::Response(true, 'Payment History fetched successfully!', null, ['payment_history' => $payments, 'project' => $project]);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'PaymentController', 'getPaymentHistory', null);
        }
    }

    public function getPaymentHistoryTask(Request $request)
    {
        try {
            $project_id = $request->project_id;
            $contractor_id = $request->contractor_id;
            $task_id = $request->task_id;

            $payments = Bill::where('bills.project_id', $project_id)
                ->select('submit_date', 'bill_details.unit_rate as unit_rate', 'contract_qty', 'completed_qty', 'left_over_amount', 'bill_details.progress as progress', 'contract_amount', 'bill_details.total_amount as received_amount')
                ->where('task_id', $task_id)
                ->where('contractor_id', $contractor_id)
                ->join('bill_details', 'bills.id', '=', 'bill_details.bill_id')
                ->join('tasks', 'bill_details.task_id', '=', 'tasks.id')
                ->get();
            return CommonHelper::Response(true, 'Payment History Task fetched successfully!', null, $payments);
        } catch (Exception $e) {

            return CommonHelper::throwError($e, 'PaymentController', 'getPaymentHistoryTask', null);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if (!$request->fund_id) {
                $Bill = new Bill();
                $msg = "Saved successfully!";
            } else {
                $Bill = Bill::find($request->fund_id);
                $msg = "Updated successfully!";
            }

            $Bill->project_id = $request->ProjectId;
            $Bill->invoice_no = CommonHelper::GenerateNewCode('INV', 9, (int)Bill::max('id'));
            $Bill->contractor_id = $request->ContractorId;
            $Bill->parent_task_id = $request->ParentTaskId;
            $Bill->bill_type = $request->Type;
            $Bill->total_amount = $request->TotalAmount;
            $Bill->vat_deduction_percent = $request->VatDeductionPercent;
            $Bill->vat_deduction = $request->VatDeductionAmount;
            $Bill->it_deduction_percent = $request->ITDeductionPercent;
            $Bill->it_deduction = $request->ITDeductionAmount;
            $Bill->total_deduction_percent = $request->TotalDeductionPercent;
            $Bill->total_deduction = $request->TotalDeductionAmount;
            $Bill->net_payable = $request->NetPayable;
            $Bill->security_money_percent = $request->SecurityMoneyPercent;
            $Bill->security_money = $request->SecurityMoneyAmount;
            $Bill->advance_received = $request->AdvanceReceivedAmount;
            $Bill->net_paid = $request->NetPaidAmount;
            $Bill->status = $request->Status ? $request->Status : 'Active';
            $Bill->ipc_number = $request->IPCNumber;
            $Bill->submit_date = $request->SubmitDate;
            $Bill->created_by = $request->SubmitDate;
            if ($request->hasFile('Attachment')) {
                $attachment = $request->file('Attachment');
                $extension = (string)$attachment->extension();
                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return CommonHelper::Response(false, 'Please select a valid file!', 'UNSUPPORTED_FORMAT');
                }

                $name = time() . '.' . $attachment->getClientOriginalName();
                $filePath = Config::get('uploadconfig.BILL_ATTACHMENT') . '_' . $name;
                Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                $Bill->attachment = $filePath;
            }
            $Bill->created_by = auth()->user()->id;
            $Bill->save();

            foreach ($request->PFFundList as $FundList) {
                $billDetail = new BillDetail();
                $billDetail->bill_id = $Bill->id;
                $billDetail->task_id = $FundList['id'];
                $billDetail->unit_id = $FundList['unit_id'];
                $billDetail->unit_rate = $FundList['unit_rate'];
                $billDetail->contract_qty = $FundList['contract_qty'];
                $billDetail->completed_qty = $FundList['completed_qty'];
                $billDetail->contract_amount = $FundList['contract_amount'];
                $billDetail->left_over_amount = $FundList['left_over_amount'];
                $billDetail->progress = $FundList['progress'];
                $billDetail->total_amount = $FundList['total_amount'];
                $billDetail->remark = $FundList['Remarks'];
                $billDetail->created_by = auth()->user()->id;
                $billDetail->save();

                DB::table('contractor_task')->where('task_id', $billDetail->task_id)->where('contractor_id', $Bill->contractor_id)->update([
                    'completed_qty' => (double)$FundList['prev_completed_qty'],
                    'completed_amount' => (double)$FundList['contract_amount'] - (double)$FundList['left_over_amount'],
                ]);
            }

            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'BillController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $bill_id = (int)$request->input('id');

        try {
            $bill = Bill::where('id', $bill_id);

            if ($bill->exists()) {
                $bill = $bill->first();
                $bill->deleted_by = auth()->user()->id;
                $bill->save();
                $bill->delete();
                return CommonHelper::Response(true, 'Bill Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Bill not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'PaymentController', 'destroy');
        }
    }
}
