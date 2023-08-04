import { DocumentClient } from "aws-sdk/clients/dynamodb";
import UserProfile, { BasicProfileDTO, DietPreferenceDTO, FitnessProfileDTO, RegisterDTO, WorkoutPreferenceDTO } from "src/models/user";

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

    async basicProfile(profile: BasicProfileDTO) {
        const params = {
            TableName: this.userTable,
            Key: {
                email: profile.email
            },
            UpdateExpression: "SET #age = :age, #gender = :gender, #height = :height, #weight = :weight, #goalWeight = :goalWeight, #bmi = :bmi, #goal = :goal",
            ExpressionAttributeNames: {
                "#age": "age",
                "#gender": "gender",
                "#height": "height",
                "#weight": "weight",
                "#goalWeight": "goalWeight",
                "#bmi": "bmi",
                "#goal": "goal"
            },
            ExpressionAttributeValues: {
                ":age": profile.age,
                ":gender": profile.gender,
                ":height": profile.height,
                ":weight": profile.weight,
                ":goalWeight": profile.goalWeight,
                ":bmi": profile.bmi,
                ":goal": profile.goal,
            },
        };

        await this.docClient.update(params).promise();
    }

    async fitnessProfile(profile: FitnessProfileDTO) {
        const params = {
            TableName: this.userTable,
            Key: {
                email: profile.email
            },
            UpdateExpression: "SET #bodyType = :bodyType, #activityLevel = :activityLevel, #healthQuestions = :healthQuestions",
            ExpressionAttributeNames: {
                "#bodyType": "bodyType",
                "#activityLevel": "activityLevel",
                "#healthQuestions": "healthQuestions"
            },
            ExpressionAttributeValues: {
                ":bodyType": profile.bodyType,
                ":activityLevel": profile.activityLevel,
                ":healthQuestions": profile.healthQuestions
            },
        };

        await this.docClient.update(params).promise();
    }

    async dietPreference(preference: DietPreferenceDTO) {
        const params = {
            TableName: this.userTable,
            Key: {
                email: preference.email
            },
            UpdateExpression: "SET #dietType = :dietType, #numberOfMeals = :numberOfMeals, #healthQuestionList = :healthQuestionList",
            ExpressionAttributeNames: {
                "#dietType": "dietType",
                "#numberOfMeals": "numberOfMeals",
                "#healthQuestionList": "healthQuestionList"
            },
            ExpressionAttributeValues: {
                ":dietType": preference.dietType,
                ":numberOfMeals": preference.numberOfMeals,
                ":healthQuestionList": preference.healthQuestionList
            },
        };

        await this.docClient.update(params).promise();
    }

    async workoutPreference(preference: WorkoutPreferenceDTO) {
        const params = {
            TableName: this.userTable,
            Key: {
                email: preference.email
            },
            UpdateExpression: "SET #gymEquipments = :gymEquipments, #workoutExperience = :workoutExperience, #workoutTime = :workoutTime, #workoutDays = :workoutDays",
            ExpressionAttributeNames: {
                "#gymEquipments": "gymEquipments",
                "#workoutExperience": "workoutExperience",
                "#workoutTime": "workoutTime",
                "#workoutDays": "workoutDays"
            },
            ExpressionAttributeValues: {
                ":gymEquipments": preference.gymEquipments,
                ":workoutExperience": preference.workoutExperience,
                ":workoutTime": preference.workoutTime,
                ":workoutDays": preference.workoutDays
            },
        };

        await this.docClient.update(params).promise();
    }

    async getUser(email: string) {
        const response = await this.docClient.get({
            TableName: this.userTable,
            Key: {
                email
            }
        }).promise();

        return response.Item as UserProfile ?? null;
    }
}
