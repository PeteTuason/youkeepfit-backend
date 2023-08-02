export default interface UserProfile {
    firstname: string,
    lastname: string,
    email: string,
    role?: string
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