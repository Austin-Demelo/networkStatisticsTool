import { INetworkState } from "./networkState";
import { IUserState } from "./userState";
import { IDeviceState } from "./deviceState";
import {IProblemState} from "./problemState";
import { INetworkStatsState } from "./networkStatsState";

export interface IRootState {
	users: IUserState;
	devices: IDeviceState;
	networks: INetworkState;
	networkStats: INetworkStatsState;
	problems: IProblemState;
}