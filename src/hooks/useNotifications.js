import {useContext} from 'react';
import {NotificationContext} from 'components/providers/NotificationProvider';

import * as errorResponses from 'graphql/lib/error-response-constants';

export default function useNotifications() {
    const {currentNotification, removeNotification, setNotification} = useContext(
        NotificationContext
    );

    function setGraphQLError({graphQLErrors}, {messagePrefix, ttl = -1} = {}) {
        if (graphQLErrors && graphQLErrors.length) {
            graphQLErrors.map(({message, ...rest}, index) => {
                // eslint-disable-next-line import/namespace
                const graphQLErrorMessage = errorResponses[message] || message;
                const notificationMessage = messagePrefix
                    ? `${messagePrefix} ${graphQLErrorMessage}`
                    : graphQLErrorMessage;

                setNotification({
                    messageKey: `${message}__${index}`,
                    type: 'error',
                    message: notificationMessage,
                    devMessage: JSON.stringify({message, ...rest}, undefined, 4),
                    ttl,
                });
            });
        }
    }

    return {currentNotification, removeNotification, setGraphQLError, setNotification};
}
