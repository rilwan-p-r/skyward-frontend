import Api from '../axiosConfig';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const getMyAttendance = async (studentId: string, selectedMonth: string) => {
  try {
    const response = await Api.get(`${studentEndpoint.getMyAttendanceStudentById}/${studentId}/attendance`, {
        params: { month: selectedMonth } 
      });
    
    if (response && response.data) {
        return response.data;
      } else {
        throw new Error('No data found');
      }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
};
