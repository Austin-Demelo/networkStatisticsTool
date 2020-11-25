import { INetworkStats } from "../../interfaces/networkStats";

export interface INetworkStatsState {
    networkStats: INetworkStats[];
    hasError: boolean;
    message: string;
}