export function ConvertMysqlDateTime(MysqlDateTime: string): any {
    if(MysqlDateTime !== null) {
        const __dateTime = MysqlDateTime.toString().split(/[- :]/);
        return new Date(Date.UTC(Number(__dateTime[0]), Number(__dateTime[1]) - 1, Number(__dateTime[2]), Number(__dateTime[3]), Number(__dateTime[4]), Number(__dateTime[5])));
    }

    return '';
}