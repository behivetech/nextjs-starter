import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import Headline from '../core/Headline';
import Link from '../core/Link';
import HeaderNav from './HeaderNav';
import HeaderNavRight from './HeaderNavRight';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

import './Header.scss';

export default function Header({className}) {
    const [rootClassName, getChildClass] = getClassName({className, rootClass: 'header'});

    return (
        <header className={rootClassName}>
            <div className={getChildClass('left')}>
                <HeaderNav className={getChildClass('nav')} />
                <Headline className={getChildClass('headline')} level={1}>
                    <Link className={getChildClass('link')} to="/" noUnderline onPrimary>
                        {SITE_NAME}
                    </Link>
                </Headline>
            </div>
            <HeaderNavRight className={getChildClass('right')} />
        </header>
    );
}

Header.propTypes = {
    className: PropTypes.string,
};
