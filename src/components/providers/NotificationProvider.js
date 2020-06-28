import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

import NotificationSnackbar from 'components/app/NotificationSnackbar';

const DEFAULT_CONTEXT = {
    notification: null,
    setNotification: () => null,
};

export const NotificationContext = createContext(DEFAULT_CONTEXT);

export default function NotificationProvider({children}) {
    const [notification, setNotificationState] = useState(null);

    function setNotification(message) {
        setNotificationState(message);
    }
    const context = {
        notification,
        setNotification,
    };

    return (
        <NotificationContext.Provider value={context}>
            {children}
            <NotificationSnackbar />
        </NotificationContext.Provider>
    );
}

NotificationProvider.propTypes = {
    children: PropTypes.node,
};
