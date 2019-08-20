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
import { listQuestions, listQuestionnaires } from '../../graphql/queries';
import { createQuestion, deleteQuestion } from '../../graphql/mutations';

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

const QuestionPart = (props) => {
    const classes = useStyles();
    const { data: { loading, error, listQuestions } } = props.listQuestions;
    const { data: { listQuestionnaires } } = props.listQuestionnaires
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = React.useState('');
    const [questionnaire, setQuestionnaire] = React.useState('');
    const [type, setType] = React.useState('');

    function handleSnackBarClick() {
        setOpenSnackBar(true);
    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }

    function handleDelete(id) {
        props.onDeleteQuestion(
            {
                id: id
            }
        );
    }

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCreate(event) {
        event.preventDefault()
        props.onCreateQuestion(
            {
                qu: question,
                type: type,
                questionQuestionnaireId: questionnaire
            },
            questionnaire
        )
        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }

    function onQuestionChange(newValue) {
        if (question === newValue) {
            setQuestion(newValue);
            return;
        }
        setQuestion(newValue);
    };

    function onQuestionnaireChange(newValue) {
        if (questionnaire === newValue) {
            setQuestionnaire(newValue);
            return;
        }
        setQuestionnaire(newValue);
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
                        <DialogTitle id="form-dialog-title">Create Question</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To create a new Question, please complete the following details.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="qu"
                                label="Question"
                                value={question}
                                onChange={(event) => onQuestionChange(event.target.value)}
                                fullWidth
                            />
                            <FormControl>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    margin="dense"
                                    fullWidth
                                    value={type}
                                    onChange={(event) => onTypeChange(event.target.value)}>
                                    <MenuItem value={"TEXT"}>Text</MenuItem>
                                    <MenuItem value={"LIST"}>List</MenuItem>
                                    <MenuItem value={"BOOL"}>Boolean</MenuItem>
                                </Select>
                            </FormControl><br />
                            <FormControl>
                                <InputLabel>Questionnaire</InputLabel>
                                <Select
                                    margin="dense"
                                    fullWidth
                                    value={questionnaire}
                                    onChange={(event) => onQuestionnaireChange(event.target.value)}>
                                    {listQuestionnaires ? listQuestionnaires.items.map(questionnaire => (
                                        <MenuItem key={questionnaire.id} value={questionnaire.id}>{questionnaire.name}</MenuItem>
                                    )) : null}
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
                    Manage Questions
                </Typography>
                <p />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>List Options</TableCell>
                                <TableCell>Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listQuestions.items.map(question => (
                                <TableRow key={question.id}>
                                    <TableCell>{question.qu}</TableCell>
                                    <TableCell>{question.type}</TableCell>
                                    <TableCell>{question.listOptions ? question.listOptions.map((option) => (<li key={option}>{option}</li>)) : "(Empty)"}</TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary" onClick={handleSnackBarClick}>
                                            <EditIcon />
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => { handleDelete(question.id) }}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleOpenDialog}>
                    <AddCircleIcon className={classes.rightIcon} /> Add Question
                </Button>
            </main>
        </div>
    )
}

const Question = compose(
    graphql(gql(listQuestions), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
        }),
        props: (props) => {
            return {
                listQuestions: props ? props : [],
            }
        }
    }),
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
    graphql(gql(deleteQuestion), {
        props: (props) => ({
            onDeleteQuestion: (response) => {
                props.mutate({
                    variables: {
                        input: response
                    },
                })
            }
        })
    }),
    graphql(gql(createQuestion), {
        props: (props) => ({
            onCreateQuestion: (response) => {
                props.mutate({
                    variables: {
                        input: response
                    },
                    update: (store, { data: { createQuestion } }) => {
                        const query = gql(listQuestions)
                        const data = store.readQuery({query, variables: { "filter":null,"limit":null,"nextToken":null}});
                        data.listQuestions.items = [
                            ...data.listQuestions.items.filter(item => item.id !== createQuestion.id),
                            createQuestion
                          ];
                        store.writeQuery({ query, data, variables: { "filter":null,"limit":null,"nextToken":null} });
                    }
                })
            },
        })
    })
)(QuestionPart)

export default withApollo(Question)