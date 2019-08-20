import React from 'react';

import { v4 as uuid } from 'uuid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listSurveys } from '../../graphql/queries';
import { createSurvey, deleteSurvey, addGroup } from '../../graphql/mutations';
import { bulkImportSurvey } from '../../graphql/bulk';

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
    const { data: { loading, error, listSurveys } } = props.listSurveys;
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [groupName, setGroupName] = React.useState('');
    const [image, setImage] = React.useState('https://source.unsplash.com/random');

    function handleSnackBarClick() {
        setOpenSnackBar(true);
    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCreate(event) {
        event.preventDefault()
        props.onCreateSurvey(
            {
                name: title,
                description: description,
                image: image,
                groups: groupName
            }
        );
        props.onAddGroup(groupName, props.location.state.userPoolId)
        setOpen(false);
    }

    function handleBulkImport(event) {
        event.preventDefault()
        props.onBulkImport()
    }

    function handleDelete(id) {
        props.onDeleteSurvey(
            {
                id: id
            }
        );
    }

    function handleClose() {
        setOpen(false);
    }

    function onTitleChange(newValue) {
        if (title === newValue) {
            setTitle(newValue);
            return;
        }
        setTitle(newValue);
    };

    function onGroupNameChange(newValue) {
        if (groupName === newValue) {
            setGroupName(newValue);
            return;
        }
        setGroupName(newValue);
    };

    function onDescriptionChange(newValue) {
        if (title === newValue) {
            setDescription(newValue);
            return;
        }
        setDescription(newValue);
    };

    function onImageChange(newValue) {
        if (title === newValue) {
            setImage(newValue);
            return;
        }
        setImage(newValue);
    };

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
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <FormControl >
                        <DialogTitle id="form-dialog-title">Create Survey</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To create a new Survey, please complete the following details.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                value={title}
                                onChange={(event) => onTitleChange(event.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                label="Description"
                                value={description}
                                onChange={(event) => onDescriptionChange(event.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="image"
                                label="Image URL (enter your own or use the random generated image)"
                                value={image}
                                onChange={(event) => onImageChange(event.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="groupname"
                                label="Security Group Name"
                                value={groupName}
                                onChange={(event) => onGroupNameChange(event.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="default">
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} type="submit" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </FormControl>
                </Dialog>
            </div>
            <main className={classes.content}>
                <Typography variant="h4">
                    Manage Surveys
                </Typography>
                <p />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listSurveys.items.map(survey => (
                                <TableRow key={survey.name}>
                                    <TableCell><img src={survey.image} alt={survey.image} className={classes.image} /></TableCell>
                                    <TableCell>{survey.name}</TableCell>
                                    <TableCell>{survey.description}</TableCell>
                                    <TableCell>
                                        <Button onClick={handleSnackBarClick} size="small" color="primary">
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => { handleDelete(survey.id) }} size="small" color="primary">
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenDialog}>
                    <AddCircleIcon className={classes.rightIcon} /> Add Survey
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleBulkImport}>
                    <SubjectIcon className={classes.rightIcon} /> Import Sample Survey
                </Button>
            </main>
        </div>
    )
}

const Survey = compose(
    graphql(gql(listSurveys), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
        }),
        props: (props) => {
            return {
                listSurveys: props ? props : [],
            }
        }
    }),
    graphql(gql(createSurvey), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onCreateSurvey: (survey) => {
                props.mutate({
                    variables: {
                        input: survey
                    },
                    update: (store, { data: { createSurvey } }) => {
                        const query = gql(listSurveys)
                        const data = store.readQuery({query, variables: { "filter":null,"limit":null,"nextToken":null}});
                        data.listSurveys.items = [
                            ...data.listSurveys.items.filter(item => item.id !== createSurvey.id),
                            createSurvey
                          ];
                        store.writeQuery({ query, data, variables: { "filter":null,"limit":null,"nextToken":null} });
                    }
                })
            },
        }),
    }),
    graphql(gql(deleteSurvey), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onDeleteSurvey: (survey) => {
                props.mutate({
                    variables: {
                        input: survey
                    }
                })
            },
        }),
    }),
    graphql(gql(addGroup), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onAddGroup: (GroupName, userPoolId) => {
                props.mutate({
                    variables: {
                        UserPoolId: userPoolId,
                        GroupName: GroupName
                    },
                })
            }
        })
    }),
    graphql(gql(bulkImportSurvey), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onBulkImport: () => {
                props.mutate({
                    variables: {
                        surveyID: uuid(),
                        surveyPreQuestionnaireId: uuid(),
                        surveyMainQuestionnaireId: uuid()
                    }
                })
            },
        }),
    }),
)(SurveyPart)

export default withApollo(Survey)