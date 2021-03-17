export function DropdownObjectMaker(array: any, labelKey: string, valueKey: string) {
    const TempArray: Array<{ label: any, value: any, }> = [{
        label: '-- Select --',
        value: '',
    }];

    for (let i = 0; i < array.length; i++) {
        TempArray.push({
            label: array[i][labelKey],
            value: array[i][valueKey],
        });
    }

    return TempArray;
}