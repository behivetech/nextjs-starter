import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import LoadingSpinner from './LoadingSpinner';

import './Loading.scss';

export default function Loading({className, loading}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'loading',
    });

    return loading ? (
        <div className={rootClassName}>
            <div className={getChildClass('spinner')}>
                <LoadingSpinner onDark />
            </div>
        </div>
    ) : null;
}

Loading.propTypes = {
    className: PropTypes.string,
    /** If true, the loader will show; otherwise component returns null. */
    loading: PropTypes.bool,
};
