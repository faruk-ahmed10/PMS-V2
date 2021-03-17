import {createStore} from "redux";
import {RootReducer} from "../Reducers/RootReducer"

export const Store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());