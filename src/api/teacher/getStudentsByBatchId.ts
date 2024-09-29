import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';
import Api from '../axiosConfig';
import * as axios from 'axios';

export const getStudentsByBatchId = async (batchId: string) => {
  try {
    const response = await Api.get(`${teacherEndpoint.getStudentsByBatchId}/${batchId}`);
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