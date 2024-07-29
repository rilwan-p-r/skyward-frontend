import Api from './axiosConfig';
import adminRoutes from '../endpoints/adminRoutes';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const adminLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    
    try {
        const response = await Api.post(adminRoutes.login, body, {
            withCredentials: true,
        });        
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}   