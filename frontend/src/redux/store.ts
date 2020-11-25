import { applyMiddleware, compose, createStore } from "redux";

import { IRootState } from "./states/rootState";
import { InitialNetworkState } from "./modules/networkModule";
import { InitialUserState } from "./modules/userModule";
import { InitialDeviceState } from "./modules/deviceModule";
import {InitialProblemState} from "./modules/problemModule";
import { InitialNetworkStatsState } from "./modules/networkStatsModule";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  const middlewares = [thunk];
  const initialState: IRootState = {
    networks: InitialNetworkState,
    devices: InitialDeviceState,
    users: InitialUserState,
    problems: InitialProblemState,
    networkStats: InitialNetworkStatsState,
  };
  return createStore(
    rootReducer,
    // initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const Store = configureStore();
export default Store;
