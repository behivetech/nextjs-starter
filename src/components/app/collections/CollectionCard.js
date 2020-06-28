import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardActions,
    CardActionIcons,
} from 'components/core/card';
import Headline from 'components/core/Headline';
import IconButton from 'components/core/IconButton';

import './CollectionCard.scss';

export default function CollectionCard({className, collection}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'collection-card',
    });

    function handleCardClick() {
        confirm('card clicked');
    }

    function getProps(iconKey) {
        const shareTitle = 'Share collection';
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
                <CardMedia
                    sixteenByNine
                    style={{
                        backgroundImage: 'url(images/FPO.png)',
                    }}
                />
                <div className={getChildClass('details')}>
                    <Headline level={3}>{collection.title}</Headline>
                    <div>contains {collection.contents_count} items</div>
                </div>
            </CardPrimaryAction>
            <CardActions>
                <CardActionIcons primary>
                    <IconButton {...getProps('share')} primary />
                    <IconButton {...getProps('queue')} primary />
                </CardActionIcons>
            </CardActions>
        </Card>
    );
}

CollectionCard.propTypes = {
    className: PropTypes.string,
    collection: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        contents_count: PropTypes.number,
        cover: PropTypes.arrayOf(PropTypes.string),
    }),
};

CollectionCard.defaultProps = {
    collection: {},
};
