import {IAlertAction, IAlertPayload} from '../../../../../App/Interfaces/Global/AlertDialog/AlertDialog';

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE: string = 'APP/ALERT/DIALOG';

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
    HANDLE_SET_ALERT: USE('HANDLE_SET_ALERT'),
};

/**
 * For creating a new alert dialog
 * @returns {{payload: *, type: string}}
 * @constructor
 * @param alertProps
 */

export function SET_ALERT(alertProps: Partial<IAlertPayload>): IAlertAction {
    return {
        type: actionTypes.HANDLE_SET_ALERT,
        payload: alertProps,
    }
}