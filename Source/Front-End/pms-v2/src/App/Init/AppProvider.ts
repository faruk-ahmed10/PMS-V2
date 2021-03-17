import {Config} from "../Config/Config";
import {ROUTE_PATHS} from "../../Routes/RoutePaths";
import {Store} from "../../Global/Data/Store/Store";
import {withStore} from "../Functions/WithStore.Function";
import {DefaultException} from "../Exceptions/DefaultException";
import {IsFloat, IsInt, IsNumber} from "../Functions/IsNumber.Function";
import {ForbiddenException} from "../Exceptions/Forbidden";
import {ValidateEmailAddress} from "../Functions/EmailValidator.Function";
import {RemoveEndingSlash} from "../Functions/RemoveEndingSlash.Function";
import {ConvertDate} from "../Functions/ConvertDate.Function";
import {ConvertMysqlDateTime} from "../Functions/ConvertMysqlDateTime.Function";
import {DropdownObjectMaker} from "../Functions/DropdownObjectMaker.Function";
import {JsonToFormData} from "../Functions/JsonToFormData";
import {GetSessionYears} from "../Functions/GetSessionYears.Function";
import {PrintArea} from "../Functions/PrintArea.Function";
import {Capitalize} from '../Functions/Capitalize.Function';
import {GetParam} from "../Functions/GetParam";
import {AuthProvider} from "../Service/Providers/Auth/AuthProvider";
import {BasicSettingsProvider} from "../Service/Providers/BasicSettings/BasicSettings";
import {ProjectProvider} from "../Service/Providers/Project/ProjectProvider";
import {AlertDialogProvider} from "../Service/Providers/Core/AlertDialog/AlertDialogProvider";
import {ContractorProvider} from "../Service/Providers/Contractors/ContractorProvider";
import {NoticeProvider} from "../Service/Providers/Notices/NoticeProvider";
import {SupplierProvider} from "../Service/Providers/Suppliers/SupplierProvider";
import {FundProvider} from "../Service/Providers/Fund/FundProvider";
import {CFFundProvider} from "../Service/Providers/Fund/CFFundProvider";
import {MiscProvider} from "../Service/Providers/Fund/MiscProvider";
import {OfficerProvider} from "../Service/Providers/Officers/OfficerProvider";
import {UnitProvider} from "../Service/Providers/Units/UnitProvider";
import {SectionProvider} from "../Service/Providers/Sections/Sections";
import {MessageProvider} from "../Service/Providers/Messages/MessageProvider";
import {DstnProvider} from "../Service/Providers/Dstns/DstnProvider";
import {ItemHeadProvider} from "../Service/Providers/ItemHeads/ItemHeadProvider";
import {BalanceSheetProvider} from "../Service/Providers/Fund/BalanceSheetProvider";
import {GalleryProvider} from "../Service/Providers/Gallerys/GalleryProvider";
import {SessionFilterProvider} from '../Service/Providers/SessionFilter/SessionFilterProvider';
import {EquipmentCategoryProvider} from "../Service/Providers/EquipmentCategorys/EquipmentCategoryProvider";
import {EquipmentProvider} from "../Service/Providers/Equipments/EquipmentProvider";
import {SwitchProjectProvider} from "../Service/Providers/SwitchProject/SwitchProjectProvider";
import {BillProvider} from "../Service/Providers/Payment/BillProvider";
import {ArchiveProvider} from "../Service/Providers/Archives/ArchiveProvider";
import {ArchiveHeadProvider} from "../Service/Providers/ArchiveHeads/ArchiveHeadProvider";
import {UnitHistoryProvider} from "../Service/Providers/UnitHistorys/UnitHistoryProvider";

export const APP = {
    CONFIG: Config,

    ROUTES: ROUTE_PATHS,

    /**
     * Global functions and services
     */
    GLOBAL: {
        DATA: {
            STORE: Store,
            WITH_STORE: withStore,
        }
    },

    /**
     * Register your exceptions here
     */
    EXCEPTIONS: {
        DefaultException,
        ForbiddenException,
    },

    /**
     * Register your functions here
     */
    FUNCTIONS: {
        GET_PARAM: GetParam,
        JSON_TO_FORM_DATA: JsonToFormData,
        VALIDATE_EMAIL_ADDRESS: ValidateEmailAddress,
        REMOVE_ENDING_SLASH: RemoveEndingSlash,
        CONVERT_DATE: ConvertDate,
        CONVERT_MYSQL_DATE: ConvertMysqlDateTime,
        DROPDOWN_OBJECT_MAKER: DropdownObjectMaker,
        GET_SESSION_YEARS: GetSessionYears,
        IS_NUMBER: IsNumber,
        IS_INT: IsInt,
        IS_FLOAT: IsFloat,
        PRINT_AREA: PrintArea,
        CAPITALIZE: Capitalize,
    },

    /**
     * Register your service providers here
     */
    SERVICES: {
        CORE: {
            ALERT_DIALOG: AlertDialogProvider,
        },
        AUTH: AuthProvider,
        BASIC_SETTINGS: BasicSettingsProvider,
        UNIT_HISTORY: UnitHistoryProvider,
        SWITCH_PROJECT: SwitchProjectProvider,
        PROJECT: ProjectProvider,
        CONTRACTOR: ContractorProvider,
        SUPPLIER: SupplierProvider,
        NOTICES: NoticeProvider,

        FUND: FundProvider,
        CFFUND: CFFundProvider,
        MISC: MiscProvider,
        BALANCE_SHEET: BalanceSheetProvider,

        OFFICERS: OfficerProvider,
        UNITS: UnitProvider,
        SECTIONS: SectionProvider,
        MESSAGE: MessageProvider,
        DSTN: DstnProvider,
        ITEM_HEAD: ItemHeadProvider,
        GALLERYS: GalleryProvider,
        SESSION_FILTER: SessionFilterProvider,
        EQUIPMENT_CATEGORY: EquipmentCategoryProvider,
        EQUIPMENTS: EquipmentProvider,
        ARCHIVE_HEADS: ArchiveHeadProvider,
        ARCHIVES: ArchiveProvider,

        BILL: BillProvider,
    }
};