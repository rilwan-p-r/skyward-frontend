import Api from '../axiosConfig';
import * as axios from 'axios';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

export const getTeacherById = async (teacherId: string) => {
  try {
    const response = await Api.get(`${teacherEndpoint.getTeacherById}/${teacherId}`);
    console.log('teacher',response);
    
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