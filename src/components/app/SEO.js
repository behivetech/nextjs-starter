import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {map} from 'lodash';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function SEO({children, description, title}) {
    const siteTitle = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
    const metaTags = [
        {
            name: `description`,
            content: description,
        },
        {
            property: `og:title`,
            content: siteTitle,
        },
        {
            property: `og:description`,
            content: description,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:creator`,
            content: SITE_NAME,
        },
        {
            name: `twitter:title`,
            content: siteTitle,
        },
        {
            name: `twitter:description`,
            content: description,
        },
    ];

    function renderMetaTag(tag) {
        return <meta {...tag} key={tag.name || tag.property} />;
    }

    return (
        <Head>
            <title>{siteTitle}</title>
            <link rel="alternate" hrefLang="en" href={SITE_URL} />
            {map(metaTags, renderMetaTag)}
            {children}
        </Head>
    );
}

SEO.propTypes = {
    /** Any additional meta tags that aren't related to the existing ones. */
    children: PropTypes.node,
    /** Sets a description meta tag. Defaults to the site metadata description from graphql query. */
    description: PropTypes.string,
    /** Sets a title meta tag */
    title: PropTypes.string,
};

SEO.defaultProps = {
    description: `${SITE_NAME} website.`,
};
