import {Store} from "../../../../../Global/Data/Store/Store";
import {SET_ALERT} from "../../../../../Global/Data/Actions/Global/AlertDialog/AlertDialog.Action";
import {IAlertPayload} from "../../../../Interfaces/Global/AlertDialog/AlertDialog";

export class AlertDialogProvider {
    public Show(props: Partial<IAlertPayload>): void {
        Store.dispatch(SET_ALERT(props));
    }
}