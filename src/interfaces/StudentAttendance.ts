export interface StudentAttendanceInterface {
    _id: string;
    firstName: string;
    lastName: string;
    present: boolean | null;
    remarks: string;
}