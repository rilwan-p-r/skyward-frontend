import Api from '../axiosConfig';
import * as axios from 'axios';
import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';

export const submitMCQCompetition = async (studentId: string, mcqCompetitionId: string, answers: Record<string, number | null>) => {
  try {
    console.log('answersss', answers);
    
    const response = await Api.post(`${studentEndpoint.submitMCQCompetition}/${mcqCompetitionId}`, { answers }, {
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