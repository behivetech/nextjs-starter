import crypto from 'crypto';

function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Nothing like some good ol' hash salt as an extra security measure
// to protect a user's password (also great on popcorn)
export function getHashSalt(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = getHash(password, salt);

    return {
        hash,
        salt,
    };
}

export function validateHash({hash, salt}, password) {
    const compareHash = getHash(password, salt);

    return hash === compareHash;
}
