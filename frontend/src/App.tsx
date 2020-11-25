import "./App.css";

import { Route, Switch, withRouter } from "react-router-dom";

import ActivateAccount from "./components/ActivateAccount";
import DeviceList  from "./components/DeviceList";
import Header from "./components/Header"
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import NetworkProblems from "./components/NetworkProblems";
import NetworkStats from "./components/NetworkStats";
import NetworksList from "./components/NetworksList";
import { Provider } from "react-redux";
import React from "react";
import RegisterPage from "./components/RegisterPage";
import Store from "./redux/store";
import Users from "./components/Users";

function App() {
  return (

    <Provider store={Store}>
      <div>
        
        <Header/>
        <div style = {{margin: 'auto', width: '80%', marginTop: 100}}>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/networks" component={NetworksList} />
              <Route path="/devices" component={DeviceList} />
              <Route path="/users" component={Users} />
              <Route path="/problems" component={NetworkProblems}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/networkstats/" component={NetworkStats}/>
              <Route path="/activateAccount/:key" component={ActivateAccount}/>
          </Switch>
        </div>
        
      </div>
    </Provider>
  );
}

export default withRouter(App);
