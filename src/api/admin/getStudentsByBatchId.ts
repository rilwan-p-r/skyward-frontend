import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import * as axios from 'axios';

export const getStudentsByBatchId = async (courseId: string) => {
  try {
    const response = await Api.get(`${adminEndpoint.getStudentsByBatchId}/${courseId}`);
    console.log('studentt',response);
    
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