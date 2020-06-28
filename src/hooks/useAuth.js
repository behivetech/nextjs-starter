import {useContext} from 'react';

import {AuthContext} from 'components/providers/AuthProvider';

export default function useAuth() {
    const {
        authenticated,
        authenticating,
        error,
        username,
        login,
        logout,
        signUp,
        ssr,
    } = useContext(AuthContext);

    return {
        authenticated,
        authenticating,
        error,
        username,
        login,
        logout,
        signUp,
        ssr,
    };
}
