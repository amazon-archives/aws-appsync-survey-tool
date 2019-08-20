import React from 'react';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import awsexports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { Route, BrowserRouter, Redirect, Link } from "react-router-dom";

import { createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Home from '../home';
import Profile from '../profile';
import Settings from '../settings';
import Questionnaire from '../questionnaire';
import Survey from '../survey';
import AddEntry from '../addentry';
import AdminSurvey from '../admin/survey';
import AdminQuestionnaire from '../admin/questionnaire';
import AdminQuestion from '../admin/question';
import AdminUser from '../admin/users';
import AdminGroup from '../admin/groups';

import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: indigo
    },
});

Amplify.configure(awsexports);

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appbar: {
            zIndex: theme.zIndex.drawer + 1,
        }
    }),
);

function SignOut() {
    Auth.signOut({ global: true })
        .then(data => {
            return <Redirect to='/' />
        })
        .catch(err => {
            console.log(err)
        });
}

function App() {

    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    // eslint-disable-next-line
    const [session, setSession] = React.useState({});

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    };

    function handleClickAdd() {
        setOpenDialog(false);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setDeferredPrompt(null);;
            });
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    React.useEffect(() => {
        Auth.currentSession()
            .then(res => {
                setSession(res)
                return (res)
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    function AdminConsoleLink() {
        if(session.accessToken){
            return (session.accessToken.payload['cognito:groups'].includes('SurveyAdmins') ? 
            <MenuItem component={Link} to="/admin" onClick={handleClose}>Admin Console</MenuItem> :
            null)
        } else {
            return null;
        }
    }

    React.useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setOpenDialog(true);
          });
        return () => {
          window.removeEventListener("beforeinstallprompt", (e) => {
          });
        };
      });

    return (
        <div className={classes.root}>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add to Homescreen?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is a PWA which can be added to your homescreen. This makes this site easier to use and also lets you work offline.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClickAdd} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <AppBar position="sticky" className={classes.appbar} >
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to="/">
                                <HomeIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Survey Tool
                        </Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem component={Link} to="/profile" onClick={handleClose}>My Profile</MenuItem>
                                        <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings</MenuItem>
                                        <AdminConsoleLink />
                                        <MenuItem onClick={SignOut}>Sign Out</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Route exact path="/" component={Home} />
                    <Route path="/addentry/:questionnaireID" component={AddEntry} />
                    <Route exact path="/admin" component={AdminSurvey} />
                    <Route path="/admin/questions" component={AdminQuestion} />
                    <Route path="/admin/questionnaires" component={AdminQuestionnaire} />
                    <Route path="/admin/users" component={AdminUser} />
                    <Route path="/admin/groups" component={AdminGroup} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/questionnaire/:questionnaireID" component={Questionnaire} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/survey/:surveyID" component={Survey} />
                </BrowserRouter>
            </MuiThemeProvider>
        </div>
    );
}

export default withAuthenticator(App);