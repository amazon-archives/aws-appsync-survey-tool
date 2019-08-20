import React from "react";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

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
    })
);

const QuestionBool = (props) => {
    const { qu } = props;
    const { final } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [yesno] = React.useState([{ name: 'Yes' }, { name: 'No' }]);

    function nextPreprocess() {
        props.saveState(props.index, { id: props.id, value: value.name })
        props.nextFn()
    }

    function previousPreprocess() {
        props.saveState(props.index, { id: props.id, value: value.name })
        props.prevFn()
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <Container>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Q.  {qu}</FormLabel>
                <RadioGroup
                    aria-label="Question"
                    name="question"
                    className={classes.group}
                    value={value}
                    onChange={handleChange}
                >
                    {yesno.map((value, index) => {
                        return (
                            <FormControlLabel value={index} control={<Radio />} label={value.name} />
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <Box>
                <Button variant="contained" color="primary" className={classes.button} onPress={previousPreprocess.bind(this)}>
                    <Icon className={classes.leftIcon}>arrow-back</Icon>
                    Previous
                    </Button>
                <Button iconRight onPress={nextPreprocess.bind(this)}>
                    {final ? "Finish" : "Next"}
                    <Icon className={classes.rightIcon}>arrow-forward</Icon>
                </Button>
            </Box>
        </Container>
    );
}

export default QuestionBool