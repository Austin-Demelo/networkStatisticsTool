import { INetwork } from "../../interfaces/network";

export interface INetworkState {
    networks: INetwork[];
    hasError: boolean;
    message: string;
}