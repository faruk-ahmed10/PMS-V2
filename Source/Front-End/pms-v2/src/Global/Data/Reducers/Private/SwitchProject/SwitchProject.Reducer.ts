import {actionTypes} from "../../../Actions/Private/SwitchProject/SwitchProject.Action";
import {ISwitchProjectInterface} from './SwitchProject.Interface';
import {SwitchProjectProvider} from "../../../../../App/Service/Providers/SwitchProject/SwitchProjectProvider";

const InitialState: ISwitchProjectInterface = {
    id: new SwitchProjectProvider().getActiveProjectId().id,
    name: new SwitchProjectProvider().getActiveProjectId().name,
};

export function SWITCH_PROJECT(state: ISwitchProjectInterface = InitialState, action: any): any {
    switch (action.type) {
        case actionTypes.HANDLE_SET_ACTIVE_PROJECT :
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
            };
        default :
            return state;
    }
}