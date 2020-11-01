import React from "react";
import {connect} from "react-redux";
import {getAllNetworks} from "../redux/modules/networkModule";

export class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  async componentWillMount(){
    
  }
 

  render(){
    return( <div></div> );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);