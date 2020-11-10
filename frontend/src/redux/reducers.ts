import { combineReducers } from "redux";
import { networkReducer } from "./modules/networkModule";
import { userReducer } from "./modules/userModule";
import { deviceReducer } from "./modules/deviceModule";
import {problemReducer} from "./modules/problemModule";

const rootReducer = combineReducers({
  networks: networkReducer,
  devices: deviceReducer,
  users: userReducer,
  problems: problemReducer,
});

export default rootReducer;
