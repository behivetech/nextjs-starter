import React from 'react';
import PropTypes from 'prop-types';
import {CardActionIcons as MdcCardActionIcons} from '@rmwc/card';

import getClassName from 'tools/getClassName';

import './CardActionIcons.scss';

export default function CardActionIcons({
    children,
    className,
    primary,
    secondary,
    ...props
}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {primary, secondary},
        rootClass: 'card-action-icons',
    });

    return (
        <MdcCardActionIcons {...props} className={rootClassName}>
            {children}
        </MdcCardActionIcons>
    );
}

CardActionIcons.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
};
