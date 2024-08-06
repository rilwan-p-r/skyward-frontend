import Api from '../axiosConfig';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const studentLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<unknown> | undefined> => {
    console.log('email',body.email);
    
    try {
        const response = await Api.post(studentEndpoint.login, body);
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

export const studentLogout = async (): Promise<AxiosResponse<unknown> | undefined> => {
    try {
      const response = await Api.post(studentEndpoint.logout);
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