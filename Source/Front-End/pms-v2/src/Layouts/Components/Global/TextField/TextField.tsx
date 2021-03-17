import React, {useEffect, useState} from 'react';
import {css} from "@emotion/css";

import "react-datepicker/dist/react-datepicker.css";


const __css_TextField = css(`
    text-align: left;
    position: relative;
    
    & input[type=text],
    & input[type=email],
    & input[type=password],
    & input[type=search],
    & input[type=number],
    & input[type=date],
    & input[type=tel],
    & input[type=file],
    & textarea,
    & button,
    & select {
        padding: 7px;
        font-size: 14px;
        border: 1px solid #c6c6c6;
        width: 100%;
        margin-bottom: 18px;
        color: #888;
        font-family: "Lato", "sans-serif";
        font-size: 16px;
        font-weight: 300;
    }
    & input[type=text]:focus, & input[type=text]:hover,
    & input[type=email]:focus,
    & input[type=email]:hover,
    & input[type=password]:focus,
    & input[type=password]:hover,
    & input[type=search]:focus,
    & input[type=search]:hover,
    & input[type=number]:focus,
    & input[type=number]:hover,
    & input[type=date]:focus,
    & input[type=date]:hover,
    & input[type=tel]:focus,
    & input[type=tel]:hover,
    & input[type=file]:focus,
    & input[type=file]:hover,
    & textarea:focus,
    & textarea:hover,
    & button:focus,
    & button:hover,
    & select:focus,
    & select:hover {
        outline: none;
        border-color: #9FB1C1;
    }
    & input[type=text]:focus + label, & input[type=text]:hover + label,
    & input[type=email]:focus + label,
    & input[type=email]:hover + label,
    & input[type=password]:focus + label,
    & input[type=password]:hover + label,
    & input[type=search]:focus + label,
    & input[type=search]:hover + label,
    & input[type=number]:focus + label,
    & input[type=number]:hover + label,
    & input[type=date]:focus + label,
    & input[type=date]:hover + label,
    & input[type=tel]:focus + label,
    & input[type=tel]:hover + label,
    & input[type=file]:focus + label,
    & input[type=file]:hover + label,
    & textarea:focus + label,
    & textarea:hover + label,
    & button:focus + label,
    & button:hover + label,
    & select:focus + label,
    & select:hover + label {
        color: #1b3d4d;
        cursor: text;
    }
    & .fa-sort {
        position: absolute;
        right: 10px;
        top: 17px;
        color: #999;
    }
    & select {
        cursor: pointer;
    }
    & label {
        position: absolute;
        left: 8px;
        top: 7px;
        color: #999;
        font-size: 16px;
        display: inline-block;
        padding: 1px 10px;
        font-weight: 500;
        background-color: rgba(255, 255, 255, 0);
        background-color: white;
    }
    & label.active {
        top: -15px;
        color: #555;
        background-color: white;
        width: auto;
    }
    & textarea {
        resize: block;
        height: 100px;
    }
`);

const __css_label_text = css(`
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
`);

const __css_label_icon = css(`
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -1px;
`);

const TextField = ({defaultValue, value, type, name, label, onChange, labelIconNode}: Partial<{
    defaultValue: any,
    value: any,
    type: 'email' | 'text' | 'password' | 'number' | 'search' | 'textarea' | 'file',
    name: string,
    label: string,
    onChange(e: any): any,
    labelIconNode: any,
}>): any => {
    const [active, setActive] = useState(!(typeof value === 'undefined' || value === '' || value === null) || type === 'file');

    useEffect(() => {
        if(!(typeof value === 'undefined' || value === '' || value === null) || type === 'file') {
            setActive(!(typeof value === 'undefined' || value === '' || value === null) || type === 'file');
        }
    });

    const __uid: string = Math.random().toString(16).slice(2);
    return (
        <React.Fragment>
            <div className={__css_TextField}>
                {type !== 'textarea' && type !== 'file' ? (
                    <input defaultValue={defaultValue} value={value} type={type} id={__uid} className={"floatLabel"}
                           name={name} onChange={onChange} onFocus={() => setActive(true)}
                           onBlur={() => {
                               if (typeof value === 'undefined' || value === '' || value === null) {
                                   setActive(false);
                               }
                           }}/>
                ) : (type === 'textarea') ? (
                    <textarea defaultValue={defaultValue} value={value} id={__uid} className={"floatLabel"}
                              name={name} onChange={onChange} onFocus={() => setActive(true)}
                              onBlur={() => {
                                  if (typeof value === 'undefined' || value === '' || value === null) {
                                      setActive(false);
                                  }
                              }}/>

                ): (
                    <input type={type} id={__uid} className={"floatLabel"}
                           name={name} onChange={onChange}/>
                )}
                <label htmlFor={__uid} className={active ? "active" : ""}>
                    {typeof labelIconNode !== 'undefined' && labelIconNode !== null && (
                        <span className={__css_label_icon}>
                            {labelIconNode}
                        </span>
                    )}
                    <span className={__css_label_text}>
                        {label}
                    </span>
                </label>
            </div>
        </React.Fragment>
    );
};

export default TextField;