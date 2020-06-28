import {useContext, useEffect} from 'react';

import {LoadingContext} from 'components/providers/LoadingProvider';

export default function useGlobalLoading(loadingArg) {
    const {loading, setLoading} = useContext(LoadingContext);

    useEffect(() => {
        if (loadingArg !== undefined) {
            setLoading(loadingArg);
        }
    }, [loadingArg]);

    return {
        loading,
        setLoading,
    };
}
