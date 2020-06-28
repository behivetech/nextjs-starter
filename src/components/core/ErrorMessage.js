import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {get, isObject, map} from 'lodash';

import getClassName from 'tools/getClassName';

import Snackbar, {SnackbarAction} from './Snackbar';

import './ErrorMessage.scss';

export default function ErrorMessage({className, error, name}) {
    const [open, setOpen] = useState(!!error);
    const [rootClassName] = getClassName({className, rootClass: 'error-message'});

    useEffect(() => {
        setOpen(!!error);
    }, [error]);

    function handleClose(event) {
        setOpen(false);
    }

    function getMessage(errorArg) {
        let errorResult = typeof errorArg === 'string' ? errorArg : '';

        if (isObject(errorArg)) {
            if (errorArg.message) {
                const graphQLErrors = get(errorArg, 'graphQLErrors');

                if (isObject(graphQLErrors)) {
                    errorResult = (
                        <React.Fragment>
                            {map(graphQLErrors, ({message, path}) => (
                                <div key={message}>
                                    {message}, path: {JSON.stringify(path)}
                                </div>
                            ))}
                        </React.Fragment>
                    );
                } else {
                    errorResult = <pre>{JSON.stringify(errorArg, undefined, 4)}</pre>;
                }
            }
        } else {
            errorResult = <pre>{JSON.stringify(errorArg, undefined, 4)}</pre>;
        }

        return errorResult;
    }

    function getMessageArray(errors) {
        return (
            <React.Fragment>
                {map(errors, (errorValue, index) => (
                    <div key={`error__${index}`}>{getMessage(errorValue)}</div>
                ))}
            </React.Fragment>
        );
    }

    return (
        <Snackbar
            className={rootClassName}
            name={name}
            open={open}
            onClose={handleClose}
            message={get(error, 'errors') ? getMessageArray() : getMessage(error)}
            action={<SnackbarAction label="Dismiss" />}
            timeout={90000}
        />
    );
}

ErrorMessage.propTypes = {
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** name prop for the Snackbar component which is required by that component */
    name: PropTypes.string,
};

ErrorMessage.defaultProps = {
    name: 'errorMessage',
};
