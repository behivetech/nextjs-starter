import React from 'react';
import PropTypes from 'prop-types';
import {Card as MdcCard} from '@rmwc/card';

import getClassName from 'tools/getClassName';

import './Card.scss';

export default function Card({className, children, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card'});

    return (
        <MdcCard {...props} className={rootClassName}>
            {children}
        </MdcCard>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};
