export default interface UserProfile {
    firstname: string,
    lastname: string,
    email: string,
    role?: string,
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    goalWeight?: number,
    bmi?: number,
    goal?: string,
    bodyType?: string,
    activityLevel?: string,
    healthQuestions?: any[]
}

export interface UserAuth {
    email: string,
    password: string
}

export interface RegisterDTO {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role?: string
}

export interface BasicProfileDTO {
    email: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    goalWeight: number,
    bmi: number,
    goal: string
}

export interface FitnessProfileDTO {
    email: string,
    bodyType: string,
    activityLevel: string,
    healthQuestions: any[]
}