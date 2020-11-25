import { AppThunkAction } from '../../types/thunk'
import { HttpMethod } from '../../types/httpMethods'
import { INetworkStats } from '../../interfaces/networkStats'
import { INetworkStatsState } from '../states/networkStatsState'
import { UpdateStatus } from '../../types/updateStatus'
import { http } from '../../utilities/http'

const NetworkStatsActions = {
    GET_ALL_NETWORKSTATS: 'networkstats/GET_ALL_NETWORKSTATS',
    UPLOAD_STATS: 'networkstats/UPLOAD_STATS',
    DOWNLOAD_STATS: 'networkstats/DOWNLOAD_STATS',
    LATENCY_STATS: 'networkstats/LATENCY_STATS',
    PACKETLOSS_STATS: 'networkstats/PACKETLOSS_STATS',
}

export function getAllNetworkStats(
    deviceId: number
): AppThunkAction<Promise<INetworkStats[] | undefined>> {
    return async (dispatch, getState) => {
        try {
            let networks: INetworkStats[] = await http<INetworkStats[]>(
                `http://localhost:52288/api/networkstats/${deviceId}`
            )
            console.log(networks)
            dispatch({
                type: NetworkStatsActions.GET_ALL_NETWORKSTATS,
                payload: networks,
            })
            return networks
        } catch (error) {
            //TO-DO, Add Error to Network State
            console.log(error)
        }
    }
}

const initialState: INetworkStatsState = {
    networkStats: [],
    hasError: false,
    message: '',
}

export function networkStatsReducer(state = initialState, action) {
    switch (action.type) {
        case NetworkStatsActions.GET_ALL_NETWORKSTATS:
            return {
                ...state,
                networkStats: action.payload,
                hasError: false,
                message: "",
            };
        case NetworkStatsActions.UPLOAD_STATS:
            return {

            };
        case NetworkStatsActions.DOWNLOAD_STATS:
            return {

            };
        case NetworkStatsActions.LATENCY_STATS:
            return {

            };
        case NetworkStatsActions.PACKETLOSS_STATS:
            return {

            };
        default:
            return state
    }
}
export { initialState as InitialNetworkStatsState };