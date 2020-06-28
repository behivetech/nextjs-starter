import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {useRouter} from 'next/router';

import getClassName from 'tools/getClassName';

import './Link.scss';

export default function Link({
    areaLink,
    button,
    children,
    className,
    getIsActive,
    href,
    noUnderline,
    onPrimary,
    onSecondary,
    to,
    target,
    ...props
}) {
    const router = useRouter();
    const isActive = useCallback(() => {
        const linkPathName = href || to;

        return router.pathname === linkPathName;
    }, [href, router, to]);

    useEffect(() => {
        getIsActive(isActive(), href || to);
    }, [getIsActive, href, isActive, to]);

    const [rootClassName] = getClassName({
        className,
        modifiers: {
            active: isActive(),
            button: button,
            'area-link': areaLink,
            'no-underline': noUnderline,
            'on-primary': onPrimary,
            'on-secondary': onSecondary,
        },
        rootClass: 'link',
    });

    const linkProps = {
        ...props,
        href: to || href,
        className: rootClassName,
        target: href ? '_blank' : target,
    };

    const Element = button ? 'button' : 'a';

    return href && !button ? (
        <NextLink {...linkProps}>
            <a>{children}</a>
        </NextLink>
    ) : (
        <Element {...linkProps}>{children}</Element>
    );
}

Link.propTypes = {
    /** Adds a modifier class to the link when the page is active */
    activeClassName: PropTypes.string,
    /** Adds aditional styles when the page is active */
    activeStyleName: PropTypes.object,
    /**
        Makes link cover entire area of div it's within.
        The parent needs to have position: relative.
    */
    areaLink: PropTypes.bool,
    button: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /** Callback function to see if link is active */
    getIsActive: PropTypes.func,
    /** Sets a url and uses the <a /> tag instead of a Gatsby Link comoponent */
    href: PropTypes.string,
    /** Removes underline from hover. */
    noUnderline: PropTypes.bool,
    /** Sets text color to work on primary color. */
    onPrimary: PropTypes.bool,
    /** Sets text color to work on secondary color. */
    onSecondary: PropTypes.bool,
    /** adds target attribute to anchor tag */
    target: PropTypes.string,
    /** Internal site url which makes use of Gatsby's Link component */
    to: PropTypes.string,
};

Link.defaultProps = {
    getIsActive: () => null,
};
