import React from 'react';
import { Link } from "react-router-dom";

import { Auth } from 'aws-amplify';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        flexShrink: 0,
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        top: 64,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Admin = (props) => {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [userPoolId] = React.useState(Auth.userPool.userPoolId);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <List>
                <ListItem button component={Link} to={{
                    pathname: '/admin/',
                    state: {
                        userPoolId: userPoolId
                    }
                    }}>
                    <ListItemIcon><LanguageIcon /></ListItemIcon>
                    <ListItemText primary="Surveys" />
                </ListItem>
                <ListItem button component={Link} to="/admin/questionnaires">
                    <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
                    <ListItemText primary="Questionnaires" />
                </ListItem>
                <ListItem button component={Link} to="/admin/questions">
                    <ListItemIcon><ChatBubbleOutlineIcon /></ListItemIcon>
                    <ListItemText primary="Questions" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to={{
                    pathname: '/admin/users',
                    state: {
                        userPoolId: userPoolId
                    }
                    }}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem button component={Link} to={{
                    pathname: '/admin/groups',
                    state: {
                        userPoolId: userPoolId
                    }
                    }}>
                    <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
                    <ListItemText primary="Groups" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <div>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </div>
            <nav className={classes.drawer} aria-label="Admin Section">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default Admin