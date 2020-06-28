import React from 'react';
import PropTypes from 'prop-types';
import {CardActionButtons as MdcCardActionButtons} from '@rmwc/card';

import getClassName from 'tools/getClassName';

export default function CardActionButtons({children, className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card-action-buttons'});

    return (
        <MdcCardActionButtons {...props} className={rootClassName}>
            {children}
        </MdcCardActionButtons>
    );
}

CardActionButtons.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
