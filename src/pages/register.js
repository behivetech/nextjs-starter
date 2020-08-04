import React from 'react';
import PropTypes from 'prop-types';

// layout
import Layout from 'components/layout/Layout';

// app
import LoginForm from 'components/app/LoginForm';

export default function Register({path}) {
    return (
        <Layout className="register-page" title="Register">
            <LoginForm path={path} register />;
        </Layout>
    );
}

Register.propTypes = {
    /** page path to be used with login */
    path: PropTypes.string,
};
