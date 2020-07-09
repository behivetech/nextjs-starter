import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from 'components/app/LoginForm';
import Layout from 'components/layout/Layout';

// This is just a quick and dirty form for logging in for testing purposes
// Need to beef this up to actually log into something and get some styling.
export default function Register({path}) {
    return (
        <Layout className="home">
            <LoginForm path={path} register />;
        </Layout>
    );
}

Register.propTypes = {
    /** page path to be used with login */
    path: PropTypes.string,
};
