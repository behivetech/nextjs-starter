import React from 'react';

import getClassName from 'tools/getClassName';

import Headline from 'components/core/Headline';
import Layout from 'components/layout/Layout';
import Section from 'components/layout/Section';
import Users from 'components/app/users/Users';

export default function UsersPage() {
    const [rootClassName, getChildClass] = getClassName({rootClass: 'users-page'});

    return (
        <Layout className={rootClassName} title="users">
            <Section className={getChildClass('section')}>
                <Headline level={2}>Users</Headline>
                <Users />
            </Section>
        </Layout>
    );
}
