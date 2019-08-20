import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import { Auth, Analytics } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink, createLinkWithCache } from 'aws-appsync';
import awsexports from './aws-exports';
import { ApolloProvider } from 'react-apollo';

import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

const stateLink = createLinkWithCache(cache => withClientState({ cache, resolvers: {}, }));
const awsAppSyncLink = createAppSyncLink({
    url: awsexports.aws_appsync_graphqlEndpoint,
    region: awsexports.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
    },
    complexObjectsCredentials: () => Auth.currentCredentials()
});
const link = ApolloLink.from([stateLink, awsAppSyncLink]);
const client = new AWSAppSyncClient({}, { link });

Analytics.autoTrack('session', {
    enable: true,
    provider: 'AWSPinpoint'
});

Analytics.autoTrack('pageView', {
    enable: true,
    eventName: 'pageView',
    type: 'SPA',
    provider: 'AWSPinpoint',
    getUrl: () => {
        return window.location.origin + window.location.pathname;
    }
});

Analytics.autoTrack('event', {
    enable: true,
    events: ['click'],
    selectorPrefix: 'data-amplify-analytics-',
    provider: 'AWSPinpoint'
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.register();