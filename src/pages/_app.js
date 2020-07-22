import React from 'react';
import PropTypes from 'prop-types';

import AppProvider from 'components/providers/app/AppProvider';

import 'styles/index.scss';
import 'styles/material-icons.scss';
import 'styles/third-party.scss';

export default function App({Component, pageProps}) {
    return (
        <AppProvider pageProps={pageProps}>
            <Component {...pageProps} />
        </AppProvider>
    );
}

App.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    pageProps: PropTypes.object,
};
