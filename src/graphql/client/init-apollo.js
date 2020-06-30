import {useMemo} from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {getToken} from 'tools/persistValues';

let apolloClient;
const httpUri = '/api/graphql';
// const wsUri = 'ws://localhost:8080/api/graphql';

function isSSR() {
    return typeof window === 'undefined';
}

function createIsomorphLink() {
    if (isSSR()) {
        const {SchemaLink} = require('apollo-link-schema');
        const {schema} = require('../server/schema');

        return new SchemaLink({schema});
    } else {
        return createClientLink();
    }
}

function createClientLink(cache) {
    // eslint-disable-next-line global-require
    const {createHttpLink} = require('apollo-link-http');
    const {setContext} = require('apollo-link-context');
    // const {getMainDefinition} = require('apollo-utilities');
    // const {split} = require('apollo-link');
    // const {SubscriptionClient} = require('subscriptions-transport-ws');
    // const {WebSocketLink} = require('apollo-link-ws');

    const token = getToken();
    const httpLink = createHttpLink({
        uri: httpUri,
    });

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    // const wsClient = new SubscriptionClient(
    //     wsUri,
    //     {
    //         reconnect: true,
    //         options: {
    //             connectionParams: {
    //                 authToken: token,
    //             },
    //         },
    //     },
    //     WebSocket
    // );

    // const wsLink = new WebSocketLink(wsClient);

    // return split(
    //     ({query}) => {
    //         const {kind, operation} = getMainDefinition(query);

    //         return kind === 'OperationDefinition' && operation === 'subscription';
    //     },
    //     wsLink,
    //     authLink.concat(httpLink)
    // );

    return authLink.concat(httpLink);
}

function createApolloClient() {
    const apolloProps = {
        ssrMode: isSSR(),
        link: createIsomorphLink(),
        cache: new InMemoryCache(),
    };

    // if (!isSSR()) {
    //     apolloProps.resolvers = resolvers;
    //     apolloProps.typeDefs = typeDefs;
    // }

    return new ApolloClient(apolloProps);
}

function initializeApollo(initialState = null) {
    const initApolloClient = apolloClient || createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        initApolloClient.cache.restore(initialState);
    }

    // For SSG and SSR always create a new Apollo Client
    // Create the Apollo Client once in the client
    if (!isSSR() && !apolloClient) {
        apolloClient = initApolloClient;
    }

    return initApolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
