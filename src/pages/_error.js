import React from 'react';
import PropTypes from 'prop-types';

const Error = ({statusCode}) => (
    <p>{statusCode ? `t('errorWithStatus', {statusCode})` : `t('errorWithoutStatus')`}</p>
);

Error.getInitialProps = async ({res, err}) => {
    let statusCode = null;

    if (res) {
        ({statusCode} = res);
    } else if (err) {
        ({statusCode} = err);
    }
    return {
        statusCode,
    };
};

Error.defaultProps = {
    statusCode: null,
};

Error.propTypes = {
    statusCode: PropTypes.number,
};

export default Error;
