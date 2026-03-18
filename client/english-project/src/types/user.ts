export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    currentLevel: string;
    createdAt: Date;
};

export type UserLogin = {
    email: string;
    password: string;
};

export type UserSignUp = {
    username: string;
    email: string;
    password: string;
};