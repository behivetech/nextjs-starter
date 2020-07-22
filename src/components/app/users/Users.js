import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {chain} from 'lodash';

import getClassName from 'tools/getClassName';
import useGlobalLoading from 'hooks/useGlobalLoading';
import useNotifications from 'hooks/useNotifications';

import UserCard from './UserCard';
import Section from 'components/layout/Section';

import './Users.scss';

const ALL_USERS = gql`
    query ALL_USERS {
        allUsers {
            id
            name
            email
        }
    }
`;

export default function Users({className}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'users',
    });
    const {setNotification} = useNotifications();
    const {loading, error, data} = useQuery(ALL_USERS);
    const {setLoading} = useGlobalLoading();

    useEffect(() => {
        if (error) {
            // TODO: Do a better job of the error handling.
            setNotification(JSON.stringify(error));
        }
    }, [error]);

    useEffect(() => {
        setLoading(loading);
    }, [loading, setLoading]);

    return (
        <Section className={rootClassName}>
            {chain(data)
                .get('allUsers')
                .map((user) => {
                    return (
                        <UserCard
                            className={getChildClass('user')}
                            user={user}
                            key={`user_${user.id}`}
                        />
                    );
                })
                .value()}
        </Section>
    );
}

Users.propTypes = {
    className: PropTypes.string,
};
