import { AppThunkAction } from "../../types/thunk";
import { HttpMethod } from "../../types/httpMethods";
import { INetwork } from "../../interfaces/network";
import { INetworkState } from "../states/networkState";
import { UpdateStatus } from "../../types/updateStatus";
import { http } from "../../utilities/http";

const NetworkActions = {
  GET_ALL_NETWORKS: "networks/GET_ALL_NETWORKS",
  POST_NETWORK: "networks/POST_NETWORK",
  PUT_NETWORK: "networks/PUT_NETWORK",
  DELETE_NETWORK: "networks/DELETE_NETWORK"

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
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const updateStatus: UpdateStatus = await http<UpdateStatus>(`http://localhost:52288/api/networks`, HttpMethod.PUT, JSON.stringify(updateNetwork));
       if(updateStatus === UpdateStatus.Ok) {
          // If the update status is good, then push to store
          dispatch({ type: NetworkActions.PUT_NETWORK, payload: updateNetwork });
          return updateNetwork;
       }
       
    } catch(error){
      //TO-DO, Add Error to Network State
      console.log(error);
    }
   };
}

export function deleteNetwork(networkId: number): AppThunkAction<Promise<number | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const deleteId: number = await http<UpdateStatus>(`http://localhost:52288/api/networks/${networkId}`, HttpMethod.DELETE);
       console.log(deleteId);
       console.log(networkId);
       if(deleteId === networkId) {
          // If the update status is good, then push to store
          dispatch({ type: NetworkActions.DELETE_NETWORK, payload: deleteId });
          return deleteId;
       }
       
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
  let updatedNetworks: INetwork[] = [];
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
      updatedNetworks = [...state.networks];
      updatedNetworks = updatedNetworks.map(network =>  network.Id === action.payload.Id ? action.payload : network);
      return {
        ...state,
        networks: updatedNetworks,
        hasError: false,
        message: "",
      };
    case NetworkActions.DELETE_NETWORK:
      updatedNetworks = [...state.networks];
      updatedNetworks = updatedNetworks.filter(network =>  network.Id !== action.payload); //Find the deleted network by ID, and filter it out
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
