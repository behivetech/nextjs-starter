const AUTH_TOKEN = 'id';
const USER = 'user';

function hasLocalStorage() {
    return typeof localStorage === 'object';
}

export function getToken() {
    return hasLocalStorage() ? localStorage.getItem(AUTH_TOKEN) : null;
}

export function setToken(token) {
    return hasLocalStorage() ? localStorage.setItem(AUTH_TOKEN, token) : null;
}

export function setUser(user) {
    return hasLocalStorage() ? localStorage.setItem(USER, user) : null;
}

export function getUser() {
    return hasLocalStorage() ? localStorage.getItem(USER) : null;
}

export async function resetPersistence() {
    if (hasLocalStorage()) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(USER);
    }
}
