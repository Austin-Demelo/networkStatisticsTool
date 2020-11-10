import { combineReducers } from "redux";
import { networkReducer } from "./modules/networkModule";
import { userReducer } from "./modules/userModule";
import { deviceReducer } from "./modules/deviceModule";

const rootReducer = combineReducers({
  networks: networkReducer,
  devices: deviceReducer,
  users: userReducer
});

export default rootReducer;
