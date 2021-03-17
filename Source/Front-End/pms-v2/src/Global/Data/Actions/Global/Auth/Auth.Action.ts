/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE: string = 'APP/AUTH/';

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
    HANDLE_SET_AUTH: USE('HANDLE_SET_AUTH'),
};

/**
 * Set the Authentication, true||false
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_AUTH(value: boolean) : any {
    return {
        type: actionTypes.HANDLE_SET_AUTH,
        payload: value,
    }
}