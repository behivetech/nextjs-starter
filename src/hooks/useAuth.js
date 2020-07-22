import {useContext} from 'react';

import {AuthContext} from 'components/providers/AuthProvider';

export default function useAuth() {
    return useContext(AuthContext);
}
