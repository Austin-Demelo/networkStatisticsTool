export interface IConfigSetting {
    port: number;
    baseURL: string;
    baseRoute: string;
}
export interface IConfigSettings {
    [key : string] : IConfigSetting;
}
export interface IConfig {
    settings: IConfigSettings;
}