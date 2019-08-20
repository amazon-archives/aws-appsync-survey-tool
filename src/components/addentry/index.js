import React from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { v4 as uuid } from 'uuid';

import 'date-fns';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';

import { getQuestionnaire } from '../../graphql/queries';
import { createResponses } from '../../graphql/mutations';
import { createSurveyEntries } from '../../graphql/mutations';

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            margin: 2,
        },
        input: {
            display: 'none',
        },
        formControl: {
            margin: 5,
        },
        textField: {
            marginLeft: 1,
            marginRight: 1,
        },
        grid: {
            width: '100%',
        },
        date: {
            width: '50%',
        },
        progress: {
            margin: 20,
        },
        root: {
            padding: theme.spacing(3, 2),
        },
    })
)

const AddEntryPart = (props) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [value, setValue] = React.useState('');
    const [radioValue, setRadioValue] = React.useState('');
    const [responses, setResponses] = React.useState([]);
    const [selectedDate] = React.useState(Date.now());
    const [group] = React.useState(uuid());
    const [yesno] = React.useState([{ name: 'Yes' }, { name: 'No' }]);
    const { data: { loading, error, getQuestionnaire } } = props.getQuestionnaire;

    function handleAdd() {
        props.onCreateSurveyEntries({ id: group })
        responses.map((response) => {
            props.onCreateResponse(
                {
                    responsesQuId: response.responsesQuId,
                    res: response.res,
                    responsesGroupId: group
                }
            );
            return (<CircularProgress />)
        })
        props.history.goBack()
        return null
    }

    function handleDateChange(id, index, event) {
        let newResponses = responses.slice(0);
        let data = { "responsesQuId": id, "res": event }
        newResponses[index] = data
        setResponses(newResponses)
    }

    function handleChange(index, event) {
        let newResponses = responses.slice(0);
        let data = { "responsesQuId": event.target.id, "res": event.target.value }
        newResponses[index] = data
        setResponses(newResponses)
    }

    function handleRadioChange(event) {
        setRadioValue(event.target.value);
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
        <div>
            <div>
                <Container>
                    <FormControl component="fieldset" className={classes.formControl}>
                        {getQuestionnaire.question.items.map((item, index, array) => {
                            switch (item.type) {
                                case 'BOOL':
                                    return (
                                        <div key={item.id}>
                                            <FormLabel component="legend">{item.qu}</FormLabel>
                                            <RadioGroup
                                                aria-label="Question"
                                                name="question"
                                                className={classes.group}
                                                value={radioValue}
                                                onChange={handleRadioChange}
                                            >
                                                {yesno.map((value, index) => {
                                                    return (
                                                        <FormControlLabel value={index} control={<Radio />} label={value.name} />
                                                    );
                                                })}
                                            </RadioGroup>
                                        </div>
                                    )
                                case 'DATETIME':
                                    return (
                                        <div key={item.id}>
                                            <FormLabel component="legend">{item.qu}</FormLabel>
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <Grid container className={classes.grid} justify="space-evenly">
                                                    <KeyboardDateTimePicker
                                                        margin="normal"
                                                        label="Date picker"
                                                        value={responses[`${index}`] ? responses[`${index}`]['res'] : selectedDate}
                                                        onChange={(event) => handleDateChange(item.id, index, event)}
                                                        className={classes.date}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    )
                                case 'TEXT':
                                    return (
                                        <div key={item.id}>
                                            <FormLabel component="legend">{item.qu}</FormLabel>
                                            <TextField
                                                required
                                                id={item.id}
                                                label="Answer Required"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                value={responses[`${index}`] ? responses[`${index}`]['res'] : ""}
                                                onChange={(event) => handleChange(index, event)}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </div>
                                    )
                                case 'LIST':
                                    return (
                                        <div key={item.id}>
                                            <FormLabel component="legend">{item.qu}</FormLabel>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Answer Required"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                value={value}
                                                onChange={(event) => handleChange(index, event)}
                                            />
                                        </div>
                                    )
                                default:
                                    return (
                                        <div key={item.id}>
                                            <FormLabel component="legend">{item.qu}</FormLabel>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Answer Required"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                value={responses[`${index}`] ? responses[`${index}`]['res'] : ""}
                                                onChange={(event) => handleChange(index, event)}
                                            />
                                        </div>
                                    )
                            }
                        })}
                    </FormControl>
                    <Box>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleAdd.bind(this)} data-amplify-analytics-on='click' data-amplify-analytics-name='click' data-amplify-analytics-attrs={`addEntry:click,questionnaire:${getQuestionnaire.id}`}>
                            <AddIcon />
                            Add Entry
                        </Button>
                    </Box>
                </Container>
            </div>
        </div>
    )
};

const AddEntry = compose(
    graphql(gql(getQuestionnaire), {
        options: (props) => ({
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
            variables: { id: props.match.params.questionnaireID },
        }),
        props: (props) => {
            return {
                getQuestionnaire: props ? props : [],
            }
        }
    }),
    graphql(gql(createSurveyEntries), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onCreateSurveyEntries: (id) => {
                props.mutate({
                    variables: {
                        input: id
                    },
                })
            }
        })
    }),
    graphql(gql(createResponses), {
        options: (props) => ({
            errorPolicy: 'all',
        }),
        props: (props) => ({
            onCreateResponse: (response) => {
                props.mutate({
                    variables: {
                        input: response
                    },
                })
            }
        })
    })
)(AddEntryPart)

export default withApollo(AddEntry)