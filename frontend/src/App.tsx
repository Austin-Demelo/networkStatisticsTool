import "./App.css";

import { Route, Switch } from "react-router-dom";

import Home from './components/Home';
import NetworksList from "./components/NetworksList";
import { Provider } from "react-redux";
import React from "react";
import Store from "./redux/store";
import Users from "./components/Users";

function App() {
  return (

    <Provider store={Store}>
      <div>
        {/* {loggedIn ? <Redirect to="/login" /> : <PublicHomePage />} */}
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
