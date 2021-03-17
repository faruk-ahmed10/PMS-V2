import React, {useEffect} from 'react';
import axios from 'axios';
import {APP} from "../../../../App/Init/AppProvider";
import {withRouter} from 'react-router-dom';

const Logout = (props: any) => {
    const TryLogOut = () => {
        axios.get(APP.CONFIG.API_ROOT + '/auth/logout', {
            headers: {
                Authorization: `Bearer ${new APP.SERVICES.AUTH().getToken()}`
            }
        }).then(({data}) => {
            if (data.success) {
                new APP.SERVICES.AUTH().remove();
                new APP.SERVICES.SWITCH_PROJECT().removeActiveProject();
                props.history.push("/login");
            } else {
                alert(data.message);
            }
        }).catch((error) => {
            alert('Failed to logout! ' + error);
        });
    };

    useEffect(() => {
        TryLogOut();
    })
    return (
        <React.Fragment/>
    );
};

export default withRouter(Logout);