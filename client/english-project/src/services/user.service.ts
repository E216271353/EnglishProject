import axios from 'axios';
import type { User, UserLogin } from '../types/user';

export const login = async (userLogin: UserLogin): Promise<User> => {
    const response = await axios.post<User>(`/api/User/login`, userLogin);
    return response.data;
};


export const signUp = async (userSignUp: User): Promise<User> => {
    const response = await axios.post<User>(`/api/User/signup`, userSignUp);
    return response.data;
};