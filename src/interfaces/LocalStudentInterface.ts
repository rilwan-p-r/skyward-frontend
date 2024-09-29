import { BatchInterface } from "./BatchInterface";
import { CourseInterface } from "./CourseInterface";

export interface LocalStudentInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    batchId: string;
    courseDetails?: CourseInterface;
    batchDetails?: BatchInterface
}