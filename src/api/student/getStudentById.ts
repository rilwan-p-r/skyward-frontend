import Api from '../axiosConfig';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const getStudentById = async (studentId: string) => {
  try {
    const response = await Api.get(`${studentEndpoint.getStudentById}/${studentId}`);
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);    
      throw error;
    }
  }
} 