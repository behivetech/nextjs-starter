import React from 'react';

// core
import Headline from 'components/core/Headline';
import Link from 'components/core/Link';

// layout
import Layout from 'components/layout/Layout';
import Section from 'components/layout/Section';

export default function Custom404() {
    return (
        <Layout className="custom-404-page" title="404">
            <Section cendered padding>
                <Headline level={2}>Page not found</Headline>
                <Link to="/">Back to home</Link>
            </Section>
        </Layout>
    );
}
