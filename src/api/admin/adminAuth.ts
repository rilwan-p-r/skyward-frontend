import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
interface AdminLoginResponse {
  email: string;
}

export const adminLogin = async (body: { email: string, password: string }): Promise<AxiosResponse<AdminLoginResponse> | undefined> => {
  try {
    const response = await Api.post(adminEndpoint.login, body);
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
export const adminLogout = async (): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(adminEndpoint.logout);
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


