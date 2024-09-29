import Api from '../axiosConfig';
import * as axios from 'axios';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

export const getAnnouncements = async () => {
  try {
    const response = await Api.get(teacherEndpoint.getAnnouncements);
    console.log('AnnouncementsList',response);
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