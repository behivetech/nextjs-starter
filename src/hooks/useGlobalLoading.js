import {useContext} from 'react';

import {LoadingContext} from 'components/providers/LoadingProvider';

export default function useGlobalLoading() {
    const {loading, setLoading} = useContext(LoadingContext);

    return {loading, setLoading};
}
