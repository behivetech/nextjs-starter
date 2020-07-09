import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import './Section.scss';

export default function Section({centered, className, children, padding}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {centered, padding},
        rootClass: 'section',
    });

    return <section className={rootClassName}>{children}</section>;
}

Section.propTypes = {
    /** Adds styling for a width set by SASS var $main-centered-max-width */
    centered: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    /** Adds padding to styling set by SASS var $main-padding */
    padding: PropTypes.bool,
};
