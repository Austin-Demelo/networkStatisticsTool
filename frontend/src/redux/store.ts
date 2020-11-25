import { applyMiddleware, compose, createStore } from "redux";

import { IRootState } from "./states/rootState";
import { IUser } from "../interfaces/user";
import { IUserState } from "./states/userState";
import { InitialDeviceState } from "./modules/deviceModule";
import { InitialNetworkState } from "./modules/networkModule";
import { InitialNetworkStatsState } from "./modules/networkStatsModule";
import { InitialProblemState } from "./modules/problemModule";
import { InitialUserState } from "./modules/userModule";
import { getObjectFromLocalStorage } from "../utilities/localStorage";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  const middlewares = [thunk];
  let userInitialState: IUserState = InitialUserState;

  let loggedInUser: IUser | undefined = getObjectFromLocalStorage('nsc-logged-in');
  if(loggedInUser) {
    userInitialState.currentUser = loggedInUser;
  }
  const initialState: IRootState = {
    networks: InitialNetworkState,
    devices: InitialDeviceState,
    users: userInitialState,
    problems: InitialProblemState,
    networkStats: InitialNetworkStatsState
  };
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const Store = configureStore();
export default Store;
