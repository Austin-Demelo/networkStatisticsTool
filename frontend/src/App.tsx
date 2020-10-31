import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Network from "./components/Networks";
import Users from "./components/Users";

function App() {
  return (
    <div>

    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/network" component={Network} />
        <Route path="/user" component={Users} />
    </Switch>
    </div>
  );
}

export default App;
