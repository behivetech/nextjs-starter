import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import './Section.scss';

export default function Section({className, centered, children}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {centered},
        rootClass: 'section',
    });

    return <section className={rootClassName}>{children}</section>;
}

Section.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    centered: PropTypes.string,
};
