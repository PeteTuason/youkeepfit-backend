import { BasicProfileDTO, DietPreferenceDTO, FitnessProfileDTO, RegisterDTO, WorkoutPreferenceDTO } from "src/models/user";
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

    async basicProfile(profile: BasicProfileDTO) {
        await this.userService.basicProfile(profile);
    }

    async fitnessProfile(profile: FitnessProfileDTO) {
        await this.userService.fitnessProfile(profile);
    }

    async dietPreference(preference: DietPreferenceDTO) {
        await this.userService.dietPreference(preference);
    }

    async workoutPreference(preference: WorkoutPreferenceDTO) {
        await this.userService.workoutPreference(preference);
    }

    async login(email: string, password: string) {
        const isValid = await this.authService.login(email, password);
        if (isValid) {
            return await this.userService.getUser(email);
        } else {
            return null;
        }
    }
}
