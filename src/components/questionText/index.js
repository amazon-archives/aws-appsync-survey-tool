import React from "react";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(3),
        },
        group: {
            margin: theme.spacing(1, 0),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }
    )
);

const QuestionText = (props) => {
    const { qu } = props;
    const { final } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    function nextPreprocess() {
        props.saveState(props.index, { id: props.id, value })
        props.nextFn()
    }

    function previousPreprocess() {
        props.saveState(props.index, { id: props.id, value })
        props.prevFn()
    }

    function onValueChange(newValue) {
        if (value === newValue) {
            setValue(newValue);
            return;
        }
        setValue(newValue);
    };

    return (
        <Container>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Q.  {qu}</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Answer Required"
                    defaultValue={value}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                />
            </FormControl>
            <Box>
                <Button variant="contained" color="primary" className={classes.button} onClick={previousPreprocess} data-amplify-analytics-on='click' data-amplify-analytics-name='click' data-amplify-analytics-attrs={`questionnaire:next,question:${qu}`}>
                    <ArrowBackIcon />
                    Previous
                    </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={nextPreprocess} data-amplify-analytics-on='click' data-amplify-analytics-name='click' data-amplify-analytics-attrs={`questionnaire:next,question:${qu}`}>
                    {final ? "Finish" : "Next"}
                    <ArrowForwardIcon />
                </Button>
            </Box>
        </Container>
    );
}

export default QuestionText