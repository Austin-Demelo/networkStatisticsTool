import { AppThunkAction } from "../../types/thunk";
import { INetwork } from "../../interfaces/network";
import { INetworkState } from "../states/networkState";
import { http } from "../../utilities/http";

const NetworkActions = {
  GET_ALL_NETWORKS: "networks/GET_ALL_NETWORKS",
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
    default:
      return state;
  }
}

export { initialState as InitialNetworkState };
