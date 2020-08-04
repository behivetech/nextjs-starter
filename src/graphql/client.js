import {useMemo} from 'react';
import fetch from 'isomorphic-unfetch';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

let apolloClient, clientAccessToken;
const httpLinkUri = '/api/graphql';

/* eslint-disable no-console */
function createIsomorphLink({appAuthenticated, appAuthenticating, appError}) {
    let isomorphLink;

    // For some reason, this specific conditional has to do
    // typeof window === 'undefined' instead of a function or coming from appState
    if (typeof window === 'undefined') {
        const {SchemaLink} = require('apollo-link-schema');
        const {schema} = require('./schema');
        const {prisma} = require('../../generated/prisma-client');

        isomorphLink = new SchemaLink({schema, context: {prisma, ssrRequest: true}});
    } else {
        const jwtDecode = require('jwt-decode');
        const {ApolloLink} = require('apollo-link');
        const {createHttpLink} = require('apollo-link-http');
        const {onError} = require('apollo-link-error');
        const {setContext} = require('apollo-link-context');
        const {TokenRefreshLink} = require('apollo-link-token-refresh');

        const httpLink = createHttpLink({
            uri: httpLinkUri,
            credentials: 'same-origin',
            fetch,
        });

        const authLink = setContext((_request, {headers}) => {
            return {
                headers: {
                    ...headers,
                    authorization: clientAccessToken ? `Bearer ${clientAccessToken}` : '',
                },
            };
        });
        const errorLink = onError(({graphQLErrors, networkError}) => {
            appError({graphQLErrors, networkError});
        });

        const refreshLink = new TokenRefreshLink({
            accessTokenField: 'accessToken',
            isTokenValidOrUndefined: () => {
                let isValidOrUndefined = false;

                if (clientAccessToken) {
                    try {
                        const {exp} = jwtDecode(clientAccessToken);
                        if (Date.now() >= exp * 1000) {
                            isValidOrUndefined = false;
                        } else {
                            isValidOrUndefined = true;
                        }
                    } catch {
                        isValidOrUndefined = false;
                    }
                }

                return isValidOrUndefined;
            },
            fetchAccessToken: () => {
                return fetch('/api/refresh-token', {credentials: 'same-origin'});
            },
            handleResponse: (operation, accessTokenField) => async (response) => {
                const {accessToken, name} = await response.json();

                await appAuthenticated({
                    accessToken: accessToken,
                    authInitialized: true,
                    name,
                });

                return {[accessTokenField]: accessToken};
            },
            handleFetch: (accessToken) => {
                console.log('TOKEN_REFRESHED', {
                    accessToken,
                });
                clientAccessToken = accessToken;
            },
            handleError: (refreshError) => {
                appError({refreshError});
            },
        });

        isomorphLink = ApolloLink.from([refreshLink, errorLink, authLink, httpLink]);
    }

    return isomorphLink;
}
/* eslint-enable */

function createApolloClient(appActions, ssr) {
    return new ApolloClient({
        ssrMode: ssr,
        link: createIsomorphLink(appActions),
        cache: new InMemoryCache(),
    });
}

function initializeApollo(initialState = null, getAppState, appActions) {
    const {accessToken, ssr} = getAppState();
    clientAccessToken = accessToken;
    const initApolloClient = apolloClient || createApolloClient(appActions, ssr);
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        initApolloClient.cache.restore(initialState);
    }

    // For SSG and SSR always create a new Apollo Client
    // If it's the client and the global apolloClient doesn't exist, set the global
    // to the new Apollo Client so it's the same client whenever this is called
    if (!ssr && !apolloClient) {
        apolloClient = initApolloClient;
    }

    return initApolloClient;
}

export function useApollo({appActions, getAppState, initialState}) {
    const apolloClient = useMemo(
        () => initializeApollo(initialState, getAppState, appActions),
        [initialState]
    );

    return apolloClient;
}
