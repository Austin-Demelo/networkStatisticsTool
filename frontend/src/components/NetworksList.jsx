import { render } from "@testing-library/react";
import React from "react";

import {connect, Provider} from "react-redux";
import {getAllNetworks} from "../redux/modules/networkModule";


export class NetworkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      networks: []
    }
  }

  async componentWillMount(){
    try{
     
      let response = await fetch("http://localhost:52288/api/networks", {
        method: "GET",
      });
      let json = await response.json();

       this.setState({ networks: [json] });

   }catch(error){
     console.log(error);

   }
  }
 

  render(){
    return(
      
      <div>
        hello
        {this.state.networks.map(n => n)}
        
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
      getAllNetworks: (networkList) => dispatch(getAllNetworks()),
     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList);