import {IAuthProvider} from './AuthProvider.d';
import {SET_AUTH} from "../../../../Global/Data/Actions/Global/Auth/Auth.Action";
import {Store} from "../../../../Global/Data/Store/Store";

export class AuthProvider implements Required<IAuthProvider> {
    protected Identifier: string;
    protected LS: typeof window.localStorage;

    public constructor() {
        this.LS = window.localStorage;
        this.Identifier = '__token';
    }

    public set(token: string) {
        this.LS.setItem(this.Identifier, token);
    }

    public check() {
        const token: string | null | undefined = this.LS.getItem(this.Identifier);
        return typeof token !== 'undefined' && token !== '' && token !== null;
    }

    public getToken() {
        return this.LS.getItem(this.Identifier);
    }

    public remove() {
        Store.dispatch(SET_AUTH(false));
        this.LS.removeItem(this.Identifier);
    }
}