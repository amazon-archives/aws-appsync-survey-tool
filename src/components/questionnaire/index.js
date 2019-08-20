import React from "react";

import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import MultiStep from '../../components/multistep';
import QuestionText from '../questionText';
import QuestionBool from '../questionBool';
import QuestionList from '../questionList'

import { getQuestionnaire } from '../../graphql/queries';
import { createResponses } from '../../graphql/mutations';

const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            maxWidth: 345,
        },
        media: {
            // object-fit is not supported by IE 11.
            objectFit: 'cover',
        },
        table: {
            minWidth: 700,
        },
        progress: {
            margin: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(2),
        },
    }
    )
)

const QuestionnairePart = (props) => {
    const classes = useStyles();
    const { data: { loading, error, getQuestionnaire } } = props.getQuestionnaire;
    let final = false;

    function finish(wizardState) {
        wizardState.map((response) => {
            props.onCreateResponse(
                {
                    responsesQuId: response.id,
                    res: response.value
                }
            );
            return (<CircularProgress />)
        })
        props.history.push('/')
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
                <IconButton className={classes.button} aria-label="Back" onClick={() => { props.history.push('/') }}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
            <div>
                <MultiStep
                    steps={
                        getQuestionnaire.question.items.map((item, index, arr) => {
                            if (arr.length - 1 === index) {
                                final = true
                            }
                            switch (item.type) {
                                case 'BOOL':
                                    return {
                                        name: item.id,
                                        component: <QuestionBool id={item.id} index={index} qu={item.qu} final={final} navigation={props.navigation} />
                                    }
                                case 'TEXT':
                                    return {
                                        name: item.id,
                                        component: <QuestionText id={item.id} index={index} qu={item.qu} final={final} />
                                    }
                                case 'LIST':
                                    return {
                                        name: item.id,
                                        component: <QuestionList id={item.id} index={index} qu={item.qu} listOptions={item.listOptions} final={final} />
                                    }
                                default:
                                    return {
                                        name: item.id,
                                        component: <QuestionBool id={item.id} index={index} qu={item.qu} final={final} />
                                    }
                            }
                        })
                    }
                    onFinish={finish} />
            </div>
        </div>
    )
}

const Questionnaire = compose(
    graphql(gql(getQuestionnaire), {
        options: (props) => ({
            errorPolicy: 'all',
            fetchPolicy: 'cache-and-network',
            variables: { id: props.match.params.questionnaireID },
        }),
        props: (props) => {
            return {
                getQuestionnaire: props ? props : [],
            }
        }
    }),
    graphql(gql(createResponses), {
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
)(QuestionnairePart)

export default withApollo(Questionnaire)