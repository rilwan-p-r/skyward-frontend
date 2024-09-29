import Api from '../axiosConfig';
import { LeaveStudentInterface } from '../../interfaces/leaveStudentInterface';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

export const getAppliedLeavesByBatchId = async (batchId: string): Promise<LeaveStudentInterface[]> => {
    try {
        const response = await Api.get(`${teacherEndpoint.studentsAppliedLeave}/${batchId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applied leaves:', error);
        throw error;
    }
};

export const handleStudentLeaveApplication = async (leaveId: string, action: 'approve' | 'reject'): Promise<unknown> => {
    try {
        const response = await Api.post(`${teacherEndpoint.handleLeaveApplication}/${leaveId}`, { action });
        return response;
    } catch (error) {
        console.error('Error handling leave application:', error);
        throw error;
    }
};