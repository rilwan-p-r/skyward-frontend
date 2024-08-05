import Api from '../axiosConfig';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const teacherLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    
    try {
        const response = await Api.post(teacherEndpoint.login, body);
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