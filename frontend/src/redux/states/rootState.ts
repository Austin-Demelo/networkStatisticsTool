import { INetworkState } from "./networkState";
import { IUserState } from "./userState";
import { IDeviceState } from "./deviceState";
import {IProblemState} from "./problemState";

export interface IRootState {
	users: IUserState;
	devices: IDeviceState;
	networks: INetworkState;
	problems: IProblemState;
}