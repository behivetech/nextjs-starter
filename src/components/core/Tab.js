import React from 'react';
import PropTypes from 'prop-types';

import {Tab as MdcTab} from '@rmwc/tabs';

import getClassName from 'tools/getClassName';

import './Tab.scss';

export default function Tab({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'tab'});

    return <MdcTab {...props} className={rootClassName} />;
}

Tab.propTypes = {
    className: PropTypes.string,
};
