import {actionTypes} from "../../../Actions/Private/SessionFilter/SessionFilter.Action";
import {ISessionFilter} from "./SessionFilter.Interface";
import {SessionFilterProvider} from "../../../../../App/Service/Providers/SessionFilter/SessionFilterProvider";

const __parkedData = new SessionFilterProvider().getFromStorage();

const InitialState: ISessionFilter = __parkedData !== null ? __parkedData : {
    FundName: '',
    Title: '',
    Action: '',
    StartYear: '',
    EndYear: '',
};

export function SESSION_FILTER(state: ISessionFilter = InitialState, action: any): any {
    switch (action.type) {
        case actionTypes.HANDLE_SET_SESSION_FILTER :
            return {
                ...state,
                FundName: action.payload.FundName,
                Title: action.payload.Title,
                Action: action.payload.Action,
            };
        case actionTypes.HANDLE_SET_SESSION_FILTER_DATE :
            return {
                ...state,
                StartYear: action.payload.StartYear,
                EndYear: action.payload.EndYear,
            };
        default :
            return state;
    }
}