import {actionTypes} from "../../../Actions/Global/AlertDialog/AlertDialog.Action";
import {IAlertPayload} from "../../../../../App/Interfaces/Global/AlertDialog/AlertDialog";

const InitialState: Partial<IAlertPayload> = {
    show: false,
    style: {},
    btnSize: "",
    alertType: "success",
    showCancel: false,
    focusCancelBtn: false,
    title: "",
    cancelBtnText: "",
    confirmBtnText: "",
    message: "",
    onConfirm: () => {
    },
    onCancel: () => {
    },
};

export function ALERT_DIALOG(State: Partial<IAlertPayload> = InitialState, action: { type: string; payload: Partial<IAlertPayload> }) {
    switch (action.type) {
        case actionTypes.HANDLE_SET_ALERT :
            return {
                ...State,
                ...action.payload,
            };

        default:
            return State;
    }
}
