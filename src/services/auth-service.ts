import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { checkPassword, oneWayEncrypt } from '@services/hashing-service';

export default class AuthService {
    private authTable: string = process.env.AUTH_TABLE;

    constructor(
        private docClient: DocumentClient
    ) { }

    async register(email: string, password: string) {
        const saltedPassword: any = await oneWayEncrypt(password);

        const response = await this.docClient.put({
            TableName: this.authTable,
            Item: {
                email,
                password: saltedPassword
            }
        }).promise();

        return response;
    }

    async isExist(email: string) {
        const response = await this.docClient.get({
            TableName: this.authTable,
            Key: {
                email
            }
        }).promise();

        return response.Item ?? null;
    }

    async login(email: string, password: string) {
        const user = await this.isExist(email);

        if (user) {
            if (checkPassword(password, user.password)) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
