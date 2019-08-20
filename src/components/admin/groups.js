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
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listGroups } from '../../graphql/queries';
import { deleteGroup } from '../../graphql/mutations'

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

const SurveyPart = (props) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const { data: { loading, error, listGroups } } = props.listGroups;
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    function handleSnackBarClick() {
        setOpenSnackBar(true);
    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }

    function handleDeleteGroup(GroupName) {
        props.onDeleteGroup(GroupName, props.location.state.userPoolId);
        return null
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
                    Manage Groups
                </Typography>
                <p />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Pool ID</TableCell>
                                <TableCell>Last Modified</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {JSON.parse(listGroups).Groups ? JSON.parse(listGroups).Groups.map(group => (
                                <TableRow key={group.GroupName}>
                                    <TableCell>{group.GroupName}</TableCell>
                                    <TableCell>{group.UserPoolId}</TableCell>
                                    <TableCell>{group.LastModifiedDate.toString()}</TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary" onClick={handleSnackBarClick}>
                                            <EditIcon />
                                        </Button>
                                        <Button size="small" color="primary" onClick={handleDeleteGroup.bind(this,group.GroupName)}>
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

const Survey = compose(
    graphql(gql(listGroups), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
            variables: {
                UserPoolId: props.location.state.userPoolId,
            }
        }),
        props: (props) => {
            return {
                listGroups: props ? props : [],
            }
        }
    }),
    graphql(gql(deleteGroup), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onDeleteGroup: (GroupName, userPoolId) => {
                props.mutate({
                    variables: {
                        UserPoolId: userPoolId,
                        GroupName: GroupName
                    },
                })
            }
        })
    })
)(SurveyPart)

export default withApollo(Survey)