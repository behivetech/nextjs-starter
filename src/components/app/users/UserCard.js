import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import {
    Card,
    CardPrimaryAction,
    CardActions,
    CardActionIcons,
} from 'components/core/card';
import Headline from 'components/core/Headline';
import IconButton from 'components/core/IconButton';

import './UserCard.scss';

export default function UserCard({className, user}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'user-card',
    });

    function handleCardClick() {
        confirm('card clicked');
    }

    function getProps(iconKey) {
        const shareTitle = 'Share user';
        const queueTitle = 'Add to queue';
        const handleIconClick = () => confirm(`${iconKey} clicked`);
        const buttonProps = {
            share: {
                icon: iconKey,
                label: shareTitle,
                title: shareTitle,
                onClick: handleIconClick,
            },
            queue: {
                icon: iconKey,
                label: queueTitle,
                title: queueTitle,
                onClick: handleIconClick,
            },
        };

        return buttonProps[iconKey];
    }

    return (
        <Card className={rootClassName}>
            <CardPrimaryAction onClick={handleCardClick}>
                <div className={getChildClass('details')}>
                    <Headline level={3}>{user.name}</Headline>
                    <div>{user.email}</div>
                </div>
            </CardPrimaryAction>
            <CardActions>
                <CardActionIcons primary>
                    <IconButton {...getProps('share')} />
                    <IconButton {...getProps('queue')} />
                </CardActionIcons>
            </CardActions>
        </Card>
    );
}

UserCard.propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

UserCard.defaultProps = {
    user: {},
};
