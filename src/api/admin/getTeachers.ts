import Api from '../axiosConfig';
import adminRoutes from '../../endpoints/adminRoutes';
import * as axios from 'axios';

export const getTeachers = async () => {
  try {
    const response = await Api.get(adminRoutes.getTeachers);
    console.log('teacherrr',response);
    
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