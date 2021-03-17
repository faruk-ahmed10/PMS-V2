import {Store} from '../../../../Global/Data/Store/Store';
import {ISessionFilter} from "../../../../Global/Data/Reducers/Private/SessionFilter/SessionFilter.Interface";
import {
    SET_SESSION_FILTER,
    SET_SESSION_FILTER_DATE
} from '../../../../Global/Data/Actions/Private/SessionFilter/SessionFilter.Action';

export class SessionFilterProvider {
    private readonly __identifier: string;

    constructor() {
        this.__identifier = '__sessionFilerSupport';
    }

    public getFromStorage(): any {
        let __data: any = localStorage.getItem(this.__identifier);
        if(typeof __data !== 'undefined' && __data !== null && __data !== '') {
            __data = JSON.parse(__data.toString());
            return __data;
        }

        return null;
    }

    public saveInStorage(SessionFilterData: ISessionFilter): void {
        window.localStorage.setItem(this.__identifier, JSON.stringify(SessionFilterData));
    }

    public setSessionFilter(params: Partial<ISessionFilter>): void {
        Store.dispatch(SET_SESSION_FILTER(params));
        this.saveInStorage(Store.getState().SESSION_FILTER);
    }

    public setSessionFilterDate(params: Required<Pick<ISessionFilter, 'StartYear' | 'EndYear'>>): void {
        Store.dispatch(SET_SESSION_FILTER_DATE(params));
        this.saveInStorage(Store.getState().SESSION_FILTER);
    }
}