import { sign, verify } from 'jsonwebtoken';

export const generateToken = async (user: any) => {
    const stage = process.env.STAGE;
    const secret = process.env.SECRET;
    const bufferedSecret = Buffer.from(`${secret}-${stage}`).toString('base64');
    const applicationdID = Buffer.from(`${secret}`).toString('base64');

    user.issuer = applicationdID;
    return await sign(user, bufferedSecret, { expiresIn: 86400 });
}

export const verifyToken = (token: string) => {
    const stage = process.env.STAGE;
    const secret = process.env.SECRET;
    const bufferedSecret = Buffer.from(`${secret}-${stage}`).toString('base64');

    return verify(token, bufferedSecret);
}