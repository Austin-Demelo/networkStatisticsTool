import { Divider, Drawer, IconButton, List, ListItem, MenuItem } from "@material-ui/core";

import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import React from "react";
import clsx from 'clsx';
import headerStyles from './HeaderStyles';

const AppDrawer = props => {
    return (
        <Drawer
            variant="temporary"
            classes={{
                paper: clsx(headerStyles.drawerPaper, !props.isOpen && headerStyles.drawerPaperClose),
              }}
            open={props.isOpen}
        >
            <div className={headerStyles.toolbarIcon}>
                <IconButton onClick={props.closeDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <MenuItem component={Link} to="/" onClick={props.closeDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </MenuItem>
                    <MenuItem component={Link} to="/networks" onClick={props.closeDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Networks" />
                        </ListItem>
                    </MenuItem>
                    <MenuItem component={Link} to="/devices" onClick={props.closeDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                            <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Devices" />
                        </ListItem>
                    </MenuItem>
                    <MenuItem component={Link} to="/problems" onClick={props.closeDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                            <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Network Issues" />
                        </ListItem>
                    </MenuItem>
                </div>
            </List>
            <Divider />
            <List>
                <div>
                    <MenuItem component={Link} to="/users" onClick={props.closeDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </MenuItem>
                </div>
            </List>
      </Drawer> 
    )
}

export default AppDrawer;
