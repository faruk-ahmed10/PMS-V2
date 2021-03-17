export function RemoveEndingSlash(string: string): string {
    return string.replace(/\/$/, "");
}