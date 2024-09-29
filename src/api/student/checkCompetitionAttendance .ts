import Api from '../axiosConfig';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const checkCompetitionAttendance = async (studentId: string, mcqCompetitionId: string) => {
  try {
    const response = await Api.get(`${studentEndpoint.checkMCQAttendance}/${mcqCompetitionId}`, {
      params: { studentId }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      console.error('unexpected error:', error);    
      throw error;
    }
  }
}