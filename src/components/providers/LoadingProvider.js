import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

const DEFAULT_CONTEXT = {
    loading: false,
    setLoading: () => null,
};

export const LoadingContext = createContext(DEFAULT_CONTEXT);

export default function LoadingProvider({children, className}) {
    const [loading, setLoading] = useState();

    const context = {
        loading,
        setLoading,
    };

    return <LoadingContext.Provider value={context}>{children}</LoadingContext.Provider>;
}

LoadingProvider.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
