import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
import { BatchFormValues } from '../../interfaces/batchFormValues';

export const createBatch = async (values: BatchFormValues): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(adminEndpoint.createBatch, values);
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
