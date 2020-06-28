import React from 'react';
import PropTypes from 'prop-types';
import {CardActions as MdcCardActions} from '@rmwc/card';

import getClassName from 'tools/getClassName';

export default function CardActions({children, className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card-actions'});

    return (
        <MdcCardActions {...props} className={rootClassName}>
            {children}
        </MdcCardActions>
    );
}

CardActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
