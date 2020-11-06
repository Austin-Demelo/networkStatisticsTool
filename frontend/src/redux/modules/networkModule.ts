import { AppThunkAction } from "../../types/thunk";
import { HttpMethod } from "../../types/httpMethods";
import { INetwork } from "../../interfaces/network";
import { INetworkState } from "../states/networkState";
import { http } from "../../utilities/http";

const NetworkActions = {
  GET_ALL_NETWORKS: "networks/GET_ALL_NETWORKS",
  POST_NETWORK: "networks/POST_NETWORK",
  PUT_NETWORK: "networks/PUT_NETWORK"
};

export function getAllNetworks(): AppThunkAction<Promise<INetwork[] | undefined>>  {
  return async (dispatch, getState) => {
   try {

      let networks: INetwork[] = await http<INetwork[]>("http://localhost:52288/api/networks");
      dispatch({ type: NetworkActions.GET_ALL_NETWORKS, payload: networks });
      return networks;
   } catch(error){
     //TO-DO, Add Error to Network State
     console.log(error);
   }
  };
}

export function createNetwork(addNetwork:INetwork): AppThunkAction<Promise<INetwork | undefined>>{
  return async (dispatch, getState) => {
    try {
       let network:  INetwork  = await http<INetwork>("http://localhost:52288/api/networks", HttpMethod.POST, JSON.stringify(addNetwork));
       dispatch({ type: NetworkActions.POST_NETWORK, payload: network });
       return network;
    } catch(error){
      //TO-DO, Add Error to Network State
      console.log(error);
    }
   };
} 

export function updateNetwork(updateNetwork:INetwork): AppThunkAction<Promise<INetwork | undefined>>{
  console.log(updateNetwork);
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       let network: INetwork = await http<INetwork>(`http://localhost:52288/api/networks`, HttpMethod.PUT, JSON.stringify(updateNetwork));
       dispatch({ type: NetworkActions.PUT_NETWORK, payload: network });
       return network;
    } catch(error){
      //TO-DO, Add Error to Network State
      console.log(error);
    }
   };
} 

const initialState: INetworkState = {
  networks: [],
  hasError: false,
  message: "",
};

export function networkReducer(state = initialState, action) {
  switch (action.type) {
    case NetworkActions.GET_ALL_NETWORKS:
      return {
        ...state,
        networks: action.payload,
        hasError: false,
        message: "",
      };
    case NetworkActions.POST_NETWORK:
      let newNetworks = [...state.networks];
      newNetworks.push(action.payload);
      return {
        ...state,
        networks: newNetworks,
        hasError: false,
        message: "",
      };
    case NetworkActions.PUT_NETWORK:
      let updatedNetworks = [...state.networks];
      updatedNetworks = updatedNetworks.map(network =>  network.Id === action.payload.Id ? action.payload : network);
      return {
        ...state,
        networks: updatedNetworks,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialNetworkState };
