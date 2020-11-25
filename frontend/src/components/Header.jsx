import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppDrawer from "../styles/AppDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import {Redirect} from "react-router-dom";
import clsx from 'clsx';
import {connect} from "react-redux";
import headerStyles from '../styles/HeaderStyles';
import { logout } from '../redux/modules/userModule'
import { withRouter } from "react-router-dom";

//The Header component is the only component (so far) to use
//Functional Programming
//Please do not use this as template for new components
export class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        open: false,
        anchorLoc: null,
        redirect: undefined
      }
      console.log(props);
    }

    // componentDidMount() {
    //     console.log(this.props.currentUser)
    //     if (!this.props.currentUser) {
    //         this.setState({
    //             redirect: "login"
    //         });
    //     }
    // }
   
    handleDrawerOpen = () => {
        this.setState({
            open:true,
          });
    };
    
    handleDrawerClose = () => {
        this.setState({
            open:false,
          });
    };

    handleMenuClose = () => {
        this.setState({
            anchorLoc:null,
          });
    };

    handleMenuOpen = (event) => {
        
        this.setState({
            anchorLoc:event.currentTarget,
          });
          
        
    };

    redirectRouter = (redirect) => {
        this.setState({
            redirect: redirect,
          });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            const redirect = this.state.redirect;
            this.setState({
                redirect: undefined,
            });
            return (
                <Redirect
                    to={{
                        pathname: `/${redirect}/`,
                    }}
                />
            )
        }
    }
    render(){
        console.log(this.props.currentUser)
    return (
        <div>
            <AppBar color="secondary" className={clsx(headerStyles.appBar, this.state.open && headerStyles.appBarShift)}>
            {this.renderRedirect()}
                <Toolbar className={headerStyles.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => this.handleDrawerOpen()}
                    className={clsx(headerStyles.menuButton, this.state.open && headerStyles.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={headerStyles.title}>
                    Dashboard
                </Typography>
                <div style = {{marginLeft: '80%'}}>
                    {this.props.currentUser && this.props.currentUser.UserName}
                    <IconButton 
                        color="inherit"
                        onClick={(event) => this.handleMenuOpen(event)}
                    >
                        <Badge color="secondary">
                        <AccountCircleIcon />
                        </Badge>
                    </IconButton>
                </div>
                
                <Menu
                    id="account-menu"
                    anchorEl={this.state.anchorLoc}
                    keepMounted
                    open={Boolean(this.state.anchorLoc)}
                    onClose={() => this.handleMenuClose()}
                    >
                    {!this.props.currentUser ?
                        <div>
                            <MenuItem onClick={() => this.redirectRouter('login')}>Login</MenuItem>
                            <MenuItem onClick={() => this.redirectRouter('register')}>Register</MenuItem>
                        </div>

                        :
                        <MenuItem onClick={() => {
                            this.props.logout()
                            this.redirectRouter('home')
                            this.handleMenuClose()
                        
                        }}>Logout</MenuItem>
                    
                    }

                    </Menu>
                </Toolbar>


                
            </AppBar>
            <AppDrawer 
                closeDrawer = {() => this.handleDrawerClose()}
                isOpen = {this.state.open}
            />
        </div>
  );
}}

function mapStateToProps(state) {
    return {
        currentUser: state.users.currentUser
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        logout: (user) => dispatch(logout()),
     };
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
