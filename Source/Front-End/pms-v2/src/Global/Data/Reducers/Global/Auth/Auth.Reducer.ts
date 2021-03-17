import {actionTypes} from "../../../Actions/Global/Auth/Auth.Action";

const InitialState: any = {
    LoggedIn: false,
};

export function AUTH(state: any = InitialState, action: any) : any {
    switch (action.type) {
        case actionTypes.HANDLE_SET_AUTH :
            return {
                ...state,
                LoggedIn: action.payload,
            };
        default : return state;
    }
}