import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {APP} from "../../../../Init/AppProvider";

export const CommonRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />;
            }}
        />
    )
};

export const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                const Auth = new APP.SERVICES.AUTH();
                return !Auth.check() ?
                    <Component {...props} /> :
                    <Redirect to={APP.ROUTES.PRIVATE.DASHBOARD}/>;
            }}
        />
    )
};

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                const Auth = new APP.SERVICES.AUTH();
                return Auth.check() ?
                    <Component {...props} /> :
                    <Redirect to={APP.ROUTES.PUBLIC.LOGIN}/>;
            }}
        />
    )
};