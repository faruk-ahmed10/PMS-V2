import {combineReducers} from "redux";
import {AUTH} from "./Global/Auth/Auth.Reducer";
import {ALERT_DIALOG} from "./Global/AlertDialog/AlertDialog.Reducer";
import { SESSION_FILTER } from './Private/SessionFilter/SessionFilter.Reducer';
import {SWITCH_PROJECT} from "./Private/SwitchProject/SwitchProject.Reducer";

/**
 * Combined Reducers
 * @type {Reducer<CombinedState<{}>>}
 */
export const RootReducer: any =  combineReducers({
    AUTH,
    ALERT_DIALOG,
    SESSION_FILTER,
    SWITCH_PROJECT,
});