import Api from '../axiosConfig';
import * as axios from 'axios';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

export const getBatchesAndCoursesByTeacherId = async (teacherId:unknown) => {
  try {
    const response = await Api.get(`${teacherEndpoint.getBatchesAndCoursesByTeacherId}/${teacherId}`);
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