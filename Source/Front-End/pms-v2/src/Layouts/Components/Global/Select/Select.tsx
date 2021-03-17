import React, {useEffect, useState} from 'react';
import {css} from "@emotion/css";


const __css_Select = css(`
    text-align: left;
    position: relative;
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
    & select:focus,
    & select:hover {
        outline: none;
        border-color: #9FB1C1;
    }
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
        top: 5px;
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

const Select = ({options, defaultValue, value, name, label, onChange, multiple, labelIconNode}: Partial<{
    options: Array<{
        value: number | string,
        label: string,
    }>,
    defaultValue: any,
    value: any,
    name: string,
    label: string,
    multiple: boolean,
    onChange(e: any): any,
    labelIconNode: any,
}>): any => {
    const [active, setActive] = useState(!(typeof value === 'undefined' || value === '' || value === null));

    useEffect(() => {
        if(!(typeof value === 'undefined' || value === '' || value === null)) {
            setActive(!(typeof value === 'undefined' || value === '' || value === null));
        }
    });

    const __uid: string = Math.random().toString(16).slice(2);
    return (
        <React.Fragment>
            <div className={__css_Select}>
                <select defaultValue={defaultValue} value={value} id={__uid} className={"floatLabel"}
                        name={name} onChange={onChange} onClick={() => setActive(true)}
                        multiple={multiple}
                        onBlur={() => {
                            if (typeof value === 'undefined' || value === '' || value === null) {
                                setActive(false);
                            }
                        }}>
                    {active && typeof options !== 'undefined' && options.map((option, index) => (
                        <option value={option.value}key={index}>{option.label}</option>
                    ))}
                </select>
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

export default Select;