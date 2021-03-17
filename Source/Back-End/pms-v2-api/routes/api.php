<?php

use App\Http\Controllers\ArchiveHead\ArchiveHeadController;
use App\Http\Controllers\Archives\ArchivesController;
use App\Http\Controllers\BalanceSheet\BalanceSheetController;
use App\Http\Controllers\BasicSettings\BasicSettingsController;
use App\Http\Controllers\Contractor\ContractorController;
use App\Http\Controllers\Equipment\EquipmentController;
use App\Http\Controllers\EquipmentCategory\EquipmentCategoryController;
use App\Http\Controllers\Gallery\GalleryController;
use App\Http\Controllers\ItemHead\ItemHeadController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\NoticeBoard\NoticeBoardController;
use App\Http\Controllers\Officers\OfficersController;
use App\Http\Controllers\DstnChart\DstnChartController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\ProjectFund\ProjectFundController;
use App\Http\Controllers\Fund\CFFund\CFFundController;
use App\Http\Controllers\Section\SectionController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\Unit\UnitController;
use App\Http\Controllers\Supplier\SupplierController;
use App\Http\Controllers\UnitHistory\UnitHistoryController;
use App\Http\Controllers\UserRole\UserRoleController;
use App\Http\Controllers\UserType\UserTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Fund\Misc\MiscController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Public Routes
 */
//Login user
Route::post('/auth/attempt', [AuthController::class, 'attempt']);

/**
 * Private Routes
 */
Route::get('/getBasicSettings', [BasicSettingsController::class, 'getSettings']);
Route::group(['middleware' => ['jwt-auth']], function () {
    Route::get('/auth/logout', [AuthController::class, 'logout']);

    //Home Page (Dashboard) Routes
    Route::post('/update_basic_settings', [BasicSettingsController::class, 'updateSettings']);
    Route::get('/getUnitHistorys',[UnitHistoryController::class,'getUnitHistorys']);
    Route::post('/update_unit_history', [UnitHistoryController::class, 'updateUnitHistory']);

    Route::get('/notices/list', [NoticeBoardController::class, 'getLatestNotices']);
    Route::get('/messages/list', [MessageController::class, 'getMessages']);
    Route::get('/gallery/list', [GalleryController::class, 'getGalleryImages']);
    Route::get('/officers/list', [OfficersController::class, 'getOfficers']);
    Route::get('/dstn_chart', [DstnChartController::class, 'GetDstnChart']);
    Route::get('/unit_history', [UnitHistoryController::class, 'GetUnitHistory']);

    //Helper Routes

    Route::get('/getProjects', [ProjectController::class, 'getProjects']);
    Route::get('/getUserRoles', [UserRoleController::class, 'getUserRoles']);
    Route::get('/getUserTypes', [UserTypeController::class, 'getUserTypes']);
    Route::get('/getSections', [SectionController::class, 'getSections']);
    Route::get('/getItemHeads', [ItemHeadController::class, 'getItemHeads']);
    Route::get('/getUnits', [UnitController::class, 'getUnits']);
    Route::get('/getContractors', [ContractorController::class, 'getContractors']);
    Route::get('/getContractorList', [ContractorController::class, 'getContractorList']);
    Route::get('/getSuppliers', [SupplierController::class, 'getSuppliers']);
    Route::get('/getEquipCategory', [EquipmentCategoryController::class, 'getCategory']);
    Route::get('/getArchHeads', [ArchiveHeadController::class, 'getHeads']);

    Route::get('/getProjectFundParentItems', [ProjectFundController::class, 'getParentItems']);
    Route::get('/getProjectFundsNoLimit', [ProjectFundController::class, 'getProjectFundsNoLimit']);
    Route::get('/getParentTasks', [TaskController::class, 'getParentTasks']);
    Route::get('/getProjectCFFundParentItems', [CFFundController::class, 'getParentItems']);
    Route::get('/getProjectMiscParentItems', [MiscController::class, 'getParentItems']);

    Route::get('/getTasksNoLimit', [TaskController::class, 'getTasksNoLimit']);

    //Module Routes

    Route::get('/getPartialOfficers', [OfficersController::class, 'getPartialOfficers']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/getProjectDetails/{id}', [ProjectController::class, 'getProjectDetails']);
    Route::get('/getProjectContractorList/{id}', [ProjectController::class, 'getProjectContractorList']);
    Route::get('/project/{id}', [ProjectController::class, 'show']);
    Route::post('/save_project', [ProjectController::class, 'store']);
    Route::delete('/delete_project', [ProjectController::class, 'destroy']);

    Route::get('/contractors', [ContractorController::class, 'index']);
    Route::get('/getContractorsNoLimit', [ContractorController::class, 'getContractorsNoLimit']);
    Route::get('/contractor/{id}', [ContractorController::class, 'show']);
    Route::post('/save_contractor', [ContractorController::class, 'store']);
    Route::delete('/delete_contractor', [ContractorController::class, 'destroy']);

    Route::get('/notices', [NoticeBoardController::class, 'index']);
    Route::get('/notice/{id}', [NoticeBoardController::class, 'show']);
    Route::post('/save_notice', [NoticeBoardController::class, 'store']);
    Route::delete('/delete_notice', [NoticeBoardController::class, 'destroy']);

    Route::get('/officers', [OfficersController::class, 'index']);
    Route::get('/officers_no_limit', [OfficersController::class, 'getOfficersNoLimit']);
    Route::get('/officer/{id}', [OfficersController::class, 'show']);
    Route::get('/officer/view/{id}', [OfficersController::class, 'view']);
    Route::post('/save_officer', [OfficersController::class, 'store']);
    Route::delete('/delete_officer', [OfficersController::class, 'destroy']);

    Route::get('/suppliers', [SupplierController::class, 'index']);
    Route::get('/supplier/{id}', [SupplierController::class, 'show']);
    Route::post('/save_supplier', [SupplierController::class, 'store']);
    Route::delete('/delete_supplier', [SupplierController::class, 'destroy']);

    Route::get('/funds', [TaskController::class, 'index']);
    Route::get('/fund/{id}', [ProjectFundController::class, 'show']);
    Route::post('/save_fund', [ProjectFundController::class, 'store']);
    Route::delete('/delete_fund', [ProjectFundController::class, 'destroy']);

    Route::get('/cf_funds', [CFFundController::class, 'index']);
    Route::get('/cf_fund/{id}', [CFFundController::class, 'show']);
    Route::post('/save_cf_fund', [CFFundController::class, 'store']);
    Route::delete('/delete_cf_fund', [CFFundController::class, 'destroy']);
    Route::get('/getCFFundsForBalanceSheet', [CFFundController::class, 'getCFFundsForBalanceSheet']);

    Route::get('/misc', [MiscController::class, 'index']);
    Route::get('/misc/{id}', [MiscController::class, 'show']);
    Route::post('/save_misc', [MiscController::class, 'store']);
    Route::delete('/delete_misc', [MiscController::class, 'destroy']);

//    Setting Controller
    Route::get('/units', [UnitController::class, 'index']);
    Route::post('/save_unit', [UnitController::class, 'store']);
    Route::get('/unit/{id}', [UnitController::class, 'show']);
    Route::delete('/delete_unit', [UnitController::class, 'destroy']);


    Route::get('/section', [SectionController::class, 'index']);
    Route::post('/save_section', [SectionController::class, 'store']);
    Route::get('/section/{id}', [SectionController::class, 'show']);
    Route::delete('/delete_section', [SectionController::class, 'destroy']);

    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/save_message', [MessageController::class, 'store']);
    Route::get('/message/{id}', [MessageController::class, 'show']);
    Route::delete('/delete_message', [MessageController::class, 'destroy']);

    Route::get('/dstns', [DstnChartController::class, 'index']);
    Route::post('/save_dstn', [DstnChartController::class, 'store']);
    Route::get('/dstn/{id}', [DstnChartController::class, 'show']);
    Route::delete('/delete_dstn', [DstnChartController::class, 'destroy']);

    Route::get('/item_heads', [ItemHeadController::class, 'index']);
    Route::post('/save_item_head', [ItemHeadController::class, 'store']);
    Route::get('/item_head/{id}', [ItemHeadController::class, 'show']);
    Route::get('/delete_item_head', [ItemHeadController::class, 'destroy']);

    Route::get('/gallerys', [GalleryController::class, 'index']);
    Route::post('/save_gallery', [GalleryController::class, 'store']);
    Route::get('/gallery/{id}', [GalleryController::class, 'show']);

    Route::get('/item_heads', [ItemHeadController::class, 'index']);
    Route::post('/save_item_head', [ItemHeadController::class, 'store']);
    Route::get('/item_head/{id}', [ItemHeadController::class, 'show']);
    Route::delete('/delete_item_head', [ItemHeadController::class, 'destroy']);

    Route::get('/gallerys', [GalleryController::class, 'index']);
    Route::post('/save_gallery', [GalleryController::class, 'store']);
    Route::get('/gallery/{id}', [GalleryController::class, 'show']);
    Route::delete('/delete_gallery', [GalleryController::class, 'destroy']);

    Route::get('/equipmentCategorys', [EquipmentCategoryController::class, 'index']);
    Route::post('/save_category', [EquipmentCategoryController::class, 'store']);
    Route::get('/equipmentCategory/{id}', [EquipmentCategoryController::class, 'show']);
    Route::delete('/delete_category', [EquipmentCategoryController::class, 'destroy']);


    Route::post('/save_balance_sheet', [BalanceSheetController::class, 'store']);
    Route::post('/save_balance_sheet_row', [BalanceSheetController::class, 'save_row']);


    Route::get('equipments', [EquipmentController::class, 'index']);
    Route::post('save_equipment', [EquipmentController::class, 'store']);
    Route::get('/equipment/{id}', [EquipmentController::class, 'show']);
    Route::delete('/delete_equipment', [EquipmentController::class, 'destroy']);

    Route::get('/get_balance_sheet_list', [BalanceSheetController::class, 'index']);
    Route::get('/get_fund_balance_sheet', [BalanceSheetController::class, 'GetFundBalanceSheet']);
    Route::get('/get_pf_fund_balance_sheet', [BalanceSheetController::class, 'GetPFFundBalanceSheet']);
    Route::get('/get_cf_fund_balance_sheet', [BalanceSheetController::class, 'GetFundBalanceSheet']);
    Route::get('/get_misc_fund_balance_sheet', [BalanceSheetController::class, 'GetMISCFundBalanceSheet']);

    Route::get('/archive-heads', [ArchiveHeadController::class, 'index']);
    Route::post('/save_head', [ArchiveHeadController::class, 'store']);
    Route::get('/archive-head/{id}', [ArchiveHeadController::class, 'show']);
    Route::delete('/delete_head', [ArchiveHeadController::class, 'destroy']);

    Route::get('/archives', [ArchivesController::class, 'index']);
    Route::post('/save_archive', [ArchivesController::class, 'store']);
    Route::get('/archive/{id}', [ArchivesController::class, 'show']);
    Route::delete('/delete_archive', [ArchivesController::class, 'destroy']);

    Route::get('/getPaymentHistory', [PaymentController::class, 'getPaymentHistory']);
    Route::get('/getPaymentHistoryTask', [PaymentController::class, 'getPaymentHistoryTask']);
    Route::get('/getTasksList', [TaskController::class, 'getTasksList']);
    Route::post('/save_task', [TaskController::class, 'store']);

    Route::get('/bill_list', [PaymentController::class, 'index']);
    Route::get('/bill', [PaymentController::class, 'getBill']);
    Route::post('/save_bill', [PaymentController::class, 'store']);
    Route::delete('/delete_bill', [PaymentController::class, 'destroy']);
});
