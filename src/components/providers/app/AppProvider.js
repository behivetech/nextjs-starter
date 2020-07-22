import React, {useMemo, useReducer} from 'react';
import PropTypes from 'prop-types';
import {ApolloProvider} from '@apollo/react-hooks';

import appActionsCreator from './appActions';
import {APP_INITIAL_STATE} from './appInitialState';
import {useApollo} from 'graphql/init-apollo';

import AuthProvider from '../AuthProvider';
import NotificationProvider from '../NotificationProvider';
import LoadingProvider from '../LoadingProvider';
import appReducer from './appReducer';

export default function AppProvider({children, pageProps}) {
    const [appState, appDispatch] = useReducer(appReducer, APP_INITIAL_STATE);
    const appActions = useMemo(() => appActionsCreator(appDispatch), [appDispatch]);
    const apolloClient = useApollo({
        appActions,
        appState,
        initialState: pageProps.initialApolloState,
    });

    return (
        <NotificationProvider>
            <LoadingProvider>
                <AuthProvider
                    apolloClient={apolloClient}
                    appState={appState}
                    appActions={appActions}
                >
                    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
                </AuthProvider>
            </LoadingProvider>
        </NotificationProvider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node,
    pageProps: PropTypes.object,
};
