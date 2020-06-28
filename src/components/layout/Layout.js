import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';
import useGlobalLoading from 'hooks/useGlobalLoading';

import Header from './Header';
import Loading from 'components/core/Loading';
import Main from './Main';
import SEO from 'components/app/SEO';

import './Layout.scss';

export default function Layout({children, className, description, fullWidth, title}) {
    const [rootClassName, getChildClass] = getClassName({className, rootClass: 'layout'});
    const {loading} = useGlobalLoading();

    return (
        <div className={rootClassName}>
            <SEO title={title} description={description} />
            <Header className={getChildClass('header')} />
            <Loading className={getChildClass('loading')} loading={loading} />
            <Main className={getChildClass('main')} fullWidth={fullWidth}>
                {children}
            </Main>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /** description for meta description of the site */
    description: PropTypes.string,
    /** Passes prop to Main which sets the main container to 100% wide. */
    fullWidth: PropTypes.bool,
    /** title for meta title info of the site */
    title: PropTypes.string,
};
