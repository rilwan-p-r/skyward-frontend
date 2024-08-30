import Api from '../axiosConfig';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const teacherLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    console.log('pass',body.password);
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

export const teacherLogout = async (): Promise<AxiosResponse<unknown> | undefined> => {
    try {
      const response = await Api.post(teacherEndpoint.logout);
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

