import React from 'react';
import PropTypes from 'prop-types';

import useAuth from 'hooks/useAuth';

export default function Permissions({authenticate, children, renderAlternateView}) {
    const {authenticated, ssr} = useAuth();

    return (
        <React.Fragment>
            {(authenticate && authenticated && !ssr) || (!authenticate && !authenticated)
                ? children
                : renderAlternateView()}
        </React.Fragment>
    );
}

Permissions.propTypes = {
    /** Requires for user to be logged in if set to true */
    authenticate: PropTypes.bool,
    children: PropTypes.node.isRequired,
    /** Function to render an alternate view if permission conditions do not pass */
    renderAlternateView: PropTypes.func,
};

Permissions.defaultProps = {
    renderAlternateView: () => null,
};
