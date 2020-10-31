import { applyMiddleware, compose, createStore } from "redux";

import { InitialNetworkState } from "./modules/networkModule";

import rootReducer from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  const middlewares = [thunk];
  const initialState = {
    network: InitialNetworkState,
  };
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const Store = configureStore();
export default Store;
