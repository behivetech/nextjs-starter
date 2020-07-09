import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from 'components/app/LoginForm';
import Layout from 'components/layout/Layout';

// This is just a quick and dirty form for logging in for testing purposes
// Need to beef this up to actually log into something and get some styling.
export default function Login({path}) {
    return (
        <Layout className="login-page" title="Login">
            <LoginForm path={path} />;
        </Layout>
    );
}

Login.propTypes = {
    /** page path to be used with login */
    path: PropTypes.string,
};
