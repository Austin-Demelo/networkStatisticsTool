import { AppThunkAction } from "../../types/thunk";
import { IDevice } from "../../interfaces/device";
import { IDeviceState } from "../states/deviceState";
import { http } from "../../utilities/http";
import { HttpMethod } from "../../types/httpMethods";

const NetworkActions = {
  GET_ALL_DEVICES: "devices/GET_ALL_DEVICES",
};

export function getAllDevices(): AppThunkAction<Promise<IDevice[] | undefined>>  {
  return async (dispatch, getState) => {
   try {

      let devices: IDevice[] = await http<IDevice[]>("http://localhost:52288/api/devices");
      dispatch({ type: NetworkActions.GET_ALL_DEVICES, payload: devices });
      return devices;
   } catch(error){
     //TO-DO, Add Error to Device State
     console.log(error);
   }
  };
}


const initialState: IDeviceState = {
  devices: [],
  hasError: false,
  message: "",
};

export function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case NetworkActions.GET_ALL_DEVICES:
      return {
        ...state,
        devices: action.payload,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialDeviceState };
