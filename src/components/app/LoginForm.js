import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {useRouter} from 'next/router';
import {includes} from 'lodash';
import {useForm} from 'react-hook-form';
import {useMutation} from '@apollo/react-hooks';

import getClassName from 'tools/getClassName';
import {required} from 'tools/fieldErrors';
import useAuth from 'hooks/useAuth';

import Button from 'components/core/Button';
import LoadingSpinner from 'components/core/LoadingSpinner';
import TextField from 'components/core/TextField';
import SEO from './SEO';

import './LoginForm.scss';

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            name
        }
    }
`;

const SIGNUP = gql`
    mutation SIGNUP($email: String!, $password: String!, $name: String!) {
        signup(input: {email: $email, password: $password, name: $name}) {
            accessToken
            name
        }
    }
`;

export default function LoginForm({path, register}) {
    const router = useRouter();
    const [registering, setRegistering] = useState(register);
    const [mutation, setMutation] = useState(register ? SIGNUP : LOGIN);
    const {
        authenticated,
        authenticating,
        handleLoggedIn,
        setAuthenticating,
        setError,
    } = useAuth();
    const [signupMutation] = useMutation(mutation, {
        onCompleted: handleLoggedIn,
        onError: handleError,
    });
    const {
        register: fieldRegister,
        handleSubmit,
        errors: fieldErrors,
        getValues,
    } = useForm();

    // Go to home page once logged in and not on a page with private in the url path.
    useEffect(() => {
        if (!authenticating && authenticated && !includes(path, 'private')) {
            router.push('/');
        }
    }, [authenticating, authenticated, path]);

    function matchesPassword(value) {
        const {password} = getValues();

        return value && password && value === password
            ? undefined
            : 'Passwords do not match.';
    }

    function handleError(errorResponse) {
        setError(
            errorResponse,
            `There was a problem ${registering ? 'signing up' : 'logging in'}.`
        );
    }

    function handleOnSubmit({email, password, name}) {
        const variables = registering ? {email, name, password} : {email, password};

        signupMutation({variables});
        setAuthenticating();
    }

    function handleLoginTypeClick(event) {
        const newRegistering = !registering;

        event.preventDefault();
        setRegistering(newRegistering);
        setMutation(newRegistering ? SIGNUP : LOGIN);
    }

    const [rootClassName, getChildClass] = getClassName({rootClass: 'login-form'});
    const buttonClass = getChildClass('button');

    return (
        <React.Fragment>
            <SEO title={registering ? 'Sign Up' : 'Login'} />
            <form
                className={rootClassName}
                onSubmit={handleSubmit(handleOnSubmit)}
                name="login"
            >
                {registering && (
                    <TextField
                        disabled={authenticating}
                        fieldError={fieldErrors.name}
                        id="loginName"
                        inputRef={fieldRegister({required})}
                        label="Name"
                        name="name"
                    />
                )}
                <TextField
                    disabled={authenticating}
                    fieldError={fieldErrors.email}
                    id="loginEmail"
                    inputRef={fieldRegister({required})}
                    label="Email"
                    name="email"
                />
                <TextField
                    disabled={authenticating}
                    fieldError={fieldErrors.password}
                    id="loginPassword"
                    inputRef={fieldRegister({required})}
                    label="Password"
                    name="password"
                    type="password"
                />
                {registering && (
                    <TextField
                        disabled={authenticating}
                        fieldError={fieldErrors.confirmPassword}
                        id="loginConfirmPassword"
                        inputRef={fieldRegister({
                            required,
                            validate: matchesPassword,
                        })}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                    />
                )}
                <Button
                    disabled={authenticating}
                    className={buttonClass}
                    icon={authenticating && <LoadingSpinner small />}
                    raised
                    type="submit"
                >
                    {registering ? 'create account' : 'login'}
                </Button>
                <Button className={buttonClass} onClick={handleLoginTypeClick}>
                    {registering ? 'already have an account' : 'create an account'}
                </Button>
            </form>
        </React.Fragment>
    );
}

LoginForm.propTypes = {
    /** path from router */
    path: PropTypes.string,
    register: PropTypes.bool,
};

LoginForm.defaultProps = {
    register: false,
};
