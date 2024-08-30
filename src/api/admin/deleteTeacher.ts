import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import * as axios from 'axios';

export const deleteTeacher = async (teacherId:unknown) => {
  try {
    const response = await Api.delete(`${adminEndpoint.deleteTeacher}/${teacherId}`);
    console.log('deletedTeacherrr',response);
    
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