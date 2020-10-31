import { render } from "@testing-library/react";
import React from "react";

import {connect, Provider} from "react-redux";
import {getAllNetworks} from "../redux/modules/networkModule";
//
export class NetworkList extends React.Component{
  constructor(props){
    super(props);

    this.state = {
  
    }
  }

  componentWillMount(){
    getAllNetworks();
  }
 

  render(){
    return(
      
      <div> in the network

        
      </div>
      
    );
  }
}


  function mapStateToProps(state) {
    return {
      networkList: state.network.network,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getAllNetworks: () => dispatch(getAllNetworks()),
     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList);