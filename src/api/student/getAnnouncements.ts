import Api from '../axiosConfig';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const getAnnouncements = async () => {
  try {
    const response = await Api.get(studentEndpoint.getAnnouncements);
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