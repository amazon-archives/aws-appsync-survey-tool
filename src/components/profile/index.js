import React from 'react';

import { Auth } from 'aws-amplify';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
    createStyles({
        textField: {
            marginLeft: 1,
            marginRight: 1,
        },
        grid: {
            width: '100%',
        },
    })
)

const Profile = (props) => {

    const classes = useStyles();
    const [profile, setProfile] = React.useState({});
    const [session, setSession] = React.useState({});

    React.useEffect(() => {
        Auth.currentSession()
            .then(res => {
                setSession(res)
                return (res)
            })
            .catch(err => {
                console.error(err);
            })
        Auth.currentUserInfo()
            .then(res => {
                setProfile(res)
                return (res)
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    return (
        <div>
            <p>Profile Page</p>
            <Grid container className={classes.grid} justify="space-evenly">
                <Grid>
                    <TextField
                        disabled
                        id="standard-read-only-input"
                        label="Username"
                        value={profile.username ? profile.username : ""}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid>
                    <TextField
                        disabled
                        id="standard-read-only-input"
                        label="Email"
                        value={profile.attributes ? profile.attributes.email : ""}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid>
                    <TextField
                        disabled
                        id="standard-read-only-input"
                        label="Phone"
                        value={profile.attributes ? profile.attributes.phone_number : ""}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid>
                    <TextField
                        disabled
                        id="standard-read-only-input"
                        label="Groups"
                        value={session.accessToken ? session.accessToken.payload['cognito:groups'] : ""}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile