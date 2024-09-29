import { StudentInterface } from "./studentInterface";

export interface LeaveStudentInterface {
    _id: string;
    startDate: string;
    endDate: string;
    reason: string;
    batchId:string;
    studentId:StudentInterface;
    status: 'pending' | 'approved' | 'rejected';
  }