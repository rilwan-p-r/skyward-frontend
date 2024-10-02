import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export const deleteStudent = async (studentId: unknown): Promise<AxiosResponse<unknown> | undefined> => {
    try {
        const response = await Api.delete(`${adminEndpoint.deleteStudent}/${studentId}`);
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