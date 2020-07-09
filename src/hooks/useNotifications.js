import {useContext} from 'react';
import {NotificationContext} from 'components/providers/NotificationProvider';

export default function useNotifications() {
    const {currentNotification, removeNotification, setNotification} = useContext(
        NotificationContext
    );

    return {currentNotification, removeNotification, setNotification};
}
