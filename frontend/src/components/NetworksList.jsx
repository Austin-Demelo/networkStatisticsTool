import React from "react";
import { connect } from "react-redux";
import {getAllNetworks} from "../redux/modules/networkModule";

export class NetworkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      networks: []
    }
  }

  async componentWillMount(){
    this.props.getAllNetworks();
  }
 

  render(){
    return(
      
      <div>
        hello
        {this.props.networkList.map(n => JSON.stringify(n))}
      </div>
    );
  }
}



  function mapStateToProps(state) {
    return {
      networkList: state.networks.networks,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getAllNetworks: () => dispatch(getAllNetworks()),
     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList);