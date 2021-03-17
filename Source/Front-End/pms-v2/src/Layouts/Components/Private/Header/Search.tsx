import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from "@material-ui/icons/Search";
import {css} from "@emotion/css";

const __css_searchContainer = css(`
    color: #ffffff;
    text-align: center;
    padding: 0;
    background: #ffffff;
    border-radius: 15px;
    margin-top: 10px;
    text-align: left;
    
    
    & td {
        padding: 0;
    }
    
    & input {
        border: 0;
        padding: 5px;
        margin: 0;
        border-radius: 15px;
        padding-left: 10px;
        outline: 0;
    }
    @media only screen and (max-width: 984px) {
        & input {
            padding: 2px;
            padding-left: 10px;
            font-size: 13px;
        }
    }
    
    & td {
        
    }
    
    & td:last-child {
        padding: 2px 15px;
        border-radius: 15px;
        background: red;
        border: 0;
    }
    
    & td:last-child:hover {
        background: #000000;
        color: #ffffff;
    }
`);

const SearchBar = (props: any): any => {
    return (
        <React.Fragment>
            <div style={{display: 'inline-block'}}>
                <table className={__css_searchContainer} cellSpacing={0} cellPadding={0}>
                    <tbody>
                    <tr>
                        <td>
                            <input placeholder={"Search"} value={props.value} onChange={props.onChange}/>
                        </td>
                        <td onClick={props.onSubmit}>
                            <SearchIcon style={{fontSize: 19, marginTop: 0}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

SearchBar.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
