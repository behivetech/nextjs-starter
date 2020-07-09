import React from 'react';

// core
import Headline from 'components/core/Headline';

// layout
import Layout from 'components/layout/Layout';
import Section from 'components/layout/Section';

export default function IndexPage() {
    return (
        <Layout className="home-page" title="Home">
            <Section centered padding>
                <Headline level={2}>Welcome to the NextJS Starter</Headline>
            </Section>
        </Layout>
    );
}
