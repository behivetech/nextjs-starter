import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

export default function Main({className, children}) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'main-container',
    });

    return <main className={rootClassName}>{children}</main>;
}

Main.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
