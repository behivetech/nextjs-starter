import React from 'react';

import getClassName from 'tools/getClassName';

import Headline from 'components/core/Headline';
import Layout from 'components/layout/Layout';
import Section from 'components/layout/Section';

export default function IndexPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'index-page',
    });

    return (
        <Layout className={rootClassName} title="home">
            <Section className={getChildClass('section')}>
                <Headline level={2}>Welcome to the NextJS Starter</Headline>
            </Section>
        </Layout>
    );
}
