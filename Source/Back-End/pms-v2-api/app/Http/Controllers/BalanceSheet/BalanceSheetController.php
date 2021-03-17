<?php

namespace App\Http\Controllers\BalanceSheet;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\BalanceSheet;
use App\Models\ProjectFund;
use App\Models\Task;
use App\Models\CFFund;
use App\Models\MiscFund;
use App\Models\Section;
use Config;
use \Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Storage;
use \Exception;

class BalanceSheetController extends Controller
{
    public function index(Request $request)
    {
        $Installment = (int)$request->input('Installment');
        $InstallmentOffset = $Installment - 1;
        $FundType = (string)$request->input('FundType');
        $ProjectId = (int)$request->input('ProjectId');
        $Session = (string)$request->input('Session');
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $PrintMode = (int)$request->input('PrintMode');
        try {

            $balanceSheet_q = "
            SELECT *
FROM (SELECT BS.id,
             BS.project_id,
             BS.fund_id,
             BS.section_id,
             BS.economic_code,
             BS.dpp_amount,
             BS.fund_type,
             BS.session,
             BS.amount,
             BS.expenditure_up_to_date,
             BS.remarks,
             BS.attachment,
             BS.status,
             BS.deleted_at,
             BS.created_by,
             BS.ip,
             BS.agent,
             BS.created_at,
             BS.updated_at,
             TSK.description as task_description,
             PJT.description as project_description,
             SCN.name        as section_name,
             IF(BS.id = (SELECT id FROM balance_sheets WHERE fund_id = BS.fund_id AND fund_type = BS.fund_type AND session = '{$Session}' ORDER BY id LIMIT {$InstallmentOffset}, 1), 'YES',
                'NO')        AS ShouldRender
      FROM balance_sheets BS
               INNER JOIN tasks TSK ON TSK.id = BS.fund_id
               INNER JOIN projects PJT ON PJT.id = BS.project_id
               INNER JOIN sections SCN ON SCN.id = BS.section_id
      WHERE BS.fund_type = '{$FundType}') BSL
WHERE BSL.ShouldRender = 'YES'
            ";

            if ($ProjectId !== 0) {
                $balanceSheet_q .= " AND BSL.project_id = '{$ProjectId}'";
            }

            $balanceSheet_q .= " ORDER by BSL.fund_id ASC";

            $TotalRows = DB::select("SELECT COUNT(*) AS TotalCount FROM (" . $balanceSheet_q . ") TC")[0]->TotalCount;

            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            /*$balanceSheet = $balanceSheet->skip($Offset)->take($RowsPerPage)->get();*/

            if ($PrintMode !== 1) {
                $balanceSheet_q .= " LIMIT {$Offset}, ${RowsPerPage}";
            }

            $balanceSheet = DB::select($balanceSheet_q);

            return CommonHelper::Response(true, 'Balance Sheet list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $balanceSheet,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'BalanceSheetController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function store(Request $request)
    {
        $FundList = $request->FundList;

        try {
            DB::beginTransaction();

            foreach ($FundList as $Fund) {
                $balance_sheet = new BalanceSheet();

                $balance_sheet->fund_id = $Fund['id'];
                $balance_sheet->project_id = $Fund['ProjectId'];
                $balance_sheet->economic_code = isset($Fund['EconomicCode']) ? $Fund['EconomicCode'] : '';
                $balance_sheet->section_id = $Fund['SectionID'];
                $balance_sheet->dpp_amount = $Fund['DPPAmount'];
                $balance_sheet->amount = $Fund['ReceivedAmount'];
                $balance_sheet->fund_type = $request->FundType;
                $balance_sheet->session = $request->Session;
                $balance_sheet->expenditure_up_to_date = $Fund['ExpenditureUptoDate'];
                $balance_sheet->remarks = $Fund['Remarks'];
                $balance_sheet->created_by = auth()->user()->id;

                if (isset($Fund['Attachment'])) {
                    $attachment = $Fund['Attachment'];
                    $extension = (string)$attachment->extension();

                    $continue = false;
                    foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                        if ($extension == $afe) {
                            $continue = true;
                        }
                    }

                    if (!$continue) {
                        return response()->json([
                            'success' => false,
                            'error_code' => 'UNSUPPORTED_FORMAT',
                            'message' => 'Please select a valid file!',
                        ]);
                    }

                    $name = time() . '.' . $attachment->getClientOriginalName();
                    $filePath = Config::get('uploadconfig.BALANCE_SHEET_ATTACHMENT') . $name;
                    Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                    $balance_sheet->attachment = $filePath;
                }

                $balance_sheet->save();
            }

            DB::commit();
            return CommonHelper::Response(true, 'Saved successfully!', null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'BalanceSheetController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function save_row(Request $request)
    {
        try {
            DB::beginTransaction();

            $balance_sheet = BalanceSheet::where('id', '=', $request->id);
            $balance_sheet->amount = $request->received_amount;
            $balance_sheet->expenditure_up_to_date = $request->expenditure_up_to_date;
            $balance_sheet->remarks = $request->remarks;

            $data = [
                'amount' => $request->received_amount,
                'expenditure_up_to_date' => $request->expenditure_up_to_date,
                'remarks' => $request->remarks,
            ];

            /*if (isset($Fund['Attachment'])) {
                $attachment = $Fund['Attachment'];
                $extension = (string)$attachment->extension();

                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return response()->json([
                        'success' => false,
                        'error_code' => 'UNSUPPORTED_FORMAT',
                        'message' => 'Please select a valid file!',
                    ]);
                }

                $name = time() . '.' . $attachment->getClientOriginalName();
                $filePath = Config::get('uploadconfig.BALANCE_SHEET_ATTACHMENT') . $name;
                Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                $balance_sheet->attachment = $filePath;
            }*/

            $balance_sheet->update($data);

            DB::commit();
            return CommonHelper::Response(true, 'Saved successfully!', null);
        } catch (Exception $e) {
            DB::rollback();
            return CommonHelper::throwError($e, 'BalanceSheetController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function GetSessionYears($PrevYearNumber = 4, $CurrentYear = '')
    {
        $sessions = [];
        $CurrentYear = $CurrentYear ? $CurrentYear : date('Y');
        $j = 0;
        $session_number = ['first_session', 'second_session', 'third_session', 'fourth_session', 'fifth_session', 'sixth_session'];

        for ($i = ($CurrentYear - $PrevYearNumber); $i <= $CurrentYear; $i++) {

            $sections[] = [
                'id' => $j,
                'session_number' => $session_number[$j++],
                'session' => ($i . "-" . ($i + 1)),
                'var_session' => ($i . "_" . ($i + 1)),
                'startYear' => $i,
                'endYear' => $i + 1,
            ];
        }

        return $sections;
    }

    public function generateSessionsRange($startYear)
    {

        $tmpSessionsRange = [];
        $CurrentSessions = $this->GetSessionYears();

        for ($i = 0; $i < count($CurrentSessions); $i++) {
            if ($CurrentSessions[$i]['startYear'] <= $startYear) {
                $tmpSessionsRange[] = $CurrentSessions[$i];
            }
        }
        return $tmpSessionsRange;
    }


    public function GetFundBalanceSheet(Request $request)
    {
        $fund_type = $request->fund_type;
        $first_session = 0;
        $second_session = 0;
        $third_session = 0;
        $fourth_session = 0;
        $fifth_session = 0;
        $sessions = $this->generateSessionsRange($request->start_date);
        $session = array_column($sessions, 'session', 'session_number');
        extract($session);
//        return json_encode($fourth_session);
//        return json_encode($2018_2019);
        /*

        $sections = Section::get();

        $data = $fra = $exa = array();

        foreach ($sections as $section) {
            $project_funds = Task::where('project_id', $request->project_id)->where('fund_type', $request->fund_type)->where('section_id', $section->id)->get();
            if (count($project_funds)) {

                foreach ($project_funds as $pf) {
                    $balanceSheet = BalanceSheet::where('fund_id', $pf->id)->where('fund_type', $request->fund_type)->where('section_id', $section->id);

                    foreach ($sessions as $session) {
                        ${'fra_' . $session['var_session']} = clone $balanceSheet;
                        ${'fra_' . $session['var_session']} = ${'fra_' . $session['var_session']}->where('session', $session['session'])->sum('amount');

                        ${'exa_' . $session['var_session']} = clone $balanceSheet;
                        ${'exa_' . $session['var_session']} = ${'exa_' . $session['var_session']}->where('session', $session['session'])->sum('expenditure_up_to_date');


                        $fra = array_merge($fra, ['fra_' . $session['var_session'] => ${'fra_' . $session['var_session']}]);
                        $exa = array_merge($exa, ['exa_' . $session['var_session'] => ${'exa_' . $session['var_session']}]);

                    }

                    $data[$section->id][$pf->id] = array(
                        'id' => $pf->id,
                        'name' => $pf->description,
                        'section_name' => $section->name,
                        'section' => '',
                        'dpp' => $pf->total_price,
                        'received_amount' => $fra,
                        'expenditure_up_to_date' => $exa,
                        'remarks' => ''

                    );
                    // $data = array_merge($data[$section->id][$pf->id] ,$fra)
                }
            }

            $data[$section->id][] = array(
                'id' => '',
                'section_id' => $section->id,
                'section_name' => $section->name);
        }
        return CommonHelper::Response(true, 'Balance Sheet fetched successfully!', null, $data);*/


        try {
            $sections = BalanceSheet::where('project_id', '=', $request->project_id)->select('section_id', 'project_id')->groupBy('section_id')->with('section')->get();

            $DppSubTotal = 0;
            $FirstReceivedSubTotal = 0;
            $SecondReceivedSubTotal = 0;
            $ThirdReceivedSubTotal = 0;
            $FourthReceivedSubTotal = 0;
            $FifthReceivedSubTotal = 0;
            $TotalReceivedSubTotal = 0;

            $FirstExpenditureSubTotal = 0;
            $SecondExpenditureSubTotal = 0;
            $ThirdExpenditureSubTotal = 0;
            $FourthExpenditureSubTotal = 0;
            $FifthExpenditureSubTotal = 0;
            $TotalExpenditureSubTotal = 0;

            $TotalCurrentBalanceSubtotal = 0;
            $TotalDueBalanceSubtotal = 0;

            $PriseContigency = 0;
            $PhysicalContigency = 0;
            $GrandTotal = 0;
            $GrandTotalDueAmount = 0;

            foreach ($sections as $section) {

                $tasks = DB::select('call get_balance_sheet_report(?, ?, ?, ?, ?, ?, ?, ?)', array($fund_type, $section->project_id, $section->section_id, $first_session, $second_session, $third_session, $fourth_session, $fifth_session));


                $TotalFirstReceived = 0;
                $TotalSecondReceived = 0;
                $TotalThirdReceived = 0;
                $TotalFourthReceived = 0;
                $TotalFifthReceived = 0;
                $TotalFirstExpenditure = 0;
                $TotalSecondExpenditure = 0;
                $TotalThirdExpenditure = 0;
                $TotalFourthExpenditure = 0;
                $TotalFifthExpenditure = 0;

                $TotalDppAmount = 0;
                $TotalReceived = 0;
                $TotalExpenditure = 0;
                $TotalCurrentBalance = 0;
                $TotalDueBalance = 0;

                foreach ($tasks as $task) {
                    $TotalFirstReceived = $TotalFirstReceived + (int)$task->FirstReceived;
                    $TotalSecondReceived = $TotalSecondReceived + (int)$task->SecondReceived;
                    $TotalThirdReceived = $TotalThirdReceived + (int)$task->ThirdReceived;
                    $TotalFourthReceived = $TotalFourthReceived + (int)$task->FourthReceived;
                    $TotalFifthReceived = $TotalFifthReceived + (int)$task->FifthReceived;

                    $TotalFirstExpenditure = $TotalFirstExpenditure + (int)$task->FirstExpenditure;
                    $TotalSecondExpenditure = $TotalSecondExpenditure + (int)$task->SecondExpenditure;
                    $TotalThirdExpenditure = $TotalThirdExpenditure + (int)$task->ThirdExpenditure;
                    $TotalFourthExpenditure = $TotalFourthExpenditure + (int)$task->FourthExpenditure;
                    $TotalFifthExpenditure = $TotalFifthExpenditure + (int)$task->FifthExpenditure;

                    $TotalDppAmount = $TotalDppAmount + (int)$task->dpp_amount;
                    $TotalReceived = $TotalReceived + (int)$task->total_received;
                    $TotalExpenditure = $TotalExpenditure + (int)$task->total_expenditure;
                    $TotalCurrentBalance = $TotalCurrentBalance + (int)$task->current_bal;
                    $TotalDueBalance = $TotalDueBalance + (int)$task->due_amount;
                }

                $DppSubTotal = $DppSubTotal + $TotalDppAmount;
                $FirstReceivedSubTotal = $FirstReceivedSubTotal + $TotalFirstReceived;
                $SecondReceivedSubTotal = $SecondReceivedSubTotal + $TotalSecondReceived;
                $ThirdReceivedSubTotal = $ThirdReceivedSubTotal + $TotalThirdReceived;
                $FourthReceivedSubTotal = $FourthReceivedSubTotal + $TotalFourthReceived;
                $FifthReceivedSubTotal = $FifthReceivedSubTotal + $TotalFifthReceived;
                $TotalReceivedSubTotal = $TotalReceivedSubTotal + $TotalReceived;

                $FirstExpenditureSubTotal = $FirstExpenditureSubTotal + $TotalFirstExpenditure;
                $SecondExpenditureSubTotal = $SecondExpenditureSubTotal + $TotalSecondExpenditure;
                $ThirdExpenditureSubTotal = $ThirdExpenditureSubTotal + $TotalThirdExpenditure;
                $FourthExpenditureSubTotal = $FourthExpenditureSubTotal + $TotalFourthExpenditure;
                $FifthExpenditureSubTotal = $FifthExpenditureSubTotal + $TotalFifthExpenditure;
                $TotalExpenditureSubTotal = $TotalExpenditureSubTotal + $TotalExpenditure;

                $TotalCurrentBalanceSubtotal = $TotalCurrentBalanceSubtotal + $TotalCurrentBalance;
                $TotalDueBalanceSubtotal = $TotalDueBalanceSubtotal + $TotalDueBalance;


                $section->tasks = [
                    'data' => $tasks,
                    'TotalFirstReceived' => $TotalFirstReceived,
                    'TotalSecondReceived' => $TotalSecondReceived,
                    'TotalThirdReceived' => $TotalThirdReceived,
                    'TotalFourthReceived' => $TotalFourthReceived,
                    'TotalFifthReceived' => $TotalFifthReceived,

                    'TotalFirstExpenditure' => $TotalFirstExpenditure,
                    'TotalSecondExpenditure' => $TotalSecondExpenditure,
                    'TotalThirdExpenditure' => $TotalThirdExpenditure,
                    'TotalFourthExpenditure' => $TotalFourthExpenditure,
                    'TotalFifthExpenditure' => $TotalFifthExpenditure,

                    'TotalDppAmount' => $TotalDppAmount,
                    'TotalReceived' => $TotalReceived,
                    'TotalExpenditure' => $TotalExpenditure,
                    'TotalCurrentBalance' => $TotalCurrentBalance,
                    'TotalDueBalance' => $TotalDueBalance,
                ];
            }

            $PriseContigency = ($DppSubTotal / 100) * 1;
            $PhysicalContigency = ($DppSubTotal / 100) * 1;
            $GrandTotal = $DppSubTotal + $PriseContigency + $PhysicalContigency;
            $GrandTotalDueAmount = $TotalDueBalanceSubtotal + $PriseContigency + $PhysicalContigency;

            $data = [
                'BalanceSheetList' => $sections,
                'DppSubTotal' => $DppSubTotal,
                'PriseContigency' => $PriseContigency,
                'PhysicalContigency' => $PhysicalContigency,
                'GrandTotal' => $GrandTotal,
                'GrandTotalDueAmount' => $GrandTotalDueAmount,

                'FirstReceivedSubTotal' => $FirstReceivedSubTotal,
                'SecondReceivedSubTotal' => $SecondReceivedSubTotal,
                'ThirdReceivedSubTotal' => $ThirdReceivedSubTotal,
                'FourthReceivedSubTotal' => $FourthReceivedSubTotal,
                'FifthReceivedSubTotal' => $FifthReceivedSubTotal,
                'TotalReceivedSubTotal' => $TotalReceivedSubTotal,

                'FirstExpenditureSubTotal' => $FirstExpenditureSubTotal,
                'SecondExpenditureSubTotal' => $SecondExpenditureSubTotal,
                'ThirdExpenditureSubTotal' => $ThirdExpenditureSubTotal,
                'FourthExpenditureSubTotal' => $FourthExpenditureSubTotal,
                'FifthExpenditureSubTotal' => $FifthExpenditureSubTotal,
                'TotalExpenditureSubTotal' => $TotalExpenditureSubTotal,

                'TotalCurrentBalanceSubtotal' => $TotalCurrentBalanceSubtotal,
                'TotalDueBalanceSubtotal' => $TotalDueBalanceSubtotal,
            ];

            return CommonHelper::Response(true, "Balance sheet list report fetched successfully!", null, $data);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, '', '', 'UNKNOWN');
        }
    }

    public function GetPFFundBalanceSheet(Request $request)
    {
        $sessions = $this->generateSessionsRange($request->start_date);

        $sections = Section::get();

        $data = $fra = $exa = array();

        foreach ($sections as $section) {
            $project_funds = Task::where('fund_type', $request->fund_type)->where('section_id', $section->id)->get();
            if (count($project_funds)) {

                foreach ($project_funds as $pf) {
                    $balanceSheet = BalanceSheet::where('fund_id', $pf->id)->where('fund_type', 'PF')->where('section_id', $section->id);

                    foreach ($sessions as $session) {
                        ${'fra_' . $session['var_session']} = clone $balanceSheet;
                        ${'fra_' . $session['var_session']} = ${'fra_' . $session['var_session']}->where('session', $session['session'])->sum('amount');

                        ${'exa_' . $session['var_session']} = clone $balanceSheet;
                        ${'exa_' . $session['var_session']} = ${'exa_' . $session['var_session']}->where('session', $session['session'])->sum('expenditure_up_to_date');


                        $fra = array_merge($fra, ['fra_' . $session['var_session'] => ${'fra_' . $session['var_session']}]);
                        $exa = array_merge($exa, ['exa_' . $session['var_session'] => ${'exa_' . $session['var_session']}]);

                    }

                    $data[$section->id][$pf->id] = array(
                        'id' => $pf->id,
                        'name' => $pf->description,
                        'section_name' => $section->name,
                        'section' => '',
                        'dpp' => $pf->total_price,
                        'received_amount' => $fra,
                        'expenditure_up_to_date' => $exa,
                        'remarks' => ''

                    );
                    // $data = array_merge($data[$section->id][$pf->id] ,$fra)
                }
            }

            $data[$section->id][] = array(
                'id' => '',
                'section_id' => $section->id,
                'section_name' => $section->name);
        }
        return CommonHelper::Response(true, 'Balance Sheet fetched successfully!', null, $data);
    }

    public function GetCFFundBalanceSheet(Request $request)
    {
        $sessions = $this->generateSessionsRange($request->start_date);

        $sections = Section::get();

        $data = $fra = $exa = array();

        foreach ($sections as $section) {
            $CFFund = CFFund::where('section_id', $section->id)->get();
            if (count($CFFund)) {

                foreach ($CFFund as $pf) {
                    $balanceSheet = BalanceSheet::where('fund_id', $pf->id)->where('fund_type', 'CF')->where('section_id', $section->id);

                    foreach ($sessions as $session) {
                        ${'fra_' . $session['var_session']} = clone $balanceSheet;
                        ${'fra_' . $session['var_session']} = ${'fra_' . $session['var_session']}->where('session', $session['session'])->sum('amount');

                        ${'exa_' . $session['var_session']} = clone $balanceSheet;
                        ${'exa_' . $session['var_session']} = ${'exa_' . $session['var_session']}->where('session', $session['session'])->sum('expenditure_up_to_date');


                        $fra = array_merge($fra, ['fra_' . $session['var_session'] => ${'fra_' . $session['var_session']}]);
                        $exa = array_merge($exa, ['exa_' . $session['var_session'] => ${'exa_' . $session['var_session']}]);

                    }

                    $data[$section->id][$pf->id] = array(
                        'id' => $pf->id,
                        'name' => $pf->description,
                        'section_name' => $section->name,
                        'section' => '',
                        'dpp' => $pf->total_price,
                        'received_amount' => $fra,
                        'expenditure_up_to_date' => $exa,
                        'remarks' => ''

                    );
                    // $data = array_merge($data[$section->id][$pf->id] ,$fra)
                }
            }

            $data[$section->id][] = array(
                'id' => '',
                'section_id' => $section->id,
                'section_name' => $section->name);
        }
        return CommonHelper::Response(true, 'Balance Sheet fetched successfully!', null, $data);
    }

    public function GetMISCFundBalanceSheet(Request $request)
    {
        $sessions = $this->generateSessionsRange($request->start_date);

        $sections = Section::get();

        $data = $fra = $exa = array();

        foreach ($sections as $section) {
            $MiscFund = MiscFund::where('section_id', $section->id)->get();
            if (count($MiscFund)) {

                foreach ($MiscFund as $pf) {
                    $balanceSheet = BalanceSheet::where('fund_id', $pf->id)->where('fund_type', 'MISC')->where('section_id', $section->id);

                    foreach ($sessions as $session) {
                        ${'fra_' . $session['var_session']} = clone $balanceSheet;
                        ${'fra_' . $session['var_session']} = ${'fra_' . $session['var_session']}->where('session', $session['session'])->sum('amount');

                        ${'exa_' . $session['var_session']} = clone $balanceSheet;
                        ${'exa_' . $session['var_session']} = ${'exa_' . $session['var_session']}->where('session', $session['session'])->sum('expenditure_up_to_date');


                        $fra = array_merge($fra, ['fra_' . $session['var_session'] => ${'fra_' . $session['var_session']}]);
                        $exa = array_merge($exa, ['exa_' . $session['var_session'] => ${'exa_' . $session['var_session']}]);

                    }

                    $data[$section->id][$pf->id] = array(
                        'id' => $pf->id,
                        'name' => $pf->description,
                        'section_name' => $section->name,
                        'section' => '',
                        'dpp' => $pf->total_price,
                        'received_amount' => $fra,
                        'expenditure_up_to_date' => $exa,
                        'remarks' => ''

                    );
                    // $data = array_merge($data[$section->id][$pf->id] ,$fra)
                }
            }

            $data[$section->id][] = array(
                'id' => '',
                'section_id' => $section->id,
                'section_name' => $section->name);
        }
        return CommonHelper::Response(true, 'Balance Sheet fetched successfully!', null, $data);
    }


}
