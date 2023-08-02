import { RegisterDTO } from "src/models/user";
import AuthService from "./auth-service";
import UserService from "./user-service";

export default class DatabaseService {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    async isExist(email: string) {
        const response = await this.authService.isExist(email);
        return response;
    }

    async register(user: RegisterDTO) {
        await this.authService.register(user.email, user.password);
        await this.userService.register(user);
    }

    async login(email: string, password: string) {
        const response = await this.authService.login(email, password);
        if (response) {
            return response;
        } else {
            return null;
        }
    }
}
