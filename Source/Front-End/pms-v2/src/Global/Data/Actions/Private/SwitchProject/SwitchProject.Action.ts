import {ISwitchProjectInterface} from "../../../Reducers/Private/SwitchProject/SwitchProject.Interface";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */

const NAMESPACE: string = 'APP/SWITCH_PROJECT/';

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
    HANDLE_SET_ACTIVE_PROJECT: USE('HANDLE_SET_ACTIVE_PROJECT'),
};

/**
 * Set the Session Filter
 * @param value {object}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_ACTIVE_PROJECT(value: Partial<ISwitchProjectInterface>) : any {
    return {
        type: actionTypes.HANDLE_SET_ACTIVE_PROJECT,
        payload: value,
    }
}