import React from 'react';
import PropTypes from 'prop-types';

import {TabBar as MdcTabBar} from '@rmwc/tabs';

import getClassName from 'tools/getClassName';

import './TabBar.scss';

export default function TabBar({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'tab-bar'});

    return <MdcTabBar {...props} className={rootClassName} />;
}

TabBar.propTypes = {
    className: PropTypes.string,
};
