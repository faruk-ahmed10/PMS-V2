import {ISessionFilter} from "../../../Reducers/Private/SessionFilter/SessionFilter.Interface";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */

const NAMESPACE: string = 'APP/SESSION_FILTER/';

/**
 * A constructor to return the action with namespace, Must use as defined
 * @private Not Exported
 * @param ACTION {string}
 * @returns {string}
 * @constructor
 */
function USE(ACTION: string): string {
    return NAMESPACE + ACTION;
}

//Action types
export const actionTypes: any = {
    HANDLE_SET_SESSION_FILTER: USE('HANDLE_SET_SESSION_FILTER'),
    HANDLE_SET_SESSION_FILTER_DATE: USE('HANDLE_SET_SESSION_FILTER_DATE'),
};

/**
 * Set the Session Filter
 * @param value {object}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_SESSION_FILTER(value: Partial<ISessionFilter>) : any {
    return {
        type: actionTypes.HANDLE_SET_SESSION_FILTER,
        payload: value,
    }
}

/**
 * Set the Session Filter
 * @param value {object}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_SESSION_FILTER_DATE(value: Required<Pick<ISessionFilter, 'StartYear' | 'EndYear'>>) : any {
    return {
        type: actionTypes.HANDLE_SET_SESSION_FILTER_DATE,
        payload: value,
    }
}