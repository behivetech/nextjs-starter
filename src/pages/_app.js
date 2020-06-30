import React from 'react';
import PropTypes from 'prop-types';
import {ApolloProvider} from '@apollo/react-hooks';

import {useApollo} from 'graphql/init-apollo';

import AppProviders from '../components/providers/AppProviders';

import 'styles/index.scss';
import 'styles/material-icons.scss';
import 'styles/third-party.scss';

export default function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <AppProviders>
                <Component {...pageProps} />
            </AppProviders>
        </ApolloProvider>
    );
}

App.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    pageProps: PropTypes.object,
};
