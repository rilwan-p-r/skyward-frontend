import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
import { AnnouncementFormInterface } from '../../interfaces/AnnouncementFormInterface';

export const createAnnouncement = async (values:AnnouncementFormInterface): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(adminEndpoint.createAnnouncement, values);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
};
