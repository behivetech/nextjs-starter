import React from 'react';
import PropTypes from 'prop-types';
import {IconButton as MdcIconButton} from '@rmwc/icon-button';

import getClassName from 'tools/getClassName';

import './IconButton.scss';

export default function IconButton({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'icon-button'});

    return <MdcIconButton {...props} className={rootClassName} />;
}

IconButton.propTypes = {
    className: PropTypes.string,
};
