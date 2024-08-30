import Api from '../axiosConfig';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const teacherForgotPassword = async (body: { email: string}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    try {
        const response = await Api.post(teacherEndpoint.forgotPassword, body);
        console.log(response);
        
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

export const teacherVerifyOtp = async (body: { email: string, otp:number}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('otp',body);
    try {
        const response = await Api.post(teacherEndpoint.verifyOtp, body);
        console.log(response);
        
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

export const changeTeacherPassword = async (body: { email: string, newPassword:string}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('otp',body);
    try {
        const response = await Api.post(teacherEndpoint.changePassword, body);
        console.log(response);
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
