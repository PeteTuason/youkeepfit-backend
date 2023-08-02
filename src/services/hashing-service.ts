import { hash, genSalt, compare } from 'bcryptjs';

export const oneWayEncrypt = async (password: string) => {
    return new Promise((resolve, reject) => {
        genSalt(10, function (err: any, salt: string) {
            if (err) {
                console.error('oneWayEncrypt-genSalt', err);
                reject(err);
                return;
            }
            hash(password, salt, (err: any, hash: string) => {
                if (err) {
                    console.error('oneWayEncrypt-hash', err);
                    reject(err);
                    return;
                }
                resolve(hash);
            });
        });
    });
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve) => {
        compare(password, hash, (err, result) => {
            if (err) {
                console.error('checkPassword', err);
                resolve(false);
            }
            resolve(result);
        });
    });
};