import React from "react";
import UserForm from './UserForm'
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
    return( <UserForm register={false}></UserForm> );
  }
}



  function mapStateToProps(state) {
    return {
      networkList: state.networks.networks,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getAllNetworks: (networkList) => dispatch(getAllNetworks()),
     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);