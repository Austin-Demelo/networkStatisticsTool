import { IDevice } from "../../interfaces/device";

export interface IDeviceState {
    devices: IDevice[];
    hasError: boolean;
    message: string;
}