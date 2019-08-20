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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listQuestionnaires, listSurveys } from '../../graphql/queries';
import { createQuestionnaire, updateSurvey, deleteQuestionnaire } from '../../graphql/mutations';

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

const QuestionnairePart = (props) => {
    const classes = useStyles();
    const { data: { loading, error, listQuestionnaires } } = props.listQuestionnaires;
    const { data: {listSurveys} } = props.listSurveys;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [survey, setSurvey] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [type, setType] = React.useState('');
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

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCreate(event) {
        event.preventDefault()
        props.onCreateQuestionnaire(
            {
                name: name,
                description: description,
                type: type
            },
            survey
        )
        setOpen(false);
    }

    function handleDelete(id) {
        props.onDeleteQuestionnaire(
            {
                id: id
            }
        );
    }

    function handleClose() {
        setOpen(false);
    }

    function onNameChange(newValue) {
        if (name === newValue) {
            setName(newValue);
            return;
        }
        setName(newValue);
    };

    function onDescriptionChange(newValue) {
        if (description === newValue) {
            setDescription(newValue);
            return;
        }
        setDescription(newValue);
    };
    function onSurveyChange(newValue) {
        if (survey === newValue) {
            setSurvey(newValue);
            return;
        }
        setSurvey(newValue);
    };

    function onTypeChange(newValue) {
        if (type === newValue) {
            setType(newValue);
            return;
        }
        setType(newValue);
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
                        <DialogTitle id="form-dialog-title">Create Questionnaire</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To create a new Questionnaire, please complete the following details.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                value={name}
                                onChange={(event) => onNameChange(event.target.value)}
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
                            <FormControl>
                                <InputLabel>Survey</InputLabel>
                                <Select
                                    margin="dense"
                                    fullWidth
                                    value={survey}
                                    onChange={(event) => onSurveyChange(event.target.value)}>
                                    {listSurveys ? listSurveys.items.map(survey => (
                                        <MenuItem key={survey.id} value={survey.id}>{survey.name}</MenuItem>
                                    )): null}
                                </Select>
                            </FormControl><br/>
                            <FormControl>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    margin="dense"
                                    fullWidth
                                    value={type}
                                    onChange={(event) => onTypeChange(event.target.value)}>
                                    <MenuItem value={"PRE"}>PRE</MenuItem>
                                    <MenuItem value={"MAIN"}>MAIN</MenuItem>
                                    <MenuItem value={"POST"}>POST</MenuItem>
                                </Select>
                            </FormControl>
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
                    Manage Questionnaires
                </Typography>
                <p />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listQuestionnaires.items.map(questionnaire => (
                                <TableRow key={questionnaire.name}>
                                    <TableCell>{questionnaire.name}</TableCell>
                                    <TableCell>{questionnaire.description}</TableCell>
                                    <TableCell>{questionnaire.type}</TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary" onClick={handleSnackBarClick}>
                                            <EditIcon />
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => { handleDelete(questionnaire.id) }}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenDialog}>
                    <AddCircleIcon className={classes.rightIcon} /> Add Questionnaire
                </Button>
            </main>
        </div>
    )
}

const Questionnaire = compose(
    graphql(gql(listQuestionnaires), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
        }),
        props: (props) => {
            return {
                listQuestionnaires: props ? props : [],
            }
        }
    }),
    graphql(gql(deleteQuestionnaire), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onDeleteQuestionnaire: (questionnaire) => {
                props.mutate({
                    variables: {
                        input: questionnaire
                    }
                })
            },
        }),
    }),
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
    graphql(gql(updateSurvey), {
        props: (props) => ({
            onUpdateSurvey: (response) => {
                props.mutate({
                    variables: {
                        input: response
                    },
                })
                .then((data) => {
                    //console.log(data)
                })
            }
        })
    }),
    graphql(gql(createQuestionnaire), {
        props: (props) => ({
            onCreateQuestionnaire: (response,survey) => {
                props.mutate({
                    variables: {
                        input: response
                    },
                    update: (store, { data: { createQuestionnaire } }) => {
                        const query = gql(listQuestionnaires)
                        const data = store.readQuery({query, variables: { "filter":null,"limit":null,"nextToken":null}});
                        data.listQuestionnaires.items = [
                            ...data.listQuestionnaires.items.filter(item => item.id !== createQuestionnaire.id),
                            createQuestionnaire
                          ];
                        store.writeQuery({ query, data, variables: { "filter":null,"limit":null,"nextToken":null} });
                    }
                })
                .then((data) => {
                    var surveyData = {}
                    switch(data.data.createQuestionnaire.type){
                            case "PRE": 
                                surveyData = {
                                    id: survey,
                                    surveyPreQuestionnaireId: data.data.createQuestionnaire.id
                                }
                                break;
                            case "MAIN":
                                surveyData = {
                                    id: survey,
                                    surveyMainQuestionnaireId: data.data.createQuestionnaire.id
                                }
                                break;
                            case "POST":
                                surveyData = {
                                    id: survey,
                                    surveyPostQuestionnaireId: data.data.createQuestionnaire.id
                                }
                                break;
                            default:
                                break;
                        }
                    props.ownProps.onUpdateSurvey(surveyData)
                })
            }
        })
    })
)(QuestionnairePart)

export default withApollo(Questionnaire)