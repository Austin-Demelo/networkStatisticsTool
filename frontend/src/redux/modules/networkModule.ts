import {URL} from "../config";

const NetworkActions = {
  GET_ALL_NETWORKS: "networks/GET_ALL_NETWORKS",
};

export function getAllNetworks() {
  return async (dispatch, getState) => {
    //let bodyStr = JSON.stringify({query: "{query goes here}"});
    let myHeaders = new Headers();
    let networks = [""];
    myHeaders.append("Content-Type", "application/json");
   try{
     
      let response = await fetch(URL + "/network", {
        method: "GET",
        headers: myHeaders
      });
      let json = await response.json();

       networks = [json];
   }catch(error){
     console.log(error);

   }

    

    dispatch({ payload: networks });
  };
}

const initialState = {
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
