import React, {useState} from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import Icon from 'components/core/Icon';
import Link from 'components/core/Link';
import Permissions from 'components/core/Permissions';
import {SimpleMenu, MenuItem} from 'components/core/Menu';

import './HeaderNav.scss';

export default function HeaderNav({className}) {
    const [selected, setSelected] = useState(false);
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'header-nav',
    });
    const links = [
        {
            display: 'home',
            to: '/',
        },
    ];

    function handleIsActive(isActive) {
        setSelected(isActive);
    }

    // eslint-disable-next-line
    function renderLink({authenticated, display, to}) {
        const link = (
            <MenuItem key={display} selected={selected}>
                <Link getIsActive={handleIsActive} to={to}>
                    {display}
                </Link>
            </MenuItem>
        );

        return authenticated ? (
            <Permissions key={`permissions_${display}`} authenticate>
                {link}
            </Permissions>
        ) : (
            link
        );
    }

    return (
        <nav className={rootClassName}>
            <SimpleMenu
                handle={
                    <Icon
                        className={getChildClass('icon')}
                        role="button"
                        icon="menu"
                        onPrimary
                    />
                }
                style={{minWidth: '200px'}}
            >
                {links.map(renderLink)}
            </SimpleMenu>
        </nav>
    );
}

HeaderNav.propTypes = {
    className: PropTypes.string,
};
