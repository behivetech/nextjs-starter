import {serialize, parse} from 'cookie';

const TOKEN_NAME = process.env.TOKEN_NAME;

export const MAX_AGE = process.env.TOKEN_MAX_AGE;

export function setTokenCookie(res, token) {
    const isProd = () => process.env.NODE_ENV === 'production';
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        domain: isProd() ? '.offtheeasel.com' : undefined,
        secure: isProd(),
        path: '/',
        sameSite: isProd() ? 'strict' : 'lax',
    });

    res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
    const cookie = serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
}

function parseCookies(req) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || '');
}

export function getTokenCookie(req) {
    const cookies = parseCookies(req);
    return cookies[TOKEN_NAME];
}
