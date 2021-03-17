import React from 'react';
import {connect} from "react-redux";
import {IAlertPayload} from "../../../../App/Interfaces/Global/AlertDialog/AlertDialog";
import SweetAlert from "react-bootstrap-sweetalert/dist";
import {css} from "@emotion/css";

const __css_alertCancelBtn = css(`
    color: #2d2d2d !important;
    text-decoration: none !important;
    border: 1px solid #a6a6a6;
`);

const AlertDialog = (props: any): any => {
    const show: IAlertPayload['show'] = props.show;
    const style: IAlertPayload['style'] = props.style;
    const btnSize: IAlertPayload['btnSize'] = props.btnSize;
    const alertType: IAlertPayload['alertType'] = props.alertType;
    const title: IAlertPayload['title'] = props.title;
    const cancelBtnText: IAlertPayload['cancelBtnText'] = props.cancelBtnText;
    const confirmBtnText: IAlertPayload['confirmBtnText'] = props.confirmBtnText;
    const showCancel: IAlertPayload['showCancel'] = props.showCancel;
    const focusCancelBtn: IAlertPayload['focusCancelBtn'] = props.focusCancelBtn;
    const message: IAlertPayload['message'] = props.message;
    const onConfirm: IAlertPayload['onConfirm'] = props.onConfirm;
    const onCancel: IAlertPayload['onCancel'] = props.onCancel;


    return (
        <React.Fragment>
            <SweetAlert
                show={show}
                btnSize={btnSize}
                style={style}
                {...{[alertType]: true}}
                showCancel={showCancel}
                focusCancelBtn={focusCancelBtn}
                cancelBtnText={cancelBtnText}
                confirmBtnText={confirmBtnText}
                cancelBtnCssClass={__css_alertCancelBtn}
                confirmBtnBsStyle={alertType}
                title={title}
                onConfirm={onConfirm}
                onCancel={onCancel}
                allowEscape={true}>
                {message}
            </SweetAlert>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => {
    return {
        ...state.ALERT_DIALOG,
    }
};

export default connect(mapStateToProps)(AlertDialog);
