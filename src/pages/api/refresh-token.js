import {getRefreshTokenResponse} from 'graphql/lib/auth';
import {prisma} from '../../../generated/prisma-client';

export default async (req, res) => {
    let refreshResponse = {};

    try {
        refreshResponse = await getRefreshTokenResponse({
            req,
            res,
            prisma,
            restFetch: true,
        });
    } catch (error) {
        throw new Error(error);
    }

    res.status(200).json(refreshResponse);
};
