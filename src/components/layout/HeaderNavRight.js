import React from 'react';
import PropTypes from 'prop-types';
import {SimpleMenu, MenuItem} from '@rmwc/menu';

import getClassName from 'tools/getClassName';
import useAuth from 'hooks/useAuth';

import Icon from 'components/core/Icon';
import Link from 'components/core/Link';

import './HeaderNavRight.scss';

export default function HeaderNavRight({className}) {
    const {authenticated, logout, username} = useAuth();
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'header-nav-right',
    });
    const linkClassName = getChildClass('link');

    function handleLogout() {
        logout();
    }

    function renderLogin() {
        return (
            <React.Fragment>
                <Link to="/login" className={linkClassName} onPrimary>
                    log in
                </Link>
                <Link to="/register" className={linkClassName} onPrimary>
                    sign up
                </Link>
            </React.Fragment>
        );
    }

    function renderIcon() {
        return (
            <Icon
                role="button"
                className={getChildClass('user')}
                icon="account_circle"
                onPrimary
            />
        );
    }

    function renderLoggedIn() {
        return (
            <SimpleMenu
                className={getChildClass('menu')}
                handle={renderIcon()}
                style={{minWidth: '200px'}}
            >
                <MenuItem selected>logged in as {username || ''}</MenuItem>
                <MenuItem>
                    <Link
                        className={linkClassName}
                        type="areaLink"
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        className={linkClassName}
                        to="/private/account-profile"
                        areaLink
                        button
                    >
                        Profile
                    </Link>
                </MenuItem>
            </SimpleMenu>
        );
    }

    return (
        <div className={rootClassName}>
            {authenticated ? renderLoggedIn() : renderLogin()}
        </div>
    );
}

HeaderNavRight.propTypes = {
    className: PropTypes.string,
};
