import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import './Main.scss';

export default function Main({className, children, fullWidth}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {'full-width': fullWidth},
        rootClass: 'main-container',
    });

    return <main className={rootClassName}>{children}</main>;
}

Main.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    /** Sets the width to 100% otherwise defaults to sass variable $main-container-width */
    fullWidth: PropTypes.bool,
};
