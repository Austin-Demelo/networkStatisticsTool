import React from "react";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@material-ui/core";
import {connect} from "react-redux";
import {getAllNetworks} from "../redux/modules/networkModule";

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
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
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
     };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header);