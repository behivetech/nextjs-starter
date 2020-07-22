function appAuthenticated(payload) {
    return {type: 'SET_AUTHENTICATED', payload};
}

function appAuthenticating(payload) {
    return {type: 'SET_AUTHENTICATING'};
}

function appError(error) {
    return {type: 'SET_ERROR', payload: {error}};
}

function appResetState() {
    return {type: 'RESET_STATE'};
}

const appActionsCreator = (dispatch) => {
    return {
        appAuthenticated: (payload) => dispatch(appAuthenticated(payload)),
        appAuthenticating: (payload) => dispatch(appAuthenticating(payload)),
        appError: (error) => dispatch(appError(error)),
        appResetState: () => dispatch(appResetState()),
    };
};

export default appActionsCreator;
