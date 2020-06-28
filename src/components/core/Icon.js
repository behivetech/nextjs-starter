import React from 'react';
import PropTypes from 'prop-types';
import {Icon as MaterialIcon} from '@rmwc/icon';

import getClassName from 'tools/getClassName';

import './Icon.scss';

export default function Icon({className, icon, onPrimary, onSecondary, ...props}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {
            'on-primary': onPrimary,
            'on-secondary': onSecondary,
        },
        rootClass: 'icon',
    });

    return <MaterialIcon {...props} className={rootClassName} icon={icon} />;
}

Icon.propTypes = {
    className: PropTypes.string,
    /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
    icon: PropTypes.string,
    /** Adds class to use the MDC theme on-primary text color */
    onPrimary: PropTypes.bool,
    /** Adds class to use the MDC theme on-secondary text color */
    onSecondary: PropTypes.bool,
};

Icon.defaultProps = {
    icon: 'menu',
};
