export const ROUTE_PATHS: any = {
    ROOT: '/',
    COMMON: {
        REACT_HOME: '/react-home',
    },
    PUBLIC: {
        LOGIN: '/login',
    },
    PRIVATE: {
        ROOT: '/dashboard',
        DASHBOARD: '/dashboard',

        /**
         * Basic Settings
         */
        BASIC_SETTINGS: '/dashboard/basic_settings',
        UNIT_HISTORY: '/dashboard/unit_history',

        /**
         * Projects
         */
        PROJECTS: '/dashboard/projects',
        CREATE_PROJECT: '/dashboard/project/create',
        EDIT_PROJECT: '/dashboard/project/edit',
        PROJECT_DETAILS: '/dashboard/project/details',
        PROJECT_DETAILS_PRINTABLE_REPORT: '/project/details/report/print',

        /**
         * Contractors
         */
        CONTRACTORS: '/dashboard/contractors',
        CREATE_CONTRACTOR: '/dashboard/contractor/create',
        EDIT_CONTRACTOR: '/dashboard/contractor/edit',
        CONTRACTOR_DETAILS: '/dashboard/contractor/details',

        /**
         * Suppliers
         */
        SUPPLIERS: '/dashboard/suppliers',
        CREATE_SUPPLIER: '/dashboard/supplier/create',
        EDIT_SUPPLIER: '/dashboard/supplier/edit',
        SUPPLIER_DETAILS: '/dashboard/supplier/details',

        /**
         * Notices
         */
        NOTICES: '/dashboard/notices',
        CREATE_NOTICE: '/dashboard/notice/create',
        EDIT_NOTICE: '/dashboard/notice/edit',
        VIEW_NOTICE: '/dashboard/notice/view',

        /**
         * Officers
         */
        USERS: '/dashboard/users',
        CREATE_USER: '/dashboard/users/create',
        EDIT_OFFICER: '/dashboard/users/edit',
        VIEW_OFFICER: '/dashboard/users/view',

        /**
         * Funds
         */
        FUNDS: '/dashboard/funds',
        ASSIGN_WORK: '/dashboard/assign/work',
        CREATE_ASSIGN_WORK: '/dashboard/assign-work/create',
        EDIT_ASSIGN_WORK: '/dashboard/assign-work/edit',
        FUND_SESSION_FILTER: '/dashboard/funds/session',

        CREATE_FUND: '/dashboard/funds/create',
        EDIT_FUND: '/dashboard/funds/edit',
        FUND_REPORT: '/dashboard/funds/report',


        PF_FUND: '/dashboard/pf-fund',
        PF_BALANCE_SHEET: '/dashboard/pf-fund/balance_sheet',
        BALANCE_SHEET_CREATE: '/dashboard/balance_sheet/create',
        PF_BALANCE_SHEET_REPORT: '/dashboard/pf-fund/report/balance_sheet',
        CF_BALANCE_SHEET: '/dashboard/cf-fund/balance_sheet',
        CF_BALANCE_SHEET_CREATE: '/dashboard/cf-fund/balance_sheet/create',
        PF_RECEIVED_VOUCHER: '/dashboard/pf-fund/report/balance_sheet',
        PF_PAYMENT_VOUCHER: '/dashboard/pf-fund/report/balance_sheet',
        PF_BOQ_WK_ORDER: '/dashboard/pf-fund/report/balance_sheet',
        PF_ONGOING_ASSIGNMENTS: '/dashboard/pf-fund/report/balance_sheet',
        PF_BALANCE_SHEET_SESSION_REPORT: '/dashboard/pf-fund/balance_sheet_report',
        PF_BALANCE_SHEET_LIST_PRINTABLE: '/pf-fund/balance_sheet/list/print',
        PF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE: '/balance_sheet_report/pf-fund/print',
        CF_BALANCE_SHEET_SESSION_REPORT: '/dashboard/cf-fund/balance_sheet_report',
        MISC_BALANCE_SHEET_SESSION_REPORT: '/dashboard/misc-fund/balance_sheet_report',

        CF_FUND: '/dashboard/cf-fund',
        CREATE_CF_FUND: '/dashboard/cf-fund/create',
        EDIT_CF_FUND: '/dashboard/cf-fund/edit',

        CF_BALANCE_SHEET_REPORT: '/dashboard/cf-fund/report/balance_sheet',
        CF_RECEIVED_VOUCHER: '/dashboard/cf-fund/report/balance_sheet',
        CF_PAYMENT_VOUCHER: '/dashboard/cf-fund/report/balance_sheet',
        CF_BOQ_WK_ORDER: '/dashboard/cf-fund/report/balance_sheet',
        CF_ONGOING_ASSIGNMENTS: '/dashboard/cf-fund/report/balance_sheet',
        CF_BALANCE_SHEET_SESSION_REPORT_PRINTABLE: '/balance_sheet_report/cf-fund/print',

        MISC_FUND: '/dashboard/misc-fund',
        CREATE_MISC: '/dashboard/misc-fund/create',
        EDIT_MISC: '/dashboard/misc-fund/edit',

        MISC_BALANCE_SHEET_REPORT: '/dashboard/pf-fund/report/balance_sheet',
        MISC_RECEIVED_VOUCHER: '/dashboard/pf-fund/report/balance_sheet',
        MISC_PAYMENT_VOUCHER: '/dashboard/pf-fund/report/balance_sheet',
        MISC_BOQ_WK_ORDER: '/dashboard/pf-fund/report/balance_sheet',
        MISC_ONGOING_ASSIGNMENTS: '/dashboard/pf-fund/report/balance_sheet',
        MISC_BALANCE_SHEET_SESSION_REPORT_PRINTABLE: '/balance_sheet_report/misc-fund/print',

        /**
         * Setting Config
         */
        UNITS: '/dashboard/units',
        CREATE_UNIT: '/dashboard/unit/create',
        EDIT_UNIT: '/dashboard/unit/edit',

        /**
         * Sections
         */
        SECTIONS: '/dashboard/sections',
        CREATE_SECTION: '/dashboard/section/create',
        EDIT_SECTION: '/dashboard/section/edit',

        /**
         * Messages
         */
        MESSAGES: '/dashboard/messages',
        CREATE_MESSAGE: '/dashboard/message/create',
        EDIT_MESSAGE: '/dashboard/message/edit',

        DSTNS: '/dashboard/dstns',
        CREATE_DSTN: '/dashboard/dstn/create',
        EDIT_DSTN: '/dashboard/dstn/edit',

        ITEM_HEADS: '/dashboard/item_heads',
        CREATE_ITEM_HEAD: '/dashboard/item_head/create',
        EDIT_ITEM_HEAD: '/dashboard/item_head/edit',

        GALLERYS: '/dashboard/gallerys',
        CREATE_GALLERY: '/dashboard/gallery/create',
        GALLERY_GRID: '/dashboard/gallery/grid',
        EDIT_GALLERY: '/dashboard/gallery/edit',

        EQUIPMENT_CATEGORY: '/dashboard/equipmentCategorys',
        CREATE_EQUIPMENT_CATEGORY: '/dashboard/equipmentCategory/create',
        EDIT_EQUIPMENT_CATEGORY: '/dashboard/equipmentCategory/edit',

        EQUIPMENTS: '/dashboard/equipments',
        CREATE_EQUIPMENTS: '/dashboard/equipment/create',
        EDIT_EQUIPMENTS: '/dashboard/equipment/edit',

        BILLS: '/dashboard/payments/bills',
        CREATE_BILL: '/dashboard/payments/bill/create',
        EDIT_BILL: '/dashboard/payments/bill/edit',
        BILL_REPORT_VIEW: '/dashboard/payments/bill/report',
        BILL_REPORT_VIEW_PRINT: '/payments/bill/report/print',

        PAYMENT_HISTORY: '/dashboard/payment/history',
        PAYMENT_HISTORY_REPORT_PRINTABLE: '/payment/history/report/print',
        PAYMENT_HISTORY_TASK: '/dashboard/payment/history',

        ARCHIVE_HEADS: '/dashboard/archive-heads',
        CREATE_ARCHIVE_HEAD: '/dashboard/archive-head/create',
        EDIT_ARCHIVE_HEAD: '/dashboard/archive-head/edit',

        ARCHIVES: '/dashboard/archives',
        CREATE_ARCHIVES: '/dashboard/archive/create',
        EDIT_ARCHIVES: '/dashboard/archive/edit',

        LOGOUT: '/dashboard/logout',
    },
};
