import { combineReducers } from "redux";
import { networkReducer } from "./modules/networkModule";
import { userReducer } from "./modules/userModule";

const rootReducer = combineReducers({
  networks: networkReducer,
  users: userReducer
});

export default rootReducer;
