import useAuth from './useAuth';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGOUT = gql`
    mutation LOGOUT {
        logout
    }
`;

export default function useLogout() {
    const {handleLoggedOut, setError, authenticated} = useAuth();
    const [logout] = useMutation(LOGOUT, {
        onCompleted: handleLoggedOut,
        onError: handleLogoutError,
    });

    function handleLogoutError(errorResponse) {
        setError(
            errorResponse,
            'There was a problem logging out. Please try again.',
            'logoutError'
        );
    }

    return {
        authenticated,
        logout,
    };
}
