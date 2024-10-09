export interface ThemeType {
    value: string
}

export interface UserTypeBase {
    email: string;
    password: string;
    token?: string;
    id?: string;
}

export interface RegisterUserType extends UserTypeBase {
    name: string;
}

export interface LoginUserType extends UserTypeBase {
    name?: string;
}
