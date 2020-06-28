import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {CircularProgress} from '@rmwc/circular-progress';
import {includes} from 'lodash';
import {useForm} from 'react-hook-form';

import getClassName from 'tools/getClassName';
import useAuth from 'hooks/useAuth';

import Button from '../core/Button';
import TextField from '../core/TextField';
import SEO from './SEO';
import ErrorMessage from '../core/ErrorMessage';

import './LoginForm.scss';

const fieldErrors = {
    required: 'This field is required.',
};

export default function LoginForm({path}) {
    const router = useRouter();
    const [shouldLogin, setShouldLogin] = useState(!includes(path, 'register'));
    const {authenticated, authenticating, error, login, signUp} = useAuth();
    const {register, handleSubmit, errors, getValues} = useForm();

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

    function handleOnSubmit({email, password, name}) {
        if (shouldLogin) {
            login(email, password);
        } else {
            signUp(name, email, password);
        }
    }

    function handleLoginTypeClick(event) {
        event.preventDefault();
        setShouldLogin(!shouldLogin);
    }

    const [rootClassName, getChildClass] = getClassName({rootClass: 'login-form'});
    const buttonClass = getChildClass('button');

    return (
        <React.Fragment>
            <SEO title={shouldLogin ? 'Login' : 'Sign Up'} />
            <form
                className={rootClassName}
                onSubmit={handleSubmit(handleOnSubmit)}
                name="login"
            >
                {!shouldLogin && (
                    <TextField
                        disabled={authenticating}
                        id="loginName"
                        name="name"
                        label="Name"
                        fieldError={errors.name}
                        inputRef={register({required: fieldErrors.required})}
                    />
                )}
                <TextField
                    disabled={authenticating}
                    id="loginEmail"
                    name="email"
                    label="Email"
                    inputRef={register({required: fieldErrors.required})}
                    fieldError={errors.email}
                />
                <TextField
                    disabled={authenticating}
                    fieldError={errors.password}
                    id="loginPassword"
                    inputRef={register({required: fieldErrors.required})}
                    label="Password"
                    name="password"
                    type="password"
                />
                {!shouldLogin && (
                    <TextField
                        disabled={authenticating}
                        fieldError={errors.confirmPassword}
                        id="loginConfirmPassword"
                        inputRef={register({
                            required: fieldErrors.required,
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
                    icon={authenticating && <CircularProgress size="xsmall" />}
                    raised
                    type="submit"
                >
                    {shouldLogin ? 'login' : 'create account'}
                </Button>
                <Button className={buttonClass} onClick={handleLoginTypeClick} outlined>
                    {shouldLogin ? 'go to sign up page' : 'go to login page'}
                </Button>
            </form>
            {error && <ErrorMessage error={error} />}
        </React.Fragment>
    );
}

LoginForm.propTypes = {
    /** path from router */
    path: PropTypes.string,
};
