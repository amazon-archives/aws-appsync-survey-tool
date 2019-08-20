import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listUsers } from '../../graphql/queries';
import { deleteUser, addUserToGroup } from '../../graphql/mutations';

import AdminMenu from './index';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    image: {
        width: 64,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const UsersPart = (props) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const { data: { loading, error, listUsers } } = props.listUsers;
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    function handleDeleteUser(Username) {
        props.onDeleteUser(Username, props.location.state.userPoolId);
        return null
    }

    function handleSnackBarClick() {
        setOpenSnackBar(true);
    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }

    if (loading) {
        return (
            <div>
                <CircularProgress className={classes.progress} />
            </div>
        );
    };
    if (error) {
        console.log(error)
        return (
            <div>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Error
                    </Typography>
                    <Typography component="p">
                        An error occured while fetching data.
                    </Typography>
                    <Typography component="p">
                        {error}
                    </Typography>
                </Paper>
            </div>
        )
    };
    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Sorry. Not currently implemented.</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleSnackBarClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
            <AdminMenu />
            <main className={classes.content}>
                <Typography variant="h4">
                    Manage Users
            </Typography>
                <p />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {JSON.parse(listUsers).Users ? JSON.parse(listUsers).Users.map(user => (
                                <TableRow key={user.Username}>
                                    <TableCell>{user.Username}</TableCell>
                                    <TableCell>{user.Attributes[3].Value}</TableCell>
                                    <TableCell>{user.Attributes[4].Value}</TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary" onClick={handleSnackBarClick}>
                                            <EditIcon />
                                        </Button>
                                        <Button size="small" color="primary" onClick={handleDeleteUser.bind(this,user.Username)}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
        </div>
    )
}

const Users = compose(
    graphql(gql(listUsers), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
            variables: {
                UserPoolId: props.location.state.userPoolId,
                }
        }),
        props: (props) => {
            return {
                listUsers: props ? props : [],
            }
        }
    }),
    graphql(gql(deleteUser), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onDeleteUser: (Username, userPoolId) => {
                props.mutate({
                    variables: {
                        UserPoolId: userPoolId,
                        Username: Username
                    },
                })
            }
        })
    }),
    graphql(gql(addUserToGroup), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onAddUserToGroup: (Username, GroupName, userPoolId) => {
                props.mutate({
                    variables: {
                        UserPoolId: userPoolId,
                        Username: Username,
                        GroupName: GroupName
                    },
                })
            }
        })
    })
)(UsersPart)

export default withApollo(Users)