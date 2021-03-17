/**
 * Returns all the sessions counting the range year and the limit
 * @param PrevYearNumber {number}
 * @param CurrentYear {number | dateFns}
 * @constructor
 */
export function GetSessionYears(PrevYearNumber: number = 4, CurrentYear: number = new Date().getFullYear()) {
    const sessions: Array<{
        session: string,
        startYear: string | number,
        endYear: string | number,
    }> = [];

    for (let i = (CurrentYear - PrevYearNumber); i <= CurrentYear; i++) {
        sessions.push({
            session: (i + "-" + (i + 1)).toString(),
            startYear: i,
            endYear: i + 1,
        });
    }

    return sessions;
}