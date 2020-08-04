import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import Link from 'components/core/Link';

import './ListLink.scss';

export default function ListLink({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'list-link'});

    return <Link {...props} className={rootClassName} />;
}

ListLink.propTypes = {
    className: PropTypes.string,
};
