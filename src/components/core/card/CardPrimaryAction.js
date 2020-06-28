import React from 'react';
import PropTypes from 'prop-types';
import {CardPrimaryAction as MdcCardPrimaryAction} from '@rmwc/card';

import getClassName from 'tools/getClassName';

export default function CardPrimaryAction({children, className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'card-primary-actions'});

    return (
        <MdcCardPrimaryAction {...props} className={rootClassName}>
            {children}
        </MdcCardPrimaryAction>
    );
}

CardPrimaryAction.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
