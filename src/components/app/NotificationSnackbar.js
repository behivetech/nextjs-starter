import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Snackbar, {SnackbarAction} from 'components/core/Snackbar';

import useNotifications from 'hooks/useNotifications';

import getClassName from 'tools/getClassName';

export default function NotificationSnackbar({className, name}) {
    const [rootClassName] = getClassName({className, rootClass: 'notification-snackbar'});
    const [open, setOpen] = useState(false);
    const {notification, removeNotification} = useNotifications();

    useEffect(() => {
        setOpen(!!notification);
    }, [notification]);

    function handleClose(event) {
        removeNotification();
        setOpen(false);
    }

    return (
        <Snackbar
            className={rootClassName}
            name={name}
            open={open}
            onClose={handleClose}
            message={notification}
            action={<SnackbarAction label="Dismiss" onClick={handleClose} />}
            timeout={90000}
        />
    );
}

NotificationSnackbar.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
};

NotificationSnackbar.defaultProps = {
    name: 'mainNotification',
};
