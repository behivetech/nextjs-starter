import React from 'react';
import PropTypes from 'prop-types';
import {
    Snackbar as MdcSnackbar,
    SnackbarAction as MdcSnackbarAction,
} from '@rmwc/snackbar';

import getClassName from 'tools/getClassName';

import './Snackbar.scss';

export const SnackbarAction = MdcSnackbarAction;

export default function Snackbar({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'snackbar'});

    return <MdcSnackbar {...props} className={rootClassName} />;
}

Snackbar.propTypes = {
    className: PropTypes.string,
};
