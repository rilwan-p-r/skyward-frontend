import Api from '../axiosConfig';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';


export const addReview = async (values: any): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post('review', values);
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
