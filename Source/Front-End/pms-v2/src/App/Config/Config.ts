declare global {
    interface Window {
        CONFIG_GLOBAL: Required<{
            APP_ROOT: string,
            API_ROOT: string,
            CDN_ROOT: string,
        }>;
    }
}

export const Config = {
    APP_ROOT: window.CONFIG_GLOBAL.APP_ROOT,
    API_ROOT: window.CONFIG_GLOBAL.API_ROOT,
    CDN_ROOT: window.CONFIG_GLOBAL.CDN_ROOT,
};