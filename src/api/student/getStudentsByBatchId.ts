import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';
import Api from '../axiosConfig';
import * as axios from 'axios';

export const getStudentsByBatchId = async (batchId: string) => {
  try {
    const response = await Api.get(`${studentEndpoint.getStudentsByBatchId}/${batchId}`);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);    
      throw error;
    }
  }
} 