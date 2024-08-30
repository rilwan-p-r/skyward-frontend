import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import * as axios from 'axios';

export const getCourseList = async () => {
  try {
    const response = await Api.get(adminEndpoint.getCourseList);
    console.log('CourseList',response);
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