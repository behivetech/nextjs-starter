import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {chain} from 'lodash';

import getClassName from 'tools/getClassName';
import useGlobalLoading from 'hooks/useGlobalLoading';
import useNotifications from 'hooks/useNotifications';

import CollectionCard from './CollectionCard';
import Section from 'components/layout/Section';

import './Collections.scss';

const COLLECTIONS = gql`
    query Collections {
        collections {
            id
            title
            contents_count
            cover
            owner {
                id
                name
            }
        }
    }
`;

export default function Collections({className}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'collections',
    });
    const {setNotification} = useNotifications();
    const {loading, error, data} = useQuery(COLLECTIONS);

    useGlobalLoading(loading);

    useEffect(() => {
        if (error) {
            // TODO: Do a better job of the error handling.
            setNotification(JSON.stringify(error));
        }
    });

    return (
        <Section className={rootClassName}>
            {chain(data)
                .get('collections')
                .map((collection) => {
                    return (
                        <CollectionCard
                            className={getChildClass('collection')}
                            collection={collection}
                            key={`collection_${collection.id}`}
                        />
                    );
                })
                .value()}
        </Section>
    );
}

Collections.propTypes = {
    className: PropTypes.string,
};
