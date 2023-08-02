import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { RegisterDTO } from "src/models/user";

export default class UserService {
    private userTable: string = process.env.USER_TABLE;

    constructor(
        private docClient: DocumentClient
    ) { }

    async register(user: RegisterDTO) {
        const { email, firstname, lastname, role } = user;

        const response = await this.docClient.put({
            TableName: this.userTable,
            Item: {
                email,
                firstname,
                lastname,
                role
            }
        }).promise();

        return response;
    }
}
