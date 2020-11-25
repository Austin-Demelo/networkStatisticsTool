import { INetworkStats } from "../../interfaces/networkStats";

export interface INetworkStatsState {
    networkStats: Array<INetworkStats>;
    hasError: boolean;
    message: string;
}