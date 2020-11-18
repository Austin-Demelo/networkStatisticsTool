import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppDrawer from "../styles/AppDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import headerStyles from '../styles/HeaderStyles';
import { useHistory } from "react-router-dom";

//The Header component is the only component (so far) to use
//Functional Programming
//Please do not use this as template for new components
const Header = () => {
    const [open, setOpen] = useState(false);
    const [anchorLoc, setAnchorLoc] = useState(null);
    const history = useHistory();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuClose = () => {
        setAnchorLoc(null);
    };

    const handleMenuOpen = (event) => {
        
        setAnchorLoc(event.currentTarget);
        
    };

    const redirectRouter = (redirect) => {
        history.push(`/${redirect}`);
    };

    return (
        <div>
            <AppBar className={clsx(headerStyles.appBar, open && headerStyles.appBarShift)}>
                <Toolbar className={headerStyles.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(headerStyles.menuButton, open && headerStyles.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={headerStyles.title}>
                    Dashboard
                </Typography>
                <IconButton 
                    color="inherit"
                    style = {{marginLeft: '80%'}}
                    onClick={handleMenuOpen}
                >
                    <Badge color="secondary">
                    <AccountCircleIcon />
                    </Badge>
                </IconButton>
                <Menu
                    id="account-menu"
                    anchorEl={anchorLoc}
                    keepMounted
                    open={Boolean(anchorLoc)}
                    onClose={handleMenuClose}
                    >
                    <MenuItem onClick={() => redirectRouter('login')}>Login</MenuItem>
                    <MenuItem onClick={() => redirectRouter('register')}>Register</MenuItem>
                    <MenuItem onClick={() => redirectRouter('logout')}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <AppDrawer 
                closeDrawer = {handleDrawerClose}
                isOpen = {open}
            />
        </div>
  );
}

export default Header;
