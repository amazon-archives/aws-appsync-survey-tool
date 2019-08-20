import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
          },
          formControl: {
            margin: theme.spacing(3),
          },
    }),
);

const Settings = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Sample Settings</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={false} />}
                            label="Dark Mode"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={false} />}
                            label="Verbose Logging"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={true} />
                            }
                            label="Send Anonymous Feedback"
                        />
                    </FormGroup>
                    <FormHelperText>(Note that controls are non-functional.)</FormHelperText>
                </FormControl>
            </div>
        </div>
    );
}

export default Settings