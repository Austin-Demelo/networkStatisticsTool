import { applyMiddleware, compose, createStore } from "redux";

import { IRootState } from "./states/rootState";
import { InitialNetworkState } from "./modules/networkModule";
import { InitialUserState } from "./modules/userModule";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  const middlewares = [thunk];
  const initialState: IRootState = {
    networks: InitialNetworkState,
    users: InitialUserState
  };
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const Store = configureStore();
export default Store;
