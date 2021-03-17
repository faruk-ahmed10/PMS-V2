export function GetParam(Param: string): any {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(Param);
}