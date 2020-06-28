import React from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';

import getClassName from 'tools/getClassName';

import './FieldError.scss';

const errorMessages = {
    required: 'This field is required',
    unknown: 'An unknown error has occured',
};

export default function FieldError({className, error}) {
    let errorResult = null;
    const [rootClassName] = getClassName({className, rootClass: 'field-error'});
    const {message, type} = error;

    if (message) {
        errorResult = message;
    } else {
        errorResult = errorMessages[type] || errorMessages.unknown;
    }

    return isEmpty(error) ? null : <div className={rootClassName}>{errorResult}</div>;
}

FieldError.propTypes = {
    className: PropTypes.string,
    error: PropTypes.object,
};

FieldError.defaultProps = {
    error: {},
};
