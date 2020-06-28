import React from 'react';

import Headline from 'components/core/Headline';
import Layout from 'components/layout/Layout';
import Link from 'components/core/Link';

export default function Custom404() {
    return (
        <Layout className="custom-404">
            <Headline level={2}>Page not found</Headline>
            <Link to="/">Back to home</Link>
        </Layout>
    );
}
