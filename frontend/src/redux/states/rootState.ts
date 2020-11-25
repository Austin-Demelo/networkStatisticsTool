import { IDeviceState } from "./deviceState";
import { INetworkState } from "./networkState";
import { INetworkStatsState } from "./networkStatsState";
import {IProblemState} from "./problemState";
import { IUserState } from "./userState";

export interface IRootState {
	users: IUserState;
	devices: IDeviceState;
	networks: INetworkState;
	networkStats: INetworkStatsState;
	problems: IProblemState;
}