import Api from '../axiosConfig';
import axios, { AxiosResponse } from 'axios';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

interface AttendanceCheckResponse {
    exists: boolean;
  }
  
export const checkAttendanceExists = async (batchId: string, date: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<AttendanceCheckResponse> = await Api.post(teacherEndpoint.checkAttendanceExists, { batchId, date });
      return response.data.exists;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };
