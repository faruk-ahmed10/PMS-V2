import React, {lazy, Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {CommonRoute, PrivateRoute, PublicRoute} from "../App/Service/Providers/Core/Router/Router";
import NavigationFrame from "../Layouts/Components/Private/NavigationFrame/NavigationFrame";
import ReactHome from "../Screens/Global/ReactHome/ReactHome";
import Login from "../Screens/Public/Login/Login";
import {APP} from "../App/Init/AppProvider";
import NoticeList from "../Screens/Private/Notices/NoticeList";
import NoticeForm from "../Screens/Private/Notices/NoticeForm";
import OfficerForm from "../Screens/Private/Officers/OfficerForm";
import OfficerList from "../Screens/Private/Officers/OfficerList";
import UnitForm from "../Screens/Private/Settings/Units/UnitForm";
import UnitList from "../Screens/Private/Settings/Units/UnitList";
import SectionList from "../Screens/Private/Settings/Sections/SectionList";
import SectionForm from "../Screens/Private/Settings/Sections/SectionForm";

import MessageForm from "../Screens/Private/Messages/MessageForm";
import MessageList from "../Screens/Private/Messages/MessageList";

import FundList from "../Screens/Private/Funds/FundList";
import CFFundList from "../Screens/Private/Funds/CFFund/CFFundList";


import DstnChartList from "../Screens/Private/DstnCharts/DstnChartList";
import DstnChartForm from "../Screens/Private/DstnCharts/DstnChartForm";
import ItemHeadList from "../Screens/Private/Settings/ItemHeads/ItemHeadList";
import ItemHeadForm from "../Screens/Private/Settings/ItemHeads/ItemHeadForm";

import GalleryList from "../Screens/Private/Settings/Gallerys/GalleryList";
import GalleryForm from "../Screens/Private/Settings/Gallerys/GalleryForm";

import FundSessionFilter from '../Screens/Private/Funds/FundSessionFilter';
import EquipmentCategoryList from "../Screens/Private/Settings/EquipmentCategorys/EquipmentCategoryList";
import EquipmentCategoryForm from "../Screens/Private/Settings/EquipmentCategorys/EquipmentCategoryForm";
import EquipmentList from "../Screens/Private/Equipments/EquipmentList";
import EquipmentForm from "../Screens/Private/Equipments/EquipmentForm";
import OfficerView from "../Screens/Private/Officers/OfficerView";
import ArchiveList from "../Screens/Private/Archives/ArchiveList";
import ArchiveForm from "../Screens/Private/Archives/ArchiveForm";
import ArchiveHeadList from "../Screens/Private/Settings/ArchiveHeads/ArchiveHeadList";
import ArchiveHeadForm from "../Screens/Private/Settings/ArchiveHeads/ArchiveHeadForm";
import NoticeView from "../Screens/Private/Notices/NoticeView";
import ContractorView from "../Screens/Private/Contractors/ContractorView";
import UnitHistorys from "../Screens/Private/Settings/UnitHistory/UnitHistorys";


const Home: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Home/Home`));
const BasicSettings: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/BasicSettings/BasicSettings`));

const ProjectForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Projects/ProjectForm`));
const ProjectList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Projects/ProjectList`));
const ProjectDetails: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Projects/ProjectDetails`));

const ContractorList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Contractors/ContractorList`));
const ContractorForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Contractors/ContractorForm`));


const SupplierList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Suppliers/SupplierList`));
const SupplierForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Suppliers/SupplierForm`));

const FundReport: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/FundReport`));
const FundForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/FundForm`));
const CFFundForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/CFFund/CFFundForm`));


const MiscList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/Misc/MiscList`));
const MiscForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/Misc/MiscForm`));
const BalanceSheetForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/PFFund/BalanceSheetForm`));
const BalanceSheetReport: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/PFFund/BalanceSheetReport`));
const BalanceSheetSessionReport: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/BalanceSheetSessionReport`));
const BalanceSheetList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/PFFund/BalanceSheetList`));
const CFBalanceSheetList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/CFFund/BalanceSheetList`));
const CFBalanceSheetForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/CFFund/CFBalanceSheetForm`));


const BillList: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/BillList`));
const BillForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/BillForm`));
const BillReport: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/BillReport`));
const BillReportPrinatable: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/BIllReportPrintable`));
const PaymentHistory: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/PaymentHistory`));
const PaymentHistoryPrintable: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/PaymentHistoryPrintable`));
const PaymentHistoryTask: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Payment/PaymentHistoryTask`));
const AssignWork: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/AssignWork`));
const AssignWorkForm: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Funds/AssignWorkForm`));

const GalleryGrid: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() => import(`../Screens/Private/Settings/Gallerys/GalleryGrid`));


const RouteMatchedForSlider = (CurrentRoute: string, RouteToMatch: string): boolean => {
    return APP.FUNCTIONS.REMOVE_ENDING_SLASH(CurrentRoute.toLowerCase()) === RouteToMatch.toLowerCase();
};

const RouteMatchedForNotice = (CurrentRoute: string, RouteToMatch: string): boolean => {
    return APP.FUNCTIONS.REMOVE_ENDING_SLASH(CurrentRoute.toLowerCase()) === RouteToMatch.toLowerCase();
};

const Routes = (): React.ReactChild => {

    const ROUTES: any = APP.ROUTES;
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <PrivateRoute path={APP.ROUTES.PRIVATE.ROOT} component={(props: any) => {
                        const CurrentPathName: string = props.location.pathname;

                        return (
                            <NavigationFrame
                                withSlider={RouteMatchedForSlider(CurrentPathName, ROUTES.PRIVATE.DASHBOARD)}
                                withNotice={RouteMatchedForNotice(CurrentPathName, ROUTES.PRIVATE.DASHBOARD)}
                                hideLeftContainer={RouteMatchedForNotice(CurrentPathName, ROUTES.PRIVATE.PF_BALANCE_SHEET)}>
                                <Suspense fallback={<h1>Loading</h1>}>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.ROOT} component={Home}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.BASIC_SETTINGS} component={BasicSettings}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.UNIT_HISTORY} component={UnitHistorys}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.PROJECTS} component={ProjectList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_PROJECT} component={ProjectForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_PROJECT + '/:id'}
                                                  component={ProjectForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.PROJECT_DETAILS + '/:id'}
                                                  component={ProjectDetails}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.CONTRACTORS} component={ContractorList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_CONTRACTOR}
                                                  component={ContractorForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_CONTRACTOR + '/:id'}
                                                  component={ContractorForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CONTRACTOR_DETAILS + '/:id'}
                                                  component={ContractorView}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.NOTICES} component={NoticeList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_NOTICE + '/:id'}
                                                  component={NoticeForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.VIEW_NOTICE + '/:id'}
                                                  component={NoticeView}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_NOTICE} component={NoticeForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.USERS} component={OfficerList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.USERS + '/:rank'}
                                                  component={OfficerList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_OFFICER + '/:id' + '/:rank'}
                                                  component={OfficerForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_USER + '/:rank'}
                                                  component={OfficerForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.VIEW_OFFICER + '/:id' + '/:rank'}
                                                  component={OfficerView}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.VIEW_OFFICER} component={OfficerView}/>


                                    <PrivateRoute exact path={ROUTES.PRIVATE.SUPPLIERS} component={SupplierList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_SUPPLIER} component={SupplierForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_SUPPLIER + '/:id'}
                                                  component={SupplierForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.FUND_SESSION_FILTER}
                                                  component={FundSessionFilter}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.FUNDS} component={FundList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_FUND} component={FundForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_FUND + '/:id'} component={FundForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.CF_FUND} component={CFFundList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_CF_FUND} component={CFFundForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_CF_FUND + '/:id'}
                                                  component={CFFundForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.ASSIGN_WORK} component={AssignWork}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_ASSIGN_WORK}
                                                  component={AssignWorkForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_ASSIGN_WORK + '/:id'}
                                                  component={AssignWorkForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.MISC_FUND} component={MiscList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_MISC} component={MiscForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_MISC + '/:id'} component={MiscForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.FUND_REPORT} component={FundReport}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.PF_BALANCE_SHEET}
                                                  component={BalanceSheetList}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.BALANCE_SHEET_CREATE}
                                                  component={BalanceSheetForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CF_BALANCE_SHEET_CREATE}
                                                  component={CFBalanceSheetForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.PF_BALANCE_SHEET_REPORT}
                                                  component={BalanceSheetReport}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.PF_BALANCE_SHEET_SESSION_REPORT}
                                                  component={() => <BalanceSheetSessionReport fundType={"PF"} />}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.CF_BALANCE_SHEET_SESSION_REPORT}
                                                  component={() => <BalanceSheetSessionReport fundType={"CF"} />}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.MISC_BALANCE_SHEET_SESSION_REPORT}
                                                  component={() => <BalanceSheetSessionReport fundType={"MISC"} />}/>


                                    <PrivateRoute exact path={ROUTES.PRIVATE.CF_BALANCE_SHEET}
                                                  component={CFBalanceSheetList}/>


                                    <PrivateRoute exact path={ROUTES.PRIVATE.UNITS} component={UnitList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_UNIT} component={UnitForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_UNIT + '/:id'} component={UnitForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.SECTIONS} component={SectionList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_SECTION} component={SectionForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_SECTION + '/:id'}
                                                  component={SectionForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.MESSAGES} component={MessageList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_MESSAGE} component={MessageForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_MESSAGE + '/:id'}
                                                  component={MessageForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.DSTNS} component={DstnChartList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_DSTN} component={DstnChartForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_DSTN + '/:id'}
                                                  component={DstnChartForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.ITEM_HEADS} component={ItemHeadList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_ITEM_HEAD}
                                                  component={ItemHeadForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_ITEM_HEAD + '/:id'}
                                                  component={ItemHeadForm}/>


                                    <PrivateRoute exact path={ROUTES.PRIVATE.GALLERYS} component={GalleryList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.GALLERY_GRID} component={GalleryGrid}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_GALLERY} component={GalleryForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_GALLERY + '/:id'}
                                                  component={GalleryForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.EQUIPMENT_CATEGORY}
                                                  component={EquipmentCategoryList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_EQUIPMENT_CATEGORY}
                                                  component={EquipmentCategoryForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_EQUIPMENT_CATEGORY + '/:id'}
                                                  component={EquipmentCategoryForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.EQUIPMENTS} component={EquipmentList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_EQUIPMENTS}
                                                  component={EquipmentForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_EQUIPMENTS + '/:id'}
                                                  component={EquipmentForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.ARCHIVE_HEADS}
                                                  component={ArchiveHeadList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_ARCHIVE_HEAD}
                                                  component={ArchiveHeadForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_ARCHIVE_HEAD + '/:id'}
                                                  component={ArchiveHeadForm}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.ARCHIVES} component={ArchiveList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_ARCHIVES} component={ArchiveForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_ARCHIVES + '/:id'}
                                                  component={ArchiveForm}/>


                                    <PrivateRoute exact path={ROUTES.PRIVATE.BILLS} component={BillList}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CREATE_BILL} component={BillForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EDIT_BILL + '/:id'} component={BillForm}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.BILL_REPORT_VIEW + '/:id'}
                                                  component={BillReport}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.PAYMENT_HISTORY}
                                                  component={PaymentHistory}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.PAYMENT_HISTORY_TASK + '/:id'}
                                                  component={PaymentHistoryTask}/>

                                </Suspense>
                            </NavigationFrame>
                        )
                    }}/>


                    <Suspense fallback={<h1>Loading</h1>}>
                        <PrivateRoute exact path={ROUTES.PRIVATE.BILL_REPORT_VIEW_PRINT + '/:id'}
                                      component={BillReportPrinatable}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.PF_BALANCE_SHEET_LIST_PRINTABLE}
                                      component={() => <BalanceSheetList printMode={true}/>}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.PF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE}
                                      component={() => <BalanceSheetSessionReport hideActionBtns={true} fundType={"PF"}/>}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.CF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE}
                                      component={() => <BalanceSheetSessionReport hideActionBtns={true} fundType={"CF"}/>}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.MISC_BALANCE_SHEET_SESSION_REPORT_PRINTABLE}
                                      component={() => <BalanceSheetSessionReport hideActionBtns={true} fundType={"MISC"}/>}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.PAYMENT_HISTORY_REPORT_PRINTABLE}
                                      component={PaymentHistoryPrintable}/>
                        <PrivateRoute exact path={ROUTES.PRIVATE.PROJECT_DETAILS_PRINTABLE_REPORT + '/:id'}
                                      component={() => <ProjectDetails printMode={true}/>}/>


                        <PublicRoute exact path={ROUTES.ROOT} component={Login}/>
                        <PublicRoute exact path={ROUTES.PUBLIC.LOGIN} component={Login}/>
                        <CommonRoute exact path={ROUTES.COMMON.REACT_HOME} component={ReactHome}/></Suspense>
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default Routes;
