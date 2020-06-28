import React from 'react';
import PropTypes from 'prop-types';

import AuthProvider from './AuthProvider';
import NotificationProvider from './NotificationProvider';
import LoadingProvider from './LoadingProvider';

export default function AppProviders({children}) {
    return (
        <NotificationProvider>
            <AuthProvider>
                <LoadingProvider>{children}</LoadingProvider>
            </AuthProvider>
        </NotificationProvider>
    );
}

AppProviders.propTypes = {
    children: PropTypes.node,
    pageProps: PropTypes.object,
};
