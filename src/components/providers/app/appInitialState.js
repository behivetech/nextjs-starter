export const APP_INITIAL_STATE = {
    authInitialized: false,
    accessToken: null,
    authenticated: false,
    ssr: typeof window === 'undefined',
    authenticating: false,
    error: null,
    name: null,
};
