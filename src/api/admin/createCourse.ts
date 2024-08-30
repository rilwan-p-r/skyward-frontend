import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
import { CourseFormInterface } from '../../interfaces/courseFormValues';

export const createCourse = async (values: CourseFormInterface): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(adminEndpoint.createCourse, values);
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
