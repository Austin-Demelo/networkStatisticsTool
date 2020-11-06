import "./App.css";

import { Route, Switch } from "react-router-dom";

import DeviceList  from "./components/DeviceList";
import Header from "./components/Header"
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
        <Header/>
        <div style = {{margin: 'auto', width: '80%', marginTop: 100}}>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/networks" component={NetworksList} />
              <Route path="/devices" component={DeviceList} />
              <Route path="/users" component={Users} />
          </Switch>
        </div>
        
      </div>
    </Provider>
  );
}

export default App;
