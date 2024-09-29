import Api from '../axiosConfig';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';


export const getReviews = async (): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.get('review');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
};
