import React from "react"; 
import { Link } from "react-router-dom"; 
 
import { graphql, compose, withApollo } from 'react-apollo'; 
import gql from 'graphql-tag'; 
 
import { makeStyles, createStyles } from '@material-ui/core/styles'; 
import Paper from '@material-ui/core/Paper'; 
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Fab from '@material-ui/core/Fab'; 
import AddIcon from '@material-ui/icons/Add'; 
import Typography from '@material-ui/core/Typography'; 
 
import { getSurvey } from '../../graphql/queries'; 
import { listSurveyEntriess } from '../../graphql/queries'; 
 
import BigCalendar from 'react-big-calendar'; 
import moment from 'moment'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
 
moment.locale('en-AU'); 
const localizer = BigCalendar.momentLocalizer(moment) 
 
const useStyles = makeStyles(theme => 
    createStyles({ 
        root: { 
            flexGrow: 1, 
            maxHeight: '600px', 
            overflow: 'scroll', 
        }, 
        paper: { 
            padding: theme.spacing(2), 
            textAlign: 'left', 
            color: theme.palette.text.secondary, 
        }, 
        progress: { 
            margin: 20, 
        }, 
        header: { 
            margin: 20, 
            left: 20, 
        }, 
        fab: { 
            bottom: 20, 
            right: 20, 
            margin: 0, 
            top: 'auto', 
            left: 'auto', 
            position: 'fixed', 
        }, 
    }) 
) 
 
const SurveyPart = (props) => { 
    const classes = useStyles(); 
    const [events, setEvents] = React.useState([]) 
    const { listSurveyEntriess, refetch } = props; 
    const { data: { loading, error, getSurvey } } = props.getSurvey; 

    React.useEffect(() => {
        const timer = setTimeout(() => {
          refetch({ 'limit': 1000 })
        }, 5000);
        return () => clearTimeout(timer);
      }, [refetch]);
 
    React.useEffect(() => { 
        var eventsOut = []
        
        if (listSurveyEntriess.items) {
            listSurveyEntriess.items.map((entry) => { 
                let start = "" 
                let end = "" 
                let title = "" 
                if (entry.responses.items !== []) { 
                    const responses = entry.responses.items 
                    
                    if (typeof responses === 'undefined') return null 
                    for (let i = 0; i < responses.length; i++) { 
                        
                        if (responses[i].qu.qu === "Activity Start Time") { 
                            start = responses[i].res
                        } 
                        if (responses[i].qu.qu === "Activity Finish Time") { 
                            end = responses[i].res 
                        } 
                        if (responses[i].qu.qu === "What was your main activity?") { 
                            title = responses[i].res 
                        } 
                    }

                    eventsOut.push({ 
                        title: title, 
                        start: new Date(start), 
                        end: new Date(end), 
                        allDay: false, 
                        resource: null, 
                    })
                } 
                return null 
            }) 
            setEvents(eventsOut) 
        }
    }, [listSurveyEntriess]);  
 
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
            <div className={classes.header}> 
                <h3>{getSurvey.name}</h3> 
            </div> 
            <div> 
                <Paper className={classes.root}> 
                    <BigCalendar 
                        events={events} 
                        step={30} 
                        defaultView='day' 
                        views={['day']} 
                        defaultDate={new Date()} 
                        localizer={localizer} 
                    /> 
                </Paper> 
                <Fab color="primary" aria-label="Add" className={classes.fab} component={Link} to={getSurvey.mainQuestionnaire ? `/addentry/${getSurvey.mainQuestionnaire.id}` : "/"} > 
                    <AddIcon /> 
                </Fab> 
            </div> 
        </div> 
    ) 
} 
 
const Survey = compose( 
    graphql(gql(getSurvey), { 
        options: (props) => ({ 
            errorPolicy: 'all', 
            fetchPolicy: 'cache-and-network', 
            variables: { id: props.match.params.surveyID }, 
        }), 
        props: (props) => { 
            return { 
                getSurvey: props ? props : [], 
            } 
        } 
    }), 
    graphql(gql(listSurveyEntriess), { 
        options: (props) => ({ 
            errorPolicy: 'all', 
            fetchPolicy: 'cache-and-network', 
            variables: { 'limit': 1000 }
        }), 
        props: (props) => {
            return { 
                listSurveyEntriess: props.data.listSurveyEntriess ? props.data.listSurveyEntriess : [],
                refetch: props.data.refetch
            } 
        } 
    }) 
)(SurveyPart) 
 
export default withApollo(Survey) 