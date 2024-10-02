import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import * as axios from 'axios';

export const getStudents = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    const response = await Api.get(`${adminEndpoint.getStudents}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
}
export const studentCount = async () => {
  try {
    const response = await Api.get(adminEndpoint.studentCount);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
}