import {useContext} from 'react';
import {NotificationContext} from 'components/providers/NotificationProvider';

export default function useNotifications() {
    const {notification, setNotification: setNotificationContext} = useContext(
        NotificationContext
    );

    function removeNotification() {
        setNotificationContext(null);
    }

    function setNotification(notification) {
        setNotificationContext(notification);
    }

    return {notification, removeNotification, setNotification};
}
