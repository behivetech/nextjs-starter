import React, {useEffect} from 'react';

import Layout from '../components/layout/Layout';

import useAuth from 'hooks/useAuth';
import {useRouter} from 'next/router';

import './logout.scss';

export default function Logout() {
    const {logout} = useAuth();
    const router = useRouter();

    useEffect(() => {
        logout();
        setTimeout(() => {
            router.push('/');
        }, 2000);
    }, []);

    return (
        <Layout className="logout">
            <div className="logout__content">You have been successfully logged out.</div>
        </Layout>
    );
}
