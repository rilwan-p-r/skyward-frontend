import studentEndpoint from '../../endpoints/studentEndpoints/StudentEndpoint';
import { LeaveApplicationData } from '../../interfaces/leaveApplicationData';
import { LeaveStudentInterface } from '../../interfaces/leaveStudentInterface';
import Api from '../axiosConfig';
import * as axios from 'axios';

export const leaveApplyStudent = async (data: LeaveApplicationData) => {
  try {
    const response = await Api.post(studentEndpoint.leaveApplyStudent, data);
    console.log(response);
    
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


export const fetchMonthlyLeaves = async (studentId: string, month: string): Promise<LeaveStudentInterface[]> => {
  try {
    const response = await Api.get(studentEndpoint.getMyLeaves, {
      params: { studentId, month }
    });

    console.log('appliedLeaveResponse',response);
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch monthly leaves');
  }
};