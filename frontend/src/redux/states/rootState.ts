import { INetworkState } from "./networkState";
import { IUserState } from "./userState";
import { IDeviceState } from "./deviceState"

export interface IRootState {
	users: IUserState;
	devices: IDeviceState;
	networks: INetworkState;
}