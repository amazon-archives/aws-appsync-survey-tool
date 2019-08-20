import React from "react";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(theme =>
    createStyles({
        button: {
            margin: 5,
        },
        input: {
            display: 'none',
        },
        leftIcon: {
            marginRight: 5,
        },
        rightIcon: {
            marginLeft: 5,
        },
        formControl: {
            margin: 5,
        },
        group: {
            margin: 3,
        },
    })
)

const QuestionList = (props) => {
    const { qu } = props;
    const { listOptions } = props;
    const { final } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    function nextPreprocess() {
        props.saveState(props.index, { id: props.id, value: value })
        props.nextFn()
    }

    function previousPreprocess() {
        props.saveState(props.index, { id: props.id, value: value })
        props.prevFn()
    }

    function onValueChange(event, newValue) {
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
                <RadioGroup
                    aria-label="Question"
                    name="question"
                    className={classes.group}
                    value={value}
                    onChange={onValueChange}
                >
                    {listOptions.map((value, index) => {
                        return (
                            <FormControlLabel value={value} key={index} control={<Radio />} label={value} />
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <Box>
                <Button variant="contained" color="primary" className={classes.button} onClick={previousPreprocess} data-amplify-analytics-on='click' data-amplify-analytics-name='click' data-amplify-analytics-attrs={`questionnaire:back,question:${qu}`}>
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

export default QuestionList;