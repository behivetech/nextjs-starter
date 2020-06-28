import React from 'react';
import PropTypes from 'prop-types';
import {CardMedia as MdcCardMedia} from '@rmwc/card';

import getClassName from 'tools/getClassName';

export default function CardMedia({children, className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card-media'});

    return (
        <MdcCardMedia {...props} className={rootClassName}>
            {children}
        </MdcCardMedia>
    );
}

CardMedia.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
