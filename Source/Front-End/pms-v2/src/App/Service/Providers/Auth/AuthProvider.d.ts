export interface IAuthProvider {
    set(token: string): void | boolean;
    check(): boolean;
    getToken(): string | undefined | null;
    remove(): void | boolean;
}