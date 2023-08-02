import dynamoDBClient from "../models";
import AuthService from "./auth-service";
import DatabaseService from "./database-service";
import UserService from "./user-service";

const dbService = new DatabaseService(
    new AuthService(dynamoDBClient()),
    new UserService(dynamoDBClient())
);

export default dbService;