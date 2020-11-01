import { INetworkState } from "./networkState";
import { IUserState } from "./userState";

export interface IRootState {
	users: IUserState;
	networks: INetworkState;
}