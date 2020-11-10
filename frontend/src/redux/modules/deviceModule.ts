import { AppThunkAction } from "../../types/thunk";
import { IDevice } from "../../interfaces/device";
import { IDeviceState } from "../states/deviceState";
import { http } from "../../utilities/http";
import { HttpMethod } from "../../types/httpMethods";
import { UpdateStatus } from "../../types/updateStatus";

const DeviceActions = {
  GET_ALL_DEVICES: "devices/GET_ALL_DEVICES",
  POST_DEVICE: "devices/POST_DEVICE",
  PUT_DEVICE: "devices/PUT_DEVICE",
  DELETE_DEVICE: "devices/DELETE_DEVICE"
};

export function getAllDevices(): AppThunkAction<Promise<IDevice[] | undefined>>  {
  return async (dispatch, getState) => {
   try {
      let devices: IDevice[] = await http<IDevice[]>("http://localhost:52288/api/devices");
      dispatch({ type: DeviceActions.GET_ALL_DEVICES, payload: devices });
      return devices;
   } catch(error){
     //TO-DO, Add Error to Device State
     console.log(error);
   }
  };
}

export function createDevice(addDevice:IDevice): AppThunkAction<Promise<IDevice | undefined>>{
  return async (dispatch, getState) => {
    try {
       let device:  IDevice  = await http<IDevice>("http://localhost:52288/api/devices", HttpMethod.POST, JSON.stringify(addDevice));
       dispatch({ type: DeviceActions.POST_DEVICE, payload: device });
       console.log(device);
       return device;
    } catch(error){
      //TO-DO, Add Error to Network State
      console.log(error);
    }
   };
} 

export function updateDevice(updateDevice:IDevice): AppThunkAction<Promise<IDevice | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const updateStatus: UpdateStatus = await http<UpdateStatus>("http://localhost:52288/api/devices", HttpMethod.PUT, JSON.stringify(updateDevice));
       console.log(updateStatus);
       if(updateStatus === UpdateStatus.Ok) {
          // If the update status is good, then push to store
          dispatch({ type: DeviceActions.PUT_DEVICE, payload: updateDevice });
          return updateDevice;
       }
       
    } catch(error){
      //TO-DO, Add Error to Network State
      console.log(error);
    }
   };
}

export function deleteDevice(deviceId: number): AppThunkAction<Promise<number | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const deleteId: number = await http<UpdateStatus>(`http://localhost:52288/api/devices/${deviceId}`, HttpMethod.DELETE);
       console.log(deleteId);
       if(deleteId === deviceId) {
          // If the update status is good, then push to store
          dispatch({ type: DeviceActions.DELETE_DEVICE, payload: deleteId });
          return deleteId;
       }
       
    } catch(error){
      //TO-DO, Add Error to Network State
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
  let updateDevices: IDevice[] = [];
  switch (action.type) {
    case DeviceActions.GET_ALL_DEVICES:
      return {
        ...state,
        devices: action.payload,
        hasError: false,
        message: "",
      };
    case DeviceActions.POST_DEVICE:
      let newDevices = [...state.devices];
      newDevices.push(action.payload);
      return {
        ...state,
        devices: newDevices,
        hasError: false,
        message: "",
      };
    case DeviceActions.PUT_DEVICE:
      updateDevices = [...state.devices];
      updateDevices = updateDevices.map(device =>  device.Id === action.payload.Id ? action.payload : device);
      return {
        ...state,
        devices: updateDevices,
        hasError: false,
        message: "",
      };
    case DeviceActions.DELETE_DEVICE:
      updateDevices = [...state.devices];
      updateDevices = updateDevices.filter(device =>  device.Id !== action.payload); //Find the deleted network by ID, and filter it out
      return {
        ...state,
        devices: updateDevices,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialDeviceState };
