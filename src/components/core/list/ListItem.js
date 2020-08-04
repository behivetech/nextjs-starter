import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as MdcListItem} from '@rmwc/list';

import getClassName from 'tools/getClassName';

import './ListItem.scss';

export default function ListItem({className, ...props}) {
    const [rootClassName] = getClassName({className, rootClass: 'list-item'});

    return <MdcListItem {...props} className={rootClassName} />;
}

ListItem.propTypes = {
    className: PropTypes.string,
};
