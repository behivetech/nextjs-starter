import React from 'react';
import PropTypes from 'prop-types';
import {CardMediaContent as MdcCardMediaContent} from '@rmwc/card';

import getClassName from 'tools/getClassName';

export default function CardMediaContent({children, className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card-media-content'});

    return (
        <MdcCardMediaContent {...props} className={rootClassName}>
            {children}
        </MdcCardMediaContent>
    );
}

CardMediaContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
