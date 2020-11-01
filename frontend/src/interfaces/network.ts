import { IDevice } from "./device";

export interface INetwork {
    Id?: number;
    NetworkName: string;
    Devices: IDevice[];
}