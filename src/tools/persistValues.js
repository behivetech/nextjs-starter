const USER = 'user';

function hasLocalStorage() {
    return typeof localStorage === 'object';
}

export function setUser(user) {
    return hasLocalStorage() ? localStorage.setItem(USER, user) : null;
}

export function getUser() {
    return hasLocalStorage() ? localStorage.getItem(USER) : null;
}

export async function resetPersistence() {
    if (hasLocalStorage()) {
        localStorage.removeItem(USER);
    }
}
