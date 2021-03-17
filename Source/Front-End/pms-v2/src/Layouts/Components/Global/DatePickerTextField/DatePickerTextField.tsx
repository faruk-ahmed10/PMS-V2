import React from 'react';
import TextField from "../TextField/TextField";
import DatePicker from "react-datepicker";
import {css} from "@emotion/css";
import {APP} from "../../../../App/Init/AppProvider";
import $ from 'jquery';
import FontAwesome from "react-fontawesome";

const __css_DatePickerTextField = css(`
    position: relative;
`);

const __css_DatePickerResetIcon = css(`
    position: absolute;
    top: 12%;
    right: 10px;
    padding: 2px 7px;
    border-radius: 50%;
    color: #4d4d4d;
    font-size: 14px;
    
    &:hover {
        background: #dddddd;
    }
`);

const DatePickerTextField = ({label, name, value, onChange}: Required<{
    label: string,
    name: string,
    value: string,
    onChange(date: any): any
}>) => {

    React.useEffect((): any => {
        $('.DatePickerTextField').click(function () {
            $(this).find('.react-datepicker__input-container input').focus();
        });
    });

    return (
        <React.Fragment>
            <div className={"DatePickerTextField" + " " + __css_DatePickerTextField}>
                <TextField defaultValue={""} value={APP.FUNCTIONS.CONVERT_DATE(value, 'dd-mm-yyyy')} type={"text"}
                           name={name} label={label}
                           onChange={() => {
                           }} labelIconNode={<i className={"fa fa-calendar"}/>}/>
                <DatePicker onChange={date => onChange(date)}/>
                <span className={__css_DatePickerResetIcon} onClick={() => {
                    onChange('');
                }}>
                    <FontAwesome name={"close"}/>
                </span>
            </div>
        </React.Fragment>
    );
};

export default DatePickerTextField;
