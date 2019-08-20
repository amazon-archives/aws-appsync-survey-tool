import React from 'react';
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listSurveys } from '../../graphql/queries';

const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            maxWidth: 345,
            margin: 10,
        },
        media: {
            // object-fit is not supported by IE 11.
            objectFit: 'cover',
        },
        table: {
            minWidth: 700,
        },
        progress: {
            margin: 2,
        },
    }),
);

const HomePart = (props) => {
    const classes = useStyles();
    const { data: { loading, error, listSurveys } } = props.listSurveys;

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
        <Grid container gutter={0}>
            {listSurveys.items.map(({ id, name, description, image, preQuestionnaire, postQuestionnaire }) => (
                <Grid item sm={6} xs={12} key={id}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={name}
                                className={classes.media}
                                height="140"
                                image={image}
                                title={name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {preQuestionnaire ?
                                <Button size="small" color="primary" component={Link} to={`/questionnaire/${preQuestionnaire.id}`}>
                                    Pre-Questionnaire
                                        </Button>
                                : null
                            }
                            <Button size="small" color="primary" component={Link} to={`/survey/${id}`}>
                                Survey
                                    </Button>
                            {postQuestionnaire ?
                                <Button size="small" color="primary" component={Link} to={`/questionnaire/${postQuestionnaire.id}`}>
                                    Post-Questionnaire
                                        </Button>
                                : null
                            }
                        </CardActions>
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    );
}

const Home = compose(
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
    })
)(HomePart)

export default withApollo(Home)