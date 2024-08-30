import Api from '../axiosConfig';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const studentForgotPassword = async (body: { email: string}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    try {
        const response = await Api.post(studentEndpoint.forgotPassword, body);
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

export const studentVerifyOtp = async (body: { email: string, otp:number}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('otp',body);
    try {
        const response = await Api.post(studentEndpoint.verifyOtp, body);
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

export const changeStudentPassword = async (body: { email: string, newPassword:string}): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('newpasss',body);
    try {
        const response = await Api.post(studentEndpoint.changePassword, body);
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
