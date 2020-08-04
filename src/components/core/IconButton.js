import React from 'react';
import PropTypes from 'prop-types';
import {IconButton as MdcIconButton} from '@rmwc/icon-button';

import getClassName from 'tools/getClassName';

import './IconButton.scss';

export default function IconButton({className, onPrimary, onSecondary, ...props}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {'on-primary': onPrimary, 'on-secondary': onSecondary},
        rootClass: 'icon-button',
    });

    return <MdcIconButton {...props} className={rootClassName} />;
}

IconButton.propTypes = {
    className: PropTypes.string,
    /** sets the icon color to on-primary */
    onPrimary: PropTypes.bool,
    /** sets the icon color to on-primary */
    onSecondary: PropTypes.bool,
};
