import React, {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {useLazyQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useNotifications from 'hooks/useNotifications';

import {
    getToken,
    getUser,
    resetPersistence,
    setToken,
    setUser,
} from 'tools/persistValues';

const SIGNUP = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(data: {email: $email, password: $password, name: $name}) {
            token
        }
    }
`;

const LOGIN = gql`
    query LoginQuery($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const INITIAL_STATE = {
    authenticated: !!getToken(),
    ssr: true,
    authenticating: false,
    error: null,
    username: getUser(),
};

const DEFAULT_AUTH_CONTEXT = {
    login: () => null,
    logout: () => null,
    setUsername: () => null,
    signUp: () => null,
    ...INITIAL_STATE,
};

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);

const AuthContextProvider = AuthContext.Provider;

function reducer(state, {type, payload = {}}) {
    const actions = {
        RESET_STATE: {
            authenticating: false,
            authenticated: false,
            error: null,
            username: null,
        },
        SET_AUTHENTICATED: {
            ...state,
            authenticated: true,
            authenticating: false,
            error: null,
        },
        SET_AUTHENTICATING: {
            ...INITIAL_STATE,
            authenticating: true,
            username: payload.username,
        },
        SET_ERROR: {
            authenticated: false,
            authenticating: false,
            error: payload.error,
            username: null,
        },
        SET_USER_RELOGIN: {
            authenticated: true,
            authenticating: false,
            error: null,
            username: payload.username,
        },
    };

    return actions[type] || state;
}
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

export default function AuthProvider({children}) {
    const {setNotification} = useNotifications();
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [loginQuery] = useLazyQuery(LOGIN, {
        onCompleted: loginConfirm,
        onError: handleError,
        ssr: false,
    });
    const [signupMutation] = useMutation(SIGNUP, {
        onCompleted: loginConfirm,
        onError: handleError,
    });

    function login(email, password, callback = () => null) {
        dispatch({type: 'SET_AUTHENTICATING', payload: {username: email}});
        loginQuery({variables: {email, password}});
        setUser(email);
        callback(state);
    }

    /** Logs out of app */
    function logout() {
        resetPersistence();
        dispatch({type: 'RESET_STATE'});
        setNotification('You have been successfully logged out');
    }

    function signUp(name, email, password) {
        dispatch({type: 'SET_AUTHENTICATING', payload: {username: email}});
        signupMutation({variables: {name, email, password}});
    }

    async function loginConfirm(data) {
        const {token: dataToken} = data.login || data.signup;

        await setToken(dataToken);
        dispatch({type: 'SET_AUTHENTICATED'});
    }

    function handleError(errorResponse) {
        dispatch({type: 'SET_ERROR', payload: {error: errorResponse}});
    }

    const providerValues = {
        login,
        logout,
        signUp,
        ...state,
    };

    return (
        <AuthContextProvider value={{...providerValues}}>{children}</AuthContextProvider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
