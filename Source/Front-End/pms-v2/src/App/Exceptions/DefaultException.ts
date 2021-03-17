import {AlertDialogProvider} from "../Service/Providers/Core/AlertDialog/AlertDialogProvider";

export function DefaultException(error: any): void {
    new AlertDialogProvider().Show({
        show: true,
        style: {fontSize: 12},
        title: "Error",
        message: "Error occurred! " + !error.response ? error.toString() : error.response.message.toString(),
        showCancel: false,
        confirmBtnText: "Okay",
        alertType:"danger",
        btnSize: "10",
        onConfirm(): void | boolean {
            new AlertDialogProvider().Show({show: false});
        }
    });
}