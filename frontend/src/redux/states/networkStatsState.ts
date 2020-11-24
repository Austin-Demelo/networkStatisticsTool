import { INetworkStats } from "../../interfaces/networkStats";

export interface INetworkStatsState {
    networksstats: INetworkStats[];
    hasError: boolean;
    message: string;
}