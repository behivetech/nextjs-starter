import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';
import {errorResponse} from 'graphql/errorResponse';

import './GraphQlErrorResponse.scss';

export default function GraphQlErrorResponse({className, error}) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'graphql-error-response',
    });

    return error ? <pre className={rootClassName}>{errorResponse(error)}</pre> : null;
}

GraphQlErrorResponse.propTypes = {
    className: PropTypes.string,
    error: PropTypes.object,
};
