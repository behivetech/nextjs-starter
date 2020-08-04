import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import useGlobalLoading from 'hooks/useGlobalLoading';
import useNotifications from 'hooks/useNotifications';

import {APP_INITIAL_STATE} from './app/appInitialState';

const DEFAULT_AUTH_CONTEXT = {
    handleLoggedIn: () => null,
    handleLoggedOut: () => null,
    setAuthenticating: () => null,
    setError: () => null,
    ...APP_INITIAL_STATE,
};

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);

const AuthContextProvider = AuthContext.Provider;

/**
Provider for authentication. Context returns...

| Context Key | Type | Description |
| ----------- | ----------- | ----------- |
| authenticated | boolean | indicates if user is authenticated |
| authenticating | boolean | indicates if it's in the process of authenticating |
| error | string | returns any error messages from the authentication |
| login | function | function to log into the application |
| logout | function | function to log out of the application |
| setUsername | function | function to set the username in state |
| signUp | function | function to sign up through the authenticator |
| token | string | JWT token set from the login |
| username | string | username that is authenticated |

<br /><br /><br />
*/

export default function AuthProvider({apolloClient, appActions, appState, children}) {
    const {setLoading} = useGlobalLoading();
    const {setNotification, setGraphQLError} = useNotifications();
    const {appAuthenticated, appAuthenticating, appError, appResetState} = useMemo(
        () => appActions,
        [appActions]
    );

    function resetState() {
        setLoading(false);
        appResetState();
    }

    function handleLoggedIn(data) {
        const {accessToken, name} = data.login || data.signup;

        setLoading(false);
        appAuthenticated({accessToken, name});
        setNotification({
            message: 'You have been successfully logged in.',
            messageKey: 'loggedIn',
            ttl: 3000,
        });
    }

    function setAuthenticating(loading = true) {
        setLoading(loading);
        appAuthenticating({authenticating: loading});
    }

    function setError(errorResponse, messagePrefix, ttl) {
        setLoading(false);
        appError({...errorResponse, messagePrefix});
        setGraphQLError(errorResponse, {messagePrefix, ttl});
    }

    function handleLoggedOut(success) {
        const notification = success
            ? {
                  message: 'You have been successfully logged out',
                  messageKey: 'logoutNotification',
                  ttl: 10000,
              }
            : {
                  message: 'There was a problem logging out. Please try again.',
                  messageKey: 'logoutError',
                  type: 'error',
                  ttl: -1,
              };

        if (success) {
            resetState();
            apolloClient.resetStore();
        }

        setNotification(notification);
    }

    const providerValues = {
        handleLoggedIn,
        handleLoggedOut,
        setAuthenticating,
        setError,
        ...appState,
    };

    return (
        <AuthContextProvider value={{...providerValues}}>{children}</AuthContextProvider>
    );
}

AuthProvider.propTypes = {
    apolloClient: PropTypes.object,
    appActions: PropTypes.shape({
        appAuthenticated: PropTypes.func,
        appAuthenticating: PropTypes.func,
        appError: PropTypes.func,
        appResetState: PropTypes.func,
    }),
    appState: PropTypes.shape({
        accessToken: PropTypes.string,
        authenticated: PropTypes.bool,
        authenticating: PropTypes.bool,
        error: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
        name: PropTypes.string,
        ssr: PropTypes.bool,
    }),
    children: PropTypes.node.isRequired,
};
