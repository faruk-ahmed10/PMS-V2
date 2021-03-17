import React from "react";

export interface IAlertAction {
    type: string,
    payload: Partial<IAlertPayload>
}

export interface IAlertPayload {
    show: boolean,
    style: React.CSSProperties,
    btnSize: string,
    alertType: 'success' | 'error' | 'danger' | 'warning' | 'info',
    showCancel: boolean,
    focusCancelBtn: boolean,
    title: string,
    cancelBtnText: string,
    confirmBtnText: string,
    message: string,
    onConfirm(): void | boolean,
    onCancel(): void | boolean,
}