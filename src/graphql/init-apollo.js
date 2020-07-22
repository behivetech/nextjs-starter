import {useMemo} from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

let apolloClient;
const httpLinkUri = '/api/graphql';

/* eslint-disable no-console */
function createIsomorphLink(
    {accessToken, ssr},
    {appAuthenticated, appAuthenticating, appError}
) {
    let isomorphLink;

    if (ssr) {
        const {SchemaLink} = require('apollo-link-schema');
        const {schema} = require('./schema');

        isomorphLink = new SchemaLink({schema});
    } else {
        const {ApolloLink} = require('apollo-link');
        const {createHttpLink} = require('apollo-link-http');
        const {onError} = require('apollo-link-error');
        const {setContext} = require('apollo-link-context');

        const httpLink = createHttpLink({
            uri: httpLinkUri,
            credentials: 'same-origin',
            fetch,
        });

        const authLink = setContext((_request, {headers}) => {
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `bearer ${accessToken}` : '',
                },
            };
        });

        const errorLink = onError(({graphQLErrors, networkError}) => {
            appError({graphQLErrors, networkError});
        });

        return ApolloLink.from([authLink, errorLink, httpLink]);
    }

    return isomorphLink;
}
/* eslint-enable */

function createApolloClient(appState, appActions) {
    return new ApolloClient({
        ssrMode: appState.ssr,
        link: createIsomorphLink(appState, appActions),
        cache: new InMemoryCache(),
    });
}

function initializeApollo(initialState = null, appState, appActions) {
    const initApolloClient = apolloClient || createApolloClient(appState, appActions);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        initApolloClient.cache.restore(initialState);
    }

    // For SSG and SSR always create a new Apollo Client
    // If it's the client and the global apolloClient doesn't exist, set the global
    // to the new Apollo Client so it's the same client whenever this is called
    if (!appState.ssr && !apolloClient) {
        apolloClient = initApolloClient;
    }

    return initApolloClient;
}

export function useApollo({appActions, appState, initialState}) {
    const apolloClient = useMemo(
        () => initializeApollo(initialState, appState, appActions),
        [initialState]
    );

    return apolloClient;
}
