import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import NetworksList from "./components/NetworksList";
import Users from "./components/Users";
import { Provider } from "react-redux";
import Store from "./redux/store";

function App() {
  return (

    <Provider store={Store}>
    <div>

    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/network" component={NetworksList} />
        <Route path="/user" component={Users} />
    </Switch>
    </div>
    </Provider>
  );
}

export default App;
