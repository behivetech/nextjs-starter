import React from 'react';

// core
import Headline from 'components/core/Headline';

// layout
import Layout from 'components/layout/Layout';
import Section from 'components/layout/Section';
import Users from 'components/app/users/Users';

export default function UsersPage() {
    return (
        <Layout className="users-page" title="Users">
            <Section centered padding>
                <Headline level={2}>Users</Headline>
                <Users />
            </Section>
        </Layout>
    );
}
