import { combineReducers } from "redux";
import { networkReducer } from "./modules/networkModule";

const rootReducer = combineReducers({
  network: networkReducer,
});

export default rootReducer;
