import {useMemo} from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

let apolloClient;
const httpUri = '/api/graphql';

function isSSR() {
    return typeof window === 'undefined';
}

function createIsomorphLink() {
    let isomorphLink;

    if (isSSR()) {
        const {SchemaLink} = require('apollo-link-schema');
        const {schema} = require('./schema');

        isomorphLink = new SchemaLink({schema});
    } else {
        const {createHttpLink} = require('apollo-link-http');

        isomorphLink = createHttpLink({
            uri: httpUri,
            credentials: 'same-origin',
        });
    }

    return isomorphLink;
}

function createApolloClient() {
    return new ApolloClient({
        ssrMode: isSSR(),
        link: createIsomorphLink(),
        cache: new InMemoryCache(),
    });
}

function initializeApollo(initialState = null) {
    const initApolloClient = apolloClient || createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        initApolloClient.cache.restore(initialState);
    }

    // For SSG and SSR always create a new Apollo Client
    // If it's the client and the global apolloClient doesn't exist, set the global
    // to the new Apollo Client so it's the same client whenever this is called
    if (!isSSR() && !apolloClient) {
        apolloClient = initApolloClient;
    }

    return initApolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
