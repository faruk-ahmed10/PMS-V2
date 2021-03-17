import React from 'react';
import Routes from "./Routes/Routes";
import {GlobalStyle} from "./Static/Styles/GlobalStyles";
import GlobalComponents from "./Global/Components/GlobalComponents";

const App = () => {
    return (
        <React.Fragment>
            <GlobalStyle/>
            <Routes/>
            <GlobalComponents />
        </React.Fragment>
    );
};

export default App;