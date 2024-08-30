import Api from '../axiosConfig';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';
import teacherEndpoint from '../../endpoints/teacherEndpoints/TeacherEndpoint';

export const submitAttendanceData = async (attendanceData:unknown): Promise<AxiosResponse<unknown> | undefined> => {
    try {
        const response = await Api.post(teacherEndpoint.submitAttendanceData,attendanceData);
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response;
        } else {
            console.error('unexpected error:', error);
            throw error;
        }
    }
}