export interface ISessionFilter {
    FundName: 'PF' | 'CF' | 'MISC' | 'ARC' | 'RR' | '',
    Title: string,
    Action: 'BS' | 'RV' | 'PV' | 'BWO' | 'OA' | '',
    StartYear: string | number,
    EndYear: string | number,
}