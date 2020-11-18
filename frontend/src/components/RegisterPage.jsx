import React from "react";
import UserForm from './UserForm'
import {connect} from "react-redux";

export class RegisterPage extends React.Component {
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
    return( <UserForm register={true}></UserForm> );
  }
}



  function mapStateToProps(state) {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {

     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);