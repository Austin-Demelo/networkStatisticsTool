import { AppBar, Badge, IconButton, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AppDrawer from "../styles/AppDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import headerStyles from '../styles/HeaderStyles';

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="absolute" className={clsx(headerStyles.appBar, open && headerStyles.appBarShift)}>
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
                <IconButton color="inherit">
                    <Badge color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
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