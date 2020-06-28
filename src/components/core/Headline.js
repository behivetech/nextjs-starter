import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import './Headline.scss';

export default function Headline({children, className, level, size}) {
    const Component = `h${level}`;
    const [rootClassName] = getClassName({
        className,
        modifiers: {[`h${size || level}`]: true},
        rootClass: 'headline',
    });

    return <Component className={rootClassName}>{children}</Component>;
}

Headline.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /** Level of the h tag such as h1, h2, h3 from 1-6 which will be default size prop if not set */
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
    /** Desired css size from 1-6 which overides the level prop */
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};
