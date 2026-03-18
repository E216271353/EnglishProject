import api from './api';
import type { User, UserLogin, UserSignUp } from '../types/user';


export const login = async (userLogin: UserLogin): Promise<any> => {
    // הורדתי את ה-/api מהתחלה כי הוא כבר נמצא ב-baseURL
    const response = await api.post(`/User/login`, userLogin);
    return response.data; // יחזיר { user: {...}, token: "..." }
};

export const signUp = async (userSignUp: UserSignUp): Promise<any> => {
    // הורדתי את ה-/api מהתחלה
    const response = await api.post(`/User/signup`, userSignUp);
    return response.data; // יחזיר { user: {...}, token: "..." }
};