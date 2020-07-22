import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'components/core/Snackbar';

import getClassName from 'tools/getClassName';

import Button from 'components/core/Button';

import './NotificationSnackbar.scss';

export default function NotificationSnackbar({
    className,
    notification,
    removeNotification,
}) {
    const [rootClassName] = getClassName({className, rootClass: 'notification-snackbar'});
    const {message, messageKey, ttl} = useMemo(() => notification || {}, [notification]);

    function handleClose(event) {
        removeNotification(messageKey);
    }

    return (
        <Snackbar
            open={!!message}
            onClose={handleClose}
            message={<div className={rootClassName}>{message}</div>}
            action={
                <Button onClick={handleClose} raised>
                    Dismiss
                </Button>
            }
            timeout={ttl || 10000}
        />
    );
}

NotificationSnackbar.propTypes = {
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.node.isRequired,
        messageKey: PropTypes.string.isRequired,
        ttl: PropTypes.number.isRequired,
        type: PropTypes.string,
    }),
    removeNotification: PropTypes.func.isRequired,
};
