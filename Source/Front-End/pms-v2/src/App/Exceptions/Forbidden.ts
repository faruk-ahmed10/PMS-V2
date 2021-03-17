import {Store} from "../../Global/Data/Store/Store";
import {SET_AUTH} from "../../Global/Data/Actions/Global/Auth/Auth.Action";
import {AuthProvider} from "../Service/Providers/Auth/AuthProvider";
import {APP} from "../Init/AppProvider";

export function ForbiddenException(props: any): any {
    new AuthProvider().remove();
    Store.dispatch(SET_AUTH(false));
    props.history.push(APP.ROUTES.PUBLIC.LOGIN);
}